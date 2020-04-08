import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fm-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit {
  searchFormControl = new FormControl();
  @Output() searchText = new EventEmitter<string>();
  @Output() closeFilter = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onSearch() {
    console.log(this.searchFormControl.value);
    this.searchText.next(this.searchFormControl.value);
  }

}
