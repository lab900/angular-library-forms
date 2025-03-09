import { Component, ViewChild } from '@angular/core';
import { Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { formFieldsExample } from './config/form-fields-example';
import { formDataExample } from './config/form-data-example';

@Component({
    selector: 'lab900-form-container-readonly-example',
    template: `
    <lab900-form #lab900FormContainer [schema]="formFields" [data]="formData" />
    <button (click)="toggleReadOnly()">Toggle edit</button>
  `,
    imports: [Lab900Form]
})
export class FormContainerReadonlyExampleComponent {
  public formFields: Lab900FormConfig = {
    ...formFieldsExample,
    readonly: true,
  };
  public formData = formDataExample;

  @ViewChild('lab900FormContainer')
  private formContainer: Lab900Form<any>;

  public toggleReadOnly(): void {
    this.formFields.readonly = !this.formFields.readonly;
  }
}
