import { MergeObject } from '../../../../../../../projects/ui/src/lib/merger/models/merge-object.model';

export const mergerDataExample: MergeObject[] = [
  {
    data: {
      name: 'Axelle',
      firstName: 'Red',
      languages: ['Nederlands', 'Frans'],
    },
    title: 'Axelle Red',
  },
  {
    data: {
      name: 'Axelle',
      firstName: 'Blue',
      languages: ['Frans', 'Nederlands'],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum nunc vel convallis malesuada. Suspendisse at tristique tortor, id elementum odio.',
      dateOfBirth: new Date(),
    },
    title: 'Axelle Blue',
  },
];
