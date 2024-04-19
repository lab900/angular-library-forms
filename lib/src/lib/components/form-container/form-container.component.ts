import {
  Component,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormGroup,
} from '@angular/forms';
import { DEFAULT_REPEATER_MIN_ROWS } from '../form-fields/repeater-field/repeater-field.component';
import { Lab900FormConfig } from '../../models/Lab900FormConfig';
import { Lab900FormBuilderService } from '../../services/form-builder.service';
import { ValueLabel } from '../../models/form-field-base';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { EditType } from '../../models/editType';
import {
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from '../../models/Lab900FormModuleSettings';
import { FormFieldDirective } from '../../directives/form-field.directive';


@Component({
  selector: 'lab900-form[schema]',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  standalone: true,
  imports: [FormFieldDirective, ReactiveFormsModule],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class Lab900Form<T> implements OnChanges {
  @Input()
  public schema!: Lab900FormConfig;

  /**
   * You can add a object of other form groups which could be used in the conditional fields
   */
  @Input()
  public externalForms?: Record<string, UntypedFormGroup>;

  @Input()
  public data?: T;

  @Input()
  public language?: string;

  @Input()
  public availableLanguages?: ValueLabel[];

  public form: UntypedFormGroup;

  public get valid(): boolean {
    return this.form.valid;
  }

  public get value(): T {
    return this.form.value as T;
  }

  public get readonly(): boolean {
    return this.schema?.readonly;
  }

  public constructor(
    private fb: Lab900FormBuilderService,
    @Inject(LAB900_FORM_MODULE_SETTINGS)
    public setting: Lab900FormModuleSettings,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.schema && this.schema?.fields) {
      this.form = this.fb.createFormGroup<T>(
        this.schema.fields,
        null,
        this.data,
      );
    }
    if (!changes?.data?.isFirstChange() && this.data) {
      setTimeout(() => this.patchValues(this.data));
    }
  }

  public patchValues(data: T): void {
    Object.keys(data).forEach((key: string) => {
      const control = this.form.controls[key];
      if (control) {
        if (control instanceof UntypedFormArray) {
          const fieldSchema = this.schema.fields.find(
            (field: Lab900FormField) => field.attribute === key,
          );
          if (fieldSchema?.editType === EditType.Repeater) {
            const nbOfControlRows = control.controls?.length ?? 0;
            const nbOfDataRows = data[key]?.length ?? 0;
            if (nbOfControlRows < nbOfDataRows) {
              for (let i = nbOfControlRows; i < nbOfDataRows; i++) {
                control.push(
                  this.fb.createFormGroup(
                    fieldSchema?.nestedFields,
                    null,
                    data[key][i],
                  ),
                );
              }
            } else if (nbOfControlRows > nbOfDataRows) {
              for (let i = nbOfControlRows; i > nbOfDataRows; i--) {
                control.removeAt(i - 1);
              }
              // re-add empty controls if there are now less than minRows
              const minRows =
                fieldSchema?.options?.minRows ?? DEFAULT_REPEATER_MIN_ROWS;
              if (control.controls.length < minRows) {
                for (let i = control.controls.length; i < minRows; i++) {
                  control.push(
                    this.fb.createFormGroup(fieldSchema?.nestedFields),
                  );
                }
              }
            }
          }
          control.patchValue(data[key]);
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
            (field: Lab900FormField) => field.attribute === key,
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
