import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
  Icon,
} from '../../../models/form-field-base';

export interface AmountOptions extends FormFieldBaseOptions {
  maxDecimals?: number;
  minDecimals?: number;
}

export interface AmountFieldInputOptions
  extends AmountOptions,
    FormFieldBaseOptions {
  autofocus?: boolean;
  suffix?: string | ((data?: any) => string);
  prefix?: string | ((data?: any) => string);
  align?: 'left' | 'right';
  style?: string;
}

export interface FormFieldAmount<T extends string | number = string>
  extends FormFieldBase<T, AmountFieldInputOptions> {
  editType: EditType.Amount;
  icon?: Icon & { position?: 'left' | 'right' };
}
