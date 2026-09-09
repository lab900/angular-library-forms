import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lab900Form } from '../components/form-container/form-container.component';
import { EditType } from '../models/editType';
import { Lab900FormConfig } from '../models/Lab900FormConfig';
import { RENDER_TESTING_PROVIDERS } from '../testing/testing.providers';

describe('FormFieldDirective', () => {
  let fixture: ComponentFixture<Lab900Form<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: RENDER_TESTING_PROVIDERS,
    }).compileComponents();
    fixture = TestBed.createComponent(Lab900Form);
  });

  const render = (config: Lab900FormConfig, data: unknown): void => {
    fixture.componentRef.setInput('schema', config);
    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();
  };

  /**
   * `groupValue` used to seed its stream with `of(params.getRawValue)` — the method itself, not its result.
   * So the first evaluation of a reactive option handed the consumer a function, which either silently
   * returned the wrong answer or threw on the first property it read.
   */
  describe('reactive options', () => {
    it('passes the group value, never the getRawValue method, on the first evaluation', () => {
      const seen: string[] = [];
      render(
        {
          fields: [
            { attribute: 'type', editType: EditType.Input },
            {
              attribute: 'detail',
              editType: EditType.Input,
              options: {
                hide: (data: any) => {
                  seen.push(typeof data);
                  return data?.type !== 'B';
                },
              },
            },
          ],
        },
        { type: 'B', detail: 'shown' }
      );

      expect(seen.length).toBeGreaterThan(0);
      expect(seen).not.toContain('function');
      expect(new Set(seen)).toEqual(new Set(['object']));
    });

    it('does not throw when the option reads a nested property', () => {
      expect(() =>
        render(
          {
            fields: [
              { attribute: 'items', editType: EditType.Input },
              {
                attribute: 'summary',
                editType: EditType.Input,
                options: { hide: (data: any) => data.items.length === 0 },
              },
            ],
          },
          { items: ['a'], summary: 'x' }
        )
      ).not.toThrow();
    });

    it('resolves the option against the real value from the first evaluation, so the field is not hidden first', () => {
      const results: boolean[] = [];
      render(
        {
          fields: [
            { attribute: 'type', editType: EditType.Input },
            {
              attribute: 'detail',
              editType: EditType.Input,
              options: {
                hide: (data: any) => {
                  const hidden = data?.type !== 'B';
                  results.push(hidden);
                  return hidden;
                },
              },
            },
          ],
        },
        { type: 'B', detail: 'shown' }
      );

      expect(results).not.toContain(true);
    });
  });
});
