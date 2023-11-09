import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  AbstractControl,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { FormFieldService } from '../../services/form-field.service';
import { filter, map } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export type controlError = {
  error: string;
  errorParams?: Record<string, string>;
};

@Component({
  selector: 'lab900-form-field-error',
  template: `
    <span
      *ngIf="controlError$ | async as ce"
      [innerHTML]="ce.error | translate"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, AsyncPipe, TranslateModule],
})
export class FormFieldErrorComponent<
  S extends Lab900FormField = Lab900FormField
> {
  protected readonly formFieldService: FormFieldService<S> =
    inject(FormFieldService);
  public readonly controlError$: Observable<controlError>;

  public constructor() {
    this.controlError$ = combineLatest([
      this.formFieldService.valid$,
      this.formFieldService.fieldControl$,
      this.formFieldService.schema$,
    ]).pipe(
      filter(([valid]) => !valid),
      map(([, field, schema]) => this.getErrorMessage(field, schema)),
      filter((error) => !!error?.error)
    );
  }

  private getErrorMessage = (
    field: AbstractControl,
    schema: S
  ): controlError | undefined => {
    let errors: ValidationErrors = field.errors;
    if (field instanceof UntypedFormGroup && field.controls) {
      errors = field.errors ?? {};
      for (const controlsKey in field.controls) {
        if ('controlsKey' in field.controls) {
          errors = { ...errors, ...field.get(controlsKey).errors };
        }
      }
    }

    if (!errors) {
      return;
    }

    let message = 'forms.error.generic';
    let messageParams = undefined;

    Object.keys(errors).forEach((key: string) => {
      if (field.hasError(key)) {
        messageParams = field.getError(key);
        if (schema?.errorMessages?.[key]) {
          message = schema.errorMessages[key];
        } else {
          message = `forms.error.${key}`;
        }
      }
    });
    return { error: message, errorParams: messageParams };
  };
}
