import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
  Icon,
} from '../../../models/form-field-base';

export interface AmountFieldInputOptions extends FormFieldBaseOptions {
  autofocus?: boolean;
  suffix?: string | ((data?: any) => string);
  prefix?: string | ((data?: any) => string);
  align?: 'left' | 'right';
  style?: string;
  maxDecimals?: number; // default is 2
  minDecimals?: number; // default is 0
}

export interface FormFieldAmount<T extends string | number = string>
  extends FormFieldBase<T, AmountFieldInputOptions> {
  editType: EditType.Amount;
  icon?: Icon & { position?: 'left' | 'right' };
}
