module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-native'],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-native/all',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    parserOptions: {
      ecmaVersion: 2021,
      ecmaFeatures: {
        jsx: true,
      },
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off', // React 17+
      'react-native/no-inline-styles': 'off', // Разрешим inline стили
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  