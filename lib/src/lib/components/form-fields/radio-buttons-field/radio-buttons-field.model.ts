import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions, ValueLabel } from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';

export interface FormFieldRadioButtonsOptions extends FormFieldBaseOptions {
  /** The options to pick from. Required: without them the group renders empty. */
  radioOptions: ValueLabel[];
  /**
   * The Material palette of the radio buttons.
   * @default 'accent'
   */
  color?: ThemePalette;
}

/**
 * A radio group: every option is visible at once and exactly one can be picked. Use
 * `EditType.Select` when the list is long, and `EditType.ButtonToggle` for a compact row.
 *
 * The options are a plain array, so they cannot be loaded from a server. Use a condition's
 * `conditionalOptions`, or an `EditType.Select`, when they depend on something else.
 *
 * @example
 * {
 *   attribute: 'shippingMethod',
 *   title: 'label.shipping',
 *   editType: EditType.RadioButtons,
 *   options: {
 *     required: true,
 *     radioOptions: [
 *       { value: 'standard', label: 'label.standard' },
 *       { value: 'express', label: 'label.express' },
 *       { value: 'pickup', label: 'label.pickup', disabled: true },
 *     ],
 *   },
 * }
 */
export interface FormFieldRadioButtons<T extends string | number = string>
  extends FormFieldBase<T, FormFieldRadioButtonsOptions> {
  editType: EditType.RadioButtons;
}
