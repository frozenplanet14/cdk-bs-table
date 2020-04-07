import { VirtualScrollStrategy, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ListRange } from '@angular/cdk/collections';

export class TableVirtualScrollStrategy implements VirtualScrollStrategy {
  private readonly indexChange = new Subject<number>();

  private viewport: CdkVirtualScrollViewport;
  public renderedRangeStream = new BehaviorSubject<ListRange>({ start: 0, end: 0 });
  public scrolledIndexChange: Observable<number>;

  private readonly bufferSize = 5;

  private dataLength = 0;

  constructor(private rowHeight: number, private headerOffset: number) {
    this.scrolledIndexChange = this.indexChange.asObservable().pipe(distinctUntilChanged());
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
      this.viewport.setTotalContentSize(this.dataLength * this.rowHeight);
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

  public setScrollHeight(rowHeight: number, headerOffset: number) {
    this.rowHeight = rowHeight;
    this.headerOffset = headerOffset;
    this.updateContent(this.viewport);
  }

  private updateContent(viewport: CdkVirtualScrollViewport) {
    if (viewport) {
      const range = Math.ceil(viewport.getViewportSize() / this.rowHeight) + this.bufferSize * 2;
      const newIndex = Math.max(0, Math.round((viewport.measureScrollOffset() - this.headerOffset) / this.rowHeight) - this.bufferSize);

      const start = Math.max(0, newIndex - this.bufferSize);
      const end = Math.min(this.dataLength, newIndex + range);

      viewport.setRenderedContentOffset(this.rowHeight * start);
      viewport.setRenderedRange({ start, end });

      this.indexChange.next(newIndex);
    }
  }
}
