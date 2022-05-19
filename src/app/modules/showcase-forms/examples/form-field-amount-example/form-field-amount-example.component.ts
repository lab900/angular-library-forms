import { Component } from '@angular/core';
import { Lab900FormConfig, EditType } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-amount-example',
  template: '<lab900-form [schema]="formSchema"></lab900-form>',
})
export class FormFieldAmountExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'amount',
        title: 'My amount',
        editType: EditType.Amount,
      },
    ],
  };
}
