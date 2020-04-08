import { Component, OnInit, Input } from '@angular/core';
import { SortEvent } from '../../../directives/sortable.directive';
import { compare } from '../../../services/student.service';

@Component({
  selector: 'fm-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  headers: string[];
  defaultData: any[] = [];
  dataToDisplay: any[] = [];

  @Input() set data(value: any[]) {
    this.defaultData = [...value];
    this.dataToDisplay = [...value];
    if (!this.headers && value?.length) {
      this.headers = Object.keys(value[0]).sort();
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSort({ column, direction }: SortEvent) {
    if (direction === '' || column === '') {
      this.dataToDisplay = [...this.defaultData];
    } else {
      this.dataToDisplay = [...this.defaultData].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  isDateType(value: any) {
    return typeof value === 'object' && value instanceof Date;
  }

}
