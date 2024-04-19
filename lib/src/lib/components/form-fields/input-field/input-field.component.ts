import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldInput } from './input-field.model';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { NgxMaskDirective } from 'ngx-mask';
import { IconComponent } from '@lab900/ui';

@Component({
  selector: 'lab900-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    AutofocusDirective,
    NgxMaskDirective,
    IconComponent,
    AsyncPipe,
  ],
})
export class InputFieldComponent extends FormComponent<FormFieldInput> {
  @HostBinding('class')
  public classList = `lab900-form-field`;

  public showLengthIndicator = computed(() => {
    return (
      !!this.options()?.maxLength &&
      (!!this.setting?.formField?.showLengthIndicator ||
        !!this.options()?.showLengthIndicator)
    );
  });

  public suffix = computed(() => {
    const suffix = this.options()?.suffix;
    if (typeof suffix === 'function') {
      return suffix(this.group.value);
    }
    return suffix;
  });

  public prefix = computed(() => {
    const prefix = this.options()?.prefix;
    if (typeof prefix === 'function') {
      return prefix(this.group.value);
    }
    return prefix;
  });

  public mask = computed(() => {
    return this.options()?.fieldMask;
  });

  public icon = computed(() => {
    return this.schema().icon;
  });
}
