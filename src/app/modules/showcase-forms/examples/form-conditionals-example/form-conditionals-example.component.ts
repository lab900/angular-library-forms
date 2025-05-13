import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { MatButton } from '@angular/material/button';

const form: Lab900FormConfig = {
  fields: [
    {
      editType: EditType.Row,
      attribute: 'productDescriptions',
      nestedFields: [
        {
          editType: EditType.Row,
          nestedFields: [
            {
              attribute: 'line1',
              title: 'EXPEDITION_LOG.CMR.PRODUCT_LINE_1',
              editType: EditType.Input,
              options: {
                maxLength: 255,
              },
            },
            {
              attribute: 'line2',
              title: 'EXPEDITION_LOG.CMR.PRODUCT_LINE_2',
              editType: EditType.Input,
              options: {
                maxLength: 255,
              },
            },
            {
              attribute: 'line3',
              title: 'EXPEDITION_LOG.CMR.PRODUCT_LINE_3',
              editType: EditType.Input,
              options: {
                maxLength: 255,
              },
            },
            {
              attribute: 'line4',
              title: 'EXPEDITION_LOG.CMR.PRODUCT_LINE_4',
              editType: EditType.Input,
              options: {
                maxLength: 255,
              },
            },
          ],
        },
      ],
    },
  ],
};

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
  public formFields: Lab900FormConfig = form;
  public formData = {
    productDescriptions: {
      line1: 'Product 1',
      line2: 'Product 2',
      line3: 'Product 3',
      line4: 'Product 4',
    },
  };

  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public submitForm(): void {
    if (this.form()?.valid) {
      console.log(this.form()?.value);
    } else {
      this.form()?.form.markAllAsTouched();
    }
  }
}
