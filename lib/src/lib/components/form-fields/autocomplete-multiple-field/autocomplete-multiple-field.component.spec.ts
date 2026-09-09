import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Lab900Form } from '../../form-container/form-container.component';
import { EditType } from '../../../models/editType';
import { Lab900FormConfig } from '../../../models/Lab900FormConfig';
import { RENDER_TESTING_PROVIDERS } from '../../../testing/testing.providers';

interface Book {
  id: number;
  title: string;
}

describe('AutocompleteMultipleFieldComponent', () => {
  let fixture: ComponentFixture<Lab900Form<any>>;

  const books: Book[] = [
    { id: 1, title: 'Dune' },
    { id: 2, title: 'Neuromancer' },
  ];

  const schema = (readonly: boolean): Lab900FormConfig => ({
    readonly,
    fields: [
      {
        attribute: 'books',
        editType: EditType.AutocompleteMultiple,
        title: 'Books',
        options: {
          displayInputFn: (book: Book) => book.title,
          autocompleteOptions: () => of(books.map(b => ({ value: b, label: b.title }))),
        },
      },
    ],
  });

  const query = (selector: string): Element[] =>
    Array.from(fixture.nativeElement.querySelectorAll(selector) as NodeListOf<Element>);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: RENDER_TESTING_PROVIDERS,
    }).compileComponents();
    fixture = TestBed.createComponent(Lab900Form);
  });

  const render = (readonly: boolean): void => {
    fixture.componentRef.setInput('schema', schema(readonly));
    fixture.componentRef.setInput('data', { books });
    fixture.detectChanges();
  };

  describe('readonly form', () => {
    /**
     * The control value is an array, so before this was excluded from the readonly swap it reached the
     * translate pipe and threw `key.split is not a function`.
     */
    it('keeps its own component and renders the selected values as chips', () => {
      expect(() => render(true)).not.toThrow();

      expect(query('lab900-autocomplete-multiple-field').length).toBe(1);
      expect(query('.lab900-readonly-field').length).toBe(0);
      const chips = query('mat-chip-row');
      expect(chips.length).toBe(2);
      expect(chips.map(c => c.textContent?.trim())).toEqual(['Dune', 'Neuromancer']);
    });

    it('cannot be edited', () => {
      render(true);

      // No remove affordance on the chips, and the chip input inherits disabled from the disabled control.
      expect(query('mat-icon[matChipRemove]').length).toBe(0);
      expect(query('mat-icon[matSuffix]').length).toBe(0);
      expect((query('input')[0] as HTMLInputElement).disabled).toBe(true);
    });
  });

  describe('editable form', () => {
    it('renders the remove affordance and an enabled input', () => {
      render(false);

      expect(query('mat-chip-row').length).toBe(2);
      expect(query('mat-icon[matChipRemove]').length).toBe(2);
      expect((query('input')[0] as HTMLInputElement).disabled).toBe(false);
    });
  });
});
