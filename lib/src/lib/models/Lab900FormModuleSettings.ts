import { MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { InjectionToken, Type } from '@angular/core';
import { NgxMaskConfig } from 'ngx-mask/lib/ngx-mask.config';
import { FormComponent } from '../components/AbstractFormComponent';

export const LAB900_FORM_MODULE_SETTINGS = new InjectionToken<Lab900FormModuleSettings>('lab900FormModuleSetting');

export const LAB900_FORM_FIELD_TYPES = new InjectionToken<Record<string, Type<FormComponent>>>('lab900FormFieldTypes');

export interface Lab900FormFieldOptions extends MatFormFieldDefaultOptions {
  showLengthIndicator?: boolean;
}

export interface Lab900AmountFieldOptions {
  minDecimals?: number;
  maxDecimals?: number;
  locale?: string;
}

export interface Lab900FormModuleSettings {
  formField?: Lab900FormFieldOptions;
  fieldMask?: Partial<NgxMaskConfig>;
  amountField?: Lab900AmountFieldOptions;
  disableBrowserAutocomplete?: boolean;
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
