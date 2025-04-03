import { UntypedFormGroup } from '@angular/forms';
import { FormFieldBaseOptions } from '../models/form-field-base';

export class FormFieldUtils {
  public static infoTooltip(
    fieldOptions: FormFieldBaseOptions,
    group: UntypedFormGroup
  ): { text: string; icon?: string; class?: string } | null {
    if (typeof fieldOptions?.infoTooltip === 'function') {
      return fieldOptions.infoTooltip(group.getRawValue()) ?? null;
    } else {
      return fieldOptions?.infoTooltip ?? null;
    }
  }
}
