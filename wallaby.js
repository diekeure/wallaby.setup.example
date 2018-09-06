module.exports = function() {

  const jestTransform = file => require('jest-preset-angular/preprocessor').process(file.content, file.path, {globals: {__TRANSFORM_HTML__: true}, rootDir: __dirname});

  return {
    files: [
      'jest.config.js',
      'apps/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!apps/**/*.spec.ts',
      'libs/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!libs/**/*.spec.ts'
    ],

    tests: ['apps/**/*.spec.ts', 'libs/**/*.spec.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
      '**/*.html': file => ({code: jestTransform(file), map: {version: 3, sources: [], names: [], mappings: []}, ranges: []})
    },

    preprocessors: {
      'src/**/*.js': jestTransform,
    },

    setup: function(wallaby) {
      var jestConfig = require('./jest.config');
      jestConfig.setupTestFrameworkScriptFile = '<rootDir>/apps/polpo-classroom-web/src/test-setup.js';
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
