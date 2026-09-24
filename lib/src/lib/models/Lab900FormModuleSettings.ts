import { MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { InjectionToken, Type } from '@angular/core';
import { NgxMaskConfig } from 'ngx-mask';
import { FormComponent } from '../components/AbstractFormComponent';

export const LAB900_FORM_MODULE_SETTINGS = new InjectionToken<Lab900FormModuleSettings>('lab900FormModuleSetting');

export const LAB900_FORM_FIELD_TYPES = new InjectionToken<Record<string, Type<FormComponent>>>('lab900FormFieldTypes');

/** The Material form field defaults of every field, plus the library's own additions. */
export interface Lab900FormFieldOptions extends MatFormFieldDefaultOptions {
  /** Shows a character counter on the fields that have a `maxLength`. */
  showLengthIndicator?: boolean;
}

/** The defaults of every `EditType.Amount` field. A field can still override them in its options. */
export interface Lab900AmountFieldOptions {
  /**
   * The fewest decimals an amount is padded to.
   * @default 0
   */
  minDecimals?: number;
  /**
   * The most decimals an amount is formatted to.
   * @default 2
   */
  maxDecimals?: number;
  /** The locale the amount is formatted for. Defaults to the locale of the application. */
  locale?: string;
}

/**
 * The application-wide defaults of the library. Pass them to `provideLab900Forms()`.
 *
 * `provideLab900Forms()` is required: besides these settings it registers `LAB900_FORM_FIELD_TYPES`,
 * the map from `EditType` to component. Without it every field renders as `UnknownFieldComponent`.
 */
export interface Lab900FormModuleSettings {
  /** Material form field defaults: `appearance`, `floatLabel`, `hideRequiredMarker`, ... */
  formField?: Lab900FormFieldOptions;
  /** `ngx-mask` defaults, used by the input masks and the amount field. */
  fieldMask?: Partial<NgxMaskConfig>;
  /** Defaults of the amount field. */
  amountField?: Lab900AmountFieldOptions;
  /**
   * Sets `autocomplete="off"` on the inputs, so the browser does not offer its own suggestions.
   * @default false
   */
  disableBrowserAutocomplete?: boolean;
  /**
   * Warns in the console about the schema mistakes the library otherwise fails silently on: an
   * unknown `editType`, a select whose object value never matches its options because `compareWith`
   * is missing, a `readonlyDisplay` that returns something other than a primitive, and a schema that
   * is rebuilt on every change detection run.
   *
   * Development only, and each message is logged once. Set it to `false` when the warnings are noise.
   * @default true
   */
  devWarnings?: boolean;
}

export const defaultFormModuleSettings: Lab900FormModuleSettings = {
  formField: {
    appearance: 'outline',
    floatLabel: 'auto',
    hideRequiredMarker: false,
    showLengthIndicator: true,
  },
  fieldMask: {
    thousandSeparator: '.',
    decimalMarker: ',',
  },
  amountField: {
    minDecimals: 0,
    maxDecimals: 2,
  },
};
