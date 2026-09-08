import { asyncScheduler, concat, connect, MonoTypeOperatorFunction, SchedulerLike } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { ReactiveBooleanOption, ReactiveNumberOption, ReactiveStringOption } from '../models/form-field-base';
import { isSignal, Signal } from '@angular/core';

export function debounceTimeAfter<T = unknown>(
  amount: number,
  dueTime: number,
  scheduler: SchedulerLike = asyncScheduler
): MonoTypeOperatorFunction<T> {
  return connect(value => concat(value.pipe(take(amount)), value.pipe(debounceTime(dueTime, scheduler))));
}

export function debounceTimeAfterFirst<T = unknown>(
  dueTime: number,
  scheduler: SchedulerLike = asyncScheduler
): MonoTypeOperatorFunction<T> {
  return debounceTimeAfter<T>(1, dueTime, scheduler);
}

export function computeReactiveBooleanOption(option: ReactiveBooleanOption, groupValue: Signal<any>): boolean {
  let response = false;
  let optionCopy = option;
  if (!isSignal(optionCopy) && typeof optionCopy === 'function') {
    optionCopy = optionCopy(groupValue());
  }
  if (isSignal(optionCopy)) {
    response = optionCopy();
  } else if (typeof optionCopy === 'boolean') {
    response = optionCopy;
  }
  return response;
}

export function computeReactiveStringOption(option: ReactiveStringOption, groupValue: Signal<any>): string | undefined {
  let response: string | undefined = undefined;
  let optionCopy = option;
  if (!isSignal(optionCopy) && typeof optionCopy === 'function') {
    optionCopy = optionCopy(groupValue());
  }
  if (isSignal(optionCopy)) {
    response = optionCopy();
  } else if (typeof optionCopy === 'string') {
    response = optionCopy;
  }
  return response;
}
export function computeReactiveNumberOption(option: ReactiveNumberOption, groupValue: Signal<any>): number | undefined {
  let response: number | undefined = undefined;
  let optionCopy = option;
  if (!isSignal(optionCopy) && typeof optionCopy === 'function') {
    optionCopy = optionCopy(groupValue());
  }
  if (isSignal(optionCopy)) {
    response = optionCopy();
  } else if (typeof optionCopy === 'number') {
    response = optionCopy;
  }
  return response;
}

export function computeReactiveStrictStringOption(option: ReactiveStringOption, groupValue: Signal<any>): string {
  return computeReactiveStringOption(option, groupValue) ?? '';
}

/**
 * One display string per value: an array yields one string per item, anything else yields at most one.
 * Empty items are dropped, so an empty result means there is nothing to show.
 *
 * A readonly field can hold any control value, and `TranslatePipe` only guards on
 * `!query || !query.length`: a non-empty array reaches `TranslateService.instant()`, which calls
 * `key.split('.')` on every item and throws on the first item that is not a string. Splitting the value
 * into keys here lets the caller translate each one and keeps that crash out of the pipe.
 *
 * A value whose `String()` is `[object ...]` has no rendering of its own, so it is dropped rather than
 * printed: a plain object, a `File`, a `Date` range. Set `readonlyDisplay` on those fields.
 */
export function toReadonlyDisplayStrings(value: unknown): string[] {
  if (value == null || value === '') {
    return [];
  }
  if (typeof value === 'string') {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.flatMap(item => toReadonlyDisplayStrings(item));
  }
  const asString = String(value);
  return asString.startsWith('[object ') ? [] : [asString];
}

/**
 * The display strings of {@link toReadonlyDisplayStrings} joined with `, `, or `undefined` when there is
 * nothing to show. Use this where a single string is needed and the items do not have to be translated
 * one by one.
 */
export function toReadonlyDisplayString(value: unknown): string | undefined {
  const items = toReadonlyDisplayStrings(value);
  return items.length ? items.join(', ') : undefined;
}
