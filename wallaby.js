module.exports = function(wallaby) {
  return {
    files: [
      'wallaby-test-setup.ts',
      'tsconfig.json',
      'tsconfig.spec.json',
      'jest.config.js',
      'apps/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!apps/**/*.spec.ts',
      'libs/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!libs/**/*.spec.ts',
      'src/polyfills.ts'
    ],

    tests: [
      'apps/**/*.spec.ts',
      'libs/**/*.spec.ts',
      '!apps/polpo-classroom-web-e2e/**/*.spec.ts'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        getCustomTransformers: () => {
          return {
            before: [
              require('jest-preset-angular/InlineHtmlStripStylesTransformer').factory(
                { compilerModule: require('typescript') }
              )
            ]
          };
        }
      }),
      '**/*.html': file => ({
        code: require('ts-jest').process(file.content, file.path, {
          globals: { 'ts-jest': { stringifyContentPathRegex: '\\.html$' } }
        }),
        map: { version: 3, sources: [], names: [], mappings: [] },
        ranges: []
      })
    },

    setup: function(wallaby) {
      var jestConfig = require('./jest.config');
      jestConfig = Object.assign(
        require('jest-preset-angular/jest-preset'),
        jestConfig
      );
      delete jestConfig.moduleNameMapper;
      jestConfig.transformIgnorePatterns.push('instrumented.*.(jsx?|html)$');
      jestConfig.setupFilesAfterEnv = ['<rootDir>/wallaby-test-setup.js'];
      
      if (!jestConfig.moduleNameMapper) {
        var paths = require('./tsconfig').compilerOptions.paths;
        var jestModuleMaps = {};
        Object.keys(paths).forEach(key => {
          jestModuleMaps[key] =
            '<rootDir>/' + paths[key][0].replace('.ts', '.js');
        });
        jestConfig.moduleNameMapper = jestModuleMaps;
      }
      jestConfig.globals['ts-jest'].tsConfig = '<rootDir>/tsconfig.spec.json';
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
