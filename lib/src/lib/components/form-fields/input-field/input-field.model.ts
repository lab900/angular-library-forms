import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions, Icon } from '../../../models/form-field-base';
import { NgxMaskConfig } from 'ngx-mask';

export interface FieldMask extends Partial<NgxMaskConfig> {
  mask: string;
}

/**
 * @see https://material.angular.io/components/input/overview#supported-input-types
 */
export type InputType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export interface FormFieldInputOptions extends FormFieldBaseOptions {
  type?: InputType;
  autofocus?: boolean;
  suffix?: string | ((data?: any) => string);
  prefix?: string | ((data?: any) => string);
  align?: 'left' | 'right';
  fieldMask?: FieldMask;
  showLengthIndicator?: boolean;
  style?: string;
}

export interface FormFieldInput<T extends string | number = string> extends FormFieldBase<T, FormFieldInputOptions> {
  editType: EditType.Input;
  icon?: Icon & { position?: 'left' | 'right' };
}
