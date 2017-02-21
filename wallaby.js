require('phantomjs-polyfill')
var wallabyWebpack = require('wallaby-webpack')
var webpack = require('webpack')
var webpackPostprocessor = wallabyWebpack({
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.(gif|png|scss|css)$/, 'node-noop')
  ],
  entry: {
    store: './src/client/data/store.js',
  },
  //devtool: 'source-map',
  externals: {
    "react": "React",
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      __dirname + '/src',
      'node_modules',
    ]
  },
  }
);
module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false,},
      {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
      {pattern: 'src/client/**/*js*', load: false},
      {pattern: 'src/client/**/*.test.js*', ignore: true},
      {pattern: 'src/utils/**/*js*', load: false},
    ],
    //env: {type: 'node'},
    tests: [
      {pattern: 'src/client/**/*.test.js*', load: false}
    ],
    workers: {
      intial: 1,
      regular: 1,
    },
    compilers: {
      'src/**/*.js*': wallaby.compilers.babel() //({
        //stage: 0,
        //babel: require('babel-core'),
        //presets: ['es2015', 'react', 'stage-2'],

    //  })
    },
    //preprocessors: {
    //  'src/**/*.js': file => require('babel').transform(file.content, {sourceMap: true, filename: file.path, plugins: ["syntax-flow"]}),
    //  'src/**/*.jsx': file => require('babel').transform(file.content, {sourceMap: true, filename: file.path}),
    //},

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
