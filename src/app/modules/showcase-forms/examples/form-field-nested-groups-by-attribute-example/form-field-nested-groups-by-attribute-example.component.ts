import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'lab900-form-field-nested-groups-by-attribute-example',
  template: `
    <lab900-form #form [schema]="formSchema" />
    <pre>{{ form?.value | json }}</pre>
  `,
  imports: [Lab900Form, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldNestedGroupsByAttributeExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        editType: EditType.Row,
        nestedFields: [
          {
            editType: EditType.Checkbox,
            attribute: 'parentAttr.disable',
            title: 'Disabled nested controls',
            options: { colspan: 6 },
          },
        ],
      },
      {
        editType: EditType.Row,
        nestedFields: [
          {
            editType: EditType.Input,
            attribute: 'parentAttr.child',
            title: 'Child',
            options: { colspan: 6 },
            conditions: [
              {
                dependOn: 'parentAttr.disable',
                hideIfEquals: true,
              },
            ],
          },
          {
            editType: EditType.Input,
            attribute: 'someOtherProp',
            title: 'someOtherProp',
            options: { colspan: 6 },
          },
        ],
      },
      {
        editType: EditType.Row,
        title: 'Other row',
        nestedFields: [
          {
            editType: EditType.Input,
            attribute: 'parentAttr.anotherOne',
            title: 'Child 2',
            conditions: [
              {
                dependOn: 'parentAttr.disable',
                disableIfEquals: true,
              },
            ],
          },
          {
            editType: EditType.Input,
            attribute: 'sub.anotherOne.input',
            title: 'Another nested one',
            conditions: [
              {
                dependOn: 'parentAttr.disable',
                disableIfEquals: true,
              },
            ],
          },
        ],
      },
      {
        editType: EditType.Row,
        title: 'Other row',
        options: {
          customTitleClass: 'test-class',
          customClass: 'test-container-class',
        },
        nestedFields: [
          {
            editType: EditType.Select,
            attribute: 'sub.anotherOne.select',
            title: 'Sub 2 selection',
            conditions: [
              {
                dependOn: 'parentAttr.disable',
                conditionalOptions: value => {
                  return value ? [{ value: 'true', label: 'is true' }] : [{ value: 'false', label: 'is false' }];
                },
              },
            ],
          },
        ],
      },
    ],
  };
}
