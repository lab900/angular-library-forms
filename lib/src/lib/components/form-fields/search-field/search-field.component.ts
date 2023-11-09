import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldSearch } from './field-search.model';
import { map, take } from 'rxjs/operators';
import { FormFieldService } from '../../../services/form-field.service';
import { ThemePalette } from '@angular/material/core';
import { combineLatest } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SearchInputDirective } from './search-input.directive';

@Component({
  selector: 'lab900-search-field',
  templateUrl: './search-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    FormFieldComponent,
    ReactiveFormsModule,
    TranslateModule,
    MatInputModule,
    AutofocusDirective,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    SearchInputDirective,
  ],
})
export class SearchFieldComponent<T> extends FormComponent<FormFieldSearch<T>> {
  public readonly notFoundLabel$ = this.getOption$<string>(
    'notFoundLabel',
    'forms.search-field.notFoundLabel'
  );

  public readonly addNewLabel$ = this.getOption$<string>(
    'addNewLabel',
    'forms.search-field.addNewLabel'
  );

  public readonly addNewBtnColor$ = this.getOption$<ThemePalette>(
    'addNewBtnColor',
    'primary'
  );

  public showClearButton$ = combineLatest([
    this.getOption$<boolean>('hideClearButton', false),
    this.formFieldService.controlValue$,
  ]).pipe(map(([hideClearButton, value]) => !hideClearButton && !!value));

  public handleAddNew(searchQuery: string): void {
    this.options
      ?.addNewFn(searchQuery)
      .pipe(take(1))
      .subscribe((v) => this.updateControlValue(v));
  }

  public clear(inputRef: HTMLInputElement): void {
    this.updateControlValue(null);
    inputRef.value = '';
  }
}
