import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldRadioButtons } from './radio-buttons-field.model';
import { MatError, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'lab900-radio-buttons-field',
  templateUrl: './radio-buttons-field.component.html',
  standalone: true,
  imports: [
    MatLabel,
    ReactiveFormsModule,
    TranslateModule,
    MatRadioGroup,
    MatRadioButton,
    MatError,
    AsyncPipe
],
})
export class RadioButtonsFieldComponent extends FormComponent<FormFieldRadioButtons> {
  @HostBinding('class')
  public classList = 'lab900-form-field';
}
