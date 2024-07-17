# Getting Started with Lab900 Forms

This guide explains how to setup your Angular project to begin using Lab900 forms.

## Install

Install via npm package manager.

```bash
npm install --save @lab900/forms
```

## How to use

Add the `provideLab900Forms` app config.

```ts
import {provideNativeDateAdapter} from '@angular/material/core';
import {provideLab900Forms} from '@lab900/forms';
import {provideNgxMask} from 'ngx-mask';
import {NgxMatNativeDateAdapter} from '@angular-material-components/datetime-picker';

bootstrapApplication(AppComponent, {
    providers: [
        ...
        provideNgxMask(), // needed for the input masks
        provideNativeDateAdapter(), // optional for the date pickers (see below)
        importProvidersFrom(NgxMatNativeDateModule), // optional for the date time pickers (see below)
        provideLab900Forms({
            formField: {
                appearance: 'fill',
            },
            amountField: {
                locale: 'de-DE',
            },
        }),
        ...
    ],
});

```

You can pass customs [MatFormFieldDefaultOptions](https://material.angular.io/components/form-field/api) in
the `provideLab900Forms()` .

```ts
FormModuleSettings = {
    formField: {
        appearance: 'standard', // default
        floatLabel: 'auto', // default
        hideRequiredMarker: false, // default
    },
};
```

Import the standalone `Lab900Form` component wherever needed.

```ts
import {Lab900Forms} from '@lab900/forms';

@Component({
    selector: 'my-component',
    template: '<lab900-form [schema]="formSchema" [data]="data" />',
    standalone: true,
    imports: [Lab900Form],
})
export class myComponent {
...
}
```

## Styling

Include the library stylesheet in your scss file.

```scss
@use '@lab900/forms/theming' as forms;

@include forms.lab900-forms(YOUR_MATERIAL_THEME);
```

The lab900-forms mixin expects a [Material theme of config](https://material.angular.io/guide/theming).

## Date(time) picker

The date-time picker will require the following package to be installed.

```bash
npm i @angular-material-components/datetime-picker --save-dev
```

**[The date-time picker](https://www.npmjs.com/package/@angular-material-components/datetime-picker) seems to be abandoned and is not updated to Angular 17. If you have a good replacement let me know**

To fix the npm i dependency issue, you can add the following to your package.json.

```json
"overrides": {
    "@angular-material-components/datetime-picker": {
      "@angular/platform-browser": ">=17.0.0",
      "@angular/common": ">=17.0.0",
      "@angular/core": ">=17.0.0",
      "@angular/forms": ">=17.0.0",
      "@angular/material": ">=17.0.0",
      "@angular/cdk": ">=17.0.0"
    }
}
```

### Native dates

Add this before providing the `provideLab900Forms`.

```ts
provideNativeDateAdapter(),
importProvidersFrom(NgxMatNativeDateModule)
```

### Moment dates

Install the following packages.

```bash
npm install moment @angular/material-moment-adapter @angular-material-components/moment-adapter@16.2.7 --save-dev
```

Add the imports before importing the `Lab900FormsModule.forRoot()`.

```ts 
provideMomentDateAdapter(),
importProvidersFrom(NgxMatMomentModule)
```

### Luxon dates

**Unfortionally, a Luxon date adapter is not available for the dateTime picker.**

```bash
npm install luxon @angular/material-luxon-adapter --save-dev
```

```ts 
provideLuxonDateAdapter()
```

More info on date adapters. [Angular Material Date Adapter](https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-adapter)
