<p align="center">
<a href="https://lab900.com" target="_blank">
    <img src="https://lab900.github.io/angular-library-forms/assets/images/logo-duo-dark.svg" width="100">
</a>
<h1>Lab900 - Angular libraries</h1>

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

</p>

A set of Angular 17+ form components build on top of [Angular Material](https://material.angular.io/). \
View the [showcase](https://lab900.github.io/angular-library-forms) for guides & examples

## Getting started

- [Forms library](https://lab900.github.io/angular-library-forms/getting-started)

## Run the project locally

```bash
$ npm i
$ npm run watch:forms # in a separate terminal
$ npm run start
```

## Releasing a new version

1. Bump the lib version
2. Tag the commit with the version number
3. Push the tag to the repository
4. The deployment will be triggered automatically

```bash
$ cd lib/forms
$ npm version YOUR_VERSION
$ cd ../../
$ git tag YOUR_VERSION
$ git push origin YOUR_VERSION
```

