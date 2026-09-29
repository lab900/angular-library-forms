import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';
import { EditType } from '../../../models/editType';
import { MatSlideToggle } from '@angular/material/slide-toggle';

export interface FormFieldSlideToggleOptions extends FormFieldBaseOptions {
  /** The text next to the toggle. A translation key. Falls back to the `title` of the field. */
  label?: string;
  /**
   * Which side of the toggle the label sits on.
   * @default 'after'
   */
  labelPosition?: MatSlideToggle['labelPosition'];
  /**
   * The Material palette of the toggle.
   * @default 'accent'
   */
  color?: ThemePalette;
}

/**
 * An on/off switch. Use it for a setting that takes effect immediately in the reader's mind; a
 * checkbox reads better for something that is confirmed when the form is submitted.
 *
 * It keeps rendering the toggle when the field is readonly instead of collapsing into text, so the
 * state stays recognisable.
 *
 * @example
 * {
 *   attribute: 'notificationsEnabled',
 *   editType: EditType.SlideToggle,
 *   options: { label: 'label.enable-notifications', labelPosition: 'before' },
 * }
 */
export interface FormFieldSlideToggle<T extends string | number = string>
  extends FormFieldBase<T, FormFieldSlideToggleOptions> {
  editType: EditType.SlideToggle;
}
