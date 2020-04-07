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

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SortableDirective,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    CardViewComponent,
    TableFixedSizeVirtualScrollDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    DragDropModule,
    ScrollingModule,
    NgbModule,
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
