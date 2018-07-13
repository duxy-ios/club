/**
 * Created by duxy on 2018/7/10.
 */
'use strict';

Object.prototype.getSuccessResponse = function (message, code) {
    return this.body = {
        code: code || 200,
        message: message || "操作成功"
    };
}

Object.prototype.getFailResponse = function (message, code) {
    return this.body = {
        code: code || 500,
        message: message || "操作失败"
    };
}