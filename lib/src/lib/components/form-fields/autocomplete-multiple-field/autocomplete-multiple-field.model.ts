import { FormFieldBase } from '../../../models/form-field-base';
import { EditType } from '../../../models/editType';
import { FormFieldAutocompleteOptions } from '../autocomplete-field/autocomplete-field.model';

export interface FormFieldAutocompleteMulti<T, R extends string | number>
  extends FormFieldBase<R, FormFieldAutocompleteOptions<T>> {
  editType: EditType.AutocompleteMultiple;
}
