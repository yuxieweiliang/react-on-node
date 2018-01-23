const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const Router = require('koa-router');
const webpack = require('webpack');
// const convert = require('koa-convert');
const staticServe = require('koa-static');
const koaWebpackMiddleware = require('koa-webpack-middleware');
const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware;
const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware;
const config = require('./webpack.config');
const app = new Koa();
const compiler = webpack(config);
const PORT = process.env.PORT || 8081;
const router = new Router();

// 定义静态文件
// app.use(staticServe(path.resolve(path.normalize(__dirname + './build'))/*, { extensions: ['js', 'css']}*/));
// app.use(staticServe(path.resolve(path.normalize(__dirname + './views'))/*, { extensions: ['js', 'css']}*/));
// 定义模板

app.use(views(path.join(__dirname, './views'), {
  extension: 'html'
}));


app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// response
/*app.use(async(ctx, next ) => {
  console.log('::::', ctx.url);
  var aa = await

  // console.log(aa)
});*/
/*const wdm = webpackDevMiddleware(compiler, {
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  reload: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});*/

// app.use(convert(wdm));
// app.use(webpackHotMiddleware(compiler));

app.use(router.routes());
router.get('/', async function(ctx) {
  //  ctx.response.type = 'html';
  // ctx.response.body = '<a href="/">Index Page</a>';
  // console.log('---------------a-', ctx);
  await ctx.render('index', {
    abc: 'fda'
  })
  // ctx.body = 'Hello Koa2.0!';

});



app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else
  console.log(`HMR Listening at http://localhost:${PORT}`)
});
