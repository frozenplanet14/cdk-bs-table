import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { SortableDirective } from './sortable.directive';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SortableDirective,
    CardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
