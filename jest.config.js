module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  roots: ['<rootDir>/src', '<rootDir>/lib'],
  modulePaths: ['<rootDir>/dist'],
};
