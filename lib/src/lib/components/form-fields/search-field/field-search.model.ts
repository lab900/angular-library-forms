import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';
import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';

export interface FormFieldSearchOptions<T> extends FormFieldBaseOptions {
  /** Turns the found object into the text shown in the input. Required. */
  labelFormatter: (option: T) => string;
  /**
   * Looks the typed text up and returns the one match, or `null` when there is none. Required.
   * Emitting `null` clears the control and reveals the "add new" button.
   */
  searchFn: (searchQuery: string) => Observable<T | null>;
  /**
   * How long typing pauses before the search runs.
   * @default 500
   */
  debounceTime?: number;
  /** The hint shown when the search came back empty. A translation key. */
  notFoundLabel?: string;
  /**
   * The label of the button offered when nothing was found. A translation key.
   * @default 'form.field.add_new'
   */
  addNewLabel?: string;
  /**
   * Function to handle the new item creation, can be anything.
   * The field will be updated with the observable response
   */
  addNewFn?: (searchQuery: string) => Observable<T | null>;
  /**
   * Stops the search from running while the user types, so only a paste or a blur triggers it. Use it
   * when the lookup is expensive and the input is a full code rather than a prefix.
   * @default false
   */
  disableSearchOnInput?: boolean;
  /**
   * The Material palette of the "add new" button.
   * @default 'primary'
   */
  addNewBtnColor?: ThemePalette;
  /**
   * Hides the clear button on the right of the field.
   * @default false
   */
  hideClearButton?: boolean;
  /** Inline CSS on the input element itself. */
  style?: string;
}

/**
 * An input that looks its own value up: the user types, `searchFn` resolves one object, and the
 * control holds that object rather than the text.
 *
 * It is a lookup for something identified exactly - an order number, a VAT number, a barcode - not a
 * list to browse. Use `EditType.Select` with `search.enabled` when the user should see the options.
 *
 * @example
 * {
 *   attribute: 'company',
 *   title: 'label.vat-number',
 *   editType: EditType.Search,
 *   options: {
 *     searchFn: query => this.companyService.findByVat(query),
 *     labelFormatter: company => `${company.name} (${company.vatNumber})`,
 *     debounceTime: 300,
 *     addNewLabel: 'label.create-company',
 *     addNewFn: query => this.companyService.create(query),
 *   },
 * }
 */
export interface FormFieldSearch<T, R extends string | number = string>
  extends FormFieldBase<R, FormFieldSearchOptions<T>> {
  editType: EditType.Search;
}
