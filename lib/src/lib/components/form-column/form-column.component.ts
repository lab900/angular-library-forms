import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../AbstractFormComponent';
import { FormFieldUtils } from '../../utils/form-field.utils';
import { FormColumn } from './form-column.model';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { TranslatePipe } from '@ngx-translate/core';

import { FormFieldDirective } from '../../directives/form-field.directive';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

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

  public infoTooltip(field: Lab900FormField): { text: string; icon?: string; class?: string } | null {
    return field.options ? FormFieldUtils.infoTooltip(field.options, this.group) : null;
  }
}
