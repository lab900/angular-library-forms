import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  defaultFormModuleSettings,
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from './models/Lab900FormModuleSettings';
import { Lab900FormBuilderService } from './services/form-builder.service';

export const provideLab900Forms = (
  settings: Lab900FormModuleSettings = defaultFormModuleSettings
): Provider[] => {
  const formSetting: Lab900FormModuleSettings = {
    formField: {
      ...defaultFormModuleSettings.formField,
      ...(settings?.formField ?? {}),
    },
    fieldMask: {
      ...defaultFormModuleSettings.fieldMask,
      ...(settings?.fieldMask ?? {}),
    },
    amountField: {
      ...defaultFormModuleSettings.amountField,
      ...(settings?.amountField ?? {}),
    },
    disableBrowserAutocomplete: settings?.disableBrowserAutocomplete ?? false,
  };
  return [
    Lab900FormBuilderService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: formSetting.formField,
    },
    {
      provide: LAB900_FORM_MODULE_SETTINGS,
      useValue: formSetting,
    },
  ];
};

export const provideEnvironmentLab900Forms = (
  settings: Lab900FormModuleSettings = defaultFormModuleSettings
): EnvironmentProviders => {
  return makeEnvironmentProviders(provideLab900Forms(settings));
};
