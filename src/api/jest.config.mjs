import baseConfig from '../../jest.config.base.mjs'

export default {
  ...baseConfig,
  displayName: 'api',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
