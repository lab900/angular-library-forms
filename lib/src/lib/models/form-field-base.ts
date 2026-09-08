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

export type ReactiveOption<T> = T | ((data?: any) => T | Signal<T>) | Signal<T>;
export type ReactiveBooleanOption = ReactiveOption<boolean>;
export type ReactiveStringOption = ReactiveOption<string>;
export type ReactiveNumberOption = ReactiveOption<number>;

/**
 * What a readonly field is able to render. A readonly value ends up in the translate pipe, and that pipe
 * only guards on `!query || !query.length`: an array reaches `TranslateService.instant()`, which calls
 * `key.split('.')` on every item and throws on the first item that is not a string. So `readonlyDisplay`
 * has to reduce the field to a single primitive; use {@link toReadonlyDisplayString} to render anything else.
 */
export type ReadonlyDisplayValue = string | number | boolean | null | undefined;

/**
 * Renders a readonly field. The result is treated as a translation key first, and rendered as is when no
 * translation matches.
 *
 * **`data` is not the same value for every edit type.** Most fields pass the raw value of the whole form
 * group, so read the attribute you need off it. `EditType.Select` passes the value of the field itself,
 * because it resolves the option labels on its own. Check which one you are writing for; the parameter is
 * `any`, so a mismatch fails at runtime and not at compile time.
 */
export type ReadonlyDisplayFn = (data?: any) => ReadonlyDisplayValue;

export interface FormFieldBase<
  T extends string | number = string,
  O extends FormFieldBaseOptions = FormFieldBaseOptions,
> {
  attribute?: T;
  title?: ReactiveStringOption;
  validators?: ValidatorFn[];
  errorMessages?: Record<string, string>;
  conditions?: IFieldConditions[];
  options?: O;
  nestedFields?: Lab900FormField[];
}

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
  readonlyDisplay?: ReadonlyDisplayFn;
  onChangeFn?: (value: any, currentControl?: AbstractControl) => void;
  infoTooltip?:
    | { text: string; icon?: string; class?: string }
    | ((data?: any) => { text: string; icon?: string; class?: string } | null);
  elementId?: string; // Overrides the attribute name for the element ID if set; otherwise, defaults to the attribute name.
}
