import { MergeConfig } from '../../../../../../../projects/ui/src/lib/merger/models/merge-config.model';
import * as moment from 'moment';
import { of } from 'rxjs';
import { CustomExampleComponent } from '../custom-example.component';
import { MergerDataExample } from '../models/merger-data-example.model';

export const mergerSchemaExample: MergeConfig<MergerDataExample>[] = [
  {
    attribute: 'name',
    label: 'label.last-name',
  },
  {
    attribute: 'dateOfBirth',
    label: 'label.birthday',
    formatter: (data) => (data ? moment(data).format('DD/MM/YYYY') : ''),
  },
  {
    attribute: 'languages',
    label: 'language',
    formatter: (data) => of(data.sort().join(', ')),
    nextLine: true,
  },
  {
    attribute: 'text',
    component: CustomExampleComponent,
  },
  {
    attribute: 'firstName',
    label: 'label.first-name',
  },
];