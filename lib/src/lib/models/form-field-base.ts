import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IFieldConditions } from './IFieldConditions';
import { Lab900FormField } from './lab900-form-field.type';

export interface ValueLabel<T = any> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface Icon {
  name?: string;
  svgName?: string;
}

export interface FormFieldBase<
  T extends string | number = string,
  O extends FormFieldBaseOptions = FormFieldBaseOptions,
> {
  attribute?: T;
  title?: string;
  validators?: ValidatorFn[];
  errorMessages?: Record<string, string>;
  conditions?: IFieldConditions[];
  options?: O;
  nestedFields?: Lab900FormField[];
}

export interface FormFieldBaseOptions {
  hide?: boolean | ((data?: any) => boolean);
  hint?: {
    value?: string;
    hideHintOnValidValue?: boolean;
    valueTranslateData?: object;
  };
  placeholder?: string | ((data?: any) => string);
  colspan?: number; // 12 column grid = value from 1 to 12.
  mobileCols?: boolean; // keep colspan on mobile (only for form rows)
  required?: boolean | ((data?: any) => boolean);
  readonly?: boolean | ((data?: any) => boolean);
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  defaultValue?: any;
  pattern?: RegExp;
  readonlyContainerClass?: string | ((data?: any) => string);
  readonlyLabel?: string;
  readonlyDisplay?: (data?: any) => any;
  visibleFn?: (item: any) => boolean;
  onChangeFn?: (value: any, currentControl?: AbstractControl) => void;
  infoTooltip?:
    | { text: string; icon?: string; class?: string }
    | ((data?: any) => { text: string; icon?: string; class?: string } | null);
  elementId?: string; // Overrides the attribute name for the element ID if set; otherwise, defaults to the attribute name.
}
