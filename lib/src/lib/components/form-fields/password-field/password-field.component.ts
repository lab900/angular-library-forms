import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
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

  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
