/**
 * Angular test environment, zone based.
 *
 * `jest` runs directly on `jest-preset-angular`, so this project owns the call that
 * `@angular-builders/jest` used to inject. `setupZoneTestEnv()` is the zone variant and
 * matches the old `zoneless: false` option of the removed builder. `setupZonelessTestEnv()`
 * from `jest-preset-angular/setup-env/zoneless` is the other option. The showcase app calls
 * `provideZoneChangeDetection()` in `src/main.ts`, so keep the zone variant.
 */
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();
