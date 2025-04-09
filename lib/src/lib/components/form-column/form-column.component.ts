import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../AbstractFormComponent';
import { FormFieldUtils } from '../../utils/form-field.utils';
import { FormColumn } from './form-column.model';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { TranslatePipe } from '@ngx-translate/core';

import { FormFieldDirective } from '../../directives/form-field.directive';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lab900-form-column',
  templateUrl: './form-column.component.html',
  styleUrls: ['./form-column.component.scss'],
  imports: [TranslatePipe, FormFieldDirective, MatIcon, MatTooltip],
})
export class FormColumnComponent extends FormComponent<FormColumn> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  protected readonly nestedFields = computed(() => this._schema().nestedFields);
  protected readonly columnLabel = computed(() => {
    if (this.fieldIsReadonly() && this.readonlyLabel()) {
      return this.readonlyLabel();
    }
    return this.label();
  });
  protected readonly formGroup = computed(() => {
    const fieldAttribute = this._fieldAttribute();
    const group = this._group();
    return (fieldAttribute ? group.get(fieldAttribute) : group) as FormGroup | undefined;
  });

  public infoTooltip(field: Lab900FormField): { text: string; icon?: string; class?: string } | null {
    return field.options ? FormFieldUtils.infoTooltip(field.options, this.group) : null;
  }
}
