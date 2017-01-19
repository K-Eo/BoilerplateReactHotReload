const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: 'fbjs',
  plugins: [
    'react'
  ],
  rules : {
    'no-trailing-spaces': ERROR,
    'comma-dangle': [ERROR, 'never'],
    'array-bracket-spacing': [ERROR, 'always'],
    'object-curly-spacing': [ERROR, 'always', { arraysInObjects: true } ],
    'indent': [ERROR, 2, { SwitchCase: 1, ArrayExpression: 1, ObjectExpression: 1 }],

    //React
    'react/jsx-key': ERROR,
    'react/jsx-indent': [ERROR, 2],
    'react/jsx-pascal-case': ERROR,
    'react/jsx-no-duplicate-props': ERROR,
    'react/jsx-boolean-value': [ERROR, 'never'],
    'react/jsx-space-before-closing': [ERROR, 'never'],
    'react/jsx-closing-bracket-location': [ERROR, 'tag-aligned'],
  }
};
