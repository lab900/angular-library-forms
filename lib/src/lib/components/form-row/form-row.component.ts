import { ChangeDetectionStrategy, Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../AbstractFormComponent';
import { FormFieldUtils } from '../../utils/form-field.utils';
import { FormRow } from './form-row.model';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { FormFieldDirective } from '../../directives/form-field.directive';
import { MatIcon } from '@angular/material/icon';

import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lab900-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss'],
  imports: [FormFieldDirective, MatIcon, MatTooltip, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRowComponent extends FormComponent<FormRow> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  protected readonly rowLabel = computed(() => {
    if (this.fieldIsReadonly() && this.readonlyLabel()) {
      return this.readonlyLabel();
    }
    return this.label();
  });

  protected readonly nestedFields = computed(() => this._schema().nestedFields);
  protected readonly formGroup = computed(() => {
    const fieldAttribute = this._fieldAttribute();
    const group = this._group();
    return (fieldAttribute ? group.get(fieldAttribute) : group) as FormGroup | undefined;
  });

  public infoTooltip(field: Lab900FormField): { text: string; icon?: string; class?: string } | null {
    return field.options ? FormFieldUtils.infoTooltip(field.options, this.group) : null;
  }
}
