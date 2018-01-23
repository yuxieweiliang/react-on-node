require('babel-register')({
  presets: ['env', 'react', 'babel-polyfill'],
});
require('./server.js');