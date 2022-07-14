module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-var-requires': 0,
    'prettier/prettier': 2, // Means error
    quotes: ['error', 'single'],
    'no-console': 0,
    'no-var': 'error',
    'prefer-const': 'error',
    'no-undef': 0,
  },
};
