# @lab900/forms

Schema driven reactive forms for Angular, built on top of [Angular Material](https://material.angular.io/). \
View the [showcase](https://lab900.github.io/angular-library-forms/) for guides & examples.

## AI coding agents

The package ships `AGENTS.md`, a usage guide for coding agents: point your agent to
`node_modules/@lab900/forms/AGENTS.md`. The showcase also serves
[`llms.txt`](https://lab900.github.io/angular-library-forms/llms.txt) and
[`llms-full.txt`](https://lab900.github.io/angular-library-forms/llms-full.txt), the guide plus the full API
reference. `npm run docs:api` generates both from `lib/AGENTS.md` and the JSDoc in the source.

## Local development

The showcase app in `src/` compiles these sources directly: `@lab900/forms` maps to `src/public-api.ts`
through the `paths` option in the root `tsconfig.json`. Run `npm run start` in the repository root
and edit the files in `lib/`. A library build is not needed.

## Code scaffolding

Run `ng generate component component-name --project forms` to generate a new component. You can also run
`ng generate directive|pipe|service|class|guard|interface|enum|module --project forms`.

> Note: Don't forget to add `--project forms`, or the files go into the default project of your
> `angular.json` file.

## Build

Run `npm run build:forms` in the repository root. The build artifacts go to `dist/@lab900/forms`. Use this
build to check the published package.

## Publishing

The pipeline builds and stages the package. See the release steps in the
[root README](../README.md#releasing-a-new-version).

## Running unit tests

Run `npm test` in the repository root. The tests run with [Jest](https://jestjs.io/) and use the
sources in `lib/`, not the build output.

## Further help

To get more help on the Angular CLI use `ng help`, or read the
[Angular CLI README](https://github.com/angular/angular-cli/blob/main/README.md).
