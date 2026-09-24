import { isDevMode } from '@angular/core';

/**
 * Development warnings for the mistakes this library fails silently on.
 *
 * The schema is data, so a wrong schema does not fail to compile and usually does not throw either: an
 * unknown `editType` renders a placeholder, a select without a `compareWith` renders empty, a
 * `readonlyDisplay` that returns an object renders nothing. The form looks built and shows the wrong
 * thing. These warnings turn those into a message that names the field and the fix.
 *
 * They only run in development (`isDevMode()`), and every message is emitted once per key: the checks
 * sit inside `computed`s and effects that re-run on every value change, so warning every time would
 * flood the console.
 *
 * Turn them off with `provideLab900Forms({ devWarnings: false })`.
 */
let warningsEnabled = true;

const alreadyWarned = new Set<string>();

/**
 * Enables or disables the warnings for the whole application. `provideLab900Forms()` calls this with
 * `Lab900FormModuleSettings.devWarnings`.
 */
export function setLab900DevWarnings(enabled: boolean): void {
  warningsEnabled = enabled;
  alreadyWarned.clear();
}

/**
 * Logs `message` once per `key`, in development only. Later calls with the same key are dropped, so a
 * check may sit in a `computed` without flooding the console.
 */
export function devWarnOnce(key: string, message: string): void {
  if (!warningsEnabled || !isDevMode() || alreadyWarned.has(key)) {
    return;
  }
  alreadyWarned.add(key);
  console.warn(`[@lab900/forms] ${message}`);
}

/** Clears the record of what has been warned about. For tests that assert on a warning. */
export function resetLab900DevWarnings(): void {
  alreadyWarned.clear();
}

/** Names a field in a warning: its attribute when it has one, its edit type otherwise. */
export function describeField(attribute: string | undefined, editType: string): string {
  return attribute ? `"${attribute}" (${editType})` : `a ${editType} field without an attribute`;
}
