import Pug from 'koa-pug'
const path = require('path');

const dir = path.join(__dirname, '../views/');
// 使用模板
export default function(app) {
  const pug = new Pug({
    locals: {
      title: 'Koa Demo'
    },
    viewPath: dir
  });

  pug.use(app);
}

