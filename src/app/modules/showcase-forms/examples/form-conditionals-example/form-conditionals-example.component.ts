import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { formConditionalsData, formConditionalsExample } from './form-conditionals-example.component.config';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-form-conditionals-example',
  template: `
    <lab900-form #lab900FormContainer [schema]="formFields" [data]="formData" />
    <button mat-stroked-button (click)="submitForm()">Submit Form</button>
  `,
  imports: [Lab900Form, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormConditionalsExampleComponent {
  public formFields: Lab900FormConfig = formConditionalsExample;
  public formData = formConditionalsData;

  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public submitForm(): void {
    if (this.form()?.valid) {
      console.log(this.form()?.value);
    } else {
      this.form()?.form.markAllAsTouched();
    }
  }
}
