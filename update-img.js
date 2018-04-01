var formidable = require('formidable');
var http = require('http');
var path = require('path');
var util = require('util');
var fs = require('fs');

http.createServer(function(req, res) {

  if (req.url === '/upload' && req.method === 'POST') {
    var form = new formidable.IncomingForm();
    var targetFile = path.join(__dirname,'./upload');
    form.uploadDir = targetFile;
    form.parse(req,function(err,fields,files){
      if(err) throw err;
      var oldpath = files.uploadImg.path;
      var newpath = path.join(path.dirname(oldpath),files.uploadImg.name);
      fs.rename(oldpath,newpath,(err)=>{
        if(err) throw err;
        res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
        res.end('图片上传并改名成功！');
      })
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