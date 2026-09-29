import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';

export interface FormFieldRepeaterOptions extends FormFieldBaseOptions {
  /**
   * Renders the rows without the add, remove and reorder buttons, so the number of rows is whatever
   * the data holds. The controls stay editable; use `readonly` to lock the values too.
   * @default false
   */
  fixedList?: boolean;
  /**
   * Allows the last rows to be removed, down to an empty array. Without it the remove button stops at
   * `minRows`.
   * @default false
   */
  removeAll?: boolean;
  /**
   * The label of the add button. A translation key.
   * @default 'Add new'
   */
  addLabel?: string;
  /**
   * The number of rows the array starts with and never drops below. `patchValues()` grows the array
   * back to it when the data holds fewer rows.
   * @default 1
   */
  minRows?: number;
  /** Hides the add button once the array holds this many rows. Unlimited when it is not set. */
  maxRows?: number;
  /**
   * The Material palette of the add, remove and reorder buttons.
   * @default 'accent'
   */
  buttonColor?: ThemePalette;
  /**
   * Shows the move up and move down buttons on every row.
   * @default false
   */
  enableReorder?: boolean;
}

/**
 * A group of fields repeated over an `UntypedFormArray`. `nestedFields` is the schema of one row, and
 * the control value is an array of objects.
 *
 * `patchValues()` on `<lab900-form>` grows and shrinks the array to match the data; `setValues()`
 * rebuilds it instead.
 *
 * @example
 * {
 *   attribute: 'contacts',
 *   title: 'label.contacts',
 *   editType: EditType.Repeater,
 *   options: { minRows: 1, maxRows: 5, addLabel: 'label.add-contact', enableReorder: true },
 *   nestedFields: [
 *     { attribute: 'name', title: 'label.name', editType: EditType.Input, options: { colspan: 8 } },
 *     { attribute: 'email', title: 'label.email', editType: EditType.Input, options: { colspan: 4 } },
 *   ],
 * }
 */
export interface FormFieldRepeater<T extends string | number = string>
  extends FormFieldBase<T, FormFieldRepeaterOptions> {
  editType: EditType.Repeater;
}
