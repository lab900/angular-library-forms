import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Lab900ButtonModule } from '@lab900/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMaskModule } from 'ngx-mask';
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
import { FileFieldComponent } from './components/form-fields/file-field/file-field.component';
import { MatFileFieldComponent } from './components/form-fields/file-field/mat-file-field/mat-file-field.component';
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
  Lab900FormModuleSettings,
  LAB900_FORM_MODULE_SETTINGS,
  LAB900_FORM_FIELD_TYPES,
} from './models/Lab900FormModuleSettings';
import { Lab900FormBuilderService } from './services/form-builder.service';
import { PasswordFieldComponent } from './components/form-fields/password-field/password-field.component';
import { AmountFieldComponent } from './components/form-fields/amount-field/amount-field.component';
import { AmountInputDirective } from './components/form-fields/amount-field/amount-input.directive';
import { AmountPipe } from './components/form-fields/amount-field/amount.pipe';

const customFields = [
  UnknownFieldComponent,
  InputFieldComponent,
  PasswordFieldComponent,
  SelectFieldComponent,
  FileFieldComponent,
  FilePreviewFieldComponent,
  DragNDropFileFieldComponent,
  CheckboxFieldComponent,
  DateFieldComponent,
  DateYearMonthFieldComponent,
  WysiwygFieldComponent,
  TextareaFieldComponent,
  RepeaterFieldComponent,
  FormRowComponent,
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
];

@NgModule({
  declarations: [
    FormFieldDirective,
    FormDialogDirective,
    Lab900Form,
    FormDialogComponent,
    MatFileFieldComponent,
    MatRangeSliderFieldComponent,
    ...customFields,
    IconComponent,
    ImagePreviewModalComponent,
    AuthImageDirective,
    AutofocusDirective,
    FileDropDirective,
    MultiLangInputFieldComponent,
    LanguagePickerComponent,
    MultiLangFieldControlComponent,
    AmountFieldComponent,
    AmountInputDirective,
    AmountPipe,
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
    NgxMaskModule,
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
  ],
  exports: [
    Lab900Form,
    InputFieldComponent,
    FormDialogDirective,
    AuthImageDirective,
    AutofocusDirective,
    SelectFieldComponent,
    AmountInputDirective,
    AmountPipe,
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
            FileFieldComponent,
            FilePreviewFieldComponent,
            DragNDropFileFieldComponent,
            CheckboxFieldComponent,
            DateFieldComponent,
            DateYearMonthFieldComponent,
            WysiwygFieldComponent,
            TextareaFieldComponent,
            RepeaterFieldComponent,
            FormRowComponent,
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
          },
        },
      ],
    };
  }
}
