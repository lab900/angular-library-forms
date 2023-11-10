import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldButton } from './button-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { ThemePalette } from '@angular/material/core';
import { Lab900ButtonModule, Lab900ButtonType } from '@lab900/ui';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { take, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'lab900-button-field',
  templateUrl: './button-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateModule,
    NgIf,
    AsyncPipe,
    Lab900ButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
  ],
})
export class ButtonFieldComponent extends FormComponent<FormFieldButton> {
  public readonly type$ = this.getOption$<Lab900ButtonType>('type');
  public readonly color$ = this.getOption$<ThemePalette>('color', 'primary');
  public readonly buttonLabel$ = this.getOption$<string>(
    'label',
    'No label provided'
  );

  public readonly tooltip$ = this.getOption$<{
    text: string;
    position?: TooltipPosition;
  }>('tooltip');

  public readonly prefixIcon$ = this.getOption$<string>('prefixIcon');
  public readonly suffixIcon$ = this.getOption$<string>('suffixIcon');
  public readonly svgIcon$ = this.getOption$<boolean>('svgIcon', false);
  public readonly containerClass$ = this.getOption$<string>('containerClass');

  public handleClick(event: Event): void {
    event.stopPropagation();
    this.formFieldService.schema$
      .pipe(take(1), withLatestFrom(this.formFieldService.group$))
      .subscribe(([schema, group]) => {
        schema?.options?.onClick(group, schema, event);
      });
  }
}
