import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../AbstractFormComponent';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { FormFieldUtils } from '../../utils/form-field.utils';
import { FormRow } from './form-row.model';
import { Lab900FormField } from '../../models/lab900-form-field.type';

@Component({
  selector: 'lab900-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
})
export class FormRowComponent extends FormComponent<FormRow> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public get visible(): boolean {
    if (this.options && this.options.visibleFn) {
      return this.options.visibleFn(this);
    }
    return true;
  }

  public rowIsReadonly(field: Lab900FormField): boolean {
    return field.options?.readonly != null
      ? FormFieldUtils.isReadOnly(
          field.options,
          this.group.value,
          this.readonly
        )
      : FormFieldUtils.isReadOnly(
          this.options,
          this.group.value,
          this.readonly
        );
  }

  public isHidden(field: Lab900FormField): boolean {
    return FormFieldUtils.isHidden(field.options, this.group);
  }

  public infoTooltip(
    field: Lab900FormField
  ): { text: string; icon?: string; class?: string } | null {
    return FormFieldUtils.infoTooltip(field.options, this.group);
  }
}
