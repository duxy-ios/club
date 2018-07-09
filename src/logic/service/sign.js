const _ = require('lodash')
const tools = require('../../common/tools')
const User = require('../../proxy/user');
const eventproxy = require('eventproxy');

exports.signup = async ctx => {
    let {name, password} = ctx.request.body;

    let ep = new eventproxy();
    ep.on('err', (msg) => {
        tools.getFailResponse(ctx, msg);
    });

    [name, password].some((item) => {
        if (_.isEmpty(item)) {
            ep.emit('err', "信息不完整")
        }
    });

    if (name.length < 3) {
        ep.emit('err', '用户名至少需要3个字符。');
        return;
    }

    if (!tools.validateId(name)) {
        ep.emit('err', '用户名不合法。');
        return;
    }

    let md5pass = tools.md5(password);

    await  User.findUsersByNames([name]).then((users)=>{
        if (!_.isEmpty(users)){
            ep.emit('err', '用户名已存在');
            return;
        }
    }).catch((err) => {
        ep.emit('err', '创建用户失败:' + err);
        return;
    });

    await User.createUser(name, md5pass).then(() => {
        tools.getSuccessResponse(ctx, "创建用户成功");
    }).catch((err) => {
        ep.emit('err', '创建用户失败:' + err);
    });

};

exports.signin = async ctx => {


    tools.getSuccessResponse(ctx, "登录成功");
}