let express = require('express');
let router = express.Router();

let RestMsg = require('../../common/restmsg');

let _privateFun = router.prototype;

_privateFun.prsBO2VO = function (obj) {
    let result = obj.toObject({
        transform: function (doc, ret, options) {
            return {
                id: ret._id,
                username: ret.username,
                avatar: ret.avatar ? ret.avatar : null
            }
        }
    });
    return result;
}

router.route('/')
    .get(function (req, res, next) {
        let restmsg = new RestMsg();
        restmsg.successMsg();
        res.send(restmsg)
    })

module.exports = router;
