import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldAmount } from './amount-field.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { AmountInputDirective } from './amount-input.directive';
import { IconComponent } from '@lab900/ui';

@Component({
  selector: 'lab900-amount-field',
  templateUrl: './amount-field.component.html',
  styleUrls: ['./amount-field.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    NgClass,
    AutofocusDirective,
    AmountInputDirective,
    IconComponent,
    AsyncPipe,
  ],
})
export class AmountFieldComponent extends FormComponent<FormFieldAmount> {
  @HostBinding('class')
  public classList = `lab900-form-field`;

  public icon = computed(() => {
    return this.schema().icon;
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

  public maxDecimals = computed(() => {
    const maxDecimals = this.options()?.maxDecimals;
    if (typeof maxDecimals === 'function') {
      return maxDecimals(this.group.value);
    }
    return maxDecimals;
  });

  public minDecimals = computed(() => {
    const minDecimals = this.options()?.minDecimals;
    if (typeof minDecimals === 'function') {
      return minDecimals(this.group.value);
    }
    return minDecimals;
  });
}
