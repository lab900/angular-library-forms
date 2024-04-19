import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldSearch } from './field-search.model';
import { take } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { AutofocusDirective } from '../../../directives/auto-focus.directive';
import { SearchInputDirective } from './search-input.directive';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'lab900-search-field',
  templateUrl: './search-field.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    NgClass,
    AutofocusDirective,
    SearchInputDirective,
    MatIconButton,
    MatTooltip,
    AsyncPipe,
    MatIcon,
    MatProgressSpinner,
  ],
})
export class SearchFieldComponent<T> extends FormComponent<FormFieldSearch<T>> {
  @HostBinding('class')
  public classList = `lab900-form-field`;

  public handleAddNew(searchQuery: string): void {
    this.options()
      ?.addNewFn(searchQuery)
      .pipe(take(1))
      .subscribe((v) => this.fieldControl().setValue(v));
  }

  public clear(inputRef: HTMLInputElement): void {
    this.fieldControl().setValue(null);
    inputRef.value = '';
  }
}
