export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  passWithNoTests: true,
  coverageDirectory: './.coverage',
}
