import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, take } from 'rxjs/operators';
import {
  FormFieldSelect,
  FormFieldSelectAll,
  FormFieldSelectInfiniteScroll,
  FormFieldSelectSearch,
} from './field-select.model';
import { ValueLabel } from '../../../models/form-field-base';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOption, MatPseudoCheckboxState } from '@angular/material/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormFieldService } from '../../../services/form-field.service';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { SelectInfiniteScrollDirective } from './select-field-infinite-scroll.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SelectFieldService } from './select-field.service';
import { SelectFieldSearchComponent } from './select-field-search/select-field-search.component';
import { SelectFieldSelectAllComponent } from './select-field-select-all/select-field-select-all.component';

@Component({
  selector: 'lab900-select-field',
  templateUrl: './select-field.component.html',
  providers: [FormFieldService, SelectFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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
  imports: [
    FormFieldComponent,
    ReactiveFormsModule,
    NgIf,
    MatSelectModule,
    AsyncPipe,
    TranslateModule,
    SelectInfiniteScrollDirective,
    MatButtonModule,
    NgForOf,
    MatIconModule,
    SelectFieldSearchComponent,
    SelectFieldSelectAllComponent,
  ],
})
export class SelectFieldComponent<T> extends FormComponent<FormFieldSelect<T>> {
  public readonly multiple$ = this.getOption$('multiple', false);
  public readonly compareWith$ = this.getOption$<(o1: T, o2: T) => boolean>(
    'compareWith',
    (o1: T, o2: T): boolean => o1 === o2
  );

  public readonly panelWidth$ = this.getOption$('panelWidth', 'auto');
  public readonly panelClass$ = this.getOption$('panelClass');
  public readonly infiniteScroll$ =
    this.getOption$<FormFieldSelectInfiniteScroll>('infiniteScroll');

  public readonly search$ = this.getOption$<FormFieldSelectSearch<T>>('search');
  public readonly selectAll$ = this.getOption$<FormFieldSelectAll>('selectAll');

  @ViewChild('select')
  public readonly select?: MatSelect;

  public readonly searchQuery$: Observable<string> =
    this.selectFieldService.optionsFilter$.asObservable().pipe(
      map((filter) => filter?.searchQuery ?? ''),
      shareReplay(1)
    );

  public readonly loading$: Observable<boolean>;

  public readonly showClearButton$ = combineLatest([
    this.controlValue$,
    this.formFieldService.options$,
    this.formFieldService.groupValue$,
  ]).pipe(
    map(([value, options, groupValue]) => {
      if (!value) return false;
      if (typeof options?.clearFieldButton?.enabled === 'function') {
        return options.clearFieldButton.enabled(groupValue);
      }
      return options?.clearFieldButton?.enabled;
    })
  );
  public get selectedOption(): ValueLabel<T> {
    /*if (this.selectOptions && this.fieldControl.value) {
      return this.selectOptions.find((opt) =>
        this.options?.compareWith
          ? this.options?.compareWith(opt.value, this.fieldControl.value)
          : this.defaultCompare(opt.value, this.fieldControl.value)
      );
    }*/
    return null;
  }

  public readonly selectOptions$: Observable<ValueLabel<T>[]>;

  public constructor(
    private readonly translateService: TranslateService,
    private readonly selectFieldService: SelectFieldService<any>
  ) {
    super();
    this.loading$ = this.selectFieldService.selectOptionsLoading$;
    this.selectOptions$ = this.selectFieldService.selectOptions$;
  }

  public onOpenedChange(open: boolean): void {
    if (!open) {
      this.selectFieldService.afterSelectClose();
    }
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
          /*if (this.fieldControl?.value) {
            this.conditionalItemToSelectWhenExists = this.fieldControl?.value;
          }
          this.fieldControl.reset();*/
        }
        // When conditional has no value, this field is disabled. No need to fetch the options yet.
        if (!condition.enableIfHasValue || this.fieldControl?.enabled) {
          this.selectFieldService.conditionalOptionsChange$.next({
            condition,
            value,
          });
        }
      }
    });
  }

  public onScroll(): void {
    this.selectFieldService.handleScroll();
  }

  public onSearch(searchQuery: string): void {
    this.selectFieldService.handleSearch(searchQuery);
  }

  // if no readonlyDisplay is defined, show the single selected value
  // does not work with multi select > use readonlyDisplay in that case
  public getReadOnlyDisplay(): string {
    if (this.options?.readonlyDisplay) {
      return this.translateService.instant(
        this.options.readonlyDisplay() || '-'
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

  public handleClear($event: Event): void {
    $event.stopPropagation();
    this.selectFieldService.clearSelect($event);
  }

  public handleToggleAllSelection(state: MatPseudoCheckboxState): void {
    if (this.schema.options.infiniteScroll?.enabled) {
      this.selectFieldService.optionsFilter$.next({
        ...this.selectFieldService.optionsFilter$.value,
        getAll: true,
      });
      this.loading$
        .pipe(
          filter((loading) => !loading),
          take(1)
        )
        .subscribe(() => {
          setTimeout(() => {
            this.toggleAllSelection(state);
          }, 0);
        });
    } else {
      this.toggleAllSelection(state);
    }
  }

  private toggleAllSelection(state: MatPseudoCheckboxState): void {
    if (state === 'unchecked') {
      this.select.options.forEach((item: MatOption) => {
        if (!item.disabled) item.select(false);
      });
    } else {
      this.select.options.forEach((item: MatOption) => {
        if (!item.disabled) item.deselect(false);
      });
    }
    this.select.selectionChange.emit({
      value: this.select.selected,
      source: this.select,
    });
  }
}
