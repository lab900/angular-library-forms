import {
  FormFieldBase,
  FormFieldBaseOptions,
} from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';
import { EditType } from '../../../models/editType';
import { MatLegacySlideToggle as MatSlideToggle } from '@angular/material/legacy-slide-toggle';

export interface FormFieldSlideToggleOptions extends FormFieldBaseOptions {
  label?: string;
  labelPosition?: MatSlideToggle['labelPosition'];
  color?: ThemePalette;
}

export interface FormFieldSlideToggle<T extends string | number = string>
  extends FormFieldBase<T, FormFieldSlideToggleOptions> {
  editType: EditType.SlideToggle;
}
