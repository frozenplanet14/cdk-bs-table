import { Injectable, NgZone } from '@angular/core';
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap, debounceTime, switchMap, delay, first } from 'rxjs/operators';
import { StudentResultModel } from '../models/student-result.model';
import * as faker from 'faker';
import { DetailViewModel } from '../models/detail-view.model';
import { Router } from '@angular/router';

interface State {
  page: number;
  pageSize: number;
  scrollIndex: number;
  searchTerm: string;
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

function matches(result: StudentResultModel, term: string) {
  return result.name.toLowerCase().includes(term.toLowerCase())
    || result.userName.toLowerCase().includes(term.toLowerCase());
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
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  // tslint:enable: variable-name
  constructor(private ngZone: NgZone, private router: Router) {
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

  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set scrolled(scrollIndex: number) { this._set({ scrollIndex }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }

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
    const { sortColumn, sortDirection, pageSize, page, scrollIndex, searchTerm } = this._state;
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
    // sort the result
    results = sort((oldRecords || []).concat(results), sortColumn, sortDirection);
    // filter the result
    results = results.filter(country => matches(country, searchTerm));

    return of(results);
  }

  getDetailViewData(): DetailViewModel {
    const { name, date, address, commerce, helpers, finance, company } = faker;
    const data = {
      name: {
        firstName: name.firstName(),
        lastName: name.lastName(),
        findName: name.findName(),
        jobTitle: name.jobTitle(),
        prefix: name.prefix(),
        suffix: name.suffix(),
        title: name.title(),
        jobDescriptor: name.jobDescriptor(),
        jobArea: name.jobArea(),
        jobType: name.jobType()
      },
      address: {
        streetName: address.streetName(),
        streetAddress: address.streetAddress(),
        streetSuffix: address.streetSuffix(),
        streetPrefix: address.streetPrefix(),
        city: address.city(),
        cityPrefix: address.cityPrefix(),
        citySuffix: address.citySuffix(),
        county: address.county(),
        state: address.state(),
        stateAbbr: address.stateAbbr(),
        country: address.country(),
        countryCode: address.countryCode(),
        zipCode: address.zipCode(),
        lat: address.latitude(),
        lng: address.longitude(),
        secondaryAddress: address.secondaryAddress(),
      },
      commerce: {
        color: commerce.color(),
        department: commerce.department(),
        productName: commerce.productName()
      },
      card: helpers.createCard(),
      contextual: helpers.contextualCard(),
      userInfo: helpers.userCard(),
      transaction: helpers.createTransaction(),
      finance: {
        account: finance.account(),
        accountName: finance.accountName(),
        mask: finance.mask(),
        amount: finance.amount(),
        transactionType: finance.transactionType(),
        currencyCode: finance.currencyCode(),
        currencyName: finance.currencyName(),
        currencySymbol: finance.currencySymbol(),
        bitcoinAddress: finance.bitcoinAddress(),
        iban: finance.iban(),
        bic: finance.bic()
      },
      company: {
        suffixes: company.suffixes(),
        companyName: company.companyName(),
        companySuffix: company.companySuffix(),
        catchPhrase: company.catchPhrase(),
        bs: company.bs(),
        catchPhraseAdjective: company.catchPhraseAdjective(),
        catchPhraseDescriptor: company.catchPhraseDescriptor(),
        catchPhraseNoun: company.catchPhraseNoun(),
        bsAdjective: company.bsAdjective(),
        bsBuzz: company.bsBuzz(),
        bsNoun: company.bsNoun()
      },
      date: {
        past: date.past(),
        future: date.future(),
        recent: date.recent(),
        month: date.month(),
        weekday: date.weekday()
      }
    };
    return data as any;
  }
}
