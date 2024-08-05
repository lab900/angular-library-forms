import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../AbstractFormComponent';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { FormFieldUtils } from '../../utils/form-field.utils';
import { FormColumn } from './form-column.model';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { TranslateModule } from '@ngx-translate/core';

import { FormFieldDirective } from '../../directives/form-field.directive';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'lab900-form-column',
  templateUrl: './form-column.component.html',
  styleUrls: ['./form-column.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
  standalone: true,
  imports: [TranslateModule, FormFieldDirective, MatIcon, MatTooltip],
})
export class FormColumnComponent extends FormComponent<FormColumn> {
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

  public columnIsReadonly(field: Lab900FormField): boolean {
    return field.options?.readonly != null
      ? FormFieldUtils.isReadOnly(
          field.options,
          this.group.value,
          this.readonly,
        )
      : FormFieldUtils.isReadOnly(
          this.options,
          this.group.value,
          this.readonly,
        );
  }

  public isHidden(field: Lab900FormField): boolean {
    return FormFieldUtils.isHidden(field.options, this.group);
  }

  public infoTooltip(
    field: Lab900FormField,
  ): { text: string; icon?: string; class?: string } | null {
    return FormFieldUtils.infoTooltip(field.options, this.group);
  }
}
