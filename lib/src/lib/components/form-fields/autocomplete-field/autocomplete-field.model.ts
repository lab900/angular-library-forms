import { FormFieldBase, FormFieldBaseOptions, ValueLabel } from '../../../models/form-field-base';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { EditType } from '../../../models/editType';

export interface FormFieldAutocompleteOptions<T> extends FormFieldBaseOptions {
  /**
   * Renders the label of an option.
   *
   * @deprecated Labels are set in the autocompleteOptions
   */
  displayOptionFn?: (option: ValueLabel<T>) => string;
  /** Turns the picked value into the text shown in the input. Required. */
  displayInputFn: (option: T) => string;
  /** Shows an option but blocks it from being picked. */
  disabledOptionFn?: (option: T) => boolean;
  /** Loads the options for what the user has typed so far. May return an array or an `Observable`. */
  autocompleteOptions?: (
    searchTerm: string,
    currentControl: AbstractControl
  ) => ValueLabel<T>[] | Observable<ValueLabel<T>[]>;
  /** How long typing pauses before the options are loaded again. */
  debounceTime?: number;
  /**
   * Adds a validator that rejects text the user typed but never picked from the list, so the control
   * cannot hold a value that is not one of the options. It reports `requireMatch`.
   * @default false
   */
  requireMatch?: boolean;
}

/**
 * @deprecated Use `EditType.Select` with `options.search.enabled`. The select does the same thing and
 * also handles multiple values, paging and "select all".
 */
export interface FormFieldAutocomplete<T, R extends string | number = string>
  extends FormFieldBase<R, FormFieldAutocompleteOptions<T>> {
  editType: EditType.Autocomplete;
}
