import { FormFieldBase, FormFieldBaseOptions, Icon } from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';
import { EditType } from '../../../models/editType';
import { TooltipPosition } from '@angular/material/tooltip';

export interface FormFieldButtonToggleOptions extends FormFieldBaseOptions {
  buttonOptions: {
    value: any;
    label?: string;
    icon?: Icon & { position?: 'left' | 'right' };
    buttonClass?: string;
    tooltip?: {
      text: string;
      position?: TooltipPosition;
    };
  }[];
  color?: ThemePalette;
  deselectOnClick?: boolean;
}

export interface FormFieldButtonToggle<T extends string | number = string>
  extends FormFieldBase<T, FormFieldButtonToggleOptions> {
  editType: EditType.ButtonToggle;
}
