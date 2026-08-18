# Changelog

## 22.0.0

Upgrade to Angular 22. See [angular upgrade document](ANGULAR-UPGRADE-19.2-TO-22.1.md) for all changes done

**Breaking: the package is now published in partial compilation mode.** Every release up to 19.1.40 was published fully compiled, which bakes Angular's private instruction calls into the output and only runs on the Angular major it was built against. From 22.0.0 the package ships partial declarations, which the Angular linker recompiles during your own build. Nothing changes if you build with the Angular CLI. If you build without it, make sure the Angular linker runs over `node_modules`.

**Breaking: `@lab900/ui` must be `>=22.0.4`.** 22.0.0 is fully compiled and crashes on a newer Angular major with `TypeError: (void 0) is not a function`, so the peer range excludes it.

**Breaking: the date-time picker package changed.** `@ngxmc/datetime-picker` stopped releasing after Angular 20, so it is replaced by `@ngx-mce/datetime-picker` (`~22.2.3`), the maintained fork of the same project. Its public API is identical.

- Fix: the date-time field shows the selected time in the input again.
- Chore: 12 components moved to `OnPush` change detection, the Angular 22 default. 8 keep the eager strategy for now, each with a `TODO` explaining why.
- Fix: button toggle no longer renders an empty icon element for options without an icon.
- Fix: button toggle element id rendered the `elementId` function instead of its value.
- Fix: range slider inputs show an empty value instead of the text `undefined` when no value is set.
- Fix: the file upload input sets an empty `accept` when no `accept` option is given, instead of a stringified empty value.
- Fix: form rows, form columns and the search field no longer render when the form group or the field options they need are missing, instead of rendering a broken field.
- updated the [cloudbuild.yaml](cloudbuild.yaml) file to use `npm stage publish` instead of `npm publish`

## 19.1.38, 19.1.39, 19.1.40

- Fix: error alignment issue

## 19.1.37

- Fix: Drag&Drop not showing validation errors

## 19.1.36

- Feat: add reordering option in repeater field

## 19.1.35

- Fix: selected option showing empty when searching and option not in search results

## 19.1.34 - Broken

- Broken due to new version of @kolkov/angular-editor which is only supported from Angular 20.

## 19.1.33

- Fix: file preview opening file select when hitting enter

## 19.1.32

- Fix: remove chip on autocomplete multiselect not working
- Feat: add option to show selected options as chips in multiselect

## 19.1.31

- Fix: hide checkbox in no options indicator for multiselects.

## 19.1.30

- Feat: support a no options indicator when a select has no initial options to show.

## 19.1.29

- Chore: update vulnerable package, still one left (angular-cli-ghpages, waiting on an update)

## 19.1.28

- Fix: make edit metadata of file preview reactive

## 19.1.27

- Fix: repeater dirty/touched state

## 19.1.26

- Fix: form dialog loading signal

## 19.1.25

- Fix: file preview not showing files correctly

## 19.1.24

- Fix: fix visibility check for button toggle

## 19.1.23

- Fix: icon positioning in password input field
- Add possibility to hide selected option indicator on toggle

## 19.1.22

- Fix: alignment bug with readonly and editable checkboxes

## 19.1.21

- Fix: infinite scroll selects kept on requesting data when all data was already loaded

## 19.1.20

- Fix: conditionals on rows not working

## 19.1.19

- Fix: ngx-mask issues introduced in 19.1.15 (related to https://github.com/JsDaddy/ngx-mask/issues/1305)

## 19.1.18

- Fix: search field ignoring same input after clearing

## 19.1.17

- Fix: some labels where not being translated

## 19.1.16

- Feat: reactive form field title
- Fix: validators when field is required

## 19.1.15

- Fix: NgxMask having issues with the focus state (https://github.com/JsDaddy/ngx-mask/issues/1305)
- Fix: general focus state issues if parent components are on push

## 19.1.14

- Fix: amount field triggering the patchValues

## 19.1.13

- Added translate logic to Icon field text option

## 19.1.11

- Added text functionality to icon

## 19.1.10

- Fix: column hidden state

## 19.1.9

- Fix: row labels

## 19.1.8

- Feat: reactive form field icon

## 19.1.7

- Bug fix: hidden form-col class

## 19.1.6

- Bug fix: fix tooltips showing for conditional hidden fields

## 19.1.5

- Bug fix: fix tooltips showing for hidden fields
- Feat: reactive button labels

## 19.1.4

- Bug fix: reactive options based on form group values
- Bug fix: hidden fields

## 19.1.3

- Feat: hide/readonly/required can now handle signals

## 19.1.2

- Bug fix: select readonly state not working
- Bug fix: make sure raw values are checked

## 19.1.0

- Readonly, hidden and required states are reactive
- Bug fix: issue with error messages not showing
- Bug fix: this disabled/enabled form controls warnings should be gone as this is now done as it should
- Bug fix: issue with unique ids not always being unique

## 19.0.5

- Bug fix: issue with amount field not showing the correct value

## 19.0.4

- Bug fix: title of text area field is now properly translated

## 19.0.3

- Bug fix: conditional fields throwing errors

## 19.0.2

- Bug fix: repeater issues

## 19.0.1

- Bug fix: date picker toggle not appearing
- Bug fix: select giving nativeElement not found error

## 19.0.0

- Angular 19 update

### Breaking changes

Since `@angular-material-components/datetime-picker` has not been updated the last major version it is replaced by `@ngxmc/datetime-picker`.

## 18.2.1

- Fix broken colspan for form rows

## 18.2.0

- Adding possibility for the usage of custom Id's to form: columns, rows, fields and buttons.

## 18.1.1/18.1.2

- fixes for displaying error messages

## 18.1.0

- More signals to solve change detection issues.

## 18.0.5

- Fix select reopening with fetch on focus option

## 18.0.4

- Fix masking issues

## 18.0.3

- Fix issues with MultiLang inputs

## 18.0.0

- Angular 18 update

## 17.0.4

- Fix masking issues

## 17.0.1

- Fix disabled state of SlideToggle component
- Configuration is now visible in examples
- Prop selectedDisplayFn error is adjusted

### Breaking changes

- Functionality of displayOptionFn prop on Selectors is removed

## 17.0.0

- Upgrade to Angular 17

### Breaking changes

The way the forms are imported and provided has changed completely as everything is standalone now.
See the [getting started guide](https://lab900.github.io/angular-library-forms/getting-started) for more information.

## older version

Sorry no changelog available :(
