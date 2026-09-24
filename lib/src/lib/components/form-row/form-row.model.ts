import { EditType } from '../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../models/form-field-base';

export interface FormRowOptions extends FormFieldBaseOptions {
  /** An extra class on the row element, next to `lab900-form-row`. */
  customClass?: string;
  /** An extra class on the row's title, next to `lab900-form-field-label lab900-form-row-label`. */
  customTitleClass?: string;
}

/**
 * A row of the 12 column grid, holding its children in `nestedFields`. It holds no value of its own.
 *
 * **The `attribute` decides the shape of the data.** With one, the row creates a nested `FormGroup`
 * and its children live under that key; without one, the children are flattened into the parent
 * group and the row is layout only. A dotted attribute on a field (`address.street`) creates the
 * same nesting without a row, so reach for a row when you want the grouping *and* the layout.
 *
 * It renders its own readonly state, since a single readonly field cannot render children.
 *
 * @example
 * {
 *   editType: EditType.Row,
 *   attribute: 'address', // -> { address: { street, city } }
 *   title: 'label.address',
 *   nestedFields: [
 *     { attribute: 'street', title: 'label.street', editType: EditType.Input, options: { colspan: 8 } },
 *     { attribute: 'city', title: 'label.city', editType: EditType.Input, options: { colspan: 4 } },
 *   ],
 * }
 */
export interface FormRow<T extends number | string = string> extends FormFieldBase<T, FormRowOptions> {
  editType: EditType.Row;
}
