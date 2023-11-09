import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormComponent } from '../AbstractFormComponent';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { FormFieldUtils } from '../../utils/form-field.utils';
import { FormRow } from './form-row.model';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormFieldService } from '../../services/form-field.service';
import { FormFieldDirective } from '../../directives/form-field.directive';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'lab900-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
    NgForOf,
    forwardRef(() => FormFieldDirective),
    AsyncPipe,
  ],
})
export class FormRowComponent extends FormComponent<FormRow> {
  public readonly rowTitle$ = combineLatest([
    this.readonlyField$,
    this.formFieldService.schema$,
  ]).pipe(
    filter(
      ([fieldIsReadonly, schema]) =>
        (fieldIsReadonly && !!schema?.options?.readonlyLabel) || !!schema.title
    ),
    map(([fieldIsReadonly, schema]) =>
      fieldIsReadonly && !!schema?.options?.readonlyLabel
        ? schema?.options?.readonlyLabel
        : schema.title
    )
  );

  public readonly showRow$ = this.formFieldService.schema$.pipe(
    map((schema) => {
      if (schema?.nestedFields?.length) {
        if (schema?.options?.visibleFn) {
          return schema.options.visibleFn(this);
        }
        return true;
      }
      return false;
    })
  );

  public readonly rowTitleClass$ = this.getOption$<string>('customTitleClass');
  public readonly rowClass$ = this.getOption$<string>('customClass');
  public readonly mobileCols$ = this.getOption$<boolean>('mobileCols', false);
  public readonly nestedFields$ = this.formFieldService.schema$.pipe(
    map((schema) => schema?.nestedFields ?? [])
  );

  public rowIsReadonly(field: Lab900FormField): boolean {
    return field.options?.readonly != null
      ? FormFieldUtils.isReadOnly(
          field.options,
          this.group.value,
          this.readonly
        )
      : FormFieldUtils.isReadOnly(
          this.options,
          this.group.value,
          this.readonly
        );
  }

  public isHidden(field: Lab900FormField): boolean {
    return FormFieldUtils.isHidden(field.options, this.group);
  }
}
