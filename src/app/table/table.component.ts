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
  placeholderHeight = 46;
  gridHeight = 226;
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  public viewPort: CdkVirtualScrollViewport;
  @Output() sortOptions = new EventEmitter<SortEvent>();
  @Output() scrolledIndexChange = new EventEmitter<number>();

  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort['_renderedContentOffset']) {
      return '-0px';
    }
    const offset = this.viewPort['_renderedContentOffset'];
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
