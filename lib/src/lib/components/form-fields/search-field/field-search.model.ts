import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
} from '../../../models/form-field-base';
import { Observable } from 'rxjs';

export interface FormFieldSearchOptions<T> extends FormFieldBaseOptions {
  labelFormatter: (option: T) => string;
  searchFn: (searchQuery: string) => Observable<T | null>;
  debounceTime?: number;
  notFoundLabel?: string;
  addNewLabel?: string;
  /**
   * Function to handle the new item creation, can be anything.
   * The field will be updated with the observable response
   */
  addNewFn?: (searchQuery: string) => Observable<T | null>;
  disableSearchOnInput?: boolean;
}

export interface FormFieldSearch<T, R extends string | number = string>
  extends FormFieldBase<R, FormFieldSearchOptions<T>> {
  editType: EditType.Search;
}
