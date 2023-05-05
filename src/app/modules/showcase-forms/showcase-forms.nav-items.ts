import { NavItemGroup } from '@lab900/ui';
import { showcaseFormsConfig } from './showcase-forms.constants';

export const showcaseFormsNavItems: NavItemGroup[] = [
  {
    label: showcaseFormsConfig?.title,
    items: [
      {
        label: 'label.guides',
        children: [
          {
            label: 'label.getting-started',
            route: 'getting-started',
          },
          {
            label: 'Create dynamic forms',
            route: 'form-container',
          },
          {
            label: 'Conditional Forms',
            route: 'conditional-forms',
          },
        ],
      },
      {
        label: 'forms.form-fields',
        children: [
          {
            label: 'Amount',
            route: 'form-field-amount',
          },
          {
            label: 'Autocomplete',
            route: 'form-field-autocomplete',
          },
          {
            label: 'Input & Textarea',
            route: 'form-field-input',
          },
          {
            label: 'Radio Buttons',
            route: 'form-field-radio-buttons',
          },
          {
            label: 'Button Toggle',
            route: 'form-field-button-toggle',
          },
          {
            label: 'Button',
            route: 'form-field-button',
          },
          {
            label: 'Slide Toggle',
            route: 'form-field-slide-toggle',
          },
          {
            label: 'Search',
            route: 'form-field-search',
          },
          {
            label: 'Select',
            route: 'form-field-select',
          },
          {
            label: 'Range slider',
            route: 'form-field-range-slider',
          },
          {
            label: 'Repeater',
            route: 'form-field-repeater',
          },
          {
            label: 'Datepicker',
            route: 'form-field-datepicker',
          },
          {
            label: 'File upload',
            route: 'form-field-file-upload',
          },
          {
            label: 'File Drag N Drop',
            route: 'form-field-drag-n-drop-file-upload',
          },
          {
            label: 'Multi language',
            route: 'form-field-multi-lang',
          },
          {
            label: 'Nested groups',
            route: 'form-field-nested-groups',
          },
        ],
      },
    ],
  },
];
