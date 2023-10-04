import {
  FormFieldBase,
  FormFieldBaseOptions,
} from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';
import { EditType } from '../../../models/editType';
import { Lab900FormField } from '../../../models/lab900-form-field.type';
import { Lab900ButtonType } from '@lab900/ui';
import { UntypedFormGroup } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

export interface FormFieldButtonOptions extends FormFieldBaseOptions {
  type: Lab900ButtonType;
  color?: ThemePalette;
  disabled?: boolean;
  onClick?: (
    formGroup: UntypedFormGroup,
    currentScheme: Lab900FormField,
    event: Event
  ) => any;
  label?: string;
  tooltip?: {
    text: string;
    position?: TooltipPosition;
  };
  prefixIcon?: string;
  suffixIcon?: string;
  svgIcon?: boolean;
  containerClass?: string;
}

export interface FormFieldButton<T extends string | number = string>
  extends FormFieldBase<T, FormFieldButtonOptions> {
  editType: EditType.Button;
}
