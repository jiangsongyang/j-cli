module.exports = {
  "root": true,
  env: {
    jest: true,
  },
  extends: [
    'eslint-config-jsy',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: '18.0.0',
      flowVersion: '0.53',
    },
  },
  rules: {
    // patch
    'no-unused-vars': 'off',
    // react
    'react/display-name': 'off',
  },
}
