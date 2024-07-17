<p align="center">
    <a href="https://lab900.com" target="_blank">
        <img src="https://lab900.github.io/angular-library-forms/assets/images/logo-duo-dark.svg" width="100">
    </a>
</p>

# Lab900 - Angular libraries

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

## Developing new features or fixing bugs
1. Create a new branch from `main`
2. Make your changes
3. Create & release a [pre-release](#pre-release-version) version (optional).
4. Create a pull request to merge your branch into `main`
5. Create & release a new version after merging.

## Hotfixing older versions
If you need to fix a bug in an older minor or major versions, you can create a branch from the tag of that version.
Create a patch version of the fix and release it. Don't forget to apply the fix to the `main` branch as well (if needed).

## Releasing a new version

1. Update the [CHANGELOG](/CHANGELOG.md) with the new version
2. Bump the lib version. See [Versioning](#versioning) for more information
2. Tag the commit with the version number
3. Push the tag to the repository
4. The deployment will be triggered automatically


```bash
$ cd lib
$ npm version YOUR_VERSION -m "chore: release %s"
$ git tag YOUR_VERSION
$ git push origin YOUR_VERSION
```

## Versioning
We use [SemVer](http://semver.org/) for versioning.

### Major version
The major version number of the library is the same as the Angular version it is built on.

```bash
$ npm version major # if the current version is 1.0.0, the new version will be 2.0.0
```

### Minor version
The minor version number is incremented when new features (eg: new form fields) are added or breaking changes are introduced.

```bash
$ npm version minor # if the current version is 1.0.0, the new version will be 1.1.0
```

### Patch version
The patch version number is incremented when bug fixes are added.

```bash
$ npm version patch # if the current version is 1.0.0, the new version will be 1.0.1
```

### Pre-release version
The pre-release version is incremented when new features or fixes are added that are not yet stable
Eg: we are working on a new feature that is not yet stable, we can release a pre-release version

```bash
$ npm version prepatch --preid=alpha # if the current version is 1.0.0, the new version will be 1.0.1-alpha.0
$ npm version preminor --preid=alpha # if the current version is 1.0.0, the new version will be 1.1.0-alpha.0
$ npm version premajor --preid=alpha # if the current version is 1.0.0, the new version will be 2.0.0-alpha.0
```