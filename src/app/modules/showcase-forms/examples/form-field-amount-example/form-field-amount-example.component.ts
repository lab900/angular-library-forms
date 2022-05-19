import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Lab900FormConfig, EditType, Lab900Form } from '@lab900/forms';
import { FormComponent } from '../../../../../../dist/@lab900/forms/lib/components/AbstractFormComponent';

@Component({
  selector: 'lab900-form-field-amount-example',
  template: `<div>
    <h3>Form field:</h3>
    <lab900-form
      [schema]="formSchema"
      [data]="{ amount: 204500.456 }"
    ></lab900-form>
    <h3>Pipe:</h3>
    <p>
      The same formatting is also available as a pipe:
      <code>{{ snippet }}</code>
    </p>
    <p>Will result in: {{ 204500.456 | amount }}</p>
  </div>`,
})
export class FormFieldAmountExampleComponent implements AfterViewInit {
  @ViewChild(Lab900Form)
  private form: Lab900Form<any>;

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

  public ngAfterViewInit(): void {
    this.form.form.valueChanges.subscribe(console.log);
  }
}
