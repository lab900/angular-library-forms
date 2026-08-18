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
    /**
     * TODO(onpush): each file below keeps `ChangeDetectionStrategy.Eager` because its template reads
     * state that Angular does not signal: the non-reactive `touched` / `valid` getters of
     * `AbstractFormComponent`, or a plain field written by `writeValue()`. A parent calling
     * `markAllAsTouched()` or `patchValue()` would not repaint them under OnPush.
     *
     * Fix per file: derive that state from `AbstractControl.events` (or a signal), switch the component
     * to OnPush, and delete its entry here. Delete this whole block once the list is empty.
     */
    files: [
      '**/button-toggle-field.component.ts',
      '**/slide-toggle-field.component.ts',
      '**/multi-lang-input-field.component.ts',
      '**/drag-n-drop-file-field.component.ts',
      '**/range-slider-field.component.ts',
      '**/mat-range-slider-field.component.ts',
      '**/search-field.component.ts',
      '**/form-dialog.component.ts',
    ],
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
    },
  }
);
