import { Lab900FormBuilderService } from '../services/form-builder.service';
import { LAB900_FORM_MODULE_SETTINGS } from '../models/Lab900FormModuleSettings';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export const TESTING_PROVIDERS = [
  Lab900FormBuilderService,
  { provide: LAB900_FORM_MODULE_SETTINGS, useValue: {} },
  provideNoopAnimations(),
  importProvidersFrom(TranslateModule.forRoot()),
];
