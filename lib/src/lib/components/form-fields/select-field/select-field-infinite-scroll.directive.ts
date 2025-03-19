import { computed, Directive, effect, inject, input, model, NgZone, output, signal } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { debounceTime } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/** The height of the select items in `em` units. */
const SELECT_ITEM_HEIGHT_EM = 3;

/**
 * Copied from https://github.com/HaidarZ/ng-mat-select-infinite-scroll because they are not updating to the latest Angular versions
 */
@Directive({
  selector: 'mat-select[lab900InfiniteScroll]',
})
export class SelectInfiniteScrollDirective {
  private readonly matSelect = inject(MatSelect, { optional: false });
  private readonly ngZone = inject(NgZone);

  public readonly threshold = input<string>('15%');
  public readonly debounceTime = input<number>(150);
  public readonly complete = model<boolean>(false);
  public readonly infiniteScroll = output<void>();

  private readonly panel = signal<Element | undefined>(undefined);
  private readonly thrPx = computed(() => (this.threshold().lastIndexOf('%') > -1 ? 0 : parseFloat(this.threshold())));
  private readonly thrPc = computed(() =>
    this.threshold().lastIndexOf('%') > -1 ? parseFloat(this.threshold()) / 100 : 0
  );
  private readonly singleOptionHeight = computed(() => {
    const panel = this.panel();
    if (panel) {
      return parseFloat(getComputedStyle(panel).fontSize) * SELECT_ITEM_HEIGHT_EM;
    }
    return SELECT_ITEM_HEIGHT_EM;
  });

  public constructor() {
    let sub: Subscription;
    effect(() => {
      const panel = this.panel();
      if (panel) {
        sub?.unsubscribe();
        sub = this.registerScrollListener(panel);
      }
      return () => {
        sub?.unsubscribe();
      };
    });
    this.matSelect.openedChange.pipe(takeUntilDestroyed()).subscribe(opened => {
      setTimeout(() => {
        if (opened && this.matSelect.panel) {
          this.panel.set(this.matSelect.panel.nativeElement);
        }
      });
    });
  }

  private registerScrollListener(panel: Element): Subscription {
    return fromEvent(panel, 'scroll')
      .pipe(debounceTime(this.debounceTime()))
      .subscribe(event => this.handleScrollEvent(panel, event));
  }

  private handleScrollEvent(panel: Element, event: any): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.complete()) {
        return;
      }
      const countOfRenderedOptions = this.matSelect.options?.length ?? 0;
      const infiniteScrollDistance = this.singleOptionHeight() * countOfRenderedOptions;
      const threshold = this.thrPc() !== 0 ? infiniteScrollDistance * this.thrPc() : this.thrPx();

      const scrolledDistance = panel.clientHeight + event.target.scrollTop;

      if (scrolledDistance + threshold >= infiniteScrollDistance) {
        this.ngZone.run(() => this.infiniteScroll.emit());
      }
    });
  }
}
