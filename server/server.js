const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const staticServe = require('koa-static');
import koaVebpack from './koa-webpack'
import templatePug from './koa-pug'

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 8081;

// 静态文件
app.use(staticServe(path.resolve(path.normalize(__dirname + '/../build/'))/*, { extensions: ['js', 'css']}*/));

//  F:\01_development\00_project\01_webpack-koa\build

// 编译
koaVebpack(app);

// 使用模板
templatePug(app);

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes());

router.get('/', async function(ctx) {
  await ctx.render('index', {
    script: ['/vendors.js', '/index.build.js'],
    json: JSON.stringify({fafdsa: 'fdafsda'})
  })
});



app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else
    console.log(`HMR Listening at http://localhost:${PORT}`)
});
