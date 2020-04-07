import { Component, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, of } from 'rxjs';
import { StudentResultModel } from '../student-result.model';
import { SortableDirective, SortEvent } from '../sortable.directive';
import { STUDENT_DATA, createData } from '../student-data.const';
import { StudentService } from '../student.service';

@Component({
  selector: 'fm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: Observable<StudentResultModel[]>;
  gridHeight = 300;
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  @Output() sortOptions = new EventEmitter<SortEvent>();

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

}
