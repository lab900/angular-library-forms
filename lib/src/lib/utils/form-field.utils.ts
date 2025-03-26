import { UntypedFormGroup, Validators } from '@angular/forms';
import { FormFieldBaseOptions } from '../models/form-field-base';
import { Lab900FormField } from '../models/lab900-form-field.type';

export class FormFieldUtils {
  public static isRequired(isReadOnly: boolean, field: Lab900FormField<any>, data: any): boolean {
    const { options, validators = [] } = field;
    if (isReadOnly) {
      return false;
    }
    if (validators?.length && validators.includes(Validators.required)) {
      return true;
    } else if (typeof options?.required === 'function') {
      return options.required(data) ?? false;
    } else {
      return options?.required ?? false;
    }
  }

  public static infoTooltip(
    fieldOptions: FormFieldBaseOptions,
    group: UntypedFormGroup
  ): { text: string; icon?: string; class?: string } | null {
    if (typeof fieldOptions?.infoTooltip === 'function') {
      return fieldOptions.infoTooltip(group.value) ?? null;
    } else {
      return fieldOptions?.infoTooltip ?? null;
    }
  }
}
