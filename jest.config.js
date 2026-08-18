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
};
