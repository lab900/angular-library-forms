import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldInput } from './input-field.model';

@Component({
  selector: 'lab900-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent extends FormComponent<FormFieldInput> {
  @HostBinding('class')
  public classList = `lab900-form-field`;

  public get showLengthIndicator(): boolean {
    return (
      !!this.setting?.formField?.showLengthIndicator ||
      !!this.options?.showLengthIndicator
    );
  }
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
}
