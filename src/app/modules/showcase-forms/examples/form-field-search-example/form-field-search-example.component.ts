import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EditType, Lab900FormConfig } from '@lab900/forms';
import { of } from 'rxjs';

@Component({
  selector: 'lab900-form-field-select-example',
  template: `<lab900-form #f [schema]="formSchema"></lab900-form>
    <hr style="margin-top: 30px" />
    {{ f.value | json }}`,
})
export class FormFieldSearchExampleComponent {
  public readonly formGroup = new FormGroup({});
  public readonly formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'searchWithResult',
        title: 'Search with a result',
        editType: EditType.Search,
        options: {
          labelFormatter: (option) => option?.name + ' (from response)',
          searchFn: (searchQuery: string) => of({ name: searchQuery, id: 1 }),
        },
      },
      {
        attribute: 'searchWithoutResult',
        editType: EditType.Search,
        title: 'Search without a result',
        options: {
          labelFormatter: (option) => option?.name + ' (from response)',
          searchFn: () => of(null),
          addNewFn: (searchQuery) =>
            of({
              name: searchQuery,
              id: 2,
            }),
        },
      },
    ],
  };

  public constructor() {
    const control = new FormControl();
    this.formGroup.addControl('example-select', control);
  }

  public clearSelect(): void {
    this.formGroup.get('example-select').setValue(null);
  }
}
