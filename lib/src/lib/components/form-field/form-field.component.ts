import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FloatLabelType,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { FormFieldService } from '../../services/form-field.service';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { Observable } from 'rxjs';
import { FormFieldHint, FormIcon } from '../../models/form-field-base';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { IconComponent } from '@lab900/ui';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lab900-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatInputModule,
    TranslateModule,
    NgIf,
    AsyncPipe,
    IconComponent,
    FormFieldErrorComponent,
    MatIconModule,
  ],
})
export class FormFieldComponent<S extends Lab900FormField = Lab900FormField>
  implements OnInit
{
  private readonly formFieldService: FormFieldService<S> =
    inject(FormFieldService);

  @ContentChild(MatFormFieldControl, { static: true })
  public readonly formFieldControl: MatFormFieldControl<any>;

  @ViewChild(MatFormField, { static: true })
  public readonly matFormField: MatFormField;

  public readonly label$: Observable<string | undefined> =
    this.formFieldService.label$;

  public readonly hint$: Observable<FormFieldHint> =
    this.formFieldService.hint$;

  @Input()
  public floatLabel?: FloatLabelType;

  @Input()
  public icon?: FormIcon;

  @Input()
  public suffix?: string;

  @Input()
  public prefix?: string;

  public ngOnInit(): void {
    this.matFormField._control = this.formFieldControl;
  }
}
