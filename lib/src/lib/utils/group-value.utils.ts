import { AbstractControl } from '@angular/forms';
import { computed, signal, Signal } from '@angular/core';

/**
 * One value signal per control, shared by every field that renders inside it.
 *
 * Every field reads the group value: reactive options (`hide`, `required`, a `title` function, ...) receive
 * it, so both {@link FormComponent} and {@link FormFieldDirective} need a signal of it. Building that signal
 * per field meant one subscription on `group.valueChanges` per field, each calling `getRawValue()` on every
 * change. `getRawValue()` walks the whole control tree, so a keystroke in a form of N fields cost N walks of
 * N controls.
 *
 * Two things keep that flat here:
 * - the signal is cached per control, so a group is subscribed to once no matter how many fields it holds.
 *   The {@link WeakMap} keys on the control itself, so the entry dies with the form, and the subscription
 *   with it - the group owns the only reference to it.
 * - it is a `computed` over a version counter, so `getRawValue()` runs only when a field actually reads the
 *   value, and at most once per change. A form whose options are all static never walks the tree at all.
 *
 * The value is a new object on every change, exactly as before, so a `computed` that reads it still
 * recomputes on every change of the group.
 */
const groupValueSignals = new WeakMap<AbstractControl, Signal<any>>();

export function sharedGroupValue(group: AbstractControl): Signal<any> {
  let groupValue = groupValueSignals.get(group);
  if (!groupValue) {
    // `equal` never reports equality: the counter only exists to invalidate, the value is read from the control.
    const version = signal(0, { equal: () => false });
    group.valueChanges.subscribe(() => version.update(v => v + 1));
    groupValue = computed(() => {
      version();
      return group.getRawValue();
    });
    groupValueSignals.set(group, groupValue);
  }
  return groupValue;
}
