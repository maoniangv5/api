let mongoose = require('mongoose');
let config = require('../config/config');

let url = `mongodb://${config.db.user}:${config.db.pwd}@${config.db.host}:${config.db.port}/${config.db.db}`

mongoose.connect(url)

module.exports = mongoose;
