import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from '../student.service';
import { STUDENT_DATA } from '../student-data.const';
import { StudentResultModel } from '../student-result.model';
import { SortEvent } from '../sortable.directive';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'fm-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  _opened: boolean = false;
  _options: boolean = false;
  displayedColumns: string[] = [];
  studentDataSource: Observable<StudentResultModel[]>;

  constructor(private service: StudentService) {
    this.displayedColumns = Object.keys(STUDENT_DATA[0]);
    this.studentDataSource = service.results$;
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  _toggleColumn() {
    this._options = !this._options;
  }

  onSort({ column, direction }: SortEvent) {
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  onScrolledIndexChange(index: number) {
    this.service.scrolled = index;
  }

}
