import {
  FormFieldBase,
  FormFieldBaseOptions,
  FormIcon,
} from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';
import { EditType } from '../../../models/editType';
import { TooltipPosition } from '@angular/material/tooltip';

export interface FormFieldButtonOption {
  value: any;
  label?: string;
  icon?: FormIcon;
  buttonClass?: string;
  tooltip?: {
    text: string;
    position?: TooltipPosition;
  };
}

export interface FormFieldButtonToggleOptions extends FormFieldBaseOptions {
  buttonOptions: FormFieldButtonOption[];
  color?: ThemePalette;
  deselectOnClick?: boolean;
}

export interface FormFieldButtonToggle<T extends string | number = string>
  extends FormFieldBase<T, FormFieldButtonToggleOptions> {
  editType: EditType.ButtonToggle;
}
