import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import {
  FormFieldButtonOption,
  FormFieldButtonToggle,
} from './button-toggle-field.model';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { FormFieldService } from '../../../services/form-field.service';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconComponent } from '@lab900/ui';
import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'lab900-button-toggle-field',
  templateUrl: './button-toggle-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateModule,
    NgIf,
    ReactiveFormsModule,
    AsyncPipe,
    MatInputModule,
    MatButtonToggleModule,
    NgForOf,
    MatTooltipModule,
    IconComponent,
    FormFieldErrorComponent,
  ],
})
export class ButtonToggleFieldComponent extends FormComponent<FormFieldButtonToggle> {
  public readonly buttonOptions$ =
    this.getOption$<FormFieldButtonOption[]>('buttonOptions');

  public readonly readonlyTitle$ = this.formFieldService.schema$.pipe(
    map((schema) => schema?.options?.readonlyLabel ?? schema?.title)
  );
  /**
   * This calculates the readonly label. If the readonlyDisplay() function is set, this is used.
   * Otherwise, the button label is displayed
   */
  public readonly readonlyLabel$ = combineLatest([
    this.buttonOptions$,
    this.controlValue$,
    this.formFieldService.groupValue$,
    this.formFieldService.options$,
  ]).pipe(
    map(([buttonOptions, value, groupValue, schemaOptions]) => {
      if (schemaOptions?.readonlyDisplay) {
        return schemaOptions.readonlyDisplay(groupValue) ?? '-';
      }
      return buttonOptions.find((o) => o.value === value)?.label ?? '-';
    })
  );

  // If the deselect option is set and the previous value of the toggle is the same as the current value the toggle will be deselected
  public onChange($event: MatButtonToggleChange): void {
    combineLatest([
      this.formFieldService.fieldControl$,
      this.formFieldService.options$,
    ])
      .pipe(take(1))
      .subscribe(([control, options]) => {
        if (options?.deselectOnClick && control.value === $event.value) {
          setTimeout(() => {
            control.setValue(null);
            control.markAsDirty();
            control.markAsTouched();
          });
        }
      });
  }
}
