
var mongoose = require('../../../db/db');

var imageSchema = mongoose.Schema({
    imagename: {
        type: String,
        require: true
    },
    imagepath: {
        type: String,
        require: true
    },
    imageurl: {
        type: String,
        require: true
    },
    imagesize: {
        type: Number
    },
    imagetype: {
        type: String
    },
    des: {
        type: String
    }
}, {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        },
        versionKey: false
    });

module.exports = mongoose.model('images', imageSchema);
