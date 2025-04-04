import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IFieldConditions } from './IFieldConditions';
import { Lab900FormField } from './lab900-form-field.type';
import { Signal } from '@angular/core';

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

export type ReactiveOption<T> = T | ((data?: any) => T | Signal<T>) | Signal<T>;
export type ReactiveBooleanOption = ReactiveOption<boolean>;
export type ReactiveStringOption = ReactiveOption<string>;
export type ReactiveNumberOption = ReactiveOption<number>;

export interface FormFieldBaseOptions {
  hide?: ReactiveBooleanOption;
  required?: ReactiveBooleanOption;
  readonly?: ReactiveBooleanOption;
  hint?: {
    value?: string;
    hideHintOnValidValue?: boolean;
    valueTranslateData?: object;
  };
  placeholder?: ReactiveStringOption;
  colspan?: number; // 12 column grid = value from 1 to 12.
  mobileCols?: boolean; // keep colspan on mobile (only for form rows)
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  defaultValue?: any;
  pattern?: RegExp;
  readonlyContainerClass?: ReactiveStringOption;
  readonlyLabel?: string;
  readonlyDisplay?: (data?: any) => any;
  onChangeFn?: (value: any, currentControl?: AbstractControl) => void;
  infoTooltip?:
    | { text: string; icon?: string; class?: string }
    | ((data?: any) => { text: string; icon?: string; class?: string } | null);
  elementId?: string; // Overrides the attribute name for the element ID if set; otherwise, defaults to the attribute name.
}
