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
 * Reduce any control value to something the translate pipe accepts.
 *
 * `TranslatePipe` only guards on `!query || !query.length`, so a non-empty array reaches
 * `TranslateService.instant()`, which calls `key.split('.')` on every item and throws on the first item
 * that is not a string. A readonly field can hold any control value, so it stringifies the value first.
 *
 * Empty values return `undefined`, so the caller can fall back to a placeholder. Arrays are joined with
 * `, `; objects without a `toString()` of their own render as `[object Object]`, the same as before, so
 * set `readonlyDisplay` on those fields.
 */
export function toReadonlyDisplayString(value: unknown): string | undefined {
  if (value == null || value === '') {
    return undefined;
  }
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    const items = value.map(item => toReadonlyDisplayString(item)).filter((item): item is string => item !== undefined);
    return items.length ? items.join(', ') : undefined;
  }
  return String(value);
}
