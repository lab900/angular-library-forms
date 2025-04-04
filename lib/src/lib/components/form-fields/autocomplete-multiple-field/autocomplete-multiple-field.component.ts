import { AfterViewInit, Component, ElementRef, HostBinding, viewChild } from '@angular/core';
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
import { TranslatePipe } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatChipGrid, MatChipInput, MatChipRow } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lab900-autocomplete-multiple-field',
  templateUrl: './autocomplete-multiple-field.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslatePipe,
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

  private readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

  public filteredOptions?: Observable<ValueLabel<T>[]>;
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public inputChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public get selectedOptions(): T[] {
    return this._fieldControl()?.getRawValue() ?? [];
  }

  public ngAfterViewInit(): void {
    this.initFilteredOptionsListener();
  }

  public inputChanged($event: Event): void {
    this.inputChange.next(($event.target as any).value);
  }

  private initFilteredOptionsListener(): void {
    if (this.options?.autocompleteOptions && this.fieldControl) {
      this.filteredOptions = this.inputChange.pipe(
        debounceTime(this.options?.debounceTime ?? 300),
        switchMap((input: string) => {
          const res = this.options!.autocompleteOptions!(input, this.fieldControl!);
          return isObservable(res) ? res : of(res);
        })
      );
    }
  }

  public remove(index: number): void {
    if (index >= 0) {
      const value = this.controlValue();
      value.splice(index, 1);
      this.updateControlValue(value);
      const nativeElm = this.input()?.nativeElement;
      if (nativeElm) {
        nativeElm.value = '';
      }
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    const value = this.selectedOptions;
    value.push(event.option.value);
    this.updateControlValue(value);
    const nativeElm = this.input()?.nativeElement;
    if (nativeElm) {
      nativeElm.value = '';
    }
    this.group.markAsDirty();
  }

  private updateControlValue(val: T[]): void {
    this._fieldControl()?.setValue(val);
    this._fieldControl()?.updateValueAndValidity();
    this._fieldControl()?.markAsDirty();
    this._fieldControl()?.markAsTouched();
  }
}
