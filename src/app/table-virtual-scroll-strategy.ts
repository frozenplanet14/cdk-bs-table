import { VirtualScrollStrategy, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ListRange } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';

export interface TVSStrategyConfigs {
  rowHeight: number;
  headerOffset: number;
  bufferSize: number;
}

@Injectable()
export class TableVirtualScrollStrategy implements VirtualScrollStrategy {
  private readonly indexChange = new Subject<number>();

  private viewport: CdkVirtualScrollViewport;
  public renderedRangeStream = new BehaviorSubject<ListRange>({ start: 0, end: 0 });
  public scrolledIndexChange: Observable<number>;

  private rowHeight!: number;
  private headerOffset!: number;
  private bufferSize!: number;

  private dataLength = 0;

  constructor() {
    this.scrolledIndexChange = this.indexChange.asObservable().pipe(distinctUntilChanged());
  }

  public setConfig(configs: TVSStrategyConfigs) {
    const { rowHeight, headerOffset, bufferSize } = configs;
    if (
      this.rowHeight === rowHeight
      && this.headerOffset === headerOffset
      && this.bufferSize === bufferSize
    ) {
      return;
    }
    this.rowHeight = rowHeight;
    this.headerOffset = headerOffset;
    this.bufferSize = bufferSize;
    this.onDataLengthChanged();
  }

  public attach(viewport: CdkVirtualScrollViewport): void {
    this.viewport = viewport;
    this.viewport.renderedRangeStream.subscribe(this.renderedRangeStream);
    this.onDataLengthChanged();
  }

  public detach(): void {
    // no-op
  }

  public onContentScrolled(): void {
    this.updateContent(this.viewport);
  }

  public onDataLengthChanged(): void {
    if (this.viewport) {
      this.viewport.setTotalContentSize(this.dataLength * this.rowHeight + this.headerOffset);
      this.updateContent(this.viewport);
    }
  }

  public onContentRendered(): void {
    // no-op
  }

  public onRenderedOffsetChanged(): void {
    // no-op
  }

  public scrollToIndex(index: number, behavior: ScrollBehavior): void {
    // no-op
  }

  public setDataLength(length: number): void {
    this.dataLength = length;
    this.onDataLengthChanged();
  }

  private updateContent(viewport: CdkVirtualScrollViewport) {
    if (viewport) {
      const scrollOffset = viewport.measureScrollOffset();
      const amount = Math.ceil(viewport.getViewportSize() / this.rowHeight);
      const offset = Math.max(scrollOffset - this.headerOffset, 0);
      const buffer = Math.ceil(amount * this.bufferSize);

      const skip = Math.round(offset / this.rowHeight);
      const index = Math.max(0, skip);
      const start = Math.max(0, index - buffer);
      const end = Math.min(this.dataLength, index + amount + buffer);
      const renderedOffset = start * this.rowHeight;
      // console.log(viewport.getViewportSize(), amount, start, end, renderedOffset);
      // const range = Math.ceil(viewport.getViewportSize() / this.rowHeight) + this.bufferSize * 2;
      // const newIndex = Math.max(0, Math.round((viewport.measureScrollOffset() - this.headerOffset) / this.rowHeight) - this.bufferSize);

      // const start = Math.max(0, newIndex - this.bufferSize);
      // const end = Math.min(this.dataLength, newIndex + range);

      viewport.setRenderedContentOffset(renderedOffset);
      viewport.setRenderedRange({ start, end });

      this.indexChange.next(index);
    }
  }
}
