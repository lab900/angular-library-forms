import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { EditType } from '../models/editType';
import { inject, Injectable } from '@angular/core';
import { FormFieldUtils } from '../utils/form-field.utils';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormFieldAutocomplete } from '../components/form-fields/autocomplete-field/autocomplete-field.model';
import { requireMatchValidator } from '../validators/require-match.validator';
import { FormFieldRepeater } from '../components/form-fields/repeater-field/repeater-field.model';

@Injectable()
export class Lab900FormBuilderService {
  private readonly fb = inject(UntypedFormBuilder);

  public static addValidators(field: Lab900FormField, data: any): ValidatorFn[] {
    const validators: ValidatorFn[] = field?.validators ?? [];
    if (
      !validators.includes(Validators.required) &&
      FormFieldUtils.isRequired(FormFieldUtils.isReadOnly(field.options, data), field, data)
    ) {
      validators.push(Validators.required);
    }
    if (field.options?.minLength) {
      validators.push(Validators.minLength(field.options.minLength));
    }
    if (field.options?.maxLength) {
      validators.push(Validators.maxLength(field.options.maxLength));
    }
    if (field.options?.min) {
      validators.push(Validators.min(field.options.min));
    }
    if (field.options?.max) {
      validators.push(Validators.max(field.options.max));
    }
    if (field.options?.pattern) {
      validators.push(Validators.pattern(field.options.pattern));
    }
    if ((field as FormFieldAutocomplete<any>).options?.requireMatch) {
      validators.push(requireMatchValidator());
    }
    return validators;
  }

  public createFormGroup<T = any>(fields: Lab900FormField[], group?: UntypedFormGroup, data?: T): UntypedFormGroup {
    let formGroup = group ? group : this.fb.group({});
    fields.forEach((field) => {
      if (field.attribute) {
        if (field.editType === EditType.Row || field.editType === EditType.Column) {
          const nestedGroup = this.createFormGroup(field.nestedFields, null, data?.[field.attribute]);
          nestedGroup.setValidators(Lab900FormBuilderService.addValidators(field, data));
          formGroup.addControl(field.attribute, nestedGroup);
        } else {
          const fieldGroup = this.setFieldGroup(field.attribute, formGroup);
          this.createFormField(field, fieldGroup, data);
        }
      } else if (field.editType === EditType.Row || field.editType === EditType.Column) {
        formGroup = this.createFormGroup(field.nestedFields, formGroup, data);
      }
    });
    return formGroup;
  }

  public createFormArray<T = any>(
    formData: T,
    field: FormFieldRepeater,
    formArray: UntypedFormArray = this.fb.array([]),
  ): UntypedFormArray {
    formArray.clear();
    const data: any[] = this.getFieldValue(field.attribute, formData);
    if (Array.isArray(data) && data?.length) {
      data.forEach((nestedData) => {
        formArray.push(this.createFormGroup(field.nestedFields, undefined, nestedData));
      });
    }
    const minRows = field.options?.minRows;
    if (minRows && formArray?.length < minRows) {
      for (let i = 0; i <= minRows - formArray?.length; i++) {
        formArray.push(this.createFormGroup(field.nestedFields, undefined));
      }
    }
    return formArray;
  }

  private createFormField(field: Lab900FormField, fieldGroup: UntypedFormGroup, formData: any): void {
    const attributeMap = field.attribute.split('.');
    const attribute = attributeMap[attributeMap.length - 1];
    let data = this.getFieldValue(field.attribute, formData);

    if (field.editType === EditType.Repeater) {
      const repeaterArray = this.createFormArray(formData, field);
      repeaterArray.setValidators(Lab900FormBuilderService.addValidators(field, data));
      fieldGroup.addControl(attribute, repeaterArray);
    } else if (field.editType === EditType.DateRange) {
      const options = field?.options;
      const startKey = options?.startKey ?? 'start';
      const endKey = options?.endKey ?? 'end';
      fieldGroup.addControl(
        attribute,
        this.fb.group({
          [startKey]: data?.[startKey],
          [endKey]: data?.[endKey],
        }),
      );
    } else {
      if (data == null && field.options?.defaultValue !== null && typeof field.options?.defaultValue !== 'undefined') {
        data =
          typeof field.options.defaultValue === 'function'
            ? field.options.defaultValue(data)
            : field.options.defaultValue;
      }
      const formControl = new UntypedFormControl(data, Lab900FormBuilderService.addValidators(field, data));
      fieldGroup.addControl(attribute, formControl);
    }
  }

  private setFieldGroup(attribute: string, parentGroup: UntypedFormGroup): UntypedFormGroup {
    let fieldGroup = parentGroup;
    if (attribute?.includes('.')) {
      const keys = attribute.split('.');
      keys.forEach((key, i) => {
        attribute = key;
        if (i < keys.length - 1) {
          let newGroup = fieldGroup.get(key) as UntypedFormGroup;
          if (!newGroup) {
            newGroup = this.fb.group({});
            fieldGroup.addControl(key, newGroup);
          }
          fieldGroup = newGroup;
        }
      });
    }
    return fieldGroup;
  }

  private getFieldValue<T = any>(attribute: string, data: T): any {
    if (attribute.includes('.')) {
      const keys = attribute.split('.');
      let value: any = data;
      for (const key of keys) {
        value = value?.[key] ?? null;
      }
      return value;
    }
    return data?.[attribute] ?? null;
  }
}
