import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

interface TransportIdentity {
  transportUnitCode: string;
  identity: string;
}

const nestedFields: Lab900FormConfig['fields'] = [
  {
    editType: EditType.Row,
    nestedFields: [
      {
        attribute: 'transportUnitCode',
        editType: EditType.Input,
        title: 'Transport unit',
        options: { colspan: 6 },
      },
      {
        attribute: 'identity',
        editType: EditType.Input,
        title: 'Identity',
        options: { colspan: 6 },
      },
    ],
  },
];

@Component({
  selector: 'lab900-form-field-repeater-readonly-example',
  template: `
    <h4>Readonly, default rendering</h4>
    <lab900-form [schema]="readonlySchema" [data]="data" />

    <h4>Readonly, reduced by readonlyDisplay</h4>
    <lab900-form [schema]="readonlyDisplaySchema" [data]="data" />

    <h4>Editable, for comparison</h4>
    <lab900-form [schema]="editableSchema" [data]="data" />
  `,
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldRepeaterReadonlyExampleComponent {
  public data: { transportIdentities: TransportIdentity[] } = {
    transportIdentities: [
      { transportUnitCode: 'VEHICLE', identity: 'ABC-123' },
      { transportUnitCode: 'TRAILER', identity: 'DEF-456' },
    ],
  };

  /** A readonly repeater keeps its own component, so every row still renders, without its row actions. */
  public readonlySchema: Lab900FormConfig = {
    readonly: true,
    fields: [
      {
        attribute: 'transportIdentities',
        editType: EditType.Repeater,
        title: 'Transport identities',
        nestedFields,
      },
    ],
  };

  /**
   * `readonlyDisplay` reduces the whole repeater to one string, and still wins over the rows. That string
   * reaches the template through `[innerHTML]`, so the `<br>` tags below render as line breaks.
   */
  public readonlyDisplaySchema: Lab900FormConfig = {
    readonly: true,
    fields: [
      {
        attribute: 'transportIdentities',
        editType: EditType.Repeater,
        title: 'Transport identities',
        nestedFields,
        options: {
          readonlyDisplay: (data: { transportIdentities: TransportIdentity[] }) =>
            data.transportIdentities.map(row => `${row.transportUnitCode}: ${row.identity}`).join('<br>'),
        },
      },
    ],
  };

  public editableSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'transportIdentities',
        editType: EditType.Repeater,
        title: 'Transport identities',
        nestedFields,
        options: { addLabel: 'Add identity', enableReorder: true },
      },
    ],
  };
}
