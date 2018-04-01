var multiparty = require('multiparty');
var http = require('http');
var fs = require('fs');
var util = require('util');

http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method === 'POST') {
    // parse a file upload
    var form = new multiparty.Form();

    console.log(req.headers);
    form.parse(req, function(err, fields, files) {

     /* var types       = fields.image[0].split('.');
      var date        = new Date();
      var ms          = Date.parse(date);

      fs.renameSync(fields.upload.path,"/tmp/files"+ ms +"."+String(types[types.length-1]));*/

      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');

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