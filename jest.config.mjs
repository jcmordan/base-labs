// const { defaults } = require('ts-jest')
// const { pathsToModuleNameMapper } = require('ts-jest')
// const { compilerOptions } = require('./tsconfig.json')

import tsJest from 'ts-jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import tsconfig from './tsconfig.json' with { type: 'json' }

/** @type {import('jest').Config} */
export default {
  ...tsJest.defaults,
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', 'src/__tests__/'],
  setupFilesAfterEnv: [],
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  detectOpenHandles: true,
}
