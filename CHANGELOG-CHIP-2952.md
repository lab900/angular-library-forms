# CHIP-2952 — Required star (*) for conditionally-visible fields (TO BE DROPPED)

**Branch:** `feat/CHIP-2952_show-star-for-required-fields-for-conditional-visibility`  
**Files changed:** 4 (2 library, 2 showcase)

---

## Problem

When a form field uses `conditions[].validators` with a **custom `ValidatorFn`** (i.e. any function that is not the `Validators.required` singleton), the required star (`*`) never appeared next to the field label — even though the field was functionally required and would fail validation on submit.

**Root cause** — `IFieldConditions.runAll` determined required-ness via a strict reference check:

```ts
// before
this.component.fieldIsRequired.set(newValidators.includes(Validators.required));
```

`Array.includes` uses `===`. A custom factory function (e.g. `requiredField(() => condition)`) is never `=== Validators.required`, so `fieldIsRequired` was always set to `false` and Angular Material never rendered the star.

---

## Changes

### 1. `lib/src/lib/models/IFieldConditions.ts`

#### a) New `required?: boolean` field on `IFieldConditions` interface + `FieldConditions` class

Allows callers to **explicitly** declare required-ness when the heuristic cannot be trusted.

```ts
// optional — omit to rely on auto-detection
required?: boolean;
```

#### b) `runAll` rewrite — three linked changes

| Step | Before | After |
|---|---|---|
| Required detection | `newValidators.includes(Validators.required)` only | Explicit `required` flag → heuristic fallback (runs each validator against `new FormControl(null)` and checks for a `required` error key) |
| Order | `setValidators` called **before** `isRequired` was known | `isRequired` computed **first**, then array augmented if needed |
| Star signal | `Validators.required` singleton injected only by the `AbstractFormComponent` effect | Singleton injected **inside `runAll`** when `isRequired && !array.includes(Validators.required)`, so Angular Material detects it immediately |

```ts
// after (simplified)
const isRequired =
  this.required !== undefined
    ? this.required
    : newValidators.includes(Validators.required) ||
      newValidators.some(v => v(new FormControl(null))?.['required']);

if (isRequired && !newValidators.includes(Validators.required)) {
  newValidators.push(Validators.required); // ← makes Angular Material show the star
}
control.setValidators(newValidators);
this.component.fieldConditionValidatorsActive.set(true);
this.component.fieldIsRequired.set(isRequired);
control.updateValueAndValidity();
```

Also imports `FormControl` from `@angular/forms` (new import, needed for the heuristic).

---

### 2. `lib/src/lib/components/AbstractFormComponent.ts`

#### a) New `fieldConditionValidatorsActive` signal

```ts
public readonly fieldConditionValidatorsActive = signal<boolean>(false);
```

Set to `true` by `FieldConditions` when its `validators` function is active.

#### b) Guard in the `fieldIsRequired` effect

```ts
if (this.fieldConditionValidatorsActive()) {
  return; // condition owns the full validator array — don't interfere
}
```

Without this guard, the pre-existing effect would race with `runAll`: it would see `fieldIsRequired = true` and try to `addValidators(Validators.required)` a second time, causing duplicate validators and inconsistent state between condition runs.

Also adds `signal` to the `@angular/core` import (was missing).

---

### 3. Showcase — new example (no library impact)

- **New file:** `src/app/modules/showcase-forms/examples/form-conditional-required-example/form-conditional-required-example.component.ts`  
- **Updated:** `src/app/modules/showcase-forms/showcase-forms.routes.ts` — adds a new tab _"Conditional visibility + required (*)"_ under the _Conditional forms_ section.

The example reproduces the bug scenario exactly: a `conditionalRequired()` factory (stand-in for the production `requiredField(() => …)`) that returns `{ required: true }` but is not the singleton. Selecting a source type reveals the "Activity type" field and should now show the required star.

---

## Pros

- **Non-breaking** — `required` is optional; all existing form configs work as before.
- **Works with custom validators** — any validator that returns a `required` error key is now handled, regardless of function identity.
- **Explicit escape hatch** — `required: true/false` lets callers override the heuristic when the auto-detection is unreliable (e.g. validators with side effects or async behaviour).
- **No template changes needed** — fix is self-contained in `runAll`; every field type (input, select, textarea, …) benefits automatically because Angular Material reads `control.hasValidator(Validators.required)`.

## Cons / caveats

- **`Validators.required` is always injected alongside custom validators when required** — the control will have two validators covering the same error key. The errors are identical (`{ required: true }`) so they merge without duplication, but it is a slight deviation from the caller's original validator array.
- **Heuristic cost** — the fallback path calls each validator once with a temporary `new FormControl(null)` on every `runAll` invocation. For forms with many conditions or deeply nested groups this is a tiny but non-zero overhead per value-change cycle. Fields that pass `required: true/false` explicitly skip this entirely.
- **Heuristic edge cases** — the heuristic can still mis-detect if a custom validator's required logic depends on state outside the form (e.g. a service call or an injected value). Use `required: true` explicitly in those cases.

## Breaking changes

None. The new `required` field is optional, and the behaviour for validators that already use `Validators.required` directly is unchanged (the `newValidators.includes(Validators.required)` fast path returns `true` before the heuristic even runs).
