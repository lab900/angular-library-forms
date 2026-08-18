module.exports = {
  preset: 'jest-preset-angular',
  // jest-preset-angular v17 no longer depends on jest-environment-jsdom. It ships its own environment,
  // built on @jest/environment-jsdom-abstract with jsdom as a peer, so point testEnvironment at that.
  testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  roots: ['<rootDir>/src', '<rootDir>/lib'],
  // The showcase app imports the library by its package name, but resolves it from source.
  // Keep this in sync with the `paths` entry in tsconfig.json.
  moduleNameMapper: {
    '^@lab900/forms$': '<rootDir>/lib/src/public-api.ts',
  },
  // `@angular-builders/jest` v22 passes `isolatedModules: true` as a ts-jest transform option, and
  // ts-jest deprecates that option. Turn the option off here and keep the behaviour: ts-jest reads the
  // real value from `isolatedModules` in tsconfig.json, which tsconfig.spec.json inherits. The regular
  // expression must stay identical to the builder default, or this entry becomes a second transform
  // instead of an override.
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': ['jest-preset-angular', { isolatedModules: false }],
  },
};
