import { ChangeDetectionStrategy, Component, computed, effect, OnInit, signal, viewChild } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { isObservable, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, take, tap } from 'rxjs/operators';
import { FormFieldSelect, FormFieldSelectOptionsFilter, FormFieldSelectOptionsFn } from './field-select.model';
import { IFieldConditions } from '../../../models/IFieldConditions';
import { ValueLabel } from '../../../models/form-field-base';
import { MatPseudoCheckbox, MatPseudoCheckboxState } from '@angular/material/core';
import { coerceArray } from '@angular/cdk/coercion';
import { isDifferent } from '@lab900/ui';
import { debounceTimeAfterFirst } from '../../../utils/helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { _, TranslatePipe } from '@ngx-translate/core';
import { SelectInfiniteScrollDirective } from './select-field-infinite-scroll.directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lab900-select-field',
  templateUrl: './select-field.component.html',
  styles: [
    `
      .no-entries-option {
        pointer-events: all !important;
      }

      .no-entries-option ::ng-deep .mdc-list-item__primary-text {
        width: 100%;
        display: block;
        opacity: 1 !important;
      }

      .no-entries-option ::ng-deep .mat-pseudo-checkbox {
        display: none;
      }
      .no-entries-found {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
    `,
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslatePipe,
    SelectInfiniteScrollDirective,
    NgxMatSelectSearchModule,
    FormsModule,
    MatButton,
    MatPseudoCheckbox,
    MatIconButton,
    MatIcon,
  ],
  host: {
    class: 'lab900-form-field',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldComponent<T> extends FormComponent<FormFieldSelect<T>> implements OnInit {
  public readonly selectOptions = signal<ValueLabel<T>[]>([]);
  public readonly selectAllState = signal<MatPseudoCheckboxState>('unchecked');
  public readonly loading = signal<boolean>(false);
  protected readonly loading$ = toObservable(this.loading);
  private readonly fetchedOnFocus = signal<boolean>(false);
  private readonly fieldValue = signal<unknown>(undefined);

  public readonly multiple = computed(() => !!this._options()?.multiple);
  public readonly panelWidth = computed(() => this._options()?.panelWidth ?? 'auto');
  public readonly customerTriggerFn = computed(() => this._options()?.customTriggerFn);
  public readonly compareFn = computed(() => this._options()?.compareWith || ((o1: T, o2: T): boolean => o1 === o2));
  public readonly searchOptions = computed(() => this._options()?.search);
  public readonly infiniteScrollOptions = computed(() => this._options()?.infiniteScroll);
  public readonly selectAllOptions = computed(() => this._options()?.selectAll);
  public readonly clearOptions = computed(() => this._options()?.clearFieldButton);
  public readonly hasValue = computed(() => {
    const value = this.fieldValue();
    return !!value && (Array.isArray(value) ? value.length : true);
  });
  public readonly showClearButton = computed(() => {
    const clearOptions = this.clearOptions();
    if (!this.hasValue()) {
      return false;
    } else if (typeof clearOptions?.enabled === 'function') {
      return clearOptions.enabled(this.groupValue());
    }
    return clearOptions?.enabled;
  });

  public readonly readOnlyDisplay = computed(() => {
    // if no value is set, display a dash
    if (!this.hasValue()) {
      return '-';
    }
    // if a custom display function is set, use that
    const readonlyDisplay = this._options()?.readonlyDisplay;
    if (readonlyDisplay) {
      return this.translateService.instant(readonlyDisplay(this.fieldValue()));
    }
    // otherwise wait until the options are loaded and display the selected options labels
    if (this.loading()) {
      return this.translateService.instant('form.field.loading');
    }
    const selectedOptions = this.getOptionsMatchingTheValue();
    if (selectedOptions) {
      return selectedOptions.map(o => (o.label ? this.translateService.instant(o.label) : 'missing label')).join(', ');
    } else {
      return '-';
    }
  });

  private readonly _select = viewChild(MatSelect);
  public get select(): MatSelect | undefined {
    return this._select();
  }

  /*
   * When conditional options are used for this select, keep the previously selected item
   * and select it again when the new valuelist is loaded
   */
  private readonly conditionalItemToSelectWhenExists = signal<T | undefined>(undefined);

  private readonly conditionalOptionsChange = new Subject<{
    condition: IFieldConditions;
    value: string;
  }>();
  private readonly optionsFn$ = new ReplaySubject<FormFieldSelectOptionsFn<T>>();
  public readonly optionsFilter = signal<FormFieldSelectOptionsFilter | null>(null);
  public readonly optionsFilter$ = toObservable(this.optionsFilter);
  public readonly searchQuery = computed(() => this.optionsFilter()?.searchQuery ?? '');

  protected readonly isStaticOptionsList = computed(() => typeof this._options()?.selectOptions !== 'function');
  private readonly isLastPage = signal<boolean>(false);
  protected readonly scrollingIsComplete = computed(
    () => this.isStaticOptionsList() || !this.infiniteScrollOptions()?.enabled || this.isLastPage()
  );

  protected readonly showNotFound = computed(() => {
    return !this.loading() && (!!this.searchQuery()?.length || !!this._options()?.noOptionsIndicator);
  });

  protected readonly notFoundLabel = computed(() => {
    if (!this.searchQuery()?.length) {
      return this._options()?.noOptionsLabel ?? _('form.field.no_options_found');
    }
    return this.searchOptions()?.notFoundLabel ?? _('form.field.no_options_found');
  });

  protected readonly addNewLabel = computed(() => {
    return this.searchOptions()?.addNewLabel ?? _('form.field.add_new');
  });

  public constructor() {
    super();
    effect(() => {
      const select = this._select();
      if (select && select?.multiple) {
        const allSelected = this.selectOptions()?.length === coerceArray(this.fieldValue())?.length;
        this.selectAllState.set(allSelected ? 'checked' : 'unchecked');

        select.selectionChange.subscribe(selection => {
          const allSelected = this.selectOptions()?.length === selection?.value?.length;
          this.selectAllState.set(allSelected ? 'checked' : 'unchecked');
        });
      }
    });
  }

  public ngOnInit(): void {
    // load all options from the start
    if (this.isStaticOptionsList() || !this._options()?.fetchOptionsOnFocus) {
      this.selectOptionsListener();
    }

    if (this.fieldControl) {
      // add the current value to the options without waiting for the options to be fetched
      const value = this.fieldControl.getRawValue();
      if (value) {
        this.fieldValue.set(value);
        this.selectOptions.set(this.addValueToOptions());
      }
      this.addSubscription(this.fieldControl.valueChanges, value => {
        this.fieldValue.set(value);
        if (value && !this.valueInOptions()) {
          this.selectOptions.set(this.addValueToOptions());
        }
      });
    }

    this.addSubscription(
      this.optionsFn$.asObservable().pipe(
        filter(optionsFn => !!optionsFn),
        switchMap(optionsFn =>
          this.optionsFilter$.pipe(
            filter(filter => !!filter),
            distinctUntilChanged((x, y) => !isDifferent(x, y)),
            tap(() => this.loading.set(true)),
            debounceTimeAfterFirst(this.searchOptions()?.debounceTime ?? 300),
            switchMap(optionsFilter => this.handleGetOptions(optionsFn, optionsFilter)),
            tap(options => {
              if (this.infiniteScrollOptions()?.enabled && !options.length) {
                this.isLastPage.set(true);
              } else {
                this.isLastPage.set(false);
              }
            })
          )
        )
      ),
      this.afterGetOptionsSuccess.bind(this)
    );
  }

  public onFocus(): void {
    if (this._options()?.fetchOptionsOnFocus && !this.fetchedOnFocus()) {
      this.selectOptionsListener();
    }
  }

  /**
   * Reset the search and make sure that the current value is in the select options when the select closes
   */
  public onOpenedChange(open: boolean): void {
    if (!open && this.fieldControl?.getRawValue() && this.searchQuery()?.length) {
      if (!this.valueInOptions()) {
        this.selectOptions.set(this.addValueToOptions());
      }
      this.onSearch('');
    }
  }

  /**
   * Check if the existing form control value is in the available select options
   */
  public valueInOptions(options = this.selectOptions()): boolean {
    return !!this.getOptionsMatchingTheValue(options)?.length;
  }

  public getOptionsMatchingTheValue(options = this.selectOptions()): ValueLabel<T>[] {
    const value = this.fieldControl?.getRawValue() ? coerceArray(this.fieldControl!.getRawValue()) : [];
    const compare = this.compareFn();
    return options?.filter(o => value.some(v => compare(o.value, v)));
  }

  public onConditionalChange(dependOn: string, value: string, firstRun: boolean): void {
    setTimeout(() => {
      const condition = this._schema()?.conditions?.find(c =>
        (Array.isArray(c.dependOn) ? c.dependOn : [c.dependOn]).includes(dependOn)
      );
      if (condition?.conditionalOptions) {
        if (!firstRun || !value) {
          if (this.fieldControl?.getRawValue()) {
            this.conditionalItemToSelectWhenExists.set(this.fieldControl?.getRawValue());
          }
          this.fieldControl?.reset();
        }
        // When conditional has no value, this field is disabled. No need to fetch the options yet.
        if (!condition.enableIfHasValue || this.fieldControl?.enabled) {
          this.conditionalOptionsChange.next({ condition, value });
        }
      }
    });
  }

  public onScroll(): void {
    if (!this.loading() && !this.scrollingIsComplete()) {
      this.optionsFilter.update(currentFilter => ({
        ...currentFilter,
        getAll: false,
        page: (currentFilter?.page ?? 0) + 1,
      }));
    }
  }

  public onSearch(searchQuery: string): void {
    if (this.searchOptions()?.enabled) {
      this.optionsFilter.set({ searchQuery, page: 0 });
    }
  }

  private updateOptionsFn(optionsFn: FormFieldSelectOptionsFn<T>): void {
    this.optionsFilter.set({ page: 0, searchQuery: '' });
    this.optionsFn$.next(optionsFn);
  }

  // if no readonlyDisplay is defined, show the single selected value
  // does not work with multi select > use readonlyDisplay in that case

  public handleClearFieldButtonClick($event: Event): void {
    $event.stopPropagation();
    if (this.fieldControl) {
      const clearClickFn = this.clearOptions()?.click;
      if (clearClickFn) {
        clearClickFn(this.fieldControl, $event);
      } else {
        this.fieldControl.setValue(null);
        this.fieldControl.markAsTouched();
        this.fieldControl.markAsDirty();
      }
    }
  }

  public onSearchEnter($event: Event): void {
    if (this.loading()) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  public handleToggleAllSelection(): void {
    if (this.infiniteScrollOptions()?.enabled) {
      this.optionsFilter.update(current => ({
        ...current,
        getAll: true,
      }));
      this.loading$
        .pipe(
          filter(loading => !loading),
          take(1)
        )
        .subscribe(() => {
          this.toggleAllSelection();
        });
    } else {
      this.toggleAllSelection();
    }
  }

  public handleAddNew(searchQuery: string): void {
    const addNewFn = this.searchOptions()?.addNewFn;
    if (addNewFn) {
      addNewFn(searchQuery, this);
    }
  }

  private toggleAllSelection(): void {
    if (this.selectAllState() === 'unchecked') {
      this.select?.options.forEach((item: MatOption) => {
        if (!item.disabled) item.select();
      });
    } else {
      this.select?.options.forEach((item: MatOption) => {
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
        if (options?.length === 1 && !this.controlValue() && this._options()?.autoselectOnlyOption) {
          this._fieldControl()?.setValue(options[0].value);
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
    const compare = this.compareFn();

    this.selectOptions.update((newOptionsSet = []) => {
      if ((this.optionsFilter()?.page ?? 0) > 0) {
        newOptionsSet = newOptionsSet.concat(options);
      } else {
        newOptionsSet = options;
        if (!this.searchQuery()?.length && this.valueInOptions() && !this.valueInOptions(newOptionsSet)) {
          newOptionsSet = newOptionsSet.concat(this.getOptionsMatchingTheValue());
        }
        newOptionsSet = this.removeDuplicateOptions(newOptionsSet);
      }

      /**
       * with infinite scroll & searching the form control value(s) might not always be present in the options
       * this will cause the select to appear empty while it has values.
       * to salve this we add the form values to the options
       *
       * This gives issues if the value is not an object
       * Not to be mistaken with the first addValueToOptions in this method, this is still needed in some cases
       */
      if (this.fieldControl?.getRawValue() && !this.searchQuery()?.length) {
        return this.addValueToOptions(newOptionsSet);
      }
      return [...newOptionsSet];
    });

    if (this.conditionalItemToSelectWhenExists()) {
      const value = coerceArray(this.conditionalItemToSelectWhenExists());
      const inOptions = this.selectOptions().some(o => value.some(v => v && compare(o.value, v)));
      if (inOptions) {
        this.fieldControl?.setValue(this.conditionalItemToSelectWhenExists());
      }
    }

    if (this.options?.fetchOptionsOnFocus && !this.fetchedOnFocus()) {
      this.fetchedOnFocus.set(true);
      // fix for the select not opening when the options are fetched on focus
      setTimeout(() => {
        if ((this.select as any)?._focused && !(this.select as any)?._panelOpen) {
          this.select?.open();
        }
      });
    }
    this.loading.set(false);
  }

  /**
   * Add the current form control value to the select options
   */
  private addValueToOptions(options = this.selectOptions()): ValueLabel<T>[] {
    let label: string;
    if (typeof this.options?.selectOptions === 'function' && !this.options?.displaySelectedOptionFn) {
      label = "ERROR: Can't display";
      console.error(
        `Please define a displaySelectedOptionFn to display your currently selected option for the field with attribute ${this.fieldAttribute} since it is not included in the current options`
      );
    }
    const compare = this.compareFn();
    const missingOptions = coerceArray(this.fieldControl?.getRawValue())
      .filter(value => !options?.some(o => compare(o.value, value)))
      .map((v: T) => ({
        value: v,
        label: label ?? this.options?.displaySelectedOptionFn?.(v),
      }));

    if (missingOptions?.length) {
      return missingOptions.concat(options ?? []);
    }
    return options ?? [];
  }

  private removeDuplicateOptions(items: ValueLabel<T>[]): ValueLabel<T>[] {
    if (items?.length) {
      const compare = this.compareFn();
      return items.filter((item, idx, arr) => arr.findIndex(({ value }) => compare(item.value, value)) === idx);
    }
    return [...new Set(items)];
  }

  private selectOptionsListener(): void {
    if (this.options?.selectOptions && this.fieldControl) {
      const { selectOptions } = this.options;
      this.updateOptionsFn(
        typeof selectOptions === 'function'
          ? f => selectOptions(f, this.fieldControl, this.schema)
          : () => selectOptions
      );
    }

    this.addSubscription(this.conditionalOptionsChange, ({ condition, value }) => {
      const conditionalOptions = condition?.conditionalOptions;
      const fieldControl = this.fieldControl;
      if (conditionalOptions && fieldControl) {
        this.updateOptionsFn(f => conditionalOptions(value, fieldControl, f, this.schema));
      }
    });
  }
}
