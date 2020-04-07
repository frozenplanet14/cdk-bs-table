import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { SortableDirective } from './sortable.directive';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { HeaderComponent, FooterComponent } from './shared/shared.component';
import { CardViewComponent } from './card-view/card-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SortableDirective,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    CardViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    DragDropModule,
    NgbModule,
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
