import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldPassword } from './password-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { FormIcon } from '../../../models/form-field-base';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field/form-field.component';

@Component({
  selector: 'lab900-password-field',
  templateUrl: './password-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatInputModule,
    AsyncPipe,
    TranslateModule,
    AutofocusDirective,
    ReactiveFormsModule,
    FormFieldComponent,
    NgIf,
  ],
})
export class PasswordFieldComponent extends FormComponent<FormFieldPassword> {
  private readonly passwordVisible = new BehaviorSubject(false);
  public readonly autofocus$ = this.getOption$<boolean>('autofocus');
  public readonly style$ = this.getOption$<string>('style');
  public readonly icon$ = this.getIcon$();
  public readonly type$ = this.passwordVisible
    .asObservable()
    .pipe(map((visible) => (visible ? 'text' : 'password')));

  public toggleVisibility(): void {
    this.passwordVisible.next(!this.passwordVisible.value);
  }

  private getIcon$(): Observable<FormIcon> {
    return combineLatest([
      this.formFieldService.schema$,
      this.getOption$<{
        disabled: boolean;
        passwordVisibleIcon?: FormIcon;
        passwordHiddenIcon?: FormIcon;
      }>('togglePasswordVisibility'),
      this.passwordVisible.asObservable(),
    ]).pipe(
      map(([schema, toggle, passwordVisible]) => {
        if (schema?.icon) {
          return schema?.icon;
        } else if (toggle && !toggle.disabled) {
          return passwordVisible
            ? {
                name: 'visibility_off',
                position: 'right',
                onClick: () => this.toggleVisibility(),
                ...(toggle.passwordVisibleIcon ?? {}),
              }
            : {
                name: 'visibility',
                position: 'right',
                onClick: () => this.toggleVisibility(),
                ...(toggle.passwordHiddenIcon ?? {}),
              };
        }
        return undefined;
      })
    );
  }
}
