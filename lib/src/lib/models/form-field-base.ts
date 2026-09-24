import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IFieldConditions } from './IFieldConditions';
import { Lab900FormField } from './lab900-form-field.type';
import { Signal } from '@angular/core';

/**
 * One option of a select, autocomplete, radio group or button toggle. The control stores `value`;
 * `label` is what the user reads, and it goes through the translate pipe.
 */
export interface ValueLabel<T = any> {
  value: T;
  /** A translation key, or plain text when no key matches. */
  label: string;
  /** Shows the option but blocks it from being picked. */
  disabled?: boolean;
}

/**
 * An icon. Use `name` for a Material Icons ligature, or `svgName` for an svg you registered in
 * `MatIconRegistry` yourself.
 */
export interface Icon {
  name?: string;
  svgName?: string;
}

/**
 * An option that may change while the form is in use. It accepts three forms:
 *
 * - a plain value: `readonly: true`
 * - a function of the raw value of the form group: `hide: data => data.type !== 'company'`
 * - a signal: `required: this.vatRequired`
 *
 * The function may also return a signal. Prefer a signal for state that changes over time: the field
 * reads it inside a `computed`, so the view follows without a new schema object.
 *
 * Inside a field component, resolve these with the `computeReactive*Option()` helpers, never by
 * reading the raw option.
 */
export type ReactiveOption<T> = T | ((data?: any) => T | Signal<T>) | Signal<T>;
/** A {@link ReactiveOption} that resolves to a boolean. */
export type ReactiveBooleanOption = ReactiveOption<boolean>;
/** A {@link ReactiveOption} that resolves to a string. */
export type ReactiveStringOption = ReactiveOption<string>;
/** A {@link ReactiveOption} that resolves to a number. */
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
 * The result reaches the template through `[innerHTML]`, so basic formatting tags such as `<br>` work.
 * Angular sanitizes the result and strips scripts and event handlers.
 *
 * **`data` is not the same value for every edit type.** Most fields pass the raw value of the whole form
 * group, so read the attribute you need off it. `EditType.Select` passes the value of the field itself,
 * because it resolves the option labels on its own. Check which one you are writing for; the parameter is
 * `any`, so a mismatch fails at runtime and not at compile time.
 */
export type ReadonlyDisplayFn = (data?: any) => ReadonlyDisplayValue;

/**
 * What every field of the `Lab900FormField` union has in common. A concrete field adds its
 * `editType` and narrows `options` to its own options interface.
 */
export interface FormFieldBase<
  T extends string | number = string,
  O extends FormFieldBaseOptions = FormFieldBaseOptions,
> {
  /**
   * The name of the control in the form group. A dotted value (`address.street`) creates the
   * intermediate groups on its own. A layout field without an attribute flattens its
   * `nestedFields` into the parent group.
   */
  attribute?: T;
  /** The label of the field. A translation key. */
  title?: ReactiveStringOption;
  /** Validators on top of the ones the builder derives from `options`. */
  validators?: ValidatorFn[];
  /**
   * Overrides the message of an error key, for example `{ email: 'label.email-error' }`. A key that
   * is not here falls back to the built-in `forms.error.*` message.
   */
  errorMessages?: Record<string, string>;
  /** Rules that watch another control and flip this field's state, options or validators. */
  conditions?: IFieldConditions[];
  /** The configuration of the field. Which interface applies follows from `editType`. */
  options?: O;
  /** The children of a `Row`, a `Column` or a `Repeater`. */
  nestedFields?: Lab900FormField[];
}

/**
 * The options every field accepts. Each edit type extends this with its own.
 *
 * Do not disable a control yourself to lock or hide a field: set `readonly` or `hide` and the
 * library disables it for you.
 */
export interface FormFieldBaseOptions {
  /** Hides the field and disables its control, so it no longer validates. */
  hide?: ReactiveBooleanOption;
  /** Adds or removes `Validators.required`. */
  required?: ReactiveBooleanOption;
  /** Renders the value instead of an editable field, and disables the control. */
  readonly?: ReactiveBooleanOption;
  /** Help text under the field. */
  hint?: {
    /** A translation key. */
    value?: string;
    /** Hides the hint once the control is valid. */
    hideHintOnValidValue?: boolean;
    /** Interpolation parameters for the translation. */
    valueTranslateData?: object;
  };
  placeholder?: ReactiveStringOption;
  /** The width of the field on the 12 column grid: 1 to 12. */
  colspan?: number;
  /** Keeps the colspan on mobile instead of stacking. Only for form rows. */
  mobileCols?: boolean;
  /** Also adds `Validators.minLength`. */
  minLength?: number;
  /** Also adds `Validators.maxLength`. */
  maxLength?: number;
  /** Also adds `Validators.min`. */
  min?: number;
  /** Also adds `Validators.max`. */
  max?: number;
  /** The value the control starts with when the data holds nothing for this attribute. */
  defaultValue?: any;
  /** Also adds `Validators.pattern`. */
  pattern?: RegExp;
  /** Extra class on the container of the readonly field. */
  readonlyContainerClass?: ReactiveStringOption;
  /** Replaces `title` when the field is readonly. A translation key. */
  readonlyLabel?: string;
  /** Renders the value when the field is readonly. */
  readonlyDisplay?: ReadonlyDisplayFn;
  /** Runs whenever the value of this control changes. */
  onChangeFn?: (value: any, currentControl?: AbstractControl) => void;
  /** An icon next to the label with a tooltip. Return `null` from the function to hide it. */
  infoTooltip?:
    | { text: string; icon?: string; class?: string }
    | ((data?: any) => { text: string; icon?: string; class?: string } | null);
  /** Overrides the element id, which defaults to the attribute name. */
  elementId?: string;
}
