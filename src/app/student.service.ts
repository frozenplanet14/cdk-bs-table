import { Injectable } from '@angular/core';
import { SortColumn, SortDirection } from './sortable.directive';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap, debounceTime, switchMap, delay, first } from 'rxjs/operators';
import { StudentResultModel } from './student-result.model';
import * as faker from 'faker';

interface State {
  page: number;
  pageSize: number;
  scrollIndex: number;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(results: StudentResultModel[], column: SortColumn, direction: string): StudentResultModel[] {
  if (direction === '' || column === '') {
    return results;
  } else {
    return [...results].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // tslint:disable: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _fetch$ = new Subject<void>();
  private _results$ = new BehaviorSubject<StudentResultModel[]>([]);
  private _state: State = {
    page: 1,
    pageSize: 20,
    scrollIndex: 0,
    sortColumn: '',
    sortDirection: ''
  };
  // tslint:enable: variable-name
  constructor() {
    this._fetch$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._fetch()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._results$.next(result);
    });

    this._fetch$.next();
  }

  get loading$() { return this._loading$.asObservable(); }
  get results$() { return this._results$.asObservable(); }

  set scrolled(index: number) { this._set({ scrollIndex: index }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._fetch$.next();
  }

  createData(size: number = 1000): StudentResultModel[] {
    const result: StudentResultModel[] = [];
    for (let i = 0; i < size; i++) {
      const num = Math.floor(Math.random() * 10);
      result.push({
        id: faker.random.uuid(),
        userName: faker.internet.userName(),
        name: faker.name.findName(),
        title: faker.name.title(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        streetAddress: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        zipCode: faker.address.zipCode(),
        job: faker.name.jobType(),
        bio: faker.lorem.sentence(),
        dob: faker.date.recent(),
        status: faker.random.boolean(),
        companyName: faker.company.companyName()
      });
    }
    return result;
  }

  private _fetch(): Observable<StudentResultModel[]> {
    const { sortColumn, sortDirection, pageSize, page, scrollIndex } = this._state;
    let oldRecords: StudentResultModel[];
    this._results$.pipe(first()).subscribe(x => oldRecords = x);
    let results: StudentResultModel[] = [];

    if (!scrollIndex) {
      results = this.createData(pageSize);
    } else if ((scrollIndex + 1) * page * 4 >= oldRecords?.length) {
      results = this.createData(pageSize);
      this._state = {
        ...this._state,
        page: page + 1
      };
    }

    return of(sort((oldRecords || []).concat(results), sortColumn, sortDirection));
  }
}
