import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import {
  BehaviorSubject,
  concat,
  isObservable,
  Observable,
  of,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import {
  FormFieldSelect,
  FormFieldSelectOptionsFilter,
  FormFieldSelectOptionsFn,
} from './field-select.model';
import { IFieldConditions } from '../../../models/IFieldConditions';
import { ValueLabel } from '../../../models/form-field-base';
import { MatSelect } from '@angular/material/select';
import { MatOption, MatPseudoCheckboxState } from '@angular/material/core';
import { coerceArray } from '@angular/cdk/coercion';
import { isDifferent } from '@lab900/ui';

@Component({
  selector: 'lab900-select-field',
  templateUrl: './select-field.component.html',
  styles: [
    `
      .no-entries-found {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .no-entries-found button {
        margin-left: 10px;
      }
    `,
  ],
})
export class SelectFieldComponent<T>
  extends FormComponent<FormFieldSelect<T>>
  implements OnInit, OnDestroy
{
  public selectOptions?: ValueLabel<T>[];
  private _select: MatSelect;

  private selectAllSub?: Subscription;
  public readonly selectAllState$ = new BehaviorSubject<MatPseudoCheckboxState>(
    'unchecked'
  );

  @ViewChild('select')
  public set select(select: MatSelect) {
    if (select) {
      this._select = select;
      this.selectAllSub?.unsubscribe();
      if (select?.multiple) {
        this.selectAllSub = select.selectionChange.subscribe((selection) => {
          const allSelected =
            this.selectOptions?.length === selection?.value?.length;
          this.selectAllState$.next(allSelected ? 'checked' : 'unchecked');
        });
      }
    }
  }

  public get select(): MatSelect {
    return this._select;
  }

  @HostBinding('class')
  public classList = 'lab900-form-field';
  /*
   * When conditional options are used for this select, keep the previously selected item
   * and select it again when the new valuelist is loaded
   */
  private conditionalItemToSelectWhenExists: T;

  private conditionalOptionsChange = new Subject<{
    condition: IFieldConditions;
    value: string;
  }>();
  private readonly optionsFn$ = new ReplaySubject<
    FormFieldSelectOptionsFn<T>
  >();
  public readonly optionsFilter$ =
    new BehaviorSubject<FormFieldSelectOptionsFilter | null>(null);

  public readonly searchQuery$: Observable<string> = this.optionsFilter$
    .asObservable()
    .pipe(
      map((filter) => filter?.searchQuery ?? ''),
      shareReplay(1)
    );

  public loading$ = new BehaviorSubject<boolean>(true);

  public get selectedOption(): ValueLabel<T> {
    if (this.selectOptions && this.fieldControl.value) {
      return this.selectOptions.find((opt) =>
        this.options?.compareWith
          ? this.options?.compareWith(opt.value, this.fieldControl.value)
          : this.defaultCompare(opt.value, this.fieldControl.value)
      );
    }
    return null;
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.selectAllSub?.unsubscribe();
  }

  public showClearButton = (value: T | T[]): boolean => {
    if (!value || (Array.isArray(value) && !value.length)) {
      return false;
    } else if (typeof this.options?.clearFieldButton?.enabled === 'function') {
      return this.options.clearFieldButton.enabled(this.group.value);
    }
    return this.options?.clearFieldButton?.enabled;
  };

  public defaultCompare = (o1: T, o2: T): boolean => o1 === o2;

  public ngOnInit(): void {
    if (this.options?.selectOptions) {
      const { selectOptions } = this.options;
      this.updateOptionsFn(
        typeof selectOptions === 'function'
          ? (f) => selectOptions(f, this.fieldControl, this.schema)
          : () => selectOptions
      );
    }

    this.addSubscription(
      this.conditionalOptionsChange,
      ({ condition, value }) => {
        this.updateOptionsFn((f) =>
          condition?.conditionalOptions(
            value,
            this.fieldControl,
            f,
            this.schema
          )
        );
      }
    );

    this.addSubscription(this.fieldControl.valueChanges, (value) => {
      if (value && !this.valueInOptions()) {
        this.selectOptions = this.addValueToOptions();
      }
    });

    this.addSubscription(
      this.optionsFn$.asObservable().pipe(
        filter((optionsFn) => !!optionsFn),
        switchMap((optionsFn) =>
          concat(
            this.optionsFilter$.pipe(
              take(1),
              tap(() => this.loading$.next(true))
            ), // only debounce after the initial value
            this.optionsFilter$.pipe(
              tap(() => this.loading$.next(true)),
              debounceTime(this.options?.search?.debounceTime ?? 300)
            )
          ).pipe(
            distinctUntilChanged((x: any, y: any) => {
              if (isDifferent(x, y)) {
                return false; // This means the values are different, so it will emit
              } else {
                this.loading$.next(false);
                return true; // This means values are equal, it will not emit the current value
              }
            }),
            switchMap((optionsFilter) =>
              this.handleGetOptions(optionsFn, optionsFilter)
            )
          )
        )
      ),
      this.afterGetOptionsSuccess.bind(this)
    );
  }

  /**
   * Reset the search and make sure that the current value is in the select options when the select closes
   */
  public onOpenedChange(open: boolean): void {
    if (
      !open &&
      this.fieldControl?.value &&
      this.optionsFilter$.value?.searchQuery?.length
    ) {
      if (!this.valueInOptions()) {
        this.selectOptions = this.addValueToOptions();
      }
      this.onSearch('');
    }
  }

  /**
   * Check if the existing form control value is in the available select options
   */
  public valueInOptions(options = this.selectOptions): boolean {
    return !!this.getOptionsMatchingTheValue(options)?.length;
  }

  public getOptionsMatchingTheValue(
    options = this.selectOptions
  ): ValueLabel<T>[] {
    const value = coerceArray(this.fieldControl.value);
    const compare = this.options?.compareWith || this.defaultCompare;
    return options?.filter((o) => value.some((v) => compare(o.value, v)));
  }

  public onConditionalChange(
    dependOn: string,
    value: string,
    firstRun: boolean
  ): void {
    setTimeout(() => {
      const condition = this.schema.conditions.find((c) =>
        (Array.isArray(c.dependOn) ? c.dependOn : [c.dependOn]).includes(
          dependOn
        )
      );
      if (condition?.conditionalOptions) {
        if (!firstRun || !value) {
          if (this.fieldControl?.value) {
            this.conditionalItemToSelectWhenExists = this.fieldControl?.value;
          }
          this.fieldControl.reset();
        }
        // When conditional has no value, this field is disabled. No need to fetch the options yet.
        if (!condition.enableIfHasValue || this.fieldControl?.enabled) {
          this.conditionalOptionsChange.next({ condition, value });
        }
      }
    });
  }

  public onScroll(): void {
    if (this.options?.infiniteScroll?.enabled && !this.loading$.value) {
      const currentFilter = this.optionsFilter$.value;
      this.optionsFilter$.next({
        ...currentFilter,
        getAll: false,
        page: currentFilter.page + 1,
      });
    }
  }

  public onSearch(searchQuery: string): void {
    if (this.options?.search?.enabled) {
      this.optionsFilter$.next({ searchQuery, page: 0 });
    }
  }

  private updateOptionsFn(optionsFn: FormFieldSelectOptionsFn<T>): void {
    this.optionsFn$.next(optionsFn);
    this.optionsFilter$.next({ page: 0, searchQuery: '' });
  }

  // if no readonlyDisplay is defined, show the single selected value
  // does not work with multi select > use readonlyDisplay in that case
  public getReadOnlyDisplay(): string {
    if (this.options?.readonlyDisplay) {
      return this.translateService.instant(
        this.options.readonlyDisplay(this.fieldControl.value) || '-'
      );
    }

    if (this.selectedOption) {
      if (this.options?.displayOptionFn) {
        return this.translateService.instant(
          this.options?.displayOptionFn(this.selectedOption)
        );
      } else {
        return this.translateService.instant(this.selectedOption.label);
      }
    } else {
      return '-';
    }
  }

  public handleClearFieldButtonClick($event: Event): void {
    $event.stopPropagation();
    if (this.options?.clearFieldButton?.click) {
      this.options.clearFieldButton.click(this.fieldControl, $event);
    } else {
      this.fieldControl.setValue(null);
      this.fieldControl.markAsTouched();
      this.fieldControl.markAsDirty();
    }
  }

  public onSearchEnter($event: Event): void {
    if (this.loading$.value) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  public handleToggleAllSelection(): void {
    if (this.schema.options.infiniteScroll?.enabled) {
      this.optionsFilter$.next({
        ...this.optionsFilter$.value,
        getAll: true,
      });
      this.loading$
        .asObservable()
        .pipe(
          filter((loading) => !loading),
          take(1)
        )
        .subscribe(() => {
          setTimeout(() => {
            this.toggleAllSelection();
          }, 0);
        });
    } else {
      this.toggleAllSelection();
    }
  }

  public handleAddNew(searchQuery: string): void {
    this.options?.search?.addNewFn(searchQuery, this);
  }

  private toggleAllSelection(): void {
    if (this.selectAllState$.value === 'unchecked') {
      this.select.options.forEach((item: MatOption) => {
        if (!item.disabled) item.select();
      });
    } else {
      this.select.options.forEach((item: MatOption) => {
        if (!item.disabled) item.deselect();
      });
    }
  }

  /**
   * Wrapper method to get the select options
   * @param optionsFn
   * @param optionsFilter
   * @private
   */
  private handleGetOptions(
    optionsFn: FormFieldSelectOptionsFn<T>,
    optionsFilter: FormFieldSelectOptionsFilter
  ): Observable<ValueLabel<T>[]> {
    const values = optionsFn(optionsFilter);
    const values$ = isObservable(values) ? values : of(values);

    return values$.pipe(
      catchError(() => of([])),
      tap((options: ValueLabel<T>[]) => {
        if (
          options?.length === 1 &&
          !this.fieldControl.value &&
          this.schema.options?.autoselectOnlyOption
        ) {
          this.fieldControl.setValue(options[0].value);
        }
      })
    );
  }

  /**
   * After options are fetched logic
   * @param options
   * @private
   */
  private afterGetOptionsSuccess(options: ValueLabel<T>[]): void {
    const compare = this.options?.compareWith || this.defaultCompare;

    let newOptionsSet = this.selectOptions ?? [];
    if (this.optionsFilter$.value?.page > 0) {
      newOptionsSet = newOptionsSet.concat(options);
    } else {
      newOptionsSet = options;
      if (
        !this.optionsFilter$.value?.searchQuery?.length &&
        this.valueInOptions() &&
        !this.valueInOptions(newOptionsSet)
      ) {
        newOptionsSet = newOptionsSet.concat(this.getOptionsMatchingTheValue());
      }
    }

    /**
     * with infinite scroll & searching the form control value(s) might not always be present in the options
     * this will cause the select to appear empty while it has values.
     * to salve this we add the form values to the options
     *
     * This gives issues if the value is not an object
     * Not to be mistaken with the first addValueToOptions in this method, this is still needed in some cases
     */
    if (
      this.fieldControl?.value &&
      !this.optionsFilter$.value?.searchQuery?.length
    ) {
      newOptionsSet = this.addValueToOptions(newOptionsSet);
    }
    this.selectOptions = this.removeDuplicateOptions(newOptionsSet);
    if (this.conditionalItemToSelectWhenExists) {
      const value = coerceArray(this.conditionalItemToSelectWhenExists);
      const inOptions = this.selectOptions.some((o) =>
        value.some((v) => compare(o.value, v))
      );
      if (inOptions) {
        this.fieldControl.setValue(this.conditionalItemToSelectWhenExists);
      }
    }
    this.loading$.next(false);
  }

  /**
   * Add the current form control value to the select options
   */
  private addValueToOptions(options = this.selectOptions): ValueLabel<T>[] {
    let label: string;
    // TODO: Validate options, this is a required field if search or infinite scroll is used
    if (!this.options?.displaySelectedOptionFn) {
      label = "ERROR: Can't display";
      console.error(
        `Please define a displaySelectedOptionFn to display your currently selected option for the field with attribute ${this.fieldAttribute} since it is not included in the current options`
      );
    }
    const compare = this.options?.compareWith || this.defaultCompare;
    const missingOptions = coerceArray(this.fieldControl.value)
      .filter((value) => !options?.some((o) => compare(o.value, value)))
      .map((v: T) => ({
        value: v,
        label: label ?? this.options.displaySelectedOptionFn(v),
      }));

    if (missingOptions?.length) {
      return missingOptions.concat(options ?? []);
    }
    return options ?? [];
  }

  private removeDuplicateOptions(items: ValueLabel<T>[]): ValueLabel<T>[] {
    if (items?.length) {
      const compare = this.options?.compareWith || this.defaultCompare;
      return items.filter(
        (item, idx, arr) =>
          arr.findIndex(({ value }) => compare(item.value, value)) === idx
      );
    }
    return [...new Set(items)];
  }
}
