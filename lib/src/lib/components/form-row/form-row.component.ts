import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../AbstractFormComponent';
import { FormFieldUtils } from '../../utils/form-field.utils';
import { FormRow } from './form-row.model';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { FormFieldDirective } from '../../directives/form-field.directive';
import { MatIcon } from '@angular/material/icon';

import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lab900-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss'],
  imports: [FormFieldDirective, MatIcon, MatTooltip, TranslatePipe],
})
export class FormRowComponent extends FormComponent<FormRow> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public readonly visible = computed(() => {
    const options = this._options();
    if (options && options.visibleFn) {
      return options.visibleFn(this);
    }
    return true;
  });

  protected readonly nestedFields = computed(() => this._schema().nestedFields);

  public rowIsReadonly(field: Lab900FormField): boolean {
    return field.options?.readonly != null
      ? FormFieldUtils.isReadOnly(field.options, this.group.value, this.readonly)
      : FormFieldUtils.isReadOnly(this.options, this.group.value, this.readonly);
  }

  public isHidden(field: Lab900FormField): boolean {
    return FormFieldUtils.isHidden(field.options, this.group);
  }

  public infoTooltip(field: Lab900FormField): { text: string; icon?: string; class?: string } | null {
    return FormFieldUtils.infoTooltip(field.options, this.group);
  }
}
