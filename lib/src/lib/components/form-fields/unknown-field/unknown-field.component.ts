import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldService } from '../../../services/form-field.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'lab900-unknown-field',
  providers: [FormFieldService],
  template: ` <div>
    <p>Unknown schema:</p>
    <pre>{{ schema | json }}</pre>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [JsonPipe],
})
export class UnknownFieldComponent extends FormComponent {}
