import { EditType } from '../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../models/form-field-base';

export interface FormColumnOptions extends FormFieldBaseOptions {
  /** An extra class on the column element, next to `lab900-form-column`. */
  customClass?: string;
  /** An extra class on the column's title, next to `lab900-form-field-label lab900-form-row-label`. */
  customTitleClass?: string;
}

/**
 * A column that stacks its `nestedFields` vertically, where a `FormRow` lays them out across the 12
 * column grid. Use `options.colspan` to say how wide the column itself is. It holds no value of its
 * own.
 *
 * Like a row, an `attribute` makes it a nested `FormGroup` and no attribute flattens the children
 * into the parent group. It renders its own readonly state.
 *
 * @example
 * {
 *   editType: EditType.Row,
 *   nestedFields: [
 *     {
 *       editType: EditType.Column,
 *       title: 'label.billing',
 *       options: { colspan: 6 },
 *       nestedFields: [
 *         { attribute: 'billingStreet', title: 'label.street', editType: EditType.Input },
 *         { attribute: 'billingCity', title: 'label.city', editType: EditType.Input },
 *       ],
 *     },
 *     {
 *       editType: EditType.Column,
 *       title: 'label.shipping',
 *       options: { colspan: 6 },
 *       nestedFields: [
 *         { attribute: 'shippingStreet', title: 'label.street', editType: EditType.Input },
 *         { attribute: 'shippingCity', title: 'label.city', editType: EditType.Input },
 *       ],
 *     },
 *   ],
 * }
 */
export interface FormColumn<T extends number | string = string> extends FormFieldBase<T, FormColumnOptions> {
  editType: EditType.Column;
}
