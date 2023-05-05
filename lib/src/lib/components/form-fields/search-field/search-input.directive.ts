import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { FormFieldSearchOptions } from './field-search.model';

@Directive({
  selector: 'input[lab900SearchInput][options]',
  exportAs: 'lab900SearchInput',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputDirective),
      multi: true,
    },
  ],
})
export class SearchInputDirective<T>
  implements ControlValueAccessor, OnChanges
{
  private readonly searchQuery$ = new ReplaySubject<string>();
  public readonly searching$ = new BehaviorSubject<boolean>(false);
  public readonly noResult$ = new BehaviorSubject<boolean>(false);

  public value?: T | null;

  @Input()
  public options!: FormFieldSearchOptions<T>;

  public constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.options && this.options) {
      this.searchQuery$
        .asObservable()
        .pipe(
          distinctUntilChanged(),
          tap(() => this.noResult$.next(false)),
          filter(
            (searchQuery) =>
              !this.value || searchQuery !== this.getCurrentValueLabel()
          ),
          tap(() => this.searching$.next(true)),
          debounceTime(this.options?.debounceTime ?? 500),
          switchMap((searchQuery) =>
            searchQuery?.length ? this.options.searchFn(searchQuery) : of(null)
          )
        )
        .subscribe((result) => {
          this.searching$.next(false);
          if (result) {
            this.updateValue(result);
            this.onChange(result);
          } else {
            this.updateValue(null);
            this.onChange(null);
          }
          this.onTouched();
        });
    }
  }

  public writeValue(value: T | null): void {
    if (value) {
      this.updateValue(value);
    }
  }

  public onChange = (_: T | null): void => {};
  public onTouched = (): void => {};

  public registerOnChange(fn: (_: T | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  @HostListener('input', ['$event.target.value'])
  public onInput(v: string): void {
    if (!this.options.disableSearchOnInput) {
      this.searchQuery$.next(v);
    }
  }

  @HostListener('paste', ['$event.clipboardData'])
  public onPaste(event: DataTransfer): void {
    if (this.canUpdate()) {
      const value: string = event.getData('text/plain');
      if (value?.length) {
        this.searchQuery$.next(value);
      }
    }
  }

  @HostListener('blur', ['$event.target.value'])
  public onBlur(value: string): void {
    if (this.canUpdate()) {
      if (value?.length) {
        this.searchQuery$.next(value);
      }
    }
    this.onTouched();
  }

  private canUpdate(): boolean {
    return (
      !this.elementRef.nativeElement?.readOnly &&
      !this.elementRef.nativeElement?.disabled
    );
  }

  private updateValue(value: T): void {
    if (value) {
      this.value = value;
      this.elementRef.nativeElement.value = this.getCurrentValueLabel();
      this.noResult$.next(false);
    } else {
      this.value = null;
      this.noResult$.next(true);
    }
  }

  private getCurrentValueLabel(): string {
    return this.value && this.options.labelFormatter(this.value);
  }
}
