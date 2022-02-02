import { Component, HostBinding, Inject } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { TranslateService } from '@ngx-translate/core';
import {
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from '../../../models/Lab900FormModuleSettings';
import { FormFieldPassword } from './password-field.model';

@Component({
  selector: 'lab900-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent extends FormComponent<FormFieldPassword> {
  @HostBinding('class')
  public classList = `lab900-form-field`;
  public passwordVisible = false;

  public constructor(
    @Inject(LAB900_FORM_MODULE_SETTINGS)
    public setting: Lab900FormModuleSettings,
    translateService: TranslateService
  ) {
    super(translateService);
  }

  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
