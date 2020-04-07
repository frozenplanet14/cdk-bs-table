import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from '../student.service';
import { StudentResultModel } from '../student-result.model';
import { SortEvent } from '../sortable.directive';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DEFAULT_COLUMN_LIST } from '../student-data.const';

@Component({
  selector: 'fm-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  _opened: boolean = false;
  _options: boolean = false;
  isFullScreen: boolean;
  displayedColumns: string[] = [];
  studentDataSource: Observable<StudentResultModel[]>;

  constructor(private service: StudentService) {
    this.displayedColumns = DEFAULT_COLUMN_LIST;
    this.studentDataSource = service.results$;
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  _toggleColumn() {
    this._options = !this._options;
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
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
