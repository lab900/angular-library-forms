import { Component, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldButton } from './button-field.model';

@Component({
  selector: 'lab900-button-field',
  templateUrl: './button-field.component.html',
})
export class ButtonFieldComponent extends FormComponent<FormFieldButton> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public constructor(translateService: TranslateService) {
    super(translateService);
  }

  public handleClick(event: Event): void {
    event.stopPropagation();
    this.options?.onClick(this.group, this.schema, event);
  }
}
