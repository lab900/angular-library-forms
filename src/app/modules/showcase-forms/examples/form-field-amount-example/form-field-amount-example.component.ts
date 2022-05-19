import { Component } from '@angular/core';
import { Lab900FormConfig, EditType } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-amount-example',
  template: `<div>
    <h3>Form field:</h3>
    <lab900-form [schema]="formSchema"></lab900-form>
    <h3>Pipe:</h3>
    <p>
      The same formatting is also available as a pipe:
      <code>{{ snippet }}</code>
    </p>
    <p>Will result in: {{ 204500.456 | amount }}</p>
  </div>`,
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
          minDecimals: 2,
          suffix: 'EUR',
        },
      },
    ],
  };
}
