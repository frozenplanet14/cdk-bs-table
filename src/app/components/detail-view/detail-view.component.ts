import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { DetailViewModel } from '../../models/detail-view.model';

@Component({
  selector: 'fm-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  data: DetailViewModel;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.data = this.studentService.getDetailViewData();
  }

  goBack() {
    this.studentService.navigate(['/summary']);
  }

}
