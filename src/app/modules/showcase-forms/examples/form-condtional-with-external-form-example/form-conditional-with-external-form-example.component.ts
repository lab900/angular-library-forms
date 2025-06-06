import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-conditional-with-external-form-example',
  template: `
    <h2>Form 1</h2>
    <lab900-form #form1 [schema]="schema" />
    <h2>Form 2</h2>
    <lab900-form #form2 [schema]="schema2" [externalForms]="{ form1: form1.form }" />
  `,
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormConditionalWithExternalFormExampleComponent {
  public schema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'type',
        editType: EditType.Select,
        title: 'Type',
        options: {
          colspan: 6,
          selectOptions: [
            { value: 'a', label: 'a value' },
            { value: 'b', label: 'b value' },
          ],
        },
      },
    ],
  };
  public schema2: Lab900FormConfig = {
    fields: [
      {
        attribute: 'name',
        editType: EditType.Input,
        title: 'Type',
        conditions: [
          {
            dependOn: 'type',
            disableIfEquals: 'a',
            externalFormId: 'form1',
          },
        ],
      },
    ],
  };
}
