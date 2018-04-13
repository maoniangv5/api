
let Image = require('./model/imageBO');
let ServiceGenerator = require('../../common/serviceGenerator');

let ImageService = ServiceGenerator.generate(Image, '_id');

module.exports = ImageService;
