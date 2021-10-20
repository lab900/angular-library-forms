import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormConditionalsExampleComponent } from './examples/form-conditionals-example/form-conditionals-example.component';
import { FormCondtionalValidationExampleComponent } from './examples/form-condtional-validation-example/form-condtional-validation-example.component';
import { FormCondtionalWithExternalFormExampleComponent } from './examples/form-condtional-with-external-form-example/form-condtional-with-external-form-example.component';
import { FormContainerExampleComponent } from './examples/form-container-example/form-container-example.component';
import { FormContainerReadonlyExampleComponent } from './examples/form-container-example/form-container-readonly-example.component';
import { FormFieldAutocompleteExampleComponent } from './examples/form-field-autocomplete-example/form-field-autocomplete-example.component';
import { FormFieldAutocompleteMultipleExampleComponent } from './examples/form-field-autocomplete-example/form-field-autocomplete-multiple-example.component';
import { FormFieldButtonExampleComponent } from './examples/form-field-button-example/form-field-button-example.component';
import { FormFieldButtonToggleExampleComponent } from './examples/form-field-button-toggle-example/form-field-button-toggle-example.component';
import { FormFieldDateRangePickerExampleComponent } from './examples/form-field-date-range-picker-example/form-field-date-range-picker-example.component';
import { FormFieldDateTimePickerExampleComponent } from './examples/form-field-date-time-picker-example/form-field-date-time-picker-example.component';
import { FormFieldDragNDropFileExampleComponent } from './examples/form-field-drag-n-drop-file-example/form-field-drag-n-drop-file-example.component';
import { FormFieldFileUploadExampleComponent } from './examples/form-field-file-upload-example/form-field-file-upload-example.component';
import { FormFieldInputsExampleComponent } from './examples/form-field-inputs-example/form-field-inputs-example.component';
import { FormFieldMultiLanguageExampleComponent } from './examples/form-field-multi-language-example/form-field-multi-language-example.component';
import { FormFieldNestedGroupsByAttributeExampleComponent } from './examples/form-field-nested-groups-by-attribute-example/form-field-nested-groups-by-attribute-example.component';
import { FormFieldNestedGroupsExampleComponent } from './examples/form-field-nested-groups-example/form-field-nested-groups-example.component';
import { FormFieldRadioButtonsExampleComponent } from './examples/form-field-radio-buttons-example/form-field-radio-buttons-example.component';
import { FormFieldRangeSliderExampleComponent } from './examples/form-field-range-slider-example/form-field-range-slider-example.component';
import { FormFieldRepeaterAdvancedExampleComponent } from './examples/form-field-repeater-advanced-example/form-field-repeater-advanced-example.component';
import { FormFieldRepeaterExampleComponent } from './examples/form-field-repeater-example/form-field-repeater-example.component';
import { FormFieldRepeaterFixedExampleComponent } from './examples/form-field-repeater-fixed-example/form-field-repeater-fixed-example.component';
import { FormFieldSelectAdvancedExampleComponent } from './examples/form-field-select-example/form-field-select-advanced-example.component';
import { FormFieldSelectExampleComponent } from './examples/form-field-select-example/form-field-select-example.component';
import { FormFieldSlideToggleExampleComponent } from './examples/form-field-slide-toggle-example/form-field-slide-toggle-example.component';
import { FormFieldTextareaExampleComponent } from './examples/form-field-textarea-example/form-field-textarea-example.component';
import { ShowcaseFormsRoutingModule } from './showcase-forms-routing.module';

const examples = [
  FormFieldRepeaterExampleComponent,
  FormFieldRepeaterAdvancedExampleComponent,
  FormFieldRepeaterFixedExampleComponent,
  FormFieldInputsExampleComponent,
  FormFieldTextareaExampleComponent,
  FormFieldRadioButtonsExampleComponent,
  FormFieldRangeSliderExampleComponent,
  FormFieldAutocompleteExampleComponent,
  FormFieldAutocompleteMultipleExampleComponent,
  FormFieldButtonToggleExampleComponent,
  FormFieldButtonExampleComponent,
  FormFieldSlideToggleExampleComponent,
  FormContainerExampleComponent,
  FormConditionalsExampleComponent,
  FormContainerReadonlyExampleComponent,
  FormFieldDateRangePickerExampleComponent,
  FormFieldDateTimePickerExampleComponent,
  FormFieldSelectExampleComponent,
  FormFieldFileUploadExampleComponent,
  FormFieldDragNDropFileExampleComponent,
  FormFieldMultiLanguageExampleComponent,
  FormCondtionalValidationExampleComponent,
  FormCondtionalWithExternalFormExampleComponent,
  FormFieldSelectAdvancedExampleComponent,
  FormFieldNestedGroupsExampleComponent,
  FormFieldNestedGroupsByAttributeExampleComponent,
];

@NgModule({
  declarations: examples,
  imports: [CommonModule, SharedModule, ShowcaseFormsRoutingModule],
})
export class ShowcaseFormsModule {}
