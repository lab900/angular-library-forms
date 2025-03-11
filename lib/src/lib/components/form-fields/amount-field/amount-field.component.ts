import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldAmount } from './amount-field.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { AmountInputDirective } from './amount-input.directive';
import { IconComponent } from '@lab900/ui';

@Component({
  selector: 'lab900-amount-field',
  templateUrl: './amount-field.component.html',
  styleUrls: ['./amount-field.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslatePipe,
    AutofocusDirective,
    AmountInputDirective,
    IconComponent,
  ],
})
export class AmountFieldComponent extends FormComponent<FormFieldAmount> {
  @HostBinding('class')
  public classList = `lab900-form-field`;

  public readonly suffix = computed(() => {
    const opt = this._options();
    if (typeof opt?.suffix === 'function') {
      return opt.suffix(this._group()?.value);
    }
    return opt?.suffix;
  });

  public readonly prefix = computed(() => {
    const opt = this._options();
    if (typeof opt?.prefix === 'function') {
      return opt.prefix(this._group()?.value);
    }
    return opt?.prefix;
  });

  public readonly maxDecimals = computed(() => {
    const opt = this._options();
    if (typeof opt?.maxDecimals === 'function') {
      return opt.maxDecimals(this._group()?.value);
    }
    return opt?.maxDecimals;
  });

  public readonly minDecimals = computed(() => {
    const opt = this._options();
    if (typeof opt?.minDecimals === 'function') {
      return opt.minDecimals(this._group()?.value);
    }
    return opt?.minDecimals;
  });
}
