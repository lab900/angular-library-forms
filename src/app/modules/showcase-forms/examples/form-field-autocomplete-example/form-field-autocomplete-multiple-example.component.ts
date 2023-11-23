import { Component } from '@angular/core';
import { EditType, Lab900FormConfig, ValueLabel } from '@lab900/forms';
import { of } from 'rxjs';

@Component({
  selector: 'lab900-form-field-autocomplete-multiple-example',
  template:
    '<lab900-form #form [schema]="formSchema"></lab900-form><pre>{{form?.value | json }}</pre>',
})
export class FormFieldAutocompleteMultipleExampleComponent {
  public options: ValueLabel[] = [
    { name: 'Mary' },
    { name: 'Shelley' },
    { name: 'Igor' },
  ].map((value) => ({ value, label: value.name }));

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'textInput',
        title: 'Search a value',
        editType: EditType.AutocompleteMultiple,
        options: {
          autocompleteOptions: (value: string) => of(this.filter(value)),
          displayInputFn: (user: { name: string }) => user?.name,
        },
      },
    ],
  };

  private filter(value: string): ValueLabel[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: ValueLabel) =>
      option.label.toLowerCase().includes(filterValue)
    );
  }
}
