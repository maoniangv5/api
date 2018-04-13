let express = require('express');
let multer = require('multer');
let md5 = require('md5');
let fs = require('fs');
let path = require('path');

let ImageService = require('../../service/image/imageService');
let config = require('../../config/config');
let RestMsg = require('../../common/restmsg');

let router = express.Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.dir)
  }
})

let upload = multer({ storage: storage })

router.post('/', upload.single('file'), function (req, res, next) {

  let rm = RestMsg();
  let bo = {};
  let imagesize = req.file.size; // 最终存储文件大小
  let imagetype = req.file.mimetype; // 最终存储文件类型
  let des = req.body.des; // 最终存储文件描述
  let imagename = ''; // 最终存储文件名
  let imagepath = ''; // 最终存储路径
  let imageurl = ''; // 外网访问地址
  let ext = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]; // 获取image后缀
  let old_path = req.file.path; // 获取image当前存储路径
  let buf = fs.readFileSync(old_path); // 同步读取image文件，返回buffer
  imagename = md5(buf) + '.' + ext;
  imagepath = path.join(dir, imagetype.includes("image") ? 'image' : 'file', imagename);
  fs.renameSync(old_path, imagepath); // 同步修改image文件名
  imageurl = config.url + '/image' + imagename;

  bo.imagename = imagename;
  bo.imagepath = imagepath;
  bo.imageurl = imageurl;
  bo.imagesize = imagesize;
  bo.imagetype = imagetype;
  bo.des = des;

  // 先查重，后异步保存bo
  ImageService.count({ imagename: imagename }, function (err, count) {
    if (err || count !== 0) {
      return;
    }
    ImageService.save(bo, function (err, ret) {
      return;
    })
  })

  rm.setResult(bo);
  res.send(rm);
  return;
});

module.exports = router;
