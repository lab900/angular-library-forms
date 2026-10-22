import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-checkbox-example',
  template: '<lab900-form [schema]="formSchema" (click)="logValue()" [data]="formData"/>',
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldCheckboxExampleComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'newsletter',
        title: 'Checkbox',
        editType: EditType.Checkbox,
      },
      {
        attribute: 'terms',
        title: 'Required, with a hint',
        editType: EditType.Checkbox,
        options: {
          required: true,
          hint: {
            value: 'Tick the box to make the form valid.',
            hideHintOnValidValue: true,
          },
        },
      },
      {
        attribute: 'indeterminate',
        title: 'A null value is indeterminate',
        editType: EditType.Checkbox,
      },
      {
        attribute: 'noIndeterminate',
        title: 'disabledIndeterminate: a null value reads as unchecked',
        editType: EditType.Checkbox,
        options: {
          disabledIndeterminate: true,
        },
      },
      {
        attribute: 'accent',
        title: 'color: accent',
        editType: EditType.Checkbox,
        options: {
          color: 'accent',
        },
      },
      {
        attribute: 'confirmed',
        title: 'Readonly',
        editType: EditType.Checkbox,
        options: {
          readonly: true,
          readonlyDisplay: data => (data?.confirmed ? 'Yes' : 'No'),
        },
      },
    ],
  };

  public formData: any = {
    newsletter: true,
    terms: false,
    indeterminate: null,
    noIndeterminate: null,
    accent: true,
    confirmed: true,
  };

  public logValue(): void {
    console.log(this.form()?.value);
  }
}
