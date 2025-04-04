import { Component, HostBinding } from '@angular/core';
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

  public readonly suffix = this.computeReactiveOptionalStringOption('suffix');
  public readonly prefix = this.computeReactiveOptionalStringOption('prefix');
  public readonly maxDecimals = this.computeReactiveOptionalNumberOption('maxDecimals');
  public readonly minDecimals = this.computeReactiveOptionalNumberOption('minDecimals');
}
