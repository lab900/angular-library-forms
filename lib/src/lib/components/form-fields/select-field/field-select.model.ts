import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
  ValueLabel,
} from '../../../models/form-field-base';
import { Observable } from 'rxjs';

export interface FormFieldSelectOptionsFilter {
  page?: number;
  searchQuery?: string;
}

export type FormFieldSelectOptionsFn<T> = (
  filter?: FormFieldSelectOptionsFilter
) => T[] | Observable<T[]>;

export interface FormFieldSelectOptions<T> extends FormFieldBaseOptions {
  multiple?: boolean;
  selectOptions?: FormFieldSelectOptionsFn<T> | T[] | Observable<T[]>;
  compareWith?: (o1: T, o2: T) => boolean;
  displayOptionFn: (option: T) => string;
  disabledOptionFn?: (option: T) => boolean;
  customTriggerFn?: (value: T) => string;
  search?: {
    enabled: boolean;
    placeholder?: string;
    notFoundLabel?: string;
    /**
     * Clear the search when the select closes
     * @default false
     */
    clearOnClose?: boolean;
    /**
     * The threshold time before firing the search event
     */
    debounceTime?: number;
  };
  infiniteScroll?: {
    enabled: boolean;
    /**
     * The threshold distance from the bottom of the options list to call the infiniteScroll output event when scrolled.
     * The threshold value can be either in percent, or in pixels.
     * For example, use the value of 10% for the infiniteScroll output event to get called when the user has needs 10% to reach the bottom.
     */
    threshold?: string;
    /**
     * The threshold time before firing the infiniteScroll event
     */
    debounceTime?: number;
  };
}

export interface FormFieldSelect<T, R extends string | number = string>
  extends FormFieldBase<R, FormFieldSelectOptions<T>> {
  editType: EditType.Select;
}
