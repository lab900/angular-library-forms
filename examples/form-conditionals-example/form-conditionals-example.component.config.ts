import { EditType, Lab900FormConfig } from '@lab900/forms';
import { ValueLabel } from '../../../../../../lib/src/lib/models/form-field-base';

export const formConditionalsData = {
  country: 'BEL',
};

export const formConditionalsExample: Lab900FormConfig = {
  formId: 'exampleFormId',
  fields: [
    {
      attribute: 'role',
      editType: EditType.Select,
      title: 'Role',
      options: {
        elementId: 'customIdRole',
        colspan: 6,
        selectOptions: [
          { label: '', value: null },
          { label: 'User', value: 'user' },
          { label: 'Administrator', value: 'administrator' },
        ],
      },
    },
    {
      attribute: '',
      editType: EditType.Row,
      options: {
        elementId: 'rowCustomId',
      },
      nestedFields: [
        {
          attribute: 'country',
          editType: EditType.Select,
          title: 'Country',
          options: {
            elementId: 'countryCustomId',
            colspan: 6,
          },
          conditions: [
            {
              dependOn: 'role',
              enableIfHasValue: true,
              conditionalOptions: () => {
                return [
                  { label: 'belgium', value: 'BEL' },
                  { label: 'france', value: 'FRA' },
                  { label: 'germany', value: 'GER' },
                  { label: 'hide language', value: 'HIDE' },
                ];
              },
            },
          ],
        },
        {
          attribute: 'language',
          editType: EditType.Select,
          title: 'Language',
          options: {
            colspan: 6,
          },
          conditions: [
            {
              dependOn: ['country', 'role'],
              conditionalOptions: (value: { country: string; role: string }): ValueLabel[] => {
                switch (value?.country) {
                  case 'BEL':
                    return [
                      { label: 'Dutch', value: 'NL' },
                      { label: 'French', value: 'FR' },
                      { label: 'German', value: 'DE' },
                    ];
                  case 'FRA':
                    return [{ label: 'French', value: 'FR' }];
                  case 'GER':
                    return [{ label: 'German', value: 'DE' }];
                }
                return [];
              },
              disableIfEquals: (value: { country: string; role: string }) =>
                value?.country === 'BEL' && value?.role === 'administrator',
            },
          ],
        },
        {
          attribute: 'favouriteFood',
          editType: EditType.Select,
          title: 'Favourite food',
          options: {
            colspan: 6,
          },
          conditions: [
            {
              dependOn: 'language',
              conditionalOptions: (language: string): ValueLabel[] => {
                switch (language) {
                  case 'NL':
                    return [{ label: 'Belgian Fries', value: 'fries' }];
                  case 'FRA':
                  case 'GER':
                    return [{ label: 'Bon Cuisine', value: 'bon' }];
                }
                return [];
              },
            },
          ],
        },
      ],
    },
  ],
};
