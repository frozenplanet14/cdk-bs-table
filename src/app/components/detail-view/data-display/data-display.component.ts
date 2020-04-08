import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fm-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss']
})
export class DataDisplayComponent implements OnInit {
  objectKeys = Object.keys;
  @Input() itemToDisplay: any;
  @Input() rowCount: number;
  @Input() styleClass: string;

  constructor() { }

  ngOnInit(): void {
  }

  isDateType(value: any) {
    return typeof value === 'object' && value instanceof Date;
  }

}
