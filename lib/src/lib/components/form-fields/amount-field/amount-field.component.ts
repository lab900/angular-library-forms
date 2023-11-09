import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldAmount } from './amount-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormIcon } from '../../../models/form-field-base';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { AmountInputDirective } from './amount-input.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'lab900-amount-field',
  templateUrl: './amount-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    TranslateModule,
    AutofocusDirective,
    AmountInputDirective,
    ReactiveFormsModule,
    FormFieldComponent,
    NgIf,
    MatInputModule,
    NgxMaskDirective,
  ],
})
export class AmountFieldComponent extends FormComponent<FormFieldAmount> {
  public readonly suffix$ = this.getOption$<string>('suffix');
  public readonly prefix$ = this.getOption$<string>('prefix');
  public readonly autofocus$ = this.getOption$<boolean>('autofocus');
  public readonly style$ = this.getOption$<string>('style');
  public readonly maxDecimals$ = this.getOption$<number>('maxDecimals');
  public readonly minDecimals$ = this.getOption$<number>('minDecimals');
  public readonly align$ = this.getOption$<'left' | 'right'>('align', 'left');

  public readonly icon$: Observable<FormIcon> =
    this.formFieldService.schema$.pipe(map((schema) => schema?.icon));
}
