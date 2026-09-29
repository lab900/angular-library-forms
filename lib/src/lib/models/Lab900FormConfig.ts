import { Lab900FormField } from './lab900-form-field.type';

/**
 * The schema of a form. Pass it to the `schema` input of `<lab900-form>`: the form builds its
 * `UntypedFormGroup` from `fields` and renders every field, so there is no template to write.
 *
 * Keep the config in a class field. A new object on every change detection rebuilds the form and
 * loses the values the user has typed.
 */
export interface Lab900FormConfig<R = any, T extends string | number = string, DATE = Date> {
  /** Heading above the fields. A translation key. */
  title?: string;
  /** The fields of the form, in render order. Each one is a member of the `Lab900FormField` union. */
  fields: Lab900FormField<R, T, DATE>[];
  /**
   * Makes every field of the form readonly. A readonly control is disabled, so it leaves
   * `form.value` of a plain `FormGroup`; `Lab900Form.value` uses `getRawValue()` and keeps it.
   */
  readonly?: boolean;
  /**
   * Identifies this form to the conditions of another one. Pass the form under this key in the
   * `externalForms` input of the other form and reference it with `IFieldConditions.externalFormId`.
   * Defaults to a generated id.
   */
  formId?: string;
}
