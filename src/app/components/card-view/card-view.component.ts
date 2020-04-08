import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { StudentResultModel } from '../../models/student-result.model';
import { SortEvent } from '../../directives/sortable.directive';
import { DEFAULT_COLUMN_LIST, COLUMN_LIST } from '../../models/student-data.const';
import { Router } from '@angular/router';

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
  completeColumnList = COLUMN_LIST;

  constructor(public service: StudentService, private router: Router) {
    this.displayedColumns = DEFAULT_COLUMN_LIST;
    this.studentDataSource = service.results$;
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  _toggleColumn(data?: string[]) {
    if (data) {
      this.displayedColumns = data;
    }
    this._options = !this._options;
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }

  onSort({ column, direction }: SortEvent) {
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onScrolledIndexChange(index: number) {
    this.service.scrolled = index;
  }

  onRowSelection(record: StudentResultModel) {
    console.log(record);
    this.router.navigate(['/detail']);
  }

}
