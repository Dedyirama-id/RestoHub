module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'no-new': 'off',
    'no-plusplus': 'off',
    'no-await-in-loop': 'off',
  },
};
