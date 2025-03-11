import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { BehaviorSubject, isObservable, Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ValueLabel } from '../../../models/form-field-base';
import { FormFieldAutocomplete } from './autocomplete-field.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'lab900-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    TranslatePipe,
    AsyncPipe,
    MatAutocomplete,
    MatIcon,
    MatOption,
  ],
})
export class AutocompleteFieldComponent<T> extends FormComponent<FormFieldAutocomplete<T>> implements AfterViewInit {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  @ViewChild('input')
  public autoCompleteInput: ElementRef;

  public filteredOptions: Observable<ValueLabel<T>[]>;

  public inputChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public ngAfterViewInit(): void {
    this.initFilteredOptionsListener();
  }

  public inputChanged($event: Event): void {
    this.inputChange.next(($event.target as any).value);
  }

  private initFilteredOptionsListener(): void {
    this.filteredOptions = this.inputChange.pipe(
      debounceTime(this.options.debounceTime ?? 300),
      switchMap((input: string) => {
        const res = this.options.autocompleteOptions(input, this.fieldControl);
        return isObservable(res) ? res : of(res);
      }),
    );
  }
}
