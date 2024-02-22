import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldMultiLang } from './multi-lang-input-field.model';

@Component({
  selector: 'lab900-multi-lang-input-field',
  templateUrl: './multi-lang-input-field.component.html',
})
export class MultiLangInputFieldComponent extends FormComponent<FormFieldMultiLang> {
  @HostBinding('class')
  public classList = `lab900-form-field`;
}
