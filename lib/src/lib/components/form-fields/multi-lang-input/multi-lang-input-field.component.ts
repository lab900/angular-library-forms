import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldMultiLang } from './multi-lang-input-field.model';
import { MultiLangFieldControlComponent } from './multi-lang-field-control/multi-lang-field-control.component';
import { MatError } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lab900-multi-lang-input-field',
  templateUrl: './multi-lang-input-field.component.html',
  // TODO(onpush): eager on purpose. See the change detection follow-up in ANGULAR-UPGRADE-19.2-TO-22.1.md.
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MultiLangFieldControlComponent, MatError, ReactiveFormsModule],
})
export class MultiLangInputFieldComponent extends FormComponent<FormFieldMultiLang> {
  @HostBinding('class')
  public classList = `lab900-form-field`;
}
