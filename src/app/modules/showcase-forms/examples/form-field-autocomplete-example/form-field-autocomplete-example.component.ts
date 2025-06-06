import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig, ValueLabel } from '@lab900/forms';
import { of } from 'rxjs';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-form-field-autocomplete-example',
  styleUrls: ['./form-field-autocomplete-example.component.scss'],
  template:
    '<lab900-form [schema]="formSchema"/><button mat-raised-button color="primary" (click)="validate()">Submit</button>',
  imports: [Lab900Form, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldAutocompleteExampleComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public options: ValueLabel[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }].map(value => {
    const image =
      'https://firebasestorage.googleapis.com/v0/b/lab900-website-production.appspot.com/o/public%2Fproject-images%2Fyou%2Fyou-mockup.svg?alt=media';
    const label = `<div class="user-option"><img width="20" height="20" src="${image}"> ${value.name}</div>`;
    return { value, label };
  });

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'textInput',
        title: 'Search a value',
        editType: EditType.Autocomplete,
        options: {
          required: true,
          autocompleteOptions: (value: string) => of(this.filter(value)),
          debounceTime: 500,
          displayInputFn: (user: { name: string }) => user?.name ?? '',
        },
      },
      {
        attribute: 'textInputMatchRequired',
        title: 'Search a value (match required)',
        editType: EditType.Autocomplete,
        options: {
          autocompleteOptions: (value: string) => of(this.filter(value)),
          debounceTime: 500,
          requireMatch: true,
          displayInputFn: (user: { name: string }) => user?.name ?? '',
        },
      },
    ],
  };

  private filter(value: string): ValueLabel[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: ValueLabel) => option.label.toLowerCase().includes(filterValue));
  }

  public validate(): void {
    console.log(this.form()?.valid);
  }
}
