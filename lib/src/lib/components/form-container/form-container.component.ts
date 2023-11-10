import { Component, Inject, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormGroup,
} from '@angular/forms';
import { Lab900FormConfig } from '../../models/Lab900FormConfig';
import { Lab900FormBuilderService } from '../../services/form-builder.service';
import { ValueLabel } from '../../models/form-field-base';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { EditType } from '../../models/editType';
import {
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from '../../models/Lab900FormModuleSettings';
import { isDifferent } from '@lab900/ui';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormFieldDirective } from '../../directives/form-field.directive';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lab900-form[schema]',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormFieldDirective, NgForOf, AsyncPipe],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class Lab900Form<T> {
  private readonly _schema$ = new BehaviorSubject<Lab900FormConfig | undefined>(
    undefined
  );

  public readonly schema$ = this._schema$.asObservable().pipe(
    filter((schema) => !!schema),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public readonly formFields$ = this.schema$.pipe(
    map((schema) => schema?.fields ?? [])
  );

  @Input({ required: true })
  public set schema(schema: Lab900FormConfig) {
    this._schema$.next(schema);
  }

  /**
   * You can add a object of other form groups which could be used in the conditional fields
   */
  @Input()
  public externalForms?: Record<string, UntypedFormGroup>;

  private readonly _data$ = new BehaviorSubject<T | undefined>(undefined);

  @Input()
  public set data(data: T | undefined) {
    this._data$.next(data);
  }

  @Input()
  public language?: string;

  @Input()
  public availableLanguages?: ValueLabel[];

  public form?: UntypedFormGroup;

  public get valid(): boolean {
    return this.form.valid;
  }

  public get value(): T {
    return this.form.value as T;
  }

  public get readonly(): boolean {
    return this._schema$.value?.readonly;
  }

  public constructor(
    private fb: Lab900FormBuilderService,
    @Inject(LAB900_FORM_MODULE_SETTINGS)
    public setting: Lab900FormModuleSettings
  ) {
    combineLatest([this.schema$, this._data$])
      .pipe(takeUntilDestroyed())
      .subscribe(([{ fields, readonly }, data]) => {
        this.form = this.fb.createFormGroup<T>(fields, null, data, readonly);
      });
  }

  public patchValues(data: T, prevData?: T): void {
    Object.keys(data).forEach((key: string) => {
      const control = this.form.controls[key];

      if (control && isDifferent(data[key], prevData?.[key])) {
        if (control instanceof UntypedFormArray) {
          const fieldSchema = this.schema.fields.find(
            (field: Lab900FormField) => field.attribute === key
          );
          if (fieldSchema?.editType === EditType.Repeater) {
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
        if (control instanceof UntypedFormArray) {
          const fieldSchema = this.schema.fields.find(
            (field: Lab900FormField) => field.attribute === key
          );
          if (fieldSchema?.editType === EditType.Repeater) {
            this.fb.createFormArray(data, fieldSchema, control);
          }
        }
        control.setValue(data[key]);
      }
    });
  }
}
