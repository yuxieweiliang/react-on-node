var express = require('express');
var router = express.Router();
var formidable = require('formidable'),
  fs = require('fs'),
  TITLE = 'formidable上传示例',
  AVATAR_UPLOAD_FOLDER = '/avatar/',
  domain = "http://localhost:3000";


var app = express();
/* 图片上传路由 */
app.post('/uploader', function(req, res) {

  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {

    if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    console.log(files);

    var extName = '';  //后缀名
    switch (files.fulAvatar.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      res.render('index', { title: TITLE });
      return;
    }

    var avatarName = Math.random() + '.' + extName;
    //图片写入地址；
    var newPath = form.uploadDir + avatarName;
    //显示地址；
    //  var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
    console.log("newPath",newPath);
    fs.renameSync(files.fulAvatar.path, newPath);  //重命名
    res.json({
      "newPath":'showUrl'
    });
  });
});
module.exports = router;


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})