import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lab900Form } from '../../form-container/form-container.component';
import { EditType } from '../../../models/editType';
import { Lab900FormConfig } from '../../../models/Lab900FormConfig';
import { RENDER_TESTING_PROVIDERS } from '../../../testing/testing.providers';

describe('MultiLangInputFieldComponent', () => {
  let fixture: ComponentFixture<Lab900Form<any>>;

  const value = { en: 'Hello', nl: 'Hallo' };

  const schema = (readonly: boolean): Lab900FormConfig => ({
    readonly,
    fields: [{ attribute: 'greeting', editType: EditType.MultiLangInput, title: 'Greeting' }],
  });

  const query = (selector: string): Element[] =>
    Array.from(fixture.nativeElement.querySelectorAll(selector) as NodeListOf<Element>);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: RENDER_TESTING_PROVIDERS,
    }).compileComponents();
    fixture = TestBed.createComponent(Lab900Form);
  });

  const render = async (readonly: boolean): Promise<void> => {
    fixture.componentRef.setInput('schema', schema(readonly));
    fixture.componentRef.setInput('language', 'en');
    fixture.componentRef.setInput('availableLanguages', [
      { value: 'en', label: 'English' },
      { value: 'nl', label: 'Nederlands' },
    ]);
    fixture.componentRef.setInput('data', { greeting: value });
    fixture.detectChanges();
    // `ngModel` inside the multi lang control writes to the input on a microtask.
    await fixture.whenStable();
  };

  describe('readonly form', () => {
    /**
     * The control value is a `Record<language, string>`, so before this was excluded from the readonly
     * swap it rendered as `[object Object]`.
     */
    it('keeps its own component and renders the value of the active language', async () => {
      await expect(render(true)).resolves.not.toThrow();

      expect(query('lab900-multi-lang-field-control').length).toBe(1);
      expect(query('.lab900-readonly-field').length).toBe(0);
      expect(fixture.nativeElement.textContent).not.toContain('[object');
      // Per language values start the control in translating mode: one input, for the active language.
      expect((query('input')[0] as HTMLInputElement).value).toBe('Hello');
    });

    it('renders its input readonly', async () => {
      await render(true);

      const input = query('input')[0] as HTMLInputElement;
      expect(input.readOnly).toBe(true);
      expect(input.classList).toContain('readonly');
    });
  });

  describe('editable form', () => {
    it('renders an editable input', async () => {
      await render(false);

      const input = query('input')[0] as HTMLInputElement;
      expect(input.readOnly).toBe(false);
      expect(input.value).toBe('Hello');
    });
  });
});
