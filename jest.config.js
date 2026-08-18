/**
 * `jest` runs directly on `jest-preset-angular`. There is no `@angular-builders/jest` and no
 * `ng test` target, so this file is the whole test configuration.
 *
 * The preset already provides `moduleFileExtensions`, `transformIgnorePatterns`, the Angular
 * snapshot serializers and the `ts-jest` transform for `ts|js|mjs|html|svg`, pointed at
 * `<rootDir>/tsconfig.spec.json`. Only the entries below are project specific.
 */
module.exports = {
  preset: 'jest-preset-angular',
  // jest-preset-angular v17 no longer depends on jest-environment-jsdom. It ships its own environment,
  // built on @jest/environment-jsdom-abstract with jsdom as a peer, so point testEnvironment at that.
  testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
  // Calls setupZoneTestEnv(). The zone variant, so keep provideZoneChangeDetection() in src/main.ts.
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  roots: ['<rootDir>/src', '<rootDir>/lib'],
  // The showcase app imports the library by its package name, but resolves it from source.
  // Keep this in sync with the `paths` entry in tsconfig.json and tsconfig.spec.json.
  moduleNameMapper: {
    '^@lab900/forms$': '<rootDir>/lib/src/public-api.ts',
  },
};
