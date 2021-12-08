import {
  FormFieldBase,
  FormFieldBaseOptions,
  ValueLabel,
} from '../../../models/form-field-base';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { EditType } from '../../../models/editType';

export interface FormFieldAutocompleteOptions<T> extends FormFieldBaseOptions {
  displayOptionFn: (option: T) => string;
  displayInputFn?: (option: T) => string;
  disabledOptionFn?: (option: T) => boolean;
  autocompleteOptions?: (
    searchTerm: string,
    currentControl: AbstractControl
  ) => T[] | Observable<T[]>;
  debounceTime?: number;
  requireMatch?: boolean;
}

export interface FormFieldAutocomplete<T, R extends string | number = string>
  extends FormFieldBase<R, FormFieldAutocompleteOptions<T>> {
  editType: EditType.Autocomplete;
}
