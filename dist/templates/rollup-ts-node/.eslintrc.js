module.exports = {
  env: {
    jest: true,
  },
  extends: ['standard', 'eslint-config-jsy', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
