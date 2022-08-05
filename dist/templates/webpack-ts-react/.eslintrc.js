module.exports = {
  env: {
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard',
    'eslint-config-jsy',
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
