import { AfterViewInit, Directive, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';

/** The height of the select items in `em` units. */
const SELECT_ITEM_HEIGHT_EM = 3;

/**
 * Copied from https://github.com/HaidarZ/ng-mat-select-infinite-scroll because they are not updating to the latest Angular versions
 */
@Directive({
  selector: 'mat-select[lab900InfiniteScroll]',
  standalone: true,
})
export class SelectInfiniteScrollDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() public threshold = '15%';
  @Input() public debounceTime = 150;
  @Input() public complete!: boolean;
  @Output() public infiniteScroll = new EventEmitter<void>();

  private panel!: Element;
  private thrPx = 0;
  private thrPc = 0;
  private singleOptionHeight = SELECT_ITEM_HEIGHT_EM;

  private destroyed$ = new Subject<boolean>();

  public constructor(
    private matSelect: MatSelect,
    private ngZone: NgZone,
  ) {}

  public ngOnInit(): void {
    this.evaluateThreshold();
  }

  public ngAfterViewInit(): void {
    this.matSelect.openedChange.pipe(takeUntil(this.destroyed$)).subscribe((opened) => {
      if (opened) {
        this.panel = this.matSelect.panel.nativeElement;
        this.singleOptionHeight = this.getSelectItemHeightPx();
        this.registerScrollListener();
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private evaluateThreshold(): void {
    if (this.threshold.lastIndexOf('%') > -1) {
      this.thrPx = 0;
      this.thrPc = parseFloat(this.threshold) / 100;
    } else {
      this.thrPx = parseFloat(this.threshold);
      this.thrPc = 0;
    }
  }

  private registerScrollListener(): void {
    fromEvent(this.panel, 'scroll')
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(this.debounceTime),
        tap((event) => {
          this.handleScrollEvent(event);
        }),
      )
      .subscribe();
  }

  private handleScrollEvent(event: any): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.complete) {
        return;
      }
      const countOfRenderedOptions = this.matSelect.options.length;
      const infiniteScrollDistance = this.singleOptionHeight * countOfRenderedOptions;
      const threshold = this.thrPc !== 0 ? infiniteScrollDistance * this.thrPc : this.thrPx;

      const scrolledDistance = this.panel.clientHeight + event.target.scrollTop;

      if (scrolledDistance + threshold >= infiniteScrollDistance) {
        this.ngZone.run(() => this.infiniteScroll.emit());
      }
    });
  }

  private getSelectItemHeightPx(): number {
    return parseFloat(getComputedStyle(this.panel).fontSize) * SELECT_ITEM_HEIGHT_EM;
  }
}
