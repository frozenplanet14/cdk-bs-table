import { Component, ViewChildren, QueryList } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { StudentResultModel } from '../student-result.model';
import { SortableDirective, SortEvent } from '../sortable.directive';
import { STUDENT_DATA } from '../student-data.const';
import { StudentService } from '../student.service';

@Component({
  selector: 'fm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public displayedColumns: string[] = [];
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  public studentDataSource: Observable<StudentResultModel[]>;

  constructor(private service: StudentService) {
    this.displayedColumns = Object.keys(STUDENT_DATA[0]);
    this.studentDataSource = service.results$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.fmSortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

}
