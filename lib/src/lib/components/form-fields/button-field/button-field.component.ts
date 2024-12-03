import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldButton } from './button-field.model';
import { Lab900ButtonComponent } from '@lab900/ui';
import { MatTooltip } from '@angular/material/tooltip';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'lab900-button-field',
  templateUrl: './button-field.component.html',
  standalone: true,
  imports: [MatTooltip, ReactiveFormsModule, TranslateModule, Lab900ButtonComponent, MatLabel]
})
export class ButtonFieldComponent extends FormComponent<FormFieldButton> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  @ViewChild(Lab900ButtonComponent, { read: ElementRef })
  public set buttonComp(buttonComp: ElementRef) {
    // fix for trigger action on enter
    buttonComp?.nativeElement?.children?.[0]?.setAttribute('type', 'button');
  }

  public handleClick(event: Event): void {
    event.stopPropagation();
    this.options?.onClick(this.group, this.schema, event);
  }
}
