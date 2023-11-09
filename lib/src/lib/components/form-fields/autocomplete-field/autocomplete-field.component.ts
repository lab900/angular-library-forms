import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { BehaviorSubject, isObservable, Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ValueLabel } from '../../../models/form-field-base';
import { FormFieldAutocomplete } from './autocomplete-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'lab900-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    FormFieldComponent,
    TranslateModule,
    NgForOf,
    NgIf,
    AsyncPipe,
  ],
})
export class AutocompleteFieldComponent<T>
  extends FormComponent<FormFieldAutocomplete<T>>
  implements AfterViewInit
{
  @ViewChild('input')
  public autoCompleteInput: ElementRef;

  public filteredOptions: Observable<ValueLabel<T>[]>;

  public inputChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public ngAfterViewInit(): void {
    super.ngAfterViewInit();
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
      })
    );
  }
}
