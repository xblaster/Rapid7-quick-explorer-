import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['**/*.test.jsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest,
      },
    },
  },
  {
    files: ['cypress/**/*.cy.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        cy: false,
        Cypress: false,
        describe: false,
        it: false,
        before: false,
        after: false,
        beforeEach: false,
        afterEach: false,
      },
    },
  },
  eslintConfigPrettier,
])
