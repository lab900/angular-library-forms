import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Lab900FormConfig } from '../../models/Lab900FormConfig';
import { Lab900FormBuilderService } from '../../services/form-builder.service';
import { areValuesEqual } from '../../models/IFieldConditions';
import { ValueLabel } from '../../models/form-field-base';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { EditType } from '../../models/editType';

@Component({
  selector: 'lab900-form[schema]',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class Lab900Form<T> implements OnChanges {
  @Input()
  public schema!: Lab900FormConfig;

  /**
   * You can add a object of other form groups which could be used in the conditional fields
   */
  @Input()
  public externalForms?: Record<string, FormGroup>;

  @Input()
  public data?: T;

  @Input()
  public language?: string;

  @Input()
  public availableLanguages?: ValueLabel[];

  public form: FormGroup;

  public get valid(): boolean {
    return this.form.valid;
  }

  public get value(): T {
    return this.form.value as T;
  }

  public get readonly(): boolean {
    return this.schema?.readonly;
  }

  public constructor(private fb: Lab900FormBuilderService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.schema && this.schema?.fields) {
      this.form = this.fb.createFormGroup<T>(
        this.schema.fields,
        null,
        this.data
      );
    }
    if (!changes?.data?.isFirstChange() && this.data) {
      setTimeout(() =>
        this.patchValues(this.data, changes?.data?.previousValue)
      );
    }
  }

  public patchValues(data: T, prevData?: T): void {
    Object.keys(data).forEach((key: string) => {
      const control = this.form.controls[key];
      if (control && !areValuesEqual(data[key], prevData?.[key])) {
        if (control instanceof FormArray) {
          const fieldSchema = this.schema.fields.find(
            (field: Lab900FormField) => field.attribute === key
          );
          if (data[key] && fieldSchema?.editType === EditType.Repeater) {
            this.fb.createFormArray(data, fieldSchema, control);
          }
        } else {
          control.patchValue(data[key]);
        }
      }
    });
  }

  public setValues(data: T): void {
    Object.keys(data).forEach((key: string) => {
      const control = this.form.controls[key];
      if (control) {
        if (control instanceof FormArray) {
          const fieldSchema = this.schema.fields.find(
            (field: Lab900FormField) => field.attribute === key
          );
          if (data[key] && fieldSchema?.editType === EditType.Repeater) {
            this.fb.createFormArray(data, fieldSchema, control);
          }
        }
        control.setValue(data[key]);
      }
    });
  }
}
