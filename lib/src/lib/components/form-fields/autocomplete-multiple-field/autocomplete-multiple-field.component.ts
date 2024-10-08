import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { BehaviorSubject, isObservable, Observable, of } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ValueLabel } from '../../../models/form-field-base';
import { FormFieldAutocompleteMulti } from './autocomplete-multiple-field.model';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatChipGrid, MatChipInput, MatChipRow } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lab900-autocomplete-multiple-field',
  templateUrl: './autocomplete-multiple-field.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslateModule,
    MatIcon,
    MatChipGrid,
    MatChipRow,
    MatAutocompleteTrigger,
    MatChipInput,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
  ],
})
export class AutocompleteMultipleFieldComponent<T>
  extends FormComponent<FormFieldAutocompleteMulti<T, string>>
  implements AfterViewInit
{
  @HostBinding('class')
  public classList = 'lab900-form-field';

  @ViewChild('input')
  private input: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  private matAutocomplete: MatAutocomplete;

  public filteredOptions: Observable<ValueLabel<T>[]>;
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public inputChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public get selectedOptions(): T[] {
    return this.group.controls[this.fieldAttribute]?.value ?? [];
  }

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

  public remove(index: number): void {
    if (index >= 0) {
      const value = this.selectedOptions;
      value.splice(index, 1);
      this.updateControlValue(value);
      this.input.nativeElement.value = '';
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    const value = this.selectedOptions;
    value.push(event.option.value);
    this.updateControlValue(value);
    this.input.nativeElement.value = '';
    this.group.markAsDirty();
  }

  private updateControlValue(val: T[]): void {
    this.group.controls[this.fieldAttribute].setValue(val);
    this.group.controls[this.fieldAttribute].updateValueAndValidity();
    this.group.controls[this.fieldAttribute].markAsDirty();
    this.group.controls[this.fieldAttribute].markAsTouched();
  }
}
