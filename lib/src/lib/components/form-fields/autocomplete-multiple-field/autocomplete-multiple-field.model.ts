import { FormFieldBase } from '../../../models/form-field-base';
import { EditType } from '../../../models/editType';
import { FormFieldAutocompleteOptions } from '../autocomplete-field/autocomplete-field.model';

/**
 * The same options as `EditType.Autocomplete`, over an array value.
 *
 * @deprecated Use `EditType.Select` with `options.search.enabled` and `options.multiple`.
 */
export interface FormFieldAutocompleteMulti<T, R extends string | number>
  extends FormFieldBase<R, FormFieldAutocompleteOptions<T>> {
  editType: EditType.AutocompleteMultiple;
}
