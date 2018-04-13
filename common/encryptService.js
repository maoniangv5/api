/**
 * Created by lijiaxing on 2017/7/5.
 */
var crypto = require('crypto');

function EncryptService() {

}

/**
 * md5加盐加密
 *
 * @param str 需要加密的字符串
 * @param addSalt 加盐密钥，暂时使用公共salt例如"db-extract@0123x100$#365#$"，建议使用_id
 *
 */
EncryptService.md5Hash = function (str, addSalt) {
    var salt = addSalt.toString('hex'); // 生成盐(16进制)
    return crypto.createHmac('md5', salt + "").update(str + "").digest('hex');
}

module.exports = EncryptService;
