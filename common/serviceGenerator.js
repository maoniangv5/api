var Page = require('./page');

function ServiceGenerator() {

}

ServiceGenerator.generate = function(model, key) {
    var service = {};

    // 列表查询,不分页
    service.find = function(query, callback) {
        model.find(query, function(err, ret) {
            callback(err, ret);
        })
    };

    // 列表查询并排序,不分页
    service.findAndOrder = function(query, order, callback) {
        model.find(query, null, { sort: order }, function(err, ret) {
            callback(err, ret);
        })
    };

    // 获取单个
    service.findOne = function(query, callback) {
        model.findOne(query, function(err, ret) {
            callback(err, ret);
        })
    };

    // 列表查询,分页
    service.findList = function(query, callback) {
        if (!query) {
            query = {};
        }

        //处理分页
        var options = {};

        if (query.row) {
            options['limit'] = query.row;
        }
        if (query.start) {
            options['skip'] = query.start;
        }

        if (query.sort) {
            options['sort'] = query.sort;
        }

        delete query.row;
        delete query.start;
        delete query.sort;
        var page = new Page();

        model.count(query, function(err, count) {
            if (err) {
                callback(err);
                return console.error(err);
            }
            if (count === 0) { //无数据
                callback(null, page);
                return;
            }
            model.find(query, null, options, function(err, bos) {
                page.setPageAttr(count);
                page.setData(bos);
                callback(err, page);
            });
        });
    };

    // 查找单条记录
    service.getById = function(value, callback) {
        var query = {};
        query[key] = value;
        model.findOne(query, function(err, ret) {
            callback(err, ret);
        })
    };

    // 更新
    service.update = function(query, bo, callback) {
        if (!query) {
            query = {};
        }
        if (typeof bo.toObject === 'function') {
            bo = bo.toObject();
        }
        if (bo._id) {
            delete bo._id;
        }
        model.update(query, bo, function(err, ret) {
            callback(err, ret);
        })
    };

    // 新增
    service.save = function(bo, callback) {
        var Entity = new model(bo);
        Entity.save(function(err, ret) {
            callback(err, ret);
        })
    };

    // 删除
    service.remove = function(query, callback) {
        if (!query) {
            query = {};
        }
        model.remove(query, function(err, ret) {
            callback(err, ret);
        })
    };

    // 统计
    service.count = function(query, callback) {
        if (!query) {
            query = {};
        }
        model.count(query, function(err, count) {
            callback(err, count);
        })
    };

    return service;
};

module.exports = ServiceGenerator;