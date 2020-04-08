import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { HeaderComponent, FooterComponent } from '../shared/shared.component';

@Component({
  selector: 'fm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @ContentChild(HeaderComponent) header;
  @ContentChild(FooterComponent) footer;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() isCardExpanded: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
