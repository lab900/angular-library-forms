const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lab900',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'lab900',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: ['static-field', 'instance-field', 'constructor', 'static-method', 'instance-method'],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-output-rename': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/no-autofocus': 'off',
    },
  },
  eslintPluginPrettierRecommended,
  {
    // TODO(onpush): the components below keep `ChangeDetectionStrategy.Eager`. The rule is a warning here
    // and stays an error everywhere else. See the change detection follow-up in
    // ANGULAR-UPGRADE-19.2-TO-22.1.md. Delete an entry when its component moves to OnPush, and delete this
    // whole block once the list is empty.
    files: [
      '**/app.component.ts',
      '**/autocomplete-field.component.ts',
      '**/autocomplete-multiple-field.component.ts',
      '**/button-field.component.ts',
      '**/button-toggle-field.component.ts',
      '**/date-field.component.ts',
      '**/date-range-field.component.ts',
      '**/date-time-field.component.ts',
      '**/date-year-month-field.component.ts',
      '**/drag-n-drop-file-field.component.ts',
      '**/form-column.component.ts',
      '**/form-container.component.ts',
      '**/form-dialog.component.ts',
      '**/image-preview-modal.component.ts',
      '**/mat-range-slider-field.component.ts',
      '**/multi-lang-input-field.component.ts',
      '**/password-field.component.ts',
      '**/range-slider-field.component.ts',
      '**/search-field.component.ts',
      '**/slide-toggle-field.component.ts',
    ],
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
    },
  }
);
