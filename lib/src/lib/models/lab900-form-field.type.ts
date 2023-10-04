import { FormFieldAutocomplete } from '../components/form-fields/autocomplete-field/autocomplete-field.model';
import { FormFieldAutocompleteMulti } from '../components/form-fields/autocomplete-multiple-field/autocomplete-multiple-field.model';
import { FormFieldButton } from '../components/form-fields/button-field/button-field.model';
import { FormFieldButtonToggle } from '../components/form-fields/button-toggle-field/button-toggle-field.model';
import { CheckboxFieldModel } from '../components/form-fields/checkbox-field/checkbox-field.model';
import { FormFieldDatePicker } from '../components/form-fields/date-field/date-field.model';
import { FormFieldDateRange } from '../components/form-fields/date-range-field/date-range-field.model';
import { FormFieldDateTimePicker } from '../components/form-fields/date-time-field/date-time-field.model';
import { FormFieldFilePreview } from '../components/form-fields/file-preview-field/file-preview-field.model';
import { FormFieldIcon } from '../components/form-fields/icon-field/icon-field.model';
import { FormFieldInput } from '../components/form-fields/input-field/input-field.model';
import { FormFieldMultiLang } from '../components/form-fields/multi-lang-input/multi-lang-input-field.model';
import { FormFieldRadioButtons } from '../components/form-fields/radio-buttons-field/radio-buttons-field.model';
import { FormFieldRangeSlider } from '../components/form-fields/range-slider-field/range-slider-field.model';
import { FormFieldRepeater } from '../components/form-fields/repeater-field/repeater-field.model';
import { FormFieldSelect } from '../components/form-fields/select-field/field-select.model';
import { FormFieldSlideToggle } from '../components/form-fields/slide-toggle-field/slide-toggle-field.model';
import { FormFieldTextarea } from '../components/form-fields/textarea-field/textarea-field.model';
import { WysiwgFieldModel } from '../components/form-fields/wysiwyg-field/wysiwg-field.model';
import { FormRow } from '../components/form-row/form-row.model';
import { FormFieldDragNDropFilePreview } from '../components/form-fields/drag-n-drop-file-field/drag-n-drop-file-field.model';
import { FormFieldPassword } from '../components/form-fields/password-field/password-field.model';
import { FormFieldDateYearMonthPicker } from '../components/form-fields/date-year-month-field/date-year-month-field.model';
import { FormFieldAmount } from '../components/form-fields/amount-field/amount-field.model';
import { FormFieldSearch } from '../components/form-fields/search-field/field-search.model';
import { FormColumn } from '../components/form-column/form-column.model';

export type Lab900FormField<R = any, T extends string | number = string> =
  | FormFieldInput<T>
  | FormFieldPassword<T>
  | FormFieldMultiLang<T>
  | WysiwgFieldModel<T>
  | FormFieldSearch<R, T>
  | FormFieldSelect<R, T>
  | CheckboxFieldModel<T>
  | FormFieldRadioButtons<T>
  | FormFieldFilePreview<T>
  | FormFieldDragNDropFilePreview<T>
  | FormFieldIcon<T>
  | FormRow<T>
  | FormColumn<T>
  | FormFieldButtonToggle<T>
  | FormFieldButton<T>
  | FormFieldSlideToggle<T>
  | FormFieldRangeSlider<T>
  | FormFieldDatePicker<T>
  | FormFieldDateYearMonthPicker<T>
  | FormFieldDateTimePicker<T>
  | FormFieldDateRange<T>
  | FormFieldAutocomplete<R, T>
  | FormFieldAutocompleteMulti<R, T>
  | FormFieldRepeater<T>
  | FormFieldTextarea<T>
  | FormFieldAmount<T>;
