export enum EditType {
  Checkbox = 'Checkbox',
  TextArea = 'TextArea',
  Date = 'Date',
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
  Select = 'Select',
  Repeater = 'Repeater',
  RadioButtons = 'RadioButtons',
  RangeSlider = 'RangeSlider',
  Row = 'Row',
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
}
