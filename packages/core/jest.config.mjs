import baseConfig from '../../jest.config.base.mjs'

export default {
  ...baseConfig,
  displayName: 'core',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
