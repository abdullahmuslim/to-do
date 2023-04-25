SystemJS.config({
  baseURL:'/',
  defaultExtension: true,
  packages: {
    ".": {
      main: './index.js',
      defaultExtension: 'js'
    }
  },
  meta: {
    '*.js': {
      'babelOptions': {
        react: true
      }
    },
    '*.css': {

    }
  },
  map: {
    'plugin-babel': 'modules/plugin-babel.js',
    'systemjs-babel-build': 'modules/systemjs-babel-browser.js',
    'react': 'modules/react.development.js',
    'react-dom': 'modules/react-dom.development.js',
    'react-redux': 'modules/react-redux.min.js',
    'redux': 'modules/redux.js',
    'react-router-dom': 'modules/react-router-dom.development.js',
    'react-router': 'modules/react-router.development.js'
  },
  transpiler: 'modules/plugin-babel.js'
});

SystemJS.import('./index')
  .catch(console.error.bind(console));
