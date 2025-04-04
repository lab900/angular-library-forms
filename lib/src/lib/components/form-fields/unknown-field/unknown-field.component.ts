import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'lab900-unknown-field',
  template: ` <div>
    <p>Unknown schema:</p>
    <pre>{{ _schema() | json }}</pre>
  </div>`,
  imports: [JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnknownFieldComponent extends FormComponent {
  @HostBinding('class')
  public classList = 'lab900-form-field';
}
