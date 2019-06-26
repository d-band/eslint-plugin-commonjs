const {
  RuleTester
} = require('eslint');
const rule = require('../lib/no-duplicate-exports');

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018
  }
});

tester.run('no-duplicate-exports', rule, {
  valid: [{
    code: `
      exports.a = 1;
      exports['b'] = 2;
      exports.a.b = 3;
      module.exports.c = 4;
      const test = exports.a + 1;
      exports[\`d\`] = 5;
    `,
    globals: {
      module: true,
      exports: true
    }
  }, {
    code: `
      var a = 'test';
      exports[a] = 1;
      exports.test = 2;
    `,
    globals: {
      module: true,
      exports: true
    }
  }, {
    code: 'const empty = 1;'
  }],
  invalid: [{
    code: [
      'exports.a = 1;',
      'module.exports.a = 2;'
    ].join('\n'),
    globals: {
      module: true,
      exports: true
    },
    errors: [
      `duplicate exports 'a'`
    ]
  }, {
    code: `
      exports['a'] = 1;
      exports.a = 2;
    `,
    globals: {
      module: true,
      exports: true
    },
    errors: [
      `duplicate exports 'a'`
    ]
  }, {
    code: `
      const a = 'test';
      exports[a] = 1;
      exports.test = 2;
    `,
    globals: {
      module: true,
      exports: true
    },
    errors: [
      `duplicate exports 'test'`
    ]
  }]
});
