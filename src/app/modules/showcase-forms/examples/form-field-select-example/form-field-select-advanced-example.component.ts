import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import {
  EditType,
  FormFieldSelect,
  FormFieldSelectOptionsFilter,
  Lab900Form,
  Lab900FormConfig,
  ValueLabel,
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

const tolkienBook2: Book = {
  key: '/works/OL27471W',
  title: 'Narn i chîn Húrin',
};

const compare = (a: Book, b: Book): boolean => a?.key != undefined && b?.key != undefined && a.key === b.key;

@Component({
  selector: 'lab900-form-field-select-advanced-example',
  template: ` <lab900-form [schema]="formSchema" [data]="data()" />
    <button (click)="logFormValue()">Log form data</button>`,
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldSelectAdvancedExampleComponent {
  private readonly MAX_ITEMS_FOR_SELECT_ALL = 157;
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public data = signal<
    | {
        books2: Book;
        books3: Book[];
      }
    | undefined
  >(undefined);

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
              selectOptions: (filter, fieldControl, schema) =>
                this.getSelectOptions({
                  filter,
                  schema,
                }),
              colspan: 4,
              displaySelectedOptionFn: (o: Book) => o?.title,
              infiniteScroll: {
                enabled: true,
              },
              fetchOptionsOnFocus: true,
            },
          },
          {
            attribute: 'books2',
            title: 'Search a book',
            editType: EditType.Select,
            options: {
              readonly: true,
              compareWith: compare,
              selectOptions: (filter, fieldControl, schema) =>
                this.getSelectOptions({
                  filter,
                  schema,
                }),
              colspan: 4,
              displaySelectedOptionFn: (o: Book) => o?.title,
              infiniteScroll: {
                enabled: true,
              },
              search: {
                enabled: true,
                addNewFn: (searchQuery, select) => {
                  const book: Book = {
                    title: searchQuery,
                    key: searchQuery,
                  };
                  select.selectOptions.set([{ value: book, label: book.title }]);
                  select.fieldControl?.setValue({
                    title: searchQuery,
                    key: searchQuery,
                  });
                },
              },
              fetchOptionsOnFocus: true,
            },
          },
          {
            attribute: 'books3',
            title: 'Search multiple books',
            editType: EditType.Select,
            options: {
              compareWith: compare,
              customTriggerFn: (value: Book[]) => {
                return value?.length + ' selected';
              },
              selectOptions: (filter, fieldControl, schema) =>
                this.getSelectOptions({
                  filter,
                  schema,
                }),
              colspan: 4,
              multiple: true,
              displaySelectedOptionFn: (o: Book) => o?.title,
              infiniteScroll: {
                enabled: true,
              },
              search: {
                enabled: true,
              },
              selectAll: { enabled: true },
              readonly: true,
              readonlyDisplay: (books: Book[]) =>
                books
                  .map(book => book.title)
                  .filter(x => !!x)
                  .join('<br>'),
              fetchOptionsOnFocus: true,
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
              selectOptions: [
                { value: 'twain', label: 'Twain' },
                { value: 'tolkien', label: 'Tolkien' },
                {
                  value: 'martin',
                  label: 'George R. R. Martin',
                  disabled: true,
                },
              ],
              colspan: 6,
              fetchOptionsOnFocus: true,
            },
          },
          {
            attribute: 'booksByAuthor',
            title: 'Search a book',
            editType: EditType.Select,
            options: {
              selectOptions: (filter, fieldControl, schema) => {
                return this.getSelectOptions({
                  filter,
                  author: fieldControl?.getRawValue(),
                  schema,
                });
              },
              compareWith: compare,
              colspan: 6,
              displaySelectedOptionFn: (value: Book) => value?.title,
              infiniteScroll: {
                enabled: true,
              },
              search: {
                enabled: true,
              },
              fetchOptionsOnFocus: true,
            },
            conditions: [
              {
                dependOn: 'author',
                enableIfHasValue: true,
                conditionalOptions: (author: string, _, filter) => this.getSelectOptions({ filter, author }),
              },
            ],
          },
        ],
      },
    ],
  };

  public constructor(private http: HttpClient) {
    setTimeout(() => {
      this.data.set({
        books2: tolkienBook,
        books3: [tolkienBook, tolkienBook2],
      });
    }, 500);
  }

  public getSelectOptions({
    filter,
    author,
    schema,
  }: {
    filter?: FormFieldSelectOptionsFilter;
    author?: string;
    schema?: FormFieldSelect<any>;
  }): Observable<ValueLabel<{ title: string; key: string }>[]> {
    return this.http
      .get<{ docs: any[] }>('https://openlibrary.org/search.json', {
        params: {
          q: filter?.searchQuery ?? '',
          author: author ?? 'tolkien',
          limit: filter?.getAll ? this.MAX_ITEMS_FOR_SELECT_ALL : '10',
          offset: filter?.getAll ? 0 : String((filter?.page || 0) * 10),
        },
      })
      .pipe(
        map(res => {
          if (filter?.getAll && schema?.options) {
            schema.options.infiniteScroll = { enabled: false };
          }
          return res.docs.map((d: any) => ({
            label: d.title,
            value: d,
          }));
        })
      );
  }

  public logFormValue(): void {
    console.log(this.form()?.value);
  }
}
