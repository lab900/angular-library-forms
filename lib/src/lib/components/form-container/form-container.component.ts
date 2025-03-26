import { Component, computed, effect, inject, input, model, untracked } from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { DEFAULT_REPEATER_MIN_ROWS } from '../form-fields/repeater-field/repeater-field.component';
import { Lab900FormConfig } from '../../models/Lab900FormConfig';
import { Lab900FormBuilderService } from '../../services/form-builder.service';
import { ValueLabel } from '../../models/form-field-base';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { EditType } from '../../models/editType';
import { LAB900_FORM_MODULE_SETTINGS } from '../../models/Lab900FormModuleSettings';
import { FormFieldDirective } from '../../directives/form-field.directive';
import { uniqueId } from 'lodash';

@Component({
  selector: 'lab900-form',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  imports: [FormFieldDirective, ReactiveFormsModule],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class Lab900Form<T> {
  private readonly fb = inject(Lab900FormBuilderService);
  public readonly setting = inject(LAB900_FORM_MODULE_SETTINGS);

  public readonly data = model<T | undefined>(undefined);
  public readonly schema = input.required<Lab900FormConfig>();
  protected readonly fields = computed(() => this.schema().fields);

  /**
   * You can add a object of other form groups which could be used in the conditional fields
   */
  public readonly externalForms = input<Record<string, UntypedFormGroup> | undefined>(undefined);

  /**
   * Don't trigger the valueChanges event when the data is set
   * Default: true (because historical reasons, as this was always the case in the past)
   */
  public readonly emitEventOnDataChange = input<boolean>(true);

  public readonly language = input<string | undefined>(undefined);
  public readonly availableLanguages = input<ValueLabel[]>([]);
  protected readonly _form = computed(() => {
    return this.fb.createFormGroup<T>(
      this.fields(),
      undefined,
      untracked(this.data) // don't create a new form when data changes
    );
  });
  public readonly controls = computed(() => this._form().controls);
  public readonly formIsReadOnly = computed(() => this.schema()?.readonly);
  public readonly formId = computed(() => this.schema()?.formId ?? uniqueId());

  public get form(): UntypedFormGroup {
    return this._form();
  }

  public get valid(): boolean {
    return this._form().valid;
  }

  public get value(): T {
    return this._form().value as T;
  }

  public constructor() {
    effect(() => {
      const form = untracked(this._form);
      const data = this.data();
      if (data && form) {
        this.patchValues(data, untracked(this.emitEventOnDataChange));
      }
    });
  }

  public patchValues(data: T, emitEvent = true): void {
    const dataKeys = Object.keys(data as object) as (keyof T)[];
    dataKeys.forEach(key => {
      const control = untracked(this.controls)?.[key as string];
      if (control) {
        if (control instanceof UntypedFormArray) {
          const fieldSchema = untracked(this.fields).find((field: Lab900FormField) => field.attribute === key);
          if (fieldSchema?.editType === EditType.Repeater && fieldSchema?.nestedFields) {
            const nestedArrayData = data[key] as unknown[] | undefined;
            const nbOfControlRows = control.controls?.length ?? 0;
            const nbOfDataRows = nestedArrayData?.length ?? 0;
            if (nbOfControlRows < nbOfDataRows) {
              for (let i = nbOfControlRows; i < nbOfDataRows; i++) {
                control.push(this.fb.createFormGroup(fieldSchema?.nestedFields, undefined, nestedArrayData?.[i]));
              }
            } else if (nbOfControlRows > nbOfDataRows) {
              for (let i = nbOfControlRows; i > nbOfDataRows; i--) {
                control.removeAt(i - 1);
              }
              // re-add empty controls if there are now less than minRows
              const minRows = fieldSchema?.options?.minRows ?? DEFAULT_REPEATER_MIN_ROWS;
              if (control.controls.length < minRows) {
                for (let i = control.controls.length; i < minRows; i++) {
                  control.push(this.fb.createFormGroup(fieldSchema?.nestedFields));
                }
              }
            }
          }
          control.patchValue(data[key] as any, { emitEvent });
        } else {
          control.patchValue(data[key], { emitEvent });
        }
      }
    });
  }

  public setValues(data: T, emitEvent = true): void {
    const dataKeys = Object.keys(data as object) as (keyof T)[];

    dataKeys.forEach(key => {
      const control = untracked(this.controls)?.[key as string];
      if (control) {
        if (control instanceof UntypedFormArray) {
          const fieldSchema = untracked(this.fields).find((field: Lab900FormField) => field.attribute === key);
          if (fieldSchema?.editType === EditType.Repeater) {
            this.fb.createFormArray(data, fieldSchema, control);
          }
        }
        control.setValue(data[key], { emitEvent });
      }
    });
  }
}
