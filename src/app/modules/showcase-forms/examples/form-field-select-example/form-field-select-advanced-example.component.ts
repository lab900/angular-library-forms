import { Component } from '@angular/core';
import {
  EditType,
  FormFieldSelectOptionsFilter,
  Lab900FormConfig,
} from '@lab900/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Book {
  key: string;
  title: string;
}

const tolkienBook: Book = {
  key: '/works/OL27500W',
  title: 'The letters of J.R.R. Tolkien',
};

const compare = (a: Book, b: Book): boolean =>
  a?.key && b?.key && a.key === b.key;

@Component({
  selector: 'lab900-form-field-select-advanced-example',
  template: '<lab900-form [schema]="formSchema" [data]="data"></lab900-form>',
})
export class FormFieldSelectAdvancedExampleComponent {
  public data: {
    books2: Book;
    books3: Book[];
  } = {
    books2: {
      title: 'Song of Ice and Fire',
      key: '/works/OL21242192W',
    },
    books3: [tolkienBook],
  };
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
              compareWith: compare,
              displayOptionFn: (o: Book) => o?.title,
              selectOptions: this.getSelectOptions.bind(this),
              colspan: 4,
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
              compareWith: compare,
              displayOptionFn: (o: Book) => o?.title,
              selectOptions: this.getSelectOptions.bind(this),
              colspan: 4,
              infiniteScroll: {
                enabled: true,
              },
              search: {
                enabled: true,
              },
            },
          },
          {
            attribute: 'books3',
            title: 'Search multiple book',
            editType: EditType.Select,
            options: {
              compareWith: compare,
              displayOptionFn: (o: Book) => o?.title,
              customTriggerFn: (value: any[]) => {
                return value?.length + ' selected';
              },
              selectOptions: this.getSelectOptions.bind(this),
              colspan: 4,
              multiple: true,
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
            title: 'Select an author',
            editType: EditType.Select,
            options: {
              displayOptionFn: (value: Book) => value.title,
              disabledOptionFn: (value: Book) => value.key === 'martin',
              selectOptions: [
                { key: 'twain', title: 'Twain' },
                { key: 'tolkien', title: 'Tolkien' },
                {
                  key: 'martin',
                  title: 'George R. R. Martin',
                  disabled: true,
                },
              ],
              colspan: 6,
            },
          },
          {
            attribute: 'booksByAuthor',
            title: 'Search a book',
            editType: EditType.Select,
            options: {
              displayOptionFn: (value: Book) => value.title,
              selectOptions: this.getSelectOptions.bind(this),
              compareWith: compare,
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

  public getSelectOptions(
    filter?: FormFieldSelectOptionsFilter,
    author?: string
  ): Observable<{ title: string; key: string }[]> {
    return this.http
      .get<{ docs: any[] }>('https://openlibrary.org/search.json', {
        params: {
          q: filter?.searchQuery,
          author: author ?? 'tolkien',
          limit: '10',
          offset: String((filter?.page || 0) * 10),
        },
      })
      .pipe(map((res) => res?.docs));
  }
}
