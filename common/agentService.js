var superagent = require('superagent');

function AgentService() {

}

AgentService.request = function (url, method, data, timeout, callback) {
    console.log('调用远程接口:' + url);
    console.log('传参为:' + JSON.stringify(data))
    if (method == 'DELETE') {
        method = 'del';
    }
    if (method == 'GET' || method == 'del') {
        superagent[method.toLowerCase()](url)
            .set('Content-Type', 'application/json')
            .type('form')
            .query(data)
            .timeout(timeout)
            .end(function (err, res) {
                if (err) {
                    callback('服务不可用！');
                    return console.error(err);
                }
                console.log("Res: ", JSON.stringify(res.body));
                callback(null, res);
            });
    } else {
        superagent[method.toLowerCase()](url)
            .set('Content-Type', 'application/json')
            .type('form')
            .send(data)
            .timeout(timeout)
            .end(function (err, res) {
                if (err) {
                    callback('服务不可用！');
                    return console.error(err);
                }
                console.log("Res: ", JSON.stringify(res.body));
                callback(null, res);
            });
    }
};

module.exports = AgentService;