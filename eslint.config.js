import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from 'eslint-config-next';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  next,
  {
    rules: {
      // Add or override rules here
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/no-unescaped-entities': 'warn',
      'prefer-const': 'warn',
    },
  },
];
