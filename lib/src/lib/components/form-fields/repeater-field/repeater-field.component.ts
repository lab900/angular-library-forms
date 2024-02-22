import { Component, HostBinding, inject } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { UntypedFormArray } from '@angular/forms';
import { Lab900FormBuilderService } from '../../../services/form-builder.service';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { FormFieldRepeater } from './repeater-field.model';

@Component({
  selector: 'lab900-repeater-field',
  templateUrl: './repeater-field.component.html',
  styleUrls: ['./repeater-field.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
})
export class RepeaterFieldComponent extends FormComponent<FormFieldRepeater> {
  private readonly fb: Lab900FormBuilderService = inject(
    Lab900FormBuilderService
  );

  @HostBinding('class')
  public classList = 'lab900-form-field';

  public get addLabel(): string {
    return this.options?.addLabel ?? 'Add new';
  }

  public get minRows(): number {
    return this.options?.minRows ?? 1;
  }

  public get maxRows(): number {
    return this.options?.maxRows;
  }

  public get fixedList(): boolean {
    return this.options?.fixedList;
  }

  public get repeaterArray(): UntypedFormArray {
    return this.group.get(this.fieldAttribute) as UntypedFormArray;
  }

  public addToArray(): void {
    const formGroup = this.fb.createFormGroup(this.schema.nestedFields);
    this.repeaterArray.push(formGroup);
    this.repeaterArray.markAsDirty();
    this.repeaterArray.markAsTouched();
  }

  public removeFromArray(index: number): void {
    if (this.repeaterArray.length > this.minRows) {
      this.repeaterArray.removeAt(index);
      this.repeaterArray.markAsDirty();
      this.repeaterArray.markAsTouched();
    }
  }
}
