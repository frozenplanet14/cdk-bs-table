import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { SortableDirective } from './sortable.directive';
import { CardComponent } from './card/card.component';
import { HeaderComponent, FooterComponent } from './shared/shared.component';
import { CardViewComponent } from './card-view/card-view.component';
import { TableFixedSizeVirtualScrollDirective } from './table-fixed-size-virtual-scroll.directive';
import { ColumnSelectSortComponent } from './column-select-sort/column-select-sort.component';
import { FilterTableComponent } from './filter-table/filter-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { PersonDetailComponent } from './detail-view/person-detail/person-detail.component';
import { AccountsComponent } from './detail-view/accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SortableDirective,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    CardViewComponent,
    TableFixedSizeVirtualScrollDirective,
    ColumnSelectSortComponent,
    FilterTableComponent,
    DetailViewComponent,
    PersonDetailComponent,
    AccountsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    DragDropModule,
    ScrollingModule,
    NgbModule,
    SidebarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
