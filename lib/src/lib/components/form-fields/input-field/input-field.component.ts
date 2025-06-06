import { ChangeDetectionStrategy, Component, computed, HostBinding, inject } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldInput } from './input-field.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { NgxMaskDirective, NgxMaskService } from 'ngx-mask';
import { IconComponent } from '@lab900/ui';

@Component({
  selector: 'lab900-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe,
    AutofocusDirective,
    NgxMaskDirective,
    IconComponent,
    ReactiveFormsModule,
  ],
})
export class InputFieldComponent extends FormComponent<FormFieldInput> {
  protected readonly defaultSpecialCharacters = inject(NgxMaskService).specialCharacters;
  public readonly icon = computed(() => this._schema()?.icon);
  public readonly fieldMask = computed(() => this._options()?.fieldMask);
  public readonly type = computed(() => this._options()?.type ?? 'text');
  public readonly showLengthIndicator = computed(
    () =>
      !!this._options()?.maxLength &&
      (!!this.setting?.formField?.showLengthIndicator || !!this._options()?.showLengthIndicator)
  );

  @HostBinding('class')
  public classList = `lab900-form-field`;

  public readonly suffix = this.computeReactiveOptionalStringOption('suffix');
  public readonly prefix = this.computeReactiveOptionalStringOption('prefix');
}
