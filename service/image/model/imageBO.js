
var mongoose = require('../../../db/db');

var imageSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    path: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    size: {
        type: Number
    },
    type: {
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
