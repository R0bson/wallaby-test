var wallabyWebpack = require('wallaby-webpack')
var webpack = require('webpack')

module.exports = function (wallaby) {
  var webpackPostprocessor = wallabyWebpack({
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/\.(gif|png|scss|css)$/, 'node-noop')
      ],
      externals: {
        "react": "React",
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
          wallaby.projectCacheDir + '/src',
          'node_modules',
        ]
      },
    }
  );
  return {
    files: [
      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
      {pattern: 'src/client/**/*js*', load: false},
      {pattern: 'src/client/**/*.test.js*', ignore: true},
      {pattern: 'src/utils/**/*js*', load: false},
    ],
    
    tests: [
      {pattern: 'src/client/**/*.test.js*', load: false}
    ],
    
    compilers: {
      'src/**/*.js*': wallaby.compilers.babel()
    },
    
    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
