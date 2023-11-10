import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import {
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from '../../../models/Lab900FormModuleSettings';
import { FieldMask, FormFieldInput } from './input-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective } from 'ngx-mask';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lab900-input-field',
  templateUrl: './input-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormFieldComponent,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    TranslateModule,
    NgxMaskDirective,
    AutofocusDirective,
    MatInputModule,
  ],
})
export class InputFieldComponent extends FormComponent<FormFieldInput> {
  public readonly suffix$ = this.getOption$<string>('suffix');
  public readonly prefix$ = this.getOption$<string>('prefix');
  public readonly autofocus$ = this.getOption$<boolean>('autofocus');
  public readonly style$ = this.getOption$<string>('style');
  public readonly icon$ = this.formFieldService.schema$.pipe(
    map((schema) => schema?.icon)
  );
  public readonly type$ = this.getOption$<string>('type');
  public readonly align$ = this.getOption$<'left' | 'right'>('align', 'left');

  /**
   * All properties related to field masks
   */

  public readonly fieldMask$ = this.getFieldMaskProp('mask');
  public readonly allowNegativeNumbers$ = this.getFieldMaskProp(
    'allowNegativeNumbers'
  );
  public readonly dropSpecialCharacters$ = this.getFieldMaskProp(
    'dropSpecialCharacters'
  );
  public readonly decimalMarker$ = this.getFieldMaskProp('decimalMarker');
  public readonly thousandSeparator$ =
    this.getFieldMaskProp('thousandSeparator');
  public readonly showMaskTyped$ = this.getFieldMaskProp('showMaskTyped');
  public readonly placeHolderCharacter$ = this.getFieldMaskProp(
    'placeHolderCharacter'
  );
  public readonly maskPrefix$ = this.getFieldMaskProp('prefix');
  public readonly maskSuffix$ = this.getFieldMaskProp('suffix');
  public readonly maxLength$ = this.options$.pipe(
    filter(
      (options) =>
        !!(
          options?.showLengthIndicator ||
          this.setting?.formField?.showLengthIndicator
        ) && typeof options?.maxLength === 'number'
    ),
    map((o) => o.maxLength)
  );

  public constructor(
    @Inject(LAB900_FORM_MODULE_SETTINGS)
    public setting: Lab900FormModuleSettings
  ) {
    super();
  }

  private getFieldMaskProp(key: keyof FieldMask): Observable<any> {
    return this.getOption$('fieldMask').pipe(
      map((fieldMask) => fieldMask?.[key] ?? this.setting?.fieldMask?.[key])
    );
  }
}
