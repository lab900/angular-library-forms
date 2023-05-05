import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
  ValueLabel,
} from '../../../models/form-field-base';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { SelectFieldComponent } from './select-field.component';
import { ThemePalette } from '@angular/material/core';

export interface FormFieldSelectOptionsFilter {
  page?: number;
  searchQuery?: string;
  getAll?: boolean;
}

export type FormFieldSelectOptionsFn<T> = (
  filter?: FormFieldSelectOptionsFilter,
  fieldControl?: AbstractControl,
  schema?: FormFieldSelect<T>
) => ValueLabel<T>[] | Observable<ValueLabel<T>[]>;

export interface FormFieldSelectOptions<T> extends FormFieldBaseOptions {
  multiple?: boolean;
  selectOptions?:
    | FormFieldSelectOptionsFn<T>
    | ValueLabel<T>[]
    | Observable<ValueLabel<T>[]>;
  compareWith?: (o1: T, o2: T) => boolean;
  /**
   *
   * @deprecated Labels are set in the selectOptions ValueLabels
   */
  displayOptionFn?: (option: ValueLabel<T>) => string;
  customTriggerFn?: (value: T) => string;
  autoselectOnlyOption?: boolean;
  /**
   * The function to display the current value of the select if this item is not present in the select options.
   * @param option Expects the current value of the field, not a ValueLabel!
   */
  displaySelectedOptionFn?: (option: T) => string;
  search?: {
    enabled: boolean;
    placeholder?: string;
    notFoundLabel?: string;
    addNewLabel?: string;
    /**
     * Function to handle the new item creation, can be anything.
     * Use the select argument to update the select after creation
     */
    addNewFn?: (searchQuery: string, select: SelectFieldComponent<T>) => void;
    addNewBtnColor?: ThemePalette;
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
  /**
   * Shows a clear button on the right of the field
   */
  clearFieldButton?: {
    enabled: boolean | ((data?: T) => boolean);
    click?: (fieldControl: AbstractControl, clickEvent: Event) => void;
  };
  selectAll?: {
    enabled: boolean;
    label?: string;
    disabled?: boolean;
  };
}

export interface FormFieldSelect<T, R extends string | number = string>
  extends FormFieldBase<R, FormFieldSelectOptions<T>> {
  editType: EditType.Select;
}
