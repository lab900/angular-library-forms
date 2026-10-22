import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Lab900Form } from '../../form-container/form-container.component';
import { EditType } from '../../../models/editType';
import { Lab900FormConfig } from '../../../models/Lab900FormConfig';
import { RENDER_TESTING_PROVIDERS } from '../../../testing/testing.providers';

interface TransportIdentity {
  transportUnitCode: string;
  identity: string;
}

describe('RepeaterFieldComponent', () => {
  let fixture: ComponentFixture<Lab900Form<any>>;
  let component: Lab900Form<any>;

  const rows: TransportIdentity[] = [
    { transportUnitCode: 'VEHICLE', identity: 'ABC-123' },
    { transportUnitCode: 'TRAILER', identity: 'DEF-456' },
  ];

  const schema = (readonly: boolean, options: Record<string, unknown> = {}): Lab900FormConfig => ({
    readonly,
    fields: [
      {
        editType: EditType.Repeater,
        attribute: 'transportIdentities',
        options: { addLabel: 'ADD', ...options },
        nestedFields: [
          {
            editType: EditType.Row,
            nestedFields: [
              { editType: EditType.Input, attribute: 'transportUnitCode', title: 'Unit' },
              { editType: EditType.Input, attribute: 'identity', title: 'Identity' },
            ],
          },
        ],
      },
    ],
  });

  const render = (config: Lab900FormConfig, data: unknown = { transportIdentities: rows }): void => {
    fixture.componentRef.setInput('schema', config);
    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();
  };

  const query = (selector: string): Element[] =>
    Array.from(fixture.nativeElement.querySelectorAll(selector) as NodeListOf<Element>);

  const repeaterArray = (): UntypedFormArray => component.form.get('transportIdentities') as UntypedFormArray;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: RENDER_TESTING_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(Lab900Form);
    component = fixture.componentInstance;
  });

  describe('readonly form', () => {
    it('renders every row without handing the form array to the translate pipe', () => {
      expect(() => render(schema(true))).not.toThrow();

      expect(query('.repeater-row').length).toBe(2);
      // Two readonly fields per row, one per nested input.
      const readonlyFields = query('.lab900-readonly-field');
      expect(readonlyFields.length).toBe(4);
      expect(readonlyFields.map(elm => elm.textContent?.trim())).toEqual(
        expect.arrayContaining(['UnitVEHICLE', 'IdentityABC-123', 'UnitTRAILER', 'IdentityDEF-456'])
      );
    });

    it('keeps the repeater component instead of collapsing into one readonly field', () => {
      render(schema(true));

      expect(query('lab900-repeater-field').length).toBe(1);
      // The repeater itself is not swapped for a readonly field: only its leaf inputs are.
      expect(query('lab900-readonly[id]').length).toBe(0);
    });

    it('suppresses add, remove and reorder without the consumer setting fixedList', () => {
      render(schema(true, { enableReorder: true, removeAll: true }));

      expect(query('.repeater-add').length).toBe(0);
      expect(query('[aria-label="Delete"]').length).toBe(0);
      expect(query('[aria-label="Move up"]').length).toBe(0);
      expect(query('[aria-label="Move down"]').length).toBe(0);
      expect(repeaterArray().disabled).toBe(true);
    });

    it('lets readonlyDisplay win over the default rendering', () => {
      render(
        schema(true, {
          readonlyDisplay: (data: { transportIdentities: TransportIdentity[] }) =>
            data.transportIdentities.map(row => row.identity).join(' / '),
        })
      );

      expect(query('.repeater-row').length).toBe(0);
      expect(query('.lab900-readonly-field').length).toBe(1);
      expect(query('.lab900-readonly-field')[0].textContent).toContain('ABC-123 / DEF-456');
    });
  });

  describe('editable form', () => {
    it('renders editable inputs and the row actions', () => {
      render(schema(false, { enableReorder: true }));

      expect(query('.lab900-readonly-field').length).toBe(0);
      expect(query('input').length).toBe(4);
      expect(query('.repeater-add').length).toBe(1);
      expect(repeaterArray().disabled).toBe(false);
    });

    it('adds a row', () => {
      render(schema(false));

      (query('.repeater-add')[0] as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(repeaterArray().length).toBe(3);
      expect(query('.repeater-row').length).toBe(3);
    });

    it('removes a row', () => {
      render(schema(false));

      (query('[aria-label="Delete"]')[0] as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(repeaterArray().length).toBe(1);
      expect(repeaterArray().at(0).get('identity')?.value).toBe('DEF-456');
    });

    it('reorders rows', () => {
      render(schema(false, { enableReorder: true }));

      (query('[aria-label="Move down"]')[0] as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(
        repeaterArray()
          .getRawValue()
          .map((row: TransportIdentity) => row.identity)
      ).toEqual(['DEF-456', 'ABC-123']);
    });

    it('keeps validating the nested controls', () => {
      const config = schema(false);
      config.fields[0].nestedFields![0].nestedFields![0].options = { required: true };
      render(config, { transportIdentities: [{ transportUnitCode: '', identity: 'ABC-123' }] });

      expect(repeaterArray().at(0).get('transportUnitCode')?.hasError('required')).toBe(true);
      expect(component.form.valid).toBe(false);
    });
  });

  describe('fields sharing one control', () => {
    // One `content` control per row, one field per key; only the matching field is visible.
    // Rows put the visible field first, middle and last, so field order can't mask the bug.
    const sharedControlSchema = (required = false): Lab900FormConfig => ({
      fields: [
        {
          editType: EditType.Repeater,
          attribute: 'settings',
          options: { fixedList: true },
          nestedFields: [
            {
              editType: EditType.Row,
              nestedFields: [
                { editType: EditType.Input, attribute: 'key', options: { hide: true } },
                ...['A', 'B', 'C'].map(key => ({
                  editType: EditType.Input,
                  attribute: 'content',
                  title: key,
                  options: { hide: (data: { key?: string }) => data?.key !== key, required },
                })),
              ],
            },
          ],
        },
      ],
    });
    const settings = {
      settings: [
        { key: 'A', content: 'a' },
        { key: 'B', content: 'b' },
        { key: 'C', content: 'c' },
      ],
    };
    const contentControl = (row: number) => component.form.get(['settings', row, 'content'])!;

    it('keeps the control enabled while one of its fields is visible', () => {
      render(sharedControlSchema(), settings);

      expect([0, 1, 2].map(row => contentControl(row).enabled)).toEqual([true, true, true]);
      expect(component.form.value.settings.map((row: { content?: string }) => row.content)).toEqual(['a', 'b', 'c']);
    });

    it('keeps the required validator of the visible field', () => {
      render(sharedControlSchema(true), { settings: settings.settings.map(row => ({ ...row, content: '' })) });

      expect([0, 1, 2].map(row => contentControl(row).hasError('required'))).toEqual([true, true, true]);
    });

    it('follows the visible field when the key changes', () => {
      render(sharedControlSchema(), settings);

      component.form.get(['settings', 0, 'key'])!.setValue('Z');
      fixture.detectChanges();
      expect(contentControl(0).disabled).toBe(true);

      component.form.get(['settings', 0, 'key'])!.setValue('C');
      fixture.detectChanges();
      expect(contentControl(0).enabled).toBe(true);
    });
  });

  describe('readonly fields holding a single value', () => {
    it('still resolves the value as a translation key', () => {
      const translate = TestBed.inject(TranslateService);
      translate.setTranslation('en', { VEHICLE: 'Vehicle' });
      translate.use('en');

      render(schema(true), { transportIdentities: [{ transportUnitCode: 'VEHICLE', identity: 'ABC-123' }] });

      expect(query('.lab900-readonly-field')[0].textContent).toContain('Vehicle');
    });
  });
});
