import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldPassword } from './password-field.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { IconComponent } from '@lab900/ui';

@Component({
  selector: 'lab900-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    NgClass,
    AutofocusDirective,
    IconComponent,
    AsyncPipe,
  ],
})
export class PasswordFieldComponent extends FormComponent<FormFieldPassword> {
  @HostBinding('class')
  public classList = `lab900-form-field`;
  public passwordVisible = false;

  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  public icon = computed(() => {
    return this.schema().icon;
  });
}
