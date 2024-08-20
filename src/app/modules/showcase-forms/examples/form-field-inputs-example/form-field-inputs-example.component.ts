import { Component, ViewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-form-field-inputs-example',
  template:
    '<lab900-form [schema]="formSchema"/><button mat-raised-button color="primary" (click)="validate()">Submit</button>',
  standalone: true,
  imports: [Lab900Form, MatButton],
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
          required: true,
          togglePasswordVisibility: {
            disabled: false,
            passwordVisibleIcon: { name: 'visibility_off' },
            passwordHiddenIcon: { name: 'visibility' },
          },
        },
        validators: [Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{12,}$/)],
        errorMessages: {
          pattern: 'Does not match pattern',
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
        attribute: 'maskAndPattern',
        title: 'Mask and Pattern',
        editType: EditType.Input,
        options: {
          placeholder: 'ABC(UJZ)-000000/0',
          pattern: new RegExp('[a-zA-Z]{4}-[0-9]{6}/[0-9]'),
          fieldMask: {
            mask: 'SSSS-000000/0',
            dropSpecialCharacters: false,
          },
          style: 'text-transform: uppercase',
        },
        errorMessages: { pattern: 'Invalid ISO-6364 format' },
      },
      {
        attribute: 'maskAndPatternShowMask',
        title: 'Mask and Pattern - show mask',
        editType: EditType.Input,
        options: {
          style: 'letter-spacing: 4px',
          fieldMask: {
            showMaskTyped: true,
            shownMaskExpression: '__|__|__',
            mask: '00|00|00',
            specialCharacters: ['|'],
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
    console.log(this.formContainer.value?.maskAndPattern);
  }
}
