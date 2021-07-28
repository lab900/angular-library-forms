import { Component } from '@angular/core';
import { EditType, Lab900FormConfig, FormFieldSelectOptionsFilter, ValueLabel } from '@lab900/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lab900-form-field-select-advanced-example',
  template: '<lab900-form [schema]="formSchema"></lab900-form>',
})
export class FormFieldSelectAdvancedExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: '',
        editType: EditType.Row,
        nestedFields: [
          {
            attribute: 'books',
            title: 'Select a book',
            editType: EditType.Select,
            options: {
              selectOptions: this.getSelectOptions.bind(this),
              colspan: 6,
              infiniteScroll: {
                enabled: true,
              },
            },
          },
          {
            attribute: 'books2',
            title: 'Search a book',
            editType: EditType.Select,
            options: {
              selectOptions: this.getSelectOptions.bind(this),
              colspan: 6,
              infiniteScroll: {
                enabled: true,
              },
              search: {
                enabled: true,
              },
            },
          },
        ],
      },
      {
        attribute: '',
        editType: EditType.Row,
        nestedFields: [
          {
            attribute: 'author',
            title: 'Select a author',
            editType: EditType.Select,
            options: {
              selectOptions: [
                { value: 'twain', label: 'Twain' },
                { value: 'tolkien', label: 'Tolkien' },
              ],
              colspan: 6,
            },
          },
          {
            attribute: 'booksByAuthor',
            title: 'Search a book',
            editType: EditType.Select,
            options: {
              selectOptions: this.getSelectOptions.bind(this),
              colspan: 6,
              infiniteScroll: {
                enabled: true,
              },
              search: {
                enabled: true,
              },
            },
            conditions: [
              {
                dependOn: 'author',
                enableIfHasValue: true,
                conditionalOptions: (value: string, control, filter) => {
                  return this.getSelectOptions(filter, value);
                },
              },
            ],
          },
        ],
      },
    ],
  };

  public constructor(private http: HttpClient) {}

  public getSelectOptions(filter?: FormFieldSelectOptionsFilter, author?: string): Observable<ValueLabel[]> {
    return this.http
      .get<{ docs: any[] }>('https://openlibrary.org/search.json', {
        params: {
          q: filter?.searchQuery,
          author: author ?? 'tolkien',
          limit: '10',
          offset: String((filter?.page || 0) * 10),
        },
      })
      .pipe(
        map((res) =>
          res?.docs?.map((d) => ({
            label: d.title,
            value: d,
          })),
        ),
      );
  }
}
