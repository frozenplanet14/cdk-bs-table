import { Component, ViewChildren, QueryList, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { StudentResultModel } from '../student-result.model';
import { SortableDirective, SortEvent } from '../sortable.directive';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'fm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: Observable<StudentResultModel[]>;
  @Input() gridHeight = 226;
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  @Output() sortOptions = new EventEmitter<SortEvent>();
  @Output() scrolledIndexChange = new EventEmitter<number>();

  // Added as the sticky header not working properly on scroll due to transform
  @ViewChild(CdkVirtualScrollViewport, { static: false }) public viewPort: CdkVirtualScrollViewport;
  public get inverseOfTranslation(): string {
    // tslint:disable: no-string-literal
    if (!this.viewPort || !this.viewPort['_renderedContentOffset']) {
      return '-0px';
    }
    const offset = this.viewPort['_renderedContentOffset'];
    // tslint:enable: no-string-literal
    return `-${offset}px`;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.fmSortable !== column) {
        header.direction = '';
      }
    });
    this.sortOptions.next({ column, direction });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  onScrolledIndexChange(index: number) {
    this.scrolledIndexChange.next(index);
  }

}
