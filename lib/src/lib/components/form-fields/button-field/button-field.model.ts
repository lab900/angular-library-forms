import { FormFieldBase, FormFieldBaseOptions, ReactiveStringOption } from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';
import { EditType } from '../../../models/editType';
import { Lab900FormField } from '../../../models/lab900-form-field.type';
import { Lab900ButtonType } from '@lab900/ui';
import { UntypedFormGroup } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

export interface FormFieldButtonOptions extends FormFieldBaseOptions {
  /** Which `@lab900/ui` button to render: filled, stroked, icon-only and so on. Required. */
  type: Lab900ButtonType;
  /**
   * The Material palette of the button.
   * @default 'accent'
   */
  color?: ThemePalette;
  /**
   * Runs on click, with the group this button sits in, its own schema, and the DOM event. It is not
   * a submit: the form has no submit of its own, so do the work here.
   */
  onClick?: (formGroup: UntypedFormGroup, currentScheme: Readonly<Lab900FormField>, event: Event) => any;
  /** The text on the button. A translation key. */
  label?: ReactiveStringOption;
  /** A tooltip, which is also the only description an icon-only button has. */
  tooltip?: {
    /** A translation key. */
    text: string;
    position?: TooltipPosition;
  };
  /** An icon before the label. A Material ligature, or an svg name when `svgIcon` is set. */
  prefixIcon?: ReactiveStringOption;
  /** An icon after the label. A Material ligature, or an svg name when `svgIcon` is set. */
  suffixIcon?: ReactiveStringOption;
  /**
   * Reads `prefixIcon` and `suffixIcon` as svg names registered in `MatIconRegistry` instead of as
   * Material ligatures.
   * @default false
   */
  svgIcon?: boolean;
  /** An extra class on the element around the button, for spacing it inside the layout. */
  containerClass?: string;
  /** The `id` of the button element, for a test hook or an anchor. */
  buttonId?: string;
}

/**
 * A button inside the schema, so an action can sit between the fields instead of outside the form.
 *
 * It holds no value: leave out `attribute`, or the group gains a control that stays empty. It keeps
 * rendering when the field is readonly, so guard the action with `options.hide` or `options.readonly`
 * on its own terms.
 *
 * @example
 * {
 *   editType: EditType.Button,
 *   options: {
 *     type: 'stroked',
 *     label: 'label.check-vat',
 *     prefixIcon: 'search',
 *     colspan: 3,
 *     hide: data => !data?.vatNumber,
 *     onClick: group => this.vatService.check(group.getRawValue().vatNumber),
 *   },
 * }
 */
export interface FormFieldButton<T extends string | number = string> extends FormFieldBase<T, FormFieldButtonOptions> {
  editType: EditType.Button;
}
