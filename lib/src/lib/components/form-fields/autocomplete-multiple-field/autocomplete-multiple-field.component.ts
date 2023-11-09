import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { BehaviorSubject, isObservable, Observable, of } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ValueLabel } from '../../../models/form-field-base';
import { FormFieldAutocompleteMulti } from './autocomplete-multiple-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lab900-autocomplete-multiple-field',
  templateUrl: './autocomplete-multiple-field.component.html',
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
    MatChipsModule,
    MatIconModule,
  ],
})
export class AutocompleteMultipleFieldComponent<T>
  extends FormComponent<FormFieldAutocompleteMulti<T, string>>
  implements AfterViewInit
{
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
