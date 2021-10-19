import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditType, Lab900FormConfig, Lab900Form } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-button-example',
  template: '<lab900-form [schema]="formSchema"></lab900-form>',
})
export class FormFieldButtonExampleComponent {
  @ViewChild(Lab900Form)
  public form: Lab900Form<any>;

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        editType: EditType.Row,
        nestedFields: [
          {
            editType: EditType.Input,
            attribute: 'm3',
            title: 'm3',
            options: {
              type: 'number',
              colspan: 5.5,
            },
          },
          {
            editType: EditType.Input,
            attribute: 'density',
            title: 'density',
            options: {
              type: 'number',
              colspan: 5.5,
            },
          },
          {
            attribute: 'button',
            editType: EditType.Button,
            options: {
              colspan: 1,
              type: 'mini-fab',
              label: 'calculate',
              tooltip: {
                text: `Calculate MT based on m³ and density`,
              },
              onClick: (formGroup: FormGroup) => {
                const { m3, density, mt } = formGroup.controls;
                if (!m3.value || !density.value) {
                  return;
                }
                mt.setValue(m3.value * density.value);
              },
            },
          },
        ],
      },
      {
        editType: EditType.Input,
        attribute: 'mt',
        title: 'MT',
        options: {
          readonly: true,
        },
      },
    ],
  };
}
