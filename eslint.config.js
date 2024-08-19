import js from '@eslint/js'
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import jest from 'eslint-plugin-jest'
import jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'

export default tseslint.config(
  { ignores: ['build', 'coverage'] },
  // App files
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Test files
  {
    files: ['**/?(*.)+(test).[jt]s?(x)'],
    plugins: {
      jest,
      'jest-dom': jestDom,
      'testing-library': fixupPluginRules({ rules: testingLibrary.rules }),
    },
    rules: {
      ...jest.configs['flat/recommended'].rules,
      ...jestDom.configs['flat/recommended'].rules,
      ...testingLibrary.configs['flat/react'].rules,
    },
  },
  eslintConfigPrettier,
)
