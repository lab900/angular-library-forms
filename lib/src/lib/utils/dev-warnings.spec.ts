import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lab900Form } from '../components/form-container/form-container.component';
import { EditType } from '../models/editType';
import { Lab900FormConfig } from '../models/Lab900FormConfig';
import { RENDER_TESTING_PROVIDERS } from '../testing/testing.providers';
import { resetLab900DevWarnings, setLab900DevWarnings } from './dev-warnings';

/**
 * These warnings exist because none of the mistakes below throws or fails to compile: the form renders,
 * and renders the wrong thing. A spec that only asserts "it rendered" passes either way, so what is
 * asserted here is the console output itself.
 */
describe('dev warnings', () => {
  let fixture: ComponentFixture<Lab900Form<any>>;
  let warn: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: RENDER_TESTING_PROVIDERS,
    }).compileComponents();
    fixture = TestBed.createComponent(Lab900Form);
    warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    // provideLab900Forms() runs once per test module, so reset the "warn once" record per spec.
    setLab900DevWarnings(true);
    resetLab900DevWarnings();
  });

  afterEach(() => {
    warn.mockRestore();
  });

  const render = (config: Lab900FormConfig, data?: unknown): void => {
    fixture.componentRef.setInput('schema', config);
    if (data !== undefined) {
      fixture.componentRef.setInput('data', data);
    }
    fixture.detectChanges();
  };

  const messages = (): string[] => warn.mock.calls.map(call => String(call[0]));
  const matching = (fragment: string): string[] => messages().filter(message => message.includes(fragment));

  describe('an unknown edit type', () => {
    it('names the field and the bad edit type instead of silently rendering a placeholder', () => {
      render({ fields: [{ attribute: 'mystery', editType: 'NotAType' as EditType }] });

      const warnings = matching('Unknown editType');
      expect(warnings).toHaveLength(1);
      expect(warnings[0]).toContain('"NotAType"');
      expect(warnings[0]).toContain('"mystery"');
    });

    it('points EditType.File at its replacement', () => {
      render({ fields: [{ attribute: 'attachment', editType: EditType.File as any }] });

      expect(matching('EditType.FilePreview')).toHaveLength(1);
    });

    it('says nothing for an edit type that has a component', () => {
      render({ fields: [{ attribute: 'name', editType: EditType.Input }] });

      expect(matching('Unknown editType')).toHaveLength(0);
    });
  });

  describe('a select with object values', () => {
    const schema = (compareWith?: (a: any, b: any) => boolean): Lab900FormConfig => ({
      fields: [
        {
          attribute: 'country',
          editType: EditType.Select,
          options: {
            selectOptions: [{ value: { id: 1 }, label: 'Belgium' }],
            compareWith,
          },
        },
      ],
    });

    it('warns when the value cannot match an option because compareWith is missing', () => {
      // A different object with the same contents: equal to a human, not to `===`.
      render(schema(), { country: { id: 1 } });

      expect(matching('compareWith')).toHaveLength(1);
    });

    it('stays quiet once compareWith is set', () => {
      render(
        schema((a, b) => a?.id === b?.id),
        { country: { id: 1 } }
      );

      expect(matching('compareWith')).toHaveLength(0);
    });
  });

  describe('readonlyDisplay', () => {
    it('warns when it returns an object, which renders as nothing at all', () => {
      render(
        {
          fields: [
            {
              attribute: 'user',
              editType: EditType.Input,
              options: { readonly: true, readonlyDisplay: () => ({ first: 'Ada' }) as any },
            },
          ],
        },
        { user: 'ignored' }
      );

      const warnings = matching('readonlyDisplay');
      expect(warnings).toHaveLength(1);
      expect(warnings[0]).toContain('an object');
    });

    it('accepts one primitive', () => {
      render(
        {
          fields: [
            {
              attribute: 'user',
              editType: EditType.Input,
              options: { readonly: true, readonlyDisplay: (data: any) => `${data?.user}` },
            },
          ],
        },
        { user: 'Ada' }
      );

      expect(matching('readonlyDisplay')).toHaveLength(0);
    });
  });

  describe('a schema rebuilt on every change detection run', () => {
    it('warns after a burst of rebuilds', () => {
      // What `[schema]="{ fields: [...] }"` in a template does: a new object every time.
      for (let i = 0; i < 6; i++) {
        fixture.componentRef.setInput('schema', { fields: [{ attribute: 'name', editType: EditType.Input }] });
        fixture.detectChanges();
      }

      expect(matching('changed identity')).toHaveLength(1);
    });

    it('says nothing when the schema keeps its identity', () => {
      const schema: Lab900FormConfig = { fields: [{ attribute: 'name', editType: EditType.Input }] };
      for (let i = 0; i < 6; i++) {
        fixture.componentRef.setInput('schema', schema);
        fixture.detectChanges();
      }

      expect(matching('changed identity')).toHaveLength(0);
    });
  });

  describe('the opt-out', () => {
    it('silences everything', () => {
      setLab900DevWarnings(false);

      render({ fields: [{ attribute: 'mystery', editType: 'NotAType' as EditType }] });

      expect(messages()).toHaveLength(0);
      setLab900DevWarnings(true);
    });
  });
});
