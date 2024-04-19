import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldIcon } from './icon-field.model';
import { IconComponent } from '@lab900/ui';


@Component({
  selector: 'lab900-icon-field',
  templateUrl: './icon-field.component.html',
  styleUrls: ['./icon-field.component.scss'],
  standalone: true,
  imports: [IconComponent],
})
export class IconFieldComponent extends FormComponent<FormFieldIcon> {
  @HostBinding('class')
  public classList = 'lab900-form-field';
}
