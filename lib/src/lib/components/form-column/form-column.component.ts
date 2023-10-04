import { Component, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormComponent } from '../AbstractFormComponent';
import { matLegacyFormFieldAnimations as matFormFieldAnimations } from '@angular/material/legacy-form-field';
import { FormFieldUtils } from '../../utils/form-field.utils';
import { FormColumn } from './form-column.model';
import { Lab900FormField } from '../../models/lab900-form-field.type';

@Component({
  selector: 'lab900-form-column',
  templateUrl: './form-column.component.html',
  styleUrls: ['./form-column.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
})
export class FormColumnComponent extends FormComponent<FormColumn> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public constructor(translateService: TranslateService) {
    super(translateService);
  }

  public get visible(): boolean {
    if (this.options && this.options.visibleFn) {
      return this.options.visibleFn(this);
    }
    return true;
  }

  public columnIsReadonly(field: Lab900FormField): boolean {
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
}
