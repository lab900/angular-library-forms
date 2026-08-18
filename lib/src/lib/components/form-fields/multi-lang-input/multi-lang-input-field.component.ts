import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldMultiLang } from './multi-lang-input-field.model';
import { MultiLangFieldControlComponent } from './multi-lang-field-control/multi-lang-field-control.component';
import { MatError } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lab900-multi-lang-input-field',
  templateUrl: './multi-lang-input-field.component.html',
  // TODO(onpush): the template reads the non-reactive 'touched' and 'valid' getters of AbstractFormComponent.
  // A parent calling markAllAsTouched() would not repaint this field under OnPush.
  // Make it reactive, then switch to OnPush and remove this file from the eslint override.
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MultiLangFieldControlComponent, MatError, ReactiveFormsModule],
})
export class MultiLangInputFieldComponent extends FormComponent<FormFieldMultiLang> {
  @HostBinding('class')
  public classList = `lab900-form-field`;
}
