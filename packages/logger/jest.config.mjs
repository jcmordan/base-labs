import baseConfig from '../../jest.config.base.mjs'

export default {
  ...baseConfig,
  displayName: 'logger',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
