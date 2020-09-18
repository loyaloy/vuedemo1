module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

// module.exports = {
//   root: true,
//   parserOptions: {
//     sourceType: 'module',
//   },
//   parser: 'vue-eslint-parser',
//   env: {
//     browser: true,
//     node: true,
//     es6: true,
//   },
//   rules: {
//     'no-console': 'off',
//   },
// }
