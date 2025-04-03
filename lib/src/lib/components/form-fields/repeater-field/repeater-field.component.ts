import { Component, computed, HostBinding, inject } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
import { Lab900FormBuilderService } from '../../../services/form-builder.service';
import { MatError, matFormFieldAnimations } from '@angular/material/form-field';
import { FormFieldRepeater } from './repeater-field.model';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatTooltip } from '@angular/material/tooltip';
import { FormFieldDirective } from '../../../directives/form-field.directive';
import { MatButton, MatMiniFabButton } from '@angular/material/button';

export const DEFAULT_REPEATER_MIN_ROWS = 1;

@Component({
  selector: 'lab900-repeater-field',
  templateUrl: './repeater-field.component.html',
  styleUrls: ['./repeater-field.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
  imports: [
    ReactiveFormsModule,
    MatIcon,
    TranslatePipe,
    MatTooltip,
    FormFieldDirective,
    MatMiniFabButton,
    MatError,
    MatButton,
  ],
})
export class RepeaterFieldComponent extends FormComponent<FormFieldRepeater> {
  private readonly fb: Lab900FormBuilderService = inject(Lab900FormBuilderService);

  @HostBinding('class')
  public classList = 'lab900-form-field';

  public readonly addLabel = computed(() => {
    return this.schemaOptions()?.addLabel ?? 'Add new';
  });

  public readonly minRows = computed(() => {
    return this.schemaOptions()?.minRows ?? DEFAULT_REPEATER_MIN_ROWS;
  });

  public readonly maxRows = computed(() => {
    return this.schemaOptions()?.maxRows;
  });

  public readonly fixedList = computed(() => {
    return !!this.schemaOptions()?.fixedList;
  });

  protected readonly nestedFields = computed(() => this.schema().nestedFields);

  public readonly repeaterArray = computed(() => {
    const attr = this.fieldAttribute();
    const group = this.group();
    if (attr && group) {
      return group.get(attr) as UntypedFormArray;
    }
    return undefined;
  });

  public readonly hasMaxRows = computed(() => {
    const maxRows = this.maxRows();
    const repeaterArray = this.repeaterArray();
    return maxRows != undefined && !!repeaterArray && repeaterArray?.length >= maxRows;
  });

  public addToArray(): void {
    const repeaterArray = this.repeaterArray();
    const nestedFields = this.nestedFields();
    if (repeaterArray && nestedFields) {
      const formGroup = this.fb.createFormGroup(nestedFields);
      repeaterArray.push(formGroup);
      repeaterArray.markAsDirty();
      repeaterArray.markAsTouched();
    }
  }

  public removeFromArray(index: number): void {
    const repeaterArray = this.repeaterArray();
    if (repeaterArray && repeaterArray?.length > this.minRows()) {
      repeaterArray.removeAt(index);
      repeaterArray.markAsDirty();
      repeaterArray.markAsTouched();
    }
  }
}
