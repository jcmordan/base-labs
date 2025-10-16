export default {
  displayName: 'api',
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  passWithNoTests: true,
  moduleNameMapper: {
    '^@/logger/(.*)$': '<rootDir>/src/$1',
  },
}
