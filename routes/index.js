let express = require('express');
let router = express.Router();

let file = require('./file/fileRoute');
let image = require('./image/imageRoute');
let upload = require('./upload/uploadRoute');

router.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   next();
});

router.use('/file', file);
router.use('/image', image);
router.use('/upload', upload);

module.exports = router;