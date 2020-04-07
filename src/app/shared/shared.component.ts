import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fm-header',
  template: '<ng-content></ng-content>'
})
export class HeaderComponent { }

@Component({
  selector: 'fm-footer',
  template: '<ng-content></ng-content>'
})
export class FooterComponent { }

