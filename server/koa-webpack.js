import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'

const config = require('../webpack.config');
const compiler = webpack(config);

export default function(app) {

  devMiddleware(compiler, {
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    reload: true,
    publicPath: '/',
    // lazy: true,
    // custom headers
    // headers: { "X-Custom-Header": "yes" },
    stats: {
      colors: true
    }
  });

  app.use(hotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));


}