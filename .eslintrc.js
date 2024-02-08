/* eslint-disable @typescript-eslint/naming-convention */
const { readFileSync } = require('node:fs');
const prettier = JSON.parse(readFileSync('.prettierrc', 'utf-8'));

module.exports = {
  root: true,
  ignorePatterns: ['**/*', '!**/*'],
  plugins: ['@nx', 'prettier', 'react', 'simple-import-sort', 'import', 'eslint-plugin-import-helpers'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'prettier/prettier': [2, prettier],
    'import/extensions': 'off',
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          ['module', '/^@env/'],
          '/^@(page|route|store|api|style)/',
          '/^@(atom|asset|component|element|enum|form|hook|interface|store|util)/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'react/display-name': 'off',
    'react/jsx-sort-props': [
      1,
      { multiline: 'last', callbacksLast: true, shorthandLast: true, reservedFirst: ['key'] },
    ],
    'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'multiline' }],
    'react/jsx-first-prop-new-line': [1, 'multiline-multiprop'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {},
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nx/typescript'],
      rules: {
        '@typescript-eslint/no-unused-vars': 2,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['variable'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'memberLike',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'enumMember',
            format: ['PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'class',
            format: ['PascalCase'],
            // suffix: ['Class', 'Element', ''],
          },
          {
            selector: ['classProperty'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
            suffix: ['Type'],
          },
          {
            selector: 'enum',
            format: ['PascalCase'],
            suffix: ['Enum', 'Selector'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            suffix: ['Interface', 'Props'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeParameter',
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'parameter',
            format: ['strictCamelCase'],
            leadingUnderscore: 'allow',
            filter: {
              regex: '(Icon|Component|testID)$',
              match: false,
            },
          },
        ],
        'react-hooks/exhaustive-deps': 0,
      },
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript'],
      rules: {},
    },
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    es2021: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
