import { Component, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface ColumnListModel {
  name: string;
  isSelected: boolean;
}

@Component({
  selector: 'fm-column-select-sort',
  templateUrl: './column-select-sort.component.html',
  styleUrls: ['./column-select-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnSelectSortComponent implements OnChanges {
  @Input() selectedColumns: string[];
  @Input() completeColumnList: string[];
  columnList: ColumnListModel[];
  @Output() finalSelection = new EventEmitter<string[]>();

  constructor() { }

  ngOnChanges(): void {
    this.columnList = [];
    this.completeColumnList.forEach(name => {
      const isSelected = !!this.selectedColumns.find(x => x === name);
      this.columnList.push({ name, isSelected });
    });
  }


  drop(event: CdkDragDrop<ColumnListModel[]>) {
    moveItemInArray(this.columnList, event.previousIndex, event.currentIndex);
  }

  onSelection(col: ColumnListModel) {
    const index = this.columnList.findIndex(x => x.name === col.name);
    this.columnList[index].isSelected = !this.columnList[index].isSelected;
  }

  onSubmit() {
    this.finalSelection.next(
      this.columnList.filter(x => x.isSelected).map(x => x.name)
    );
  }

}
