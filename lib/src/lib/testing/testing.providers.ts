import { Lab900FormBuilderService } from '../services/form-builder.service';
import { LAB900_FORM_MODULE_SETTINGS } from '../models/Lab900FormModuleSettings';
import { provideTranslateService } from '@ngx-translate/core';
import { provideNgxMask } from 'ngx-mask';
import { provideLab900Forms } from '../forms.providers';

/**
 * Enough to instantiate a single field component directly. It cannot render a `<lab900-form>`: there is no
 * `FormFieldMappingService` and no `LAB900_FORM_FIELD_TYPES`. Use {@link RENDER_TESTING_PROVIDERS} for that.
 */
export const TESTING_PROVIDERS = [
  Lab900FormBuilderService,
  { provide: LAB900_FORM_MODULE_SETTINGS, useValue: {} },
  provideTranslateService(),
];

/**
 * The real provider set, for specs that render a whole `<lab900-form>`.
 *
 * It deliberately uses `provideLab900Forms()` instead of a hand written `LAB900_FORM_FIELD_TYPES` map: the
 * crash this exists to guard against came from a field type missing from a registry, and a spec that
 * supplies its own registry cannot catch that. It costs about a second of module loading, so a spec that
 * only needs one field component should keep using {@link TESTING_PROVIDERS}.
 */
export const RENDER_TESTING_PROVIDERS = [provideLab900Forms(), provideTranslateService(), provideNgxMask()];
