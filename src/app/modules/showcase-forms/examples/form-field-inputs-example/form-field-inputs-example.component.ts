import { Component, ViewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-inputs-example',
  template:
    '<lab900-form [schema]="formSchema"></lab900-form><button mat-raised-button color="primary" (click)="validate()">Submit</button>',
})
export class FormFieldInputsExampleComponent {
  @ViewChild(Lab900Form)
  public formContainer: Lab900Form<any>;

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        editType: EditType.Row,
        nestedFields: [
          {
            attribute: 'containerCustomClass',
            editType: EditType.Input,
            options: {
              readonly: true,
              readonlyContainerClass: 'readonlyInputCustomContainerClass',
              defaultValue: 'MANUAL',
            },
          },
        ],
      },

      {
        attribute: 'uniqueNumber',
        title: 'Text Input Hidden',
        editType: EditType.Input,
        options: {
          hide: true,
        },
      },
      {
        attribute: 'textInput2',
        title: 'Text Input',
        editType: EditType.Input,
        options: {
          required: true,
          autofocus: true,
          minLength: 5,
          maxLength: 15,
          showLengthIndicator: false,
        },
        icon: { name: 'search', position: 'left' },
      },
      {
        attribute: 'textInput3',
        title: 'Text Input',
        editType: EditType.Input,
        icon: { name: 'search', position: 'right' },
        options: {
          required: (data) => {
            return !data?.emailInput;
          },
        },
      },
      {
        attribute: 'emailInput',
        title: 'Email Input',
        editType: EditType.Input,
        options: {
          type: 'email',
        },
      },
      {
        attribute: 'numberInput',
        title: 'Number Input',
        editType: EditType.Input,
        options: {
          type: 'number',
          max: 1000,
          min: 5,
        },
      },
      {
        attribute: 'passwordInput',
        title: 'Password Input',
        editType: EditType.Password,
        options: {
          togglePasswordVisibility: {
            disabled: false,
            passwordVisibleIcon: { name: 'visibility_off' },
            passwordHiddenIcon: { name: 'visibility' },
          },
        },
      },
      {
        attribute: 'mask',
        title: 'Mask',
        editType: EditType.Input,
        options: {
          fieldMask: {
            mask: 'separator.4',
            decimalMarker: ',',
            thousandSeparator: '.',
          },
        },
      },
      {
        attribute: 'readOnlyInput',
        title: 'Read-only input',
        editType: EditType.Input,
        options: {
          type: 'text',
          readonly: (d: any) => d != null,
          required: true,
        },
      },
      {
        attribute: 'suffixField',
        title: 'Input with suffix',
        editType: EditType.Input,
        options: {
          type: 'text',
          suffix: 'mm2',
        },
      },
      {
        attribute: 'suffixField',
        title: 'Input with suffix, prefix & right alignment',
        editType: EditType.Input,
        options: {
          type: 'text',
          prefix: '$',
          suffix: '.00',
          align: 'right',
        },
      },
      {
        attribute: 'timeField',
        title: 'Time',
        editType: EditType.Input,
        options: {
          type: 'time',
        },
      },
    ],
  };

  public validate(): void {
    console.log(this.formContainer.valid);
  }
}
