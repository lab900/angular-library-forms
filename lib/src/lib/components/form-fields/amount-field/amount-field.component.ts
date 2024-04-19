import { Component, HostBinding } from '@angular/core';
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
    AsyncPipe
],
})
export class AmountFieldComponent extends FormComponent<FormFieldAmount> {
  @HostBinding('class')
  public classList = `lab900-form-field`;

  public get suffix(): string {
    if (typeof this.options?.suffix === 'function') {
      return this.options.suffix(this.group.value);
    }
    return this.options?.suffix;
  }

  public get prefix(): string {
    if (typeof this.options?.prefix === 'function') {
      return this.options.prefix(this.group.value);
    }
    return this.options?.prefix;
  }

  public get maxDecimals(): number {
    if (typeof this.options?.maxDecimals === 'function') {
      return this.options.maxDecimals(this.group.value);
    }
    return this.options?.maxDecimals;
  }

  public get minDecimals(): number {
    if (typeof this.options?.minDecimals === 'function') {
      return this.options.minDecimals(this.group.value);
    }
    return this.options?.minDecimals;
  }
}
