import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EditType, Lab900FormConfig, ValueLabel } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-select-example',
  template: `<lab900-form [schema]="formSchema"></lab900-form>
    <lab900-select-field
      [schema]="selectSchema"
      fieldAttribute="example-select"
      [group]="formGroup"
    ></lab900-select-field>
    <button (click)="clearSelect()">clear All</button>`,
})
export class FormFieldSelectExampleComponent {
  public readonly formGroup = new FormGroup({});
  public readonly formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: '',
        editType: EditType.Row,
        nestedFields: [
          {
            attribute: 'somePropName',
            editType: EditType.Select,
            options: {
              displayOptionFn: (value: ValueLabel) => value.label,
              placeholder: 'select yes or no',
              selectOptions: [
                {
                  value: true,
                  label: 'yes',
                },
                {
                  value: false,
                  label: 'no',
                },
              ],
              colspan: 6,
              required: true,
            },
          },
          {
            attribute: 'secondPropName',
            title: 'Select yes or no',
            editType: EditType.Select,
            options: {
              selectOptions: [
                {
                  value: true,
                  label: 'yes',
                },
                {
                  value: false,
                  label: 'no',
                },
              ],
              colspan: 6,
            },
          },
          {
            attribute: 'thirdPropName',
            title: 'Only item is auto-selected',
            editType: EditType.Select,
            options: {
              selectOptions: [
                {
                  value: 'lonely',
                  label: 'lonely item',
                },
              ],
              autoselectOnlyOption: true,
            },
          },
        ],
      },
      {
        attribute: '',
        editType: EditType.Row,
        nestedFields: [
          {
            attribute: 'dependOnCheck',
            title: 'Select yes or no',
            editType: EditType.Select,
            options: {
              colspan: 6,
              selectOptions: [
                {
                  value: 'whatever',
                  label: 'checked yes',
                },
              ],
            },
          },
          {
            attribute: 'forthPropName',
            title: 'May the force be with you',
            editType: EditType.Select,
            options: {
              selectOptions: [
                {
                  value: 'may',
                  label: 'May',
                },
                {
                  value: 'the',
                  label: 'the',
                },
                {
                  value: '4th',
                  label: '4th',
                },
              ],
              clearFieldButton: {
                enabled: true,
                click: (fieldControl) => {
                  fieldControl.setValue('none');
                  fieldControl.markAsTouched();
                  fieldControl.markAsDirty();
                },
              },
            },
          },
          {
            attribute: 'forthMultiplePropName',
            title: 'May the multiple forces be with you',
            editType: EditType.Select,
            options: {
              multiple: true,
              selectAll: { enabled: true },
              selectOptions: [
                {
                  value: 'may',
                  label: 'May',
                },
                {
                  value: 'the',
                  label: 'the',
                },
                {
                  value: '4th',
                  label: '4th',
                },
              ],
              clearFieldButton: {
                enabled: true,
              },
            },
          },
        ],
      },
    ],
  };
  public readonly selectSchema = {
    attribute: 'forthMultiplePropName',
    title: 'May the multiple forces be with you',
    editType: EditType.Select,
    options: {
      multiple: true,
      selectAll: { enabled: true },
      selectOptions: [
        {
          value: 'may',
          label: 'May',
        },
        {
          value: 'the',
          label: 'the',
        },
        {
          value: '4th',
          label: '4th',
        },
      ],
      clearFieldButton: {
        enabled: true,
      },
    },
  };

  public constructor() {
    const control = new FormControl();
    this.formGroup.addControl('example-select', control);
  }

  public clearSelect(): void {
    this.formGroup.get('example-select').setValue(null);
  }
}
