# Getting Started with Lab900 Forms

This guide explains how to setup your Angular project to begin using Lab900 forms.

## Install

Install via npm package manager.

```bash
npm install --save @lab900/forms
```

## How to use

Import the `Lab900FormsModule` in your root module.

```ts
import { Lab900FormsModule } from '@lab900/forms';

@NgModule({
  imports: [
    ...
    NgxMaskModule.forRoot(),
    Lab900FormsModule.forRoot({
      formField: {
        appearance: 'outline', // optional, see below
      },
    }),
    ...
  ],
  bootstrap: [],
})
export class AppModule {}

```

You can overwrite the [MatFormFieldDefaultOptions](https://material.angular.io/components/form-field/api) in the `forRoot()` method.

```ts
FormModuleSettings = {
  formField: {
    appearance: 'standard', // default
    floatLabel: 'auto', // default
    hideRequiredMarker: false, // default
  },
};
```

Import the `Lab900FormsModule` in your child modules (where needed).

```ts
import { Lab900FormsModule } from '@lab900/forms';

@NgModule({
  imports: [
    ...
    Lab900FormsModule,
    ...
  ],
  bootstrap: [],
})
export class SharedModule {}
```

## Styling

Include the library stylesheet in your scss file.

```scss
@import '~@lab900/forms/theming';

@include lab900-forms(YOUR_MATERIAL_THEME);
```

The lab900-forms mixin expects a [Material theme of config](https://material.angular.io/guide/theming).

## Date(time) picker

The date-time picker will require the following package to be installed.

```bash
npm i @angular-material-components/datetime-picker --save-dev
```

### Native dates

Add the imports before importing the `Lab900FormsModule.forRoot()`.

```ts
MatNativeDateModule, NgxMatNativeDateModule, Lab900FormsModule.forRoot();
```

### Moment dates

Install the following packages.

```bash
npm install moment @angular/material-moment-adapter@16.2.7 @angular-material-components/moment-adapter@16.2.7 --save-dev
```

Add the imports before importing the `Lab900FormsModule.forRoot()`.

```ts
MatMomentDateModule, NgxMatMomentModule, Lab900FormsModule.forRoot();
```

### Luxon dates

**Unfortionally, a Luxon date adapter is not available for the dateTime picker.**

```bash
npm install luxon @angular/material-luxon-adapter@16.2.7 --save-dev
```

Add the imports before importing the `Lab900FormsModule.forRoot()`.

```ts
LuxonDateModule, Lab900FormsModule.forRoot();
```
