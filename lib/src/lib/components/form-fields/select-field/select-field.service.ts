import { Injectable } from '@angular/core';
import { FormFieldService } from '../../../services/form-field.service';
import {
  BehaviorSubject,
  combineLatest,
  isObservable,
  Observable,
  of,
  pairwise,
  startWith,
  switchMap,
} from 'rxjs';
import { IFieldConditions } from '../../../models/IFieldConditions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError,
  filter,
  map,
  shareReplay,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  FormFieldSelect,
  FormFieldSelectOptions,
  FormFieldSelectOptionsFilter,
  FormFieldSelectOptionsFn,
} from './field-select.model';
import { ValueLabel } from '../../../models/form-field-base';
import { AbstractControl } from '@angular/forms';
import { coerceArray } from '@angular/cdk/coercion';

@Injectable()
export class SelectFieldService<T> {
  private conditionalItemToSelectWhenExists?: T;

  public readonly selectOptionsLoading$ = new BehaviorSubject<boolean>(false);
  public readonly selectOptions$: Observable<ValueLabel<T>[]>;
  public readonly optionsFilter$ =
    new BehaviorSubject<FormFieldSelectOptionsFilter | null>(null);
  public readonly conditionalOptionsChange$ = new BehaviorSubject<
    | {
        condition: IFieldConditions;
        value: string;
      }
    | undefined
  >(undefined);

  public constructor(
    private formFieldService: FormFieldService<FormFieldSelect<T>>
  ) {
    this.selectOptions$ = this.getFetchOptionsFn().pipe(
      switchMap((optionsFn) =>
        this.optionsFilter$.pipe(
          filter((filter) => !!filter),
          tap(() => this.selectOptionsLoading$.next(true)),
          switchMap((optionsFilter) => {
            const values = optionsFn(optionsFilter);
            return isObservable(values) ? values : of(values);
          })
        )
      ),
      catchError(() => of([])),
      startWith([]),
      pairwise(),
      withLatestFrom(
        this.formFieldService.schema$,
        this.formFieldService.fieldControl$
      ),
      map(([[oldOptions, newOptions], schema, control]) =>
        this.postProcessSelectOptions(
          newOptions,
          oldOptions,
          schema.options,
          control
        )
      ),
      tap(() => this.selectOptionsLoading$.next(false)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  public handleSearch(searchQuery: string): void {
    this.optionsFilter$.next({ searchQuery, page: 0 });
  }

  /**
   * Reset the search and make sure that the current value is in the select options when the select closes
   */
  public afterSelectClose(): void {
    if (this.optionsFilter$.value?.searchQuery?.length) {
      this.formFieldService.fieldControl$
        .pipe(
          take(1),
          withLatestFrom(this.selectOptions$, this.formFieldService.options$)
        )
        .subscribe(([control, options, schemaOptions]) => {
          if (control.value) {
            this.addValueToOptions(control.value, options, schemaOptions);
          }
          this.handleSearch('');
        });
    }
  }

  public clearSelect($event: Event): void {
    this.formFieldService.fieldControl$
      .pipe(take(1), withLatestFrom(this.formFieldService.options$))
      .subscribe(([control, options]) => {
        if (options?.clearFieldButton?.click) {
          options.clearFieldButton.click(control, $event);
        } else {
          control.setValue(null);
          control.markAsTouched();
          control.markAsDirty();
        }
      });
  }

  public handleScroll(): void {
    this.selectOptionsLoading$
      .pipe(
        filter((loading) => !loading),
        take(1)
      )
      .subscribe(() => {
        const currentFilter = this.optionsFilter$.value;
        this.optionsFilter$.next({
          ...currentFilter,
          getAll: false,
          page: currentFilter.page + 1,
        });
      });
  }

  /**
   * The function to fetch the options for the select field
   * This can either come from the schema options or from the conditional options
   * @private
   */
  private getFetchOptionsFn(): Observable<FormFieldSelectOptionsFn<T>> {
    return combineLatest([
      this.formFieldService.schema$,
      this.conditionalOptionsChange$,
      this.formFieldService.fieldControl$,
    ]).pipe(
      takeUntilDestroyed(),
      map(([schema, conditionalOptionsChange, fieldControl]) => {
        if (conditionalOptionsChange) {
          return (f) =>
            conditionalOptionsChange?.condition?.conditionalOptions(
              conditionalOptionsChange.value,
              fieldControl,
              f,
              schema
            );
        } else if (schema.options?.selectOptions) {
          const { selectOptions } = schema.options;
          return typeof selectOptions === 'function'
            ? (f) => selectOptions(f, fieldControl, schema)
            : () => selectOptions;
        } else {
          throw Error('No (conditional) options defined for select field');
        }
      }),
      tap(() => this.optionsFilter$.next({ page: 0, searchQuery: '' }))
    );
  }

  private postProcessSelectOptions(
    newOptions: ValueLabel<T>[],
    oldOptions: ValueLabel<T>[],
    schemaOptions: FormFieldSelectOptions<T>,
    control: AbstractControl<T>
  ): ValueLabel<T>[] {
    const compare = schemaOptions?.compareWith;
    /**
     * concat options for infinite scroll
     * duplicates are filtered out (can happen because of the option add)
     */
    if (
      this.optionsFilter$.value?.page > 0 &&
      oldOptions?.length &&
      newOptions?.length
    ) {
      newOptions = oldOptions.concat(
        newOptions.filter((o) =>
          oldOptions.some((so) => !compare(o.value, so.value))
        )
      );
    }

    /**
     * Add the current form control value to the select options if they are missing
     */
    if (control?.value && !this.optionsFilter$.value?.searchQuery?.length) {
      const controlValues = coerceArray(control.value);
      const valuesWithoutOption = controlValues?.filter(
        (v) => !newOptions.some((o) => compare(o.value, v))
      );
      if (valuesWithoutOption?.length) {
        newOptions = this.addValueToOptions(
          valuesWithoutOption,
          newOptions,
          schemaOptions
        );
      }
    }

    /**
     * Not sure if this is the best way to handle this, but it works for now
     */
    if (this.conditionalItemToSelectWhenExists) {
      const value = coerceArray(this.conditionalItemToSelectWhenExists);
      const inOptions = newOptions.some((o) =>
        value.some((v) => compare(o.value, v))
      );
      if (inOptions) {
        control.setValue(this.conditionalItemToSelectWhenExists);
      }
    }

    /**
     * Auto-select the only option
     */
    if (newOptions?.length === 1 && schemaOptions?.autoselectOnlyOption) {
      control.setValue(newOptions[0].value);
    }
    return newOptions;
  }

  /**
   * Add the current form control value to the select options
   */
  public addValueToOptions(
    controlValues: T | T[],
    selectOptions: ValueLabel<T>[],
    options: FormFieldSelectOptions<T>
  ): ValueLabel<T>[] {
    let label;
    if (!options?.displaySelectedOptionFn) {
      label = "ERROR: Can't display";
      console.error(
        `Please define a displaySelectedOptionFn to display your currently selected option`
      );
    }
    return coerceArray(controlValues)
      .map((v: T) => ({
        value: v,
        label: label ?? options.displaySelectedOptionFn(v),
      }))
      .concat(selectOptions);
  }
}
