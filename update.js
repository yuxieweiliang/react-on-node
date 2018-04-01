const multiparty = require('multiparty');
const http = require('http');
const fs = require('fs');
const util = require('util');
const path = require('path');
const os = require('os');

http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method === 'POST') {
    // parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {

       /*var types       = files.upload[0].originalFilename.split('.');
       var date        = new Date();
       var ms          = Date.parse(date);

       */

      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');

      /*const file = files.upload[0];
      // 创建可读流的文件路径
      const reader = fs.createReadStream(file.path);
      // 创建可写流的文件路径
      const stream = fs.createWriteStream(path.join(__dirname, 'update', Math.random().toString() + '.jpg'));
      reader.pipe(stream);*/


      // 创建可读流的文件路径
       const file = files.fulAvatar[0].path;

      const reader = fs.createReadStream(file);
      // 创建可写流的文件路径 , path.format(file)
      const stream = fs.createWriteStream(path.join(__dirname, 'update', Math.random().toString() + '.jpg'));
      reader.pipe(stream);

      console.log();
      // 不可以跨分盘，比如C: -> D:， 所以并不能用来上传图片； 仅用于更改文件当前分盘下的路径
      // fs.renameSync('E:/1522247925.jpg', path.join(__dirname, 'update', Math.random().toString() + '.jpg'));
      res.body = 'fdsafdsafdsa';
      res.end(util.inspect({fields: fields, files: files}));


    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);