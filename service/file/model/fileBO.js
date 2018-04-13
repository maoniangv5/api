
var mongoose = require('../../../db/db');

var fileSchema = mongoose.Schema({
    filename: {
        type: String,
        require: true
    },
    filepath: {
        type: String,
        require: true
    },
    fileurl: {
        type: String,
        require: true
    },
    filesize: {
        type: Number
    },
    filetype: {
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

module.exports = mongoose.model('files', fileSchema);
