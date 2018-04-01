import Koa from 'koa';
import views from 'koa-views';
import staticServe from 'koa-static'
import path from 'path';
const app = new Koa();

app.use(staticServe(path.resolve(path.normalize(__dirname + '/../build'))/*, { extensions: ['js', 'css']}*/));

app.use(views(path.join(__dirname, '../views'), {
  extension: 'html'
}));

app.use(async (ctx, next) => {

  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// response
app.use(async(ctx) => {
  console.log('::::', ctx.url);
  // ctx.render('index.html');
  ctx.body = 'Hello Koa2.0!';

  // console.log(aa)
});
app.listen(8080);