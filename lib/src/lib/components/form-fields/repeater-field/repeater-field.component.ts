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
    return this._options()?.addLabel ?? 'Add new';
  });

  public readonly minRows = computed(() => {
    return this._options()?.minRows ?? DEFAULT_REPEATER_MIN_ROWS;
  });

  public readonly maxRows = computed(() => {
    return this._options()?.maxRows;
  });

  public readonly fixedList = computed(() => {
    return !!this._options()?.fixedList;
  });

  public get repeaterArray(): UntypedFormArray | undefined {
    return this.fieldAttribute ? (this.group.get(this.fieldAttribute) as UntypedFormArray) : undefined;
  }

  public readonly hasMaxRows = computed(() => {
    const maxRows = this.maxRows();
    return maxRows != undefined && !!this.repeaterArray && this.repeaterArray?.length >= maxRows;
  });

  public addToArray(): void {
    if (this.repeaterArray && this.schema.nestedFields) {
      const formGroup = this.fb.createFormGroup(this.schema.nestedFields);
      this.repeaterArray.push(formGroup);
      this.repeaterArray.markAsDirty();
      this.repeaterArray.markAsTouched();
    }
  }

  public removeFromArray(index: number): void {
    if (this.repeaterArray && this.repeaterArray?.length > this.minRows()) {
      this.repeaterArray.removeAt(index);
      this.repeaterArray.markAsDirty();
      this.repeaterArray.markAsTouched();
    }
  }
}
