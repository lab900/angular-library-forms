import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import {
  MAT_LEGACY_FORM_FIELD_DEFAULT_OPTIONS as MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatLegacyFormFieldModule as MatFormFieldModule,
} from '@angular/material/legacy-form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Lab900ButtonModule } from '@lab900/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Lab900Form } from './components/form-container/form-container.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { AutocompleteFieldComponent } from './components/form-fields/autocomplete-field/autocomplete-field.component';
import { AutocompleteMultipleFieldComponent } from './components/form-fields/autocomplete-multiple-field/autocomplete-multiple-field.component';
import { ButtonFieldComponent } from './components/form-fields/button-field/button-field.component';
import { ButtonToggleFieldComponent } from './components/form-fields/button-toggle-field/button-toggle-field.component';
import { CheckboxFieldComponent } from './components/form-fields/checkbox-field/checkbox-field.component';
import { DateFieldComponent } from './components/form-fields/date-field/date-field.component';
import { DateYearMonthFieldComponent } from './components/form-fields/date-year-month-field/date-year-month-field.component';
import { DateRangeFieldComponent } from './components/form-fields/date-range-field/date-range-field.component';
import { DateTimeFieldComponent } from './components/form-fields/date-time-field/date-time-field.component';
import { DragNDropFileFieldComponent } from './components/form-fields/drag-n-drop-file-field/drag-n-drop-file-field.component';
import { FilePreviewFieldComponent } from './components/form-fields/file-preview-field/file-preview-field.component';
import { IconFieldComponent } from './components/form-fields/icon-field/icon-field.component';
import { InputFieldComponent } from './components/form-fields/input-field/input-field.component';
import { MultiLangFieldControlComponent } from './components/form-fields/multi-lang-input/multi-lang-field-control/multi-lang-field-control.component';
import { MultiLangInputFieldComponent } from './components/form-fields/multi-lang-input/multi-lang-input-field.component';
import { RadioButtonsFieldComponent } from './components/form-fields/radio-buttons-field/radio-buttons-field.component';
import { MatRangeSliderFieldComponent } from './components/form-fields/range-slider-field/mat-range-slider-field/mat-range-slider-field.component';
import { RangeSliderFieldComponent } from './components/form-fields/range-slider-field/range-slider-field.component';
import { ReadonlyFieldComponent } from './components/form-fields/readonly-field/readonly-field.component';
import { RepeaterFieldComponent } from './components/form-fields/repeater-field/repeater-field.component';
import { SelectFieldComponent } from './components/form-fields/select-field/select-field.component';
import { SlideToggleFieldComponent } from './components/form-fields/slide-toggle-field/slide-toggle-field.component';
import { TextareaFieldComponent } from './components/form-fields/textarea-field/textarea-field.component';
import { UnknownFieldComponent } from './components/form-fields/unknown-field/unknown-field.component';
import { WysiwygFieldComponent } from './components/form-fields/wysiwyg-field/wysiwyg-field.component';
import { FormRowComponent } from './components/form-row/form-row.component';
import { IconComponent } from './components/icon/icon.component';
import { ImagePreviewModalComponent } from './components/image-preview-modal/image-preview-modal.component';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { AuthImageDirective } from './directives/auth-image.directive';
import { AutofocusDirective } from './directives/auto-focus.directive';
import { FileDropDirective } from './directives/file-drop.directive';
import { FormDialogDirective } from './directives/form-dialog.directive';
import { FormFieldDirective } from './directives/form-field.directive';
import {
  defaultFormModuleSettings,
  LAB900_FORM_FIELD_TYPES,
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from './models/Lab900FormModuleSettings';
import { Lab900FormBuilderService } from './services/form-builder.service';
import { PasswordFieldComponent } from './components/form-fields/password-field/password-field.component';
import { AmountFieldComponent } from './components/form-fields/amount-field/amount-field.component';
import { AmountInputDirective } from './components/form-fields/amount-field/amount-input.directive';
import { AmountPipe } from './components/form-fields/amount-field/amount.pipe';
import { FormColumnComponent } from './components/form-column/form-column.component';
import { SearchFieldComponent } from './components/form-fields/search-field/search-field.component';
import { SearchInputDirective } from './components/form-fields/search-field/search-input.directive';

const customFields = [
  UnknownFieldComponent,
  InputFieldComponent,
  PasswordFieldComponent,
  SelectFieldComponent,
  FilePreviewFieldComponent,
  DragNDropFileFieldComponent,
  CheckboxFieldComponent,
  DateFieldComponent,
  DateYearMonthFieldComponent,
  WysiwygFieldComponent,
  TextareaFieldComponent,
  RepeaterFieldComponent,
  FormRowComponent,
  FormColumnComponent,
  RadioButtonsFieldComponent,
  RangeSliderFieldComponent,
  AutocompleteFieldComponent,
  AutocompleteMultipleFieldComponent,
  IconFieldComponent,
  ButtonToggleFieldComponent,
  ButtonFieldComponent,
  SlideToggleFieldComponent,
  ReadonlyFieldComponent,
  DateRangeFieldComponent,
  DateTimeFieldComponent,
  SearchFieldComponent,
  AmountFieldComponent,
  MultiLangInputFieldComponent,
];

@NgModule({
  declarations: [
    FormFieldDirective,
    FormDialogDirective,
    Lab900Form,
    FormDialogComponent,
    MatRangeSliderFieldComponent,
    IconComponent,
    ImagePreviewModalComponent,
    AuthImageDirective,
    AutofocusDirective,
    FileDropDirective,
    LanguagePickerComponent,
    MultiLangFieldControlComponent,
    AmountInputDirective,
    AmountPipe,
    SearchInputDirective,
    ...customFields,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AngularEditorModule,
    HttpClientModule,
    TranslateModule,
    MatButtonToggleModule,
    MatChipsModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSelectInfiniteScrollModule,
    NgxMatSelectSearchModule,
    Lab900ButtonModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [
    Lab900Form,
    FormDialogDirective,
    AuthImageDirective,
    AutofocusDirective,
    SelectFieldComponent,
    AmountInputDirective,
    AmountPipe,
    InputFieldComponent,
  ],
})
export class Lab900FormsModule {
  public static forRoot(
    settings: Lab900FormModuleSettings = defaultFormModuleSettings
  ): ModuleWithProviders<FormsModule> {
    const formSetting: Lab900FormModuleSettings = {
      formField: {
        ...defaultFormModuleSettings.formField,
        ...(settings?.formField ?? {}),
      },
      fieldMask: {
        ...defaultFormModuleSettings.fieldMask,
        ...(settings?.fieldMask ?? {}),
      },
      amountField: {
        ...defaultFormModuleSettings.amountField,
        ...(settings?.amountField ?? {}),
      },
      disableBrowserAutocomplete: settings?.disableBrowserAutocomplete ?? false,
    };
    return {
      ngModule: Lab900FormsModule,
      providers: [
        Lab900FormBuilderService,
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: formSetting.formField,
        },
        {
          provide: LAB900_FORM_MODULE_SETTINGS,
          useValue: formSetting,
        },
        {
          provide: LAB900_FORM_FIELD_TYPES,
          useValue: {
            UnknownFieldComponent,
            InputFieldComponent,
            PasswordFieldComponent,
            SelectFieldComponent,
            FilePreviewFieldComponent,
            DragNDropFileFieldComponent,
            CheckboxFieldComponent,
            DateFieldComponent,
            DateYearMonthFieldComponent,
            WysiwygFieldComponent,
            TextareaFieldComponent,
            RepeaterFieldComponent,
            FormRowComponent,
            FormColumnComponent,
            RadioButtonsFieldComponent,
            RangeSliderFieldComponent,
            AutocompleteFieldComponent,
            AutocompleteMultipleFieldComponent,
            IconFieldComponent,
            ButtonToggleFieldComponent,
            ButtonFieldComponent,
            SlideToggleFieldComponent,
            ReadonlyFieldComponent,
            DateRangeFieldComponent,
            DateTimeFieldComponent,
            MultiLangInputFieldComponent,
            AmountFieldComponent,
            SearchFieldComponent,
          },
        },
      ],
    };
  }
}
