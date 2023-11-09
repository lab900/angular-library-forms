import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldIcon } from './icon-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { FormIcon } from '../../../models/form-field-base';
import { AsyncPipe, NgIf } from '@angular/common';
import { IconComponent } from '@lab900/ui';

@Component({
  selector: 'lab900-icon-field',
  styleUrls: ['./icon-field.component.scss'],
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, IconComponent, AsyncPipe],
  template: `<div class="mat-form-field-wrapper" *ngIf="icon$ | async as icon">
    <lab900-icon [icon]="icon"></lab900-icon>
  </div> `,
})
export class IconFieldComponent extends FormComponent<FormFieldIcon> {
  public readonly icon$ = this.getOption$<FormIcon>('icon');
}
