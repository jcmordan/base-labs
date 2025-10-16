// import baseConfig from '../../jest.config.base.mjs'

export default {
  displayName: 'api',
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  moduleNameMapper: {
    '^@/api/(.*)$': '<rootDir>/src/$1',
  },
}
