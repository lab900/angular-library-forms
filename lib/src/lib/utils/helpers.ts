import { asyncScheduler, concat, connect, MonoTypeOperatorFunction, SchedulerLike } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { ReactiveBooleanOption, ReactiveNumberOption, ReactiveStringOption } from '../models/form-field-base';
import { isSignal, Signal } from '@angular/core';

export function debounceTimeAfter(
  amount: number,
  dueTime: number,
  scheduler: SchedulerLike = asyncScheduler
): MonoTypeOperatorFunction<unknown> {
  return connect(value => concat(value.pipe(take(amount)), value.pipe(debounceTime(dueTime, scheduler))));
}

export function debounceTimeAfterFirst(
  dueTime: number,
  scheduler: SchedulerLike = asyncScheduler
): MonoTypeOperatorFunction<unknown> {
  return debounceTimeAfter(1, dueTime, scheduler);
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
