module.exports = function() {
  return {
    files: [
      'jest.config.js',
      'apps/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!apps/**/*.spec.ts',
      'libs/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!libs/**/*.spec.ts'
    ],

    tests: ['apps/**/*.spec.ts', 'libs/**/*.spec.ts', 'wallabyTest.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    setup: function(wallaby) {
      var jestConfig = require('./jest.config').jest;
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
