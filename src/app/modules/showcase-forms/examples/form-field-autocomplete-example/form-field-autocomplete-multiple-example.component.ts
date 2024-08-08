import { Component } from '@angular/core';
import {
  EditType,
  Lab900Form,
  Lab900FormConfig,
  ValueLabel,
} from '@lab900/forms';
import { of } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'lab900-form-field-autocomplete-multiple-example',
  template:
    '<lab900-form #form [schema]="formSchema"/><pre>{{form?.value | json }}</pre>',
  standalone: true,
  imports: [Lab900Form, JsonPipe],
})
export class FormFieldAutocompleteMultipleExampleComponent {
  public options: ValueLabel[] = [
    { name: 'Mary', color: 'red' },
    { name: 'Shelley' },
    { name: 'Igor', color: 'blue' },
  ].map((value) => ({ value, label: value.name, color: value.color }));

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'textInput',
        title: 'Search a value',
        editType: EditType.AutocompleteMultiple,
        options: {
          autocompleteOptions: (value: string) => of(this.filter(value)),
          displayInputFn: (user: { name: string; color: string }) => user?.name,
        },
      },
    ],
  };

  private filter(value: string): ValueLabel[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: ValueLabel) =>
      option.label.toLowerCase().includes(filterValue),
    );
  }
}
