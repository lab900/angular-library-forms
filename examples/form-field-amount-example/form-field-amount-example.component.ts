import { Component } from '@angular/core';
import { AmountPipe, EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'lab900-form-field-amount-example',
  template: ` <div>
    <h3>Form field:</h3>
    <lab900-form #f [schema]="formSchema" [data]="{ amount: 204500.456, amountWithoutDecimals: 67777 }" />
    <code>Form control value: {{ f?.form?.value | json }}</code>
    <h3 style="margin-top: 2em">Pipe:</h3>
    <p>
      The same formatting is also available as a pipe:
      <code>{{ snippet }}</code>
    </p>
    <p>Will result in: {{ 204500.456 | amount }}</p>
  </div>`,
  imports: [Lab900Form, JsonPipe, AmountPipe],
})
export class FormFieldAmountExampleComponent {
  public readonly snippet = '{{ 204500.456 | amount }}';
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'amount',
        title: 'My amount',
        editType: EditType.Amount,
        options: {
          minDecimals: 3,
          maxDecimals: 3,
          suffix: 'EUR',
        },
      },
      {
        attribute: 'amountWithoutDecimals',
        title: 'My amount without decimals',
        editType: EditType.Amount,
        options: {
          minDecimals: 0,
          maxDecimals: 0,
          suffix: 'EUR',
        },
      },
    ],
  };
}
