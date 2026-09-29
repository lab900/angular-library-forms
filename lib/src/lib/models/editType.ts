/**
 * Picks the component that renders a field. It also discriminates the `Lab900FormField` union, so
 * setting it narrows `options` to the options interface of that field.
 *
 * `FormFieldMappingService` maps a member to a component class, read from the
 * `LAB900_FORM_FIELD_TYPES` token. A value with no mapping renders `UnknownFieldComponent` instead
 * of throwing.
 */
export enum EditType {
  Checkbox = 'Checkbox',
  TextArea = 'TextArea',
  Date = 'Date',
  DateYearMonth = 'DateYearMonth',
  Wysiwyg = 'Wysiwyg',
  Input = 'Input',
  Password = 'Password',
  /**
   *
   * @deprecated Deprecated in favor of {@link FilePreview}
   */
  File = 'File',
  FilePreview = 'FilePreview',
  DragNDrop = 'DragNDrop',
  Search = 'Search',
  Select = 'Select',
  Repeater = 'Repeater',
  RadioButtons = 'RadioButtons',
  RangeSlider = 'RangeSlider',
  Row = 'Row',
  Column = 'Column',
  /**
   *
   * @deprecated Please use {@link Select} instead with search option
   */
  Autocomplete = 'Autocomplete',
  /**
   *
   * @deprecated Please use {@link Select} instead with search option
   */
  AutocompleteMultiple = 'AutocompleteMultiple',
  Icon = 'Icon',
  ButtonToggle = 'ButtonToggle',
  Button = 'Button',
  SlideToggle = 'SlideToggle',
  DateRange = 'DateRange',
  DateTime = 'DateTime',
  MultiLangInput = 'MultiLangInput',
  Amount = 'Amount',
}
