import { Directive, OnChanges, OnInit, forwardRef, Input, ContentChild } from '@angular/core';
import { VIRTUAL_SCROLL_STRATEGY, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, combineLatest } from 'rxjs';
import { TableVirtualScrollStrategy } from './table-virtual-scroll-strategy';
import { map } from 'rxjs/operators';
import { CdkTable } from '@angular/cdk/table';

export function scrollStrategyFactory(scroll: TableFixedSizeVirtualScrollDirective) {
  return scroll.scrollStrategy;
}

@Directive({
  selector: 'cdk-virtual-scroll-viewport[fmTableData]',
  providers: [{
    provide: VIRTUAL_SCROLL_STRATEGY,
    useFactory: scrollStrategyFactory,
    deps: [forwardRef(() => TableFixedSizeVirtualScrollDirective)],
  }]
})
export class TableFixedSizeVirtualScrollDirective implements OnChanges, OnInit {
  @Input() rowHeight: number = 40;

  @Input() offset: number = 40;

  @Input() fmTableData!: Observable<Array<any>>;

  @ContentChild(CdkVirtualScrollViewport, { static: true }) viewport: CdkVirtualScrollViewport;

  @ContentChild(CdkTable, { static: true }) table: CdkTable<any>;

  public scrollStrategy = new TableVirtualScrollStrategy(this.rowHeight, this.offset);

  public ngOnInit() {
    this.table.dataSource = combineLatest([this.fmTableData, this.scrollStrategy.renderedRangeStream]).pipe(
      map((value) => {
        return value[0].slice(value[1].start, value[1].end);
      })
    );

    // TODO: cleanup the subscription
    this.fmTableData.subscribe((data) => {
      this.scrollStrategy.setDataLength(data.length);
    });
  }

  public ngOnChanges() {
    this.scrollStrategy.setScrollHeight(this.rowHeight, this.offset);
  }
}
