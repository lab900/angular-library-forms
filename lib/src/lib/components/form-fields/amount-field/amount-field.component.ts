import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldAmount } from './amount-field.model';

@Component({
  selector: 'lab900-amount-field',
  templateUrl: './amount-field.component.html',
  styleUrls: ['./amount-field.component.scss'],
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
