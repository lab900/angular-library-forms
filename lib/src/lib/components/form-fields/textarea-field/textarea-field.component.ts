import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldTextarea } from './textarea-field.model';

@Component({
  selector: 'lab900-textarea-field',
  templateUrl: './textarea-field.component.html',
  styles: ['textarea { min-height: 100px; }'],
})
export class TextareaFieldComponent extends FormComponent<FormFieldTextarea> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public get showLengthIndicator(): boolean {
    return (
      !!this.setting?.formField?.showLengthIndicator ||
      !!this.options?.showLengthIndicator
    );
  }
}
