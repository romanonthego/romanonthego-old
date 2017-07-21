module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'allowImportExportEverywhere': false
  },
  'ecmaFeatures': {
    'classes': true,
    'jsx': true
  },
  'extends': [
    'airbnb',
  ],
  'plugins': [
    'react',
  ],
  'rules': {
    'brace-style': [2, "1tbs", { "allowSingleLine": true }],
    'space-before-function-paren': 0,
    'max-len': 0,
    'global-require': 0,
    'no-new': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': [0, 'as-needed'],
    'arrow-parens': [2, 'always'],
    'object-curly-spacing': [2, 'never'],
    'no-param-reassign': [2, {'props': false}],
    // rules
    // partially copied from onlineeducation
    'func-names': 0,
    'semi': [2, 'never'],
    'no-multiple-empty-lines': [2, {'max': 3}], // allows up to 3 empty lines
    'padded-blocks': 0,
    'guard-for-in': 0,
    'no-reserved-keys': 0, // it's okay in ES5+ enviroment, which is well, everywhere...
    'react/wrap-multilines': 0,
    'semi-spacing': 0,
    'quotes': [1, 'single'], // i dont' set this up as an error since sometimes you just need to use diferent types of quites
    'no-trailing-spaces': [2],
    'no-unused-vars': [2, {'vars': 'all', 'args': 'none'}], // allows full function sinature yet disallows unused vars in blocks
    'no-var': 2, // no var use, is well okay
    'id-length': 0, // fuck it, we need to use (e) => and other stuff with 1 char name variables
    // nice thing to have:
    //
    // up to everyone: {foo, bar,} or {foo, bar} - both are valid (for multiline obviously)
    'comma-dangle': [0],
    // it should not be error since it can not be used consistently
    // see https://github.com/eslint/eslint/issues/3223 - they have good point
    // it is a good thing to seprate destructuring into let/const blocks yet it's ugly
    // i guess we have to wait untill destructuring assignment will be added to exeptions
    'prefer-const': 1,
    'react/jsx-space-before-closing': 0,
    'react/jsx-no-bind': [2, {
      'ignoreRefs': true,
      'allowArrowFunctions': true,
      'allowBind': true
    }],
    'react/jsx-wrap-multilines': [0],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/prefer-es6-class': [0],
    'react/prefer-stateless-function': [0],
    'react/require-default-props': [0],
    'react/no-unused-prop-types': [0],
    'react/forbid-prop-types': [0],
    'import/no-extraneous-dependencies': [0],
    'import/no-unresolved': [0],
    'import/extensions': [0],
  },
  'globals': {
    'GLOBALS': true,
    'NODE_ENV': true,
  }
}
