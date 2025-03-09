import { Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'lab900-form-field-nested-groups-example',
    template: `
    <lab900-form #form [schema]="formSchema" />
    <pre>{{ form?.value | json }}</pre>
  `,
    imports: [Lab900Form, JsonPipe]
})
export class FormFieldNestedGroupsExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'parentAttr', // parent property name
        editType: EditType.Row,
        nestedFields: [
          {
            editType: EditType.Input,
            attribute: 'child',
            title: 'Child',
          },
          {
            editType: EditType.Input,
            attribute: 'anotherOne',
            title: 'Child 2',
          },
        ],
      },
    ],
  };
}
