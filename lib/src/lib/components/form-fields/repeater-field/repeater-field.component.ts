import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
import { Lab900FormBuilderService } from '../../../services/form-builder.service';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { FormFieldRepeater } from './repeater-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormFieldDirective } from '../../../directives/form-field.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'lab900-repeater-field',
  templateUrl: './repeater-field.component.html',
  styleUrls: ['./repeater-field.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    NgIf,
    AsyncPipe,
    NgForOf,
    MatTooltipModule,
    ReactiveFormsModule,
    forwardRef(() => FormFieldDirective),
  ],
})
export class RepeaterFieldComponent extends FormComponent<FormFieldRepeater> {
  public readonly addLabel$ = this.getOption$<string>('addLabel', 'Add new');
  public readonly fixedList$ = this.getOption$<boolean>('fixedList');
  public readonly minRows$ = this.getOption$<number>('minRows', 1);
  public readonly maxRows$ = this.getOption$<number>('maxRows');
  public readonly buttonColor$ = this.getOption$<ThemePalette>(
    'buttonColor',
    'accent'
  );
  public readonly tooltip$ = this.getOption$<{ text: string; icon?: string }>(
    'infoTooltip'
  );

  public readonly nestedFields$ = this.formFieldService.schema$.pipe(
    map((schema) => schema?.nestedFields ?? [])
  );

  public readonly showErrors$ = combineLatest([
    this.formFieldService.fieldControl$,
    this.readonlyField$,
  ]).pipe(
    map(
      ([control, readonlyField]) =>
        !readonlyField && control?.invalid && control?.touched
    )
  );

  public readonly showActions$ = combineLatest([
    this.options$,
    this.readonlyField$,
  ]).pipe(
    map(([options, readonlyField]) => !readonlyField && !options?.fixedList)
  );

  public readonly repeaterArray$ = this.formFieldService
    .fieldControl$ as Observable<UntypedFormArray>;

  public readonly disableAdd$ = combineLatest([
    this.maxRows$,
    this.repeaterArray$,
  ]).pipe(map(([maxRows, arr]) => !maxRows && arr.length >= maxRows));

  public constructor(private fb: Lab900FormBuilderService) {
    super();
  }

  public addToArray(): void {
    this.repeaterArray$
      .pipe(take(1), withLatestFrom(this.formFieldService.schema$))
      .subscribe(([arr, schema]) => {
        const formGroup = this.fb.createFormGroup(schema.nestedFields);
        arr.push(formGroup);
        arr.markAsDirty();
        arr.markAsTouched();
      });
  }

  public removeFromArray(index: number): void {
    this.repeaterArray$
      .pipe(
        take(1),
        withLatestFrom(this.minRows$),
        filter(([arr, minRows]) => arr?.length > minRows)
      )
      .subscribe(([arr]) => {
        arr.removeAt(index);
        arr.markAsDirty();
        arr.markAsTouched();
      });
  }

  public canRemoveRow(index: number): Observable<boolean> {
    return this.options$.pipe(
      map((options) => !!options?.removeAll || index > (options?.minRows ?? 1))
    );
  }
}
