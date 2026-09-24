import { EditType } from '../../../models/editType';
import { FormFieldBase } from '../../../models/form-field-base';
import { ThemePalette } from '@angular/material/core';
import { FormFieldInputOptions } from '../input-field/input-field.model';

/** Every option of {@link FormFieldInputOptions}, plus the ones for the language switch. */
export interface FormFieldMultiLangOptions extends FormFieldInputOptions {
  /**
   * The Material palette of the translate button.
   * @default 'accent'
   */
  buttonColor?: ThemePalette;
  /**
   * The label of the button that opens an input per language. A translation key.
   * @default 'Translate'
   */
  translateLabel?: string;
  /**
   * The label of the button that closes them again. A translation key.
   * @default 'Stop translating'
   */
  stopTranslateLabel?: string;
  /**
   * Renders a textarea per language instead of a single line input.
   * @default false
   */
  useTextAreaField?: boolean;
}

/**
 * One value per language. The control value is an object keyed by language code:
 *
 * ```ts
 * { title: { en: 'Welcome', nl: 'Welkom' } }
 * ```
 *
 * The field edits the language in the `language` input of `<lab900-form>` and offers the ones in
 * `availableLanguages`; the translate button opens an input for every language at once.
 *
 * It renders its own readonly state, so a readonly field keeps showing one value per language
 * instead of collapsing an object into text.
 *
 * @example
 * <lab900-form [schema]="schema" [(data)]="page" language="en"
 *              [availableLanguages]="[{ value: 'en', label: 'English' }, { value: 'nl', label: 'Nederlands' }]" />
 *
 * // and in the schema:
 * { attribute: 'title', title: 'label.title', editType: EditType.MultiLangInput, options: { required: true } }
 */
export interface FormFieldMultiLang<T extends string | number = string>
  extends FormFieldBase<T, FormFieldMultiLangOptions> {
  editType: EditType.MultiLangInput;
}
