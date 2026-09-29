import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { Lab900Form } from './form-container.component';
import { EditType } from '../../models/editType';
import { Lab900FormConfig } from '../../models/Lab900FormConfig';
import { Lab900FormBuilderService } from '../../services/form-builder.service';
import { RENDER_TESTING_PROVIDERS } from '../../testing/testing.providers';

/**
 * What a keystroke costs, as a function of the number of fields.
 *
 * Every field reads the value of its group, so each one used to subscribe to `group.valueChanges` and call
 * `getRawValue()` - a walk of the whole control tree - on every change. Both are shared per group now, so
 * these numbers have to stay flat as fields are added. They are asserted, not printed: the point of the
 * spec is to fail when a new per-field subscription or a new per-field `getRawValue()` is introduced.
 */
describe('Lab900Form scaling', () => {
  let fixture: ComponentFixture<Lab900Form<any>>;

  const schemaWith = (nbOfFields: number): Lab900FormConfig => ({
    fields: Array.from({ length: nbOfFields }, (_, i) => ({
      attribute: `field${i}`,
      editType: EditType.Input,
      title: `Field ${i}`,
    })),
  });

  /** Subscribers on the root group, and full-tree reads caused by one change, for a form of `nbOfFields`. */
  const costOfOneChange = (nbOfFields: number): { subscribers: number; rawValueReads: number } => {
    fixture.componentRef.setInput('schema', schemaWith(nbOfFields));
    fixture.detectChanges();
    const form: UntypedFormGroup = fixture.componentInstance.form;

    let rawValueReads = 0;
    const getRawValue = form.getRawValue.bind(form);
    form.getRawValue = () => {
      rawValueReads++;
      return getRawValue();
    };

    const subscribers = (form.valueChanges as any).observers.length;
    form.get('field0')!.setValue('a');
    fixture.detectChanges();

    return { subscribers, rawValueReads };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: RENDER_TESTING_PROVIDERS }).compileComponents();
    fixture = TestBed.createComponent(Lab900Form);
  });

  it('does not subscribe to the group at all when no field reads its value', () => {
    // Static options: nothing ever resolves against the group value, so the signal is never even created.
    expect(costOfOneChange(1).subscribers).toBe(0);
    expect(costOfOneChange(10).subscribers).toBe(0);
    expect(costOfOneChange(40).subscribers).toBe(0);
  });

  it('does not read the whole form value per field on a change', () => {
    expect(costOfOneChange(10).rawValueReads).toBe(0);
    expect(costOfOneChange(40).rawValueReads).toBe(0);
  });

  it('subscribes once and reads the value once per change, whatever the number of readers', () => {
    const readersOf = (nbOfFields: number): { subscribers: number; rawValueReads: number } => {
      fixture.componentRef.setInput('schema', {
        fields: Array.from({ length: nbOfFields }, (_, i) => ({
          attribute: `field${i}`,
          editType: EditType.Input,
          // a reactive option, so every field resolves it against the group value
          title: () => `Field ${i}`,
        })),
      } as Lab900FormConfig);
      fixture.detectChanges();
      const form: UntypedFormGroup = fixture.componentInstance.form;

      let rawValueReads = 0;
      const getRawValue = form.getRawValue.bind(form);
      form.getRawValue = () => {
        rawValueReads++;
        return getRawValue();
      };

      const subscribers = (form.valueChanges as any).observers.length;
      form.get('field0')!.setValue('a');
      fixture.detectChanges();
      return { subscribers, rawValueReads };
    };

    expect(readersOf(5)).toEqual({ subscribers: 1, rawValueReads: 1 });
    expect(readersOf(20)).toEqual({ subscribers: 1, rawValueReads: 1 });
  });

  it('cleans up the condition subscriptions when the form is destroyed', () => {
    fixture.componentRef.setInput('schema', {
      fields: [
        { attribute: 'a', editType: EditType.Input },
        { attribute: 'b', editType: EditType.Input, conditions: [{ dependOn: 'a', showIfHasValue: true }] },
      ],
    } as Lab900FormConfig);
    fixture.detectChanges();
    const dependency = fixture.componentInstance.form.get('a')!;

    expect((dependency.valueChanges as any).observers.length).toBeGreaterThan(0);
    fixture.destroy();
    expect((dependency.valueChanges as any).observers.length).toBe(0);
  });
});

describe('Lab900FormBuilderService validators', () => {
  let fb: Lab900FormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: RENDER_TESTING_PROVIDERS });
    fb = TestBed.inject(Lab900FormBuilderService);
  });

  it('keeps the validators of a field that has no options', () => {
    const field: any = { attribute: 'name', editType: EditType.Input, validators: [Validators.required] };
    expect(Lab900FormBuilderService.addValidators(field)).toEqual([Validators.required]);
  });

  it('does not accumulate validators on the schema when a repeater builds its rows', () => {
    const nestedField: any = {
      attribute: 'name',
      editType: EditType.Input,
      validators: [Validators.email],
      options: { minLength: 3 },
    };
    const repeater: any = { attribute: 'rows', editType: EditType.Repeater, nestedFields: [nestedField] };

    const formArray = fb.createFormArray({ rows: [{}, {}, {}, {}, {}] }, repeater);

    // the schema keeps the one validator it declares, instead of collecting one `minLength` per row built
    expect(nestedField.validators).toEqual([Validators.email]);
    // so the last row validates exactly like the first
    formArray.controls.forEach(row => {
      const control = (row as UntypedFormGroup).get('name')!;
      control.setValue('ab');
      expect(control.errors).toEqual({ email: true, minlength: { requiredLength: 3, actualLength: 2 } });
    });
  });
});
