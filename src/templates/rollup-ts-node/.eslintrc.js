module.exports = {
  env: {
    jest: true,
  },
  extends: ['standard', 'eslint-config-system-split', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
