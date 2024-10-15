module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: 'current', 'jest/globals': true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'jest'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'semi': 'off',
    'no-console': 'warn',
    'no-alert': 'error',
    'quotes': ['warn', 'single'],
    'max-len': ['warn', {
      'code': 120,
      'ignoreComments': true,
      'ignoreRegExpLiterals': true,
    }],
    '@typescript-eslint/semi': ['warn'],
    "@typescript-eslint/no-inferrable-types": 'warn',
    "@typescript-eslint/no-explicit-any": 'warn',
    "@typescript-eslint/no-unused-vars": 'warn',
  },
}
