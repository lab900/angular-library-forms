import { Component, computed, HostBinding, inject } from '@angular/core';
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
  public readonly icon = computed(() => this.schema()?.icon);
  public readonly fieldMask = computed(() => this.schemaOptions()?.fieldMask);
  public readonly type = computed(() => this.schemaOptions()?.type ?? 'text');
  public readonly showLengthIndicator = computed(
    () =>
      !this.fieldIsReadonly() &&
      !!this.schemaOptions()?.maxLength &&
      (!!this.setting?.formField?.showLengthIndicator || !!this.schemaOptions()?.showLengthIndicator)
  );

  @HostBinding('class')
  public classList = `lab900-form-field`;

  public readonly suffix = computed(() => {
    const opt = this.schemaOptions();
    if (typeof opt?.suffix === 'function') {
      return opt.suffix(this.group()?.value);
    }
    return opt?.suffix;
  });

  public readonly prefix = computed(() => {
    const opt = this.schemaOptions();
    if (typeof opt?.prefix === 'function') {
      return opt.prefix(this.group()?.value);
    }
    return opt?.prefix;
  });
}
