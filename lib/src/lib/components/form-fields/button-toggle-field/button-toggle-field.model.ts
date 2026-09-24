import { FormFieldBase, FormFieldBaseOptions, Icon, ReactiveBooleanOption } from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';
import { EditType } from '../../../models/editType';
import { TooltipPosition } from '@angular/material/tooltip';

export interface FormFieldButtonToggleOptions extends FormFieldBaseOptions {
  /** The buttons to pick from. Required: without them the field renders an empty row. */
  buttonOptions: {
    /** What the control holds once this button is picked. */
    value: any;
    /** The text on the button. A translation key. Leave it out for an icon-only button. */
    label?: string;
    icon?: Icon & { position?: 'left' | 'right' };
    /** An extra class on this one button, to colour or size it apart from the others. */
    buttonClass?: string;
    /** A tooltip, which is also the only description an icon-only button has. */
    tooltip?: {
      /** A translation key. */
      text: string;
      position?: TooltipPosition;
    };
  }[];
  /**
   * The Material palette of the toggle group.
   * @default 'accent'
   */
  color?: ThemePalette;
  /**
   * Hides the checkmark on the picked button, leaving only its highlight.
   * @default false
   */
  hideSelection?: ReactiveBooleanOption;
  /**
   * Clicking the picked button clears the control instead of leaving it as it is, so the field can
   * go back to having no answer.
   * @default false
   */
  deselectOnClick?: boolean;
}

/**
 * A row of connected buttons, one of which is picked: a compact alternative to a radio group for a
 * handful of short options. It keeps rendering its buttons when the field is readonly, rather than
 * collapsing into text.
 *
 * @example
 * {
 *   attribute: 'view',
 *   title: 'label.view',
 *   editType: EditType.ButtonToggle,
 *   options: {
 *     deselectOnClick: true,
 *     buttonOptions: [
 *       { value: 'list', icon: { name: 'view_list' }, tooltip: { text: 'label.list-view' } },
 *       { value: 'grid', icon: { name: 'grid_view' }, tooltip: { text: 'label.grid-view' } },
 *     ],
 *   },
 * }
 */
export interface FormFieldButtonToggle<T extends string | number = string>
  extends FormFieldBase<T, FormFieldButtonToggleOptions> {
  editType: EditType.ButtonToggle;
}
