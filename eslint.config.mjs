// @ts-check
// Import necessary modules for ESLint configuration
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // A base configuration that applies to all files
  {
    // Ignores specific files and directories from linting
    ignores: ['node_modules/', 'dist/', '.vscode/', '**/*.js'],
  },
  // Apply standard ESLint recommended rules
  eslint.configs.recommended,

  // Configuration for TypeScript files
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    rules: {
      // Allow unused parameters to be ignored by prefixing them with an underscore
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },

  // Integrates Prettier with ESLint
  // This must be the last item to override other configs correctly
  eslintPluginPrettierRecommended,
]
