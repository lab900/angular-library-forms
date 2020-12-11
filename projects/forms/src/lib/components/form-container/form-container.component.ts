import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Form } from '../../models/Form';
import { Lab900FormBuilderService } from '../../services/form-builder.service';
import { FormField } from '../../models/FormField';
import { areValuesEqual } from '../../models/IFieldConditions';

@Component({
  selector: 'lab900-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent<T> implements OnChanges {
  @Input()
  public schema: Form;

  @Input()
  public data: T;

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
      this.form = this.fb.createFormGroup(this.schema.fields, null, this.data);
    }
    if (!changes?.data?.isFirstChange() && this.data) {
      setTimeout(() => this.patchValues(this.data, changes?.data?.previousValue));
    }
  }

  public patchValues(data: T, prevData?: T): void {
    Object.keys(data).forEach((key: string) => {
      const control = this.form.controls[key];
      if (control && !areValuesEqual(data[key], prevData?.[key])) {
        if (control instanceof FormArray) {
          const fieldSchema = this.schema.fields.find((field: FormField) => field.attribute === key);
          if (data[key] && fieldSchema) {
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
          const fieldSchema = this.schema.fields.find((field: FormField) => field.attribute === key);
          if (data[key] && fieldSchema) {
            this.fb.createFormArray(data, fieldSchema, control);
          }
        }
        control.setValue(data[key]);
      }
    });
  }
}
