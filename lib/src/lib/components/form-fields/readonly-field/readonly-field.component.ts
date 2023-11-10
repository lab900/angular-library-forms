import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldService } from '../../../services/form-field.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lab900-readonly',
  templateUrl: './readonly-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, TranslateModule, NgIf],
})
export class ReadonlyFieldComponent extends FormComponent {
  public readonly value$: Observable<string | undefined> = combineLatest([
    this.formFieldService.groupValue$,
    this.controlValue$,
    this.options$,
  ]).pipe(
    map(([groupValue, value, options]) =>
      options?.readonlyDisplay ? options.readonlyDisplay(groupValue) : value
    )
  );

  public readonly containerClass$ = this.getOption$<string>(
    'readonlyContainerClass'
  );

  public readonly label$: Observable<string | undefined> =
    this.formFieldService.schema$.pipe(
      map((schema) => schema.options?.readonlyLabel ?? schema.title)
    );
}
