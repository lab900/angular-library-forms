import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';

export interface FormFieldCheckboxOptions extends FormFieldBaseOptions {
  /**
   * Renders a `null` value as unchecked instead of indeterminate. By default a checkbox has three
   * visible states, because a control that was never answered holds `null` rather than `false`.
   * @default false
   */
  disabledIndeterminate?: boolean;
  /**
   * The Material palette of the checkbox.
   * @default 'accent'
   */
  color?: ThemePalette;
}

/**
 * A single checkbox. The control value is `true`, `false`, or `null` while it has never been
 * answered - which renders as indeterminate unless `disabledIndeterminate` is set.
 *
 * `options.required` demands a truthy value, so it makes the checkbox one that has to be ticked.
 *
 * @example
 * {
 *   attribute: 'acceptsTerms',
 *   title: 'label.accept-terms',
 *   editType: EditType.Checkbox,
 *   options: { required: true, disabledIndeterminate: true },
 * }
 */
export interface CheckboxFieldModel<T extends string | number = string>
  extends FormFieldBase<T, FormFieldCheckboxOptions> {
  editType: EditType.Checkbox;
}
