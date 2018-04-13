
let File = require('./model/fileBO');
let ServiceGenerator = require('../../common/serviceGenerator');

let FileService = ServiceGenerator.generate(File, '_id');

module.exports = FileService;
