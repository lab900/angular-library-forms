import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { BehaviorSubject, isObservable, Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ValueLabel } from '../../../models/form-field-base';
import { FormFieldAutocomplete } from './autocomplete-field.model';

@Component({
  selector: 'lab900-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
})
export class AutocompleteFieldComponent<T>
  extends FormComponent<FormFieldAutocomplete<T>>
  implements AfterViewInit
{
  @HostBinding('class')
  public classList = 'lab900-form-field';

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
