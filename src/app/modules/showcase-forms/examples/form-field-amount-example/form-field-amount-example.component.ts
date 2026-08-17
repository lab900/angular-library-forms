import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AmountPipe, EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'lab900-form-field-amount-example',
  template: ` <div>
    <h3>Form field:</h3>
    <lab900-form #f [schema]="formSchema" [data]="data()" />
    <code>Form control value: {{ f?.form?.value | json }}</code>
    <h3 style="margin-top: 2em">Pipe:</h3>
    <p>
      The same formatting is also available as a pipe:
      <code>{{ snippet }}</code>
    </p>
    <p>Will result in: {{ 204500.456 | amount }}</p>
  </div>`,
  imports: [Lab900Form, JsonPipe, AmountPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldAmountExampleComponent {
  public readonly data = signal<any>(undefined);
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
          suffix: data => data?.currency ?? 'unknown',
          required: true,
        },
      },
      {
        attribute: 'amountWithoutDecimals',
        title: 'My amount without decimals',
        editType: EditType.Amount,
        options: {
          minDecimals: 0,
          maxDecimals: 0,
          suffix: data => data?.currency ?? 'unknown',
        },
      },
      {
        attribute: 'currency',
        title: 'Currency',
        editType: EditType.Select,
        options: {
          selectOptions: [
            { label: 'EUR', value: 'EUR' },
            { label: 'USD', value: 'USD' },
          ],
        },
      },
    ],
  };

  public constructor() {
    setTimeout(() => {
      this.data.set({ amount: 204500.456, amountWithoutDecimals: 67777, currency: 'EUR' });
    }, 500);
  }
}
