import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
  Icon,
  ReactiveNumberOption,
  ReactiveStringOption,
} from '../../../models/form-field-base';

export interface AmountOptions extends FormFieldBaseOptions {
  maxDecimals?: number;
  minDecimals?: number;
}

export interface AmountFieldInputOptions extends FormFieldBaseOptions {
  autofocus?: boolean;
  maxDecimals?: ReactiveNumberOption;
  minDecimals?: ReactiveNumberOption;
  suffix?: ReactiveStringOption;
  prefix?: ReactiveStringOption;
  align?: 'left' | 'right';
  style?: string;
}

export interface FormFieldAmount<T extends string | number = string> extends FormFieldBase<T, AmountFieldInputOptions> {
  editType: EditType.Amount;
  icon?: Icon & { position?: 'left' | 'right' };
}
