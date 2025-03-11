import { asyncScheduler, concat, connect, MonoTypeOperatorFunction, SchedulerLike } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

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
