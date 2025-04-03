import { Component, computed, HostBinding, signal } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldPassword } from './password-field.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { IconComponent } from '@lab900/ui';

@Component({
  selector: 'lab900-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, TranslatePipe, AutofocusDirective, IconComponent],
})
export class PasswordFieldComponent extends FormComponent<FormFieldPassword> {
  @HostBinding('class')
  public classList = `lab900-form-field`;
  protected readonly passwordVisible = signal(false);
  protected readonly inputType = computed(() => (this.passwordVisible() ? 'text' : 'password'));
  protected readonly visibilityIcon = computed(() => {
    return this.passwordVisible()
      ? this.schemaOptions()?.togglePasswordVisibility?.passwordVisibleIcon || {
          name: 'visibility_off',
        }
      : this.schemaOptions()?.togglePasswordVisibility?.passwordHiddenIcon || {
          name: 'visibility',
        };
  });

  protected togglePasswordVisibility(): void {
    this.passwordVisible.update(current => !current);
  }
}
