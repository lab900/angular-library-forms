import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-button-toggle-example',
  template: '<lab900-form [schema]="formSchema" (click)="logValue()" [data]="formData"/>',
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldButtonToggleExampleComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'buttonGroupAttribute',
        title: 'Select yes or no',
        editType: EditType.ButtonToggle,
        options: {
          required: true,
          deselectOnClick: true,
          buttonOptions: [
            {
              value: Involvement.VICTIM,
              label: 'yes',
              buttonClass: 'dsfkldsjflkdsjf',
            },
            {
              value: Involvement.RELATED,
              label: 'no',
            },
          ],
        },
      },
      {
        attribute: 'value',
        editType: EditType.Row,
        options: { colspan: 12 },
        nestedFields: [
          {
            attribute: 'buttonGroupAttribute2',
            editType: EditType.ButtonToggle,
            options: {
              required: true,
              elementId: 'buttonGroupAttribute2-customId',
              buttonOptions: [
                {
                  value: 'edit',
                  label: 'one',
                  icon: { name: 'delete', position: 'right' },
                  tooltip: {
                    text: 'Select first option',
                  },
                },
                {
                  value: 'delete',
                  label: 'two',
                  icon: { name: 'delete', position: 'left' },
                  tooltip: {
                    text: 'Select second option',
                  },
                },
              ],
            },
          },
          {
            attribute: 'textInput',
            title: 'Text Input',
            editType: EditType.Input,
          },
        ],
      },
    ],
  };

  public formData: any = {
    buttonGroupAttribute: 'VICTIM',
  };

  public logValue(): void {
    console.log(this.form()?.value);
  }
}

export enum Involvement {
  VICTIM = 'VICTIM',
  RELATED = 'RELATED',
  MISSING = 'MISSING',
}
