import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSelectSortComponent } from './column-select-sort.component';

describe('ColumnSelectSortComponent', () => {
  let component: ColumnSelectSortComponent;
  let fixture: ComponentFixture<ColumnSelectSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnSelectSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSelectSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
