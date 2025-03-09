import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'lab900-unknown-field',
  template: ` <div>
    <p>Unknown schema:</p>
    <pre>{{ schema | json }}</pre>
  </div>`,
  imports: [JsonPipe],
})
export class UnknownFieldComponent extends FormComponent {
  @HostBinding('class')
  public classList = 'lab900-form-field';
}
