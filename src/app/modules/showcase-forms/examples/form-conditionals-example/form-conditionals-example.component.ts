import { Component, ViewChild } from '@angular/core';
import { Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { formConditionalsData, formConditionalsExample } from './form-conditionals-example.component.config';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-form-conditionals-example',
  template: `
    <lab900-form #lab900FormContainer [schema]="formFields" [data]="formData" />
    <button mat-stroked-button (click)="submitForm()">Submit Form</button>
  `,
  standalone: true,
  imports: [Lab900Form, MatButton],
})
export class FormConditionalsExampleComponent {
  public formFields: Lab900FormConfig = formConditionalsExample;
  public formData = formConditionalsData;

  @ViewChild('lab900FormContainer')
  private formContainer: Lab900Form<any>;

  public submitForm(): void {
    if (this.formContainer.valid) {
      console.log(this.formContainer.value);
    } else {
      this.formContainer.form.markAllAsTouched();
    }
  }
}
