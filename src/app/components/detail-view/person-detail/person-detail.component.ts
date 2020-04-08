import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DetailViewModel } from 'src/app/models/detail-view.model';

@Component({
  selector: 'fm-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonDetailComponent implements OnInit {
  @Input() data: DetailViewModel;
  props = ['date', 'userInfo', 'commerce', 'address'];
  cardItem = ['transaction', 'finance'];
  objectKeys = Object.keys;

  constructor() { }

  ngOnInit(): void {
  }

}
