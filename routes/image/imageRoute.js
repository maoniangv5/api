let express = require('express');
let router = express.Router();

let RestMsg = require('../../common/restmsg');
let UserService = require('../../service/image/imageService');
let UserBO = require('../../service/image/model/imageBO');
let EncryptService = require('../../common/encryptService');

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

router.route('/register')
    .post(function (req, res, next) {
        let restmsg = new RestMsg();
        let user = new UserBO();
        let query = req.body;

        query.password = EncryptService.md5Hash(req.body.password, user._id);

        UserService.save(query, function (err, obj) {
            if (err) {
                restmsg.errorMsg(err);
                res.send(restmsg);
                return;
            }

            restmsg.successMsg();
            restmsg.setResult(_privateFun.prsBO2VO(obj));
            res.send(restmsg)
        });
    });

router.route('/login')
    .post(function (req, res, next) {
        let restmsg = new RestMsg();
        let username = req.body.username;

        UserService.findOne(query, function (err, obj) {
            if (err) {
                restmsg.errorMsg(err);
                res.send(restmsg);
                return;
            }

            restmsg.successMsg();
            restmsg.setResult(_privateFun.prsBO2VO(obj));
            res.send(restmsg)
        });

        

    });

router.route('/logout')
    .post(function (req, res, next) {
    });

module.exports = router;
