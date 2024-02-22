import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
} from '../../../models/form-field-base';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

export interface FormFieldDatePickerOptions<T = Date>
  extends FormFieldBaseOptions {
  startView?: 'month' | 'year' | 'multi-year';
  maxDate?: T;
  minDate?: T;
  /**
   * Function to filter which dates are selectable in the datepicker
   */
  dateFilter?: (date: T | null) => boolean;
  /**
   * Function that can be used to add custom CSS classes to dates
   */
  dateClass?: MatCalendarCellClassFunction<T>;
}

export interface FormFieldDatePicker<T extends string | number = string>
  extends FormFieldBase<T, FormFieldDatePickerOptions> {
  editType: EditType.Date;
}
