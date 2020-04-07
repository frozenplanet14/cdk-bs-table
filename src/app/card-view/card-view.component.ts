import { Component } from '@angular/core';

@Component({
  selector: 'fm-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  _opened: boolean = false;

  _toggleSidebar() {
    this._opened = !this._opened;
  }

}
