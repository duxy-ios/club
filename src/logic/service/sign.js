const _ = require('lodash')
const tools = require('../../common/tools');
const auth = require('../../common/auth');
const User = require('../../proxy/user');
const eventproxy = require('eventproxy');
const utils = require('../../common/utils');

exports.signup = async ctx => {
    let {name, password} = ctx.request.body;

    let ep = new eventproxy();
    ep.on('err', (msg) => {
        ctx.body = {
            code: 500,
            message: msg || "操作失败"
        };
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


    let md5pass = getPassword(password);

    await User.findUsersByNames([name]).then(async (users) => {
        if (!_.isEmpty(users)) {
            ep.emit('err', '用户名已存在');
            return;
        } else {
            await User.createUser(name, md5pass).then(() => {
                tools.getSuccessResponse(ctx, "创建用户成功");
            }).catch((err) => {
                ep.emit('err', '创建用户失败:' + err);
            });
        }
    }).catch((err) => {
        ep.emit('err', '创建用户失败:' + err);
        return;
    });


};

exports.signin = async ctx => {
    let {name, password} = ctx.request.body;
    if (_.isEmpty(name) || _.isEmpty(password)) {
        return tools.getFailResponse(ctx, "信息不完整");
    }

    let getUser;
    if (name.indexOf('@') !== -1) {
        getUser = User.getUserByMail;
    } else {
        getUser = User.getUserByLoginName;
    }

    await getUser(name).then(user => {
        if (!user) {
            return tools.getFailResponse(ctx, "用户不存在！");
        } else {

            let md5Password = getPassword(password);
            if (md5Password !== user.pass) {
                return tools.getFailResponse(ctx, "用户名或密码错误！");
            }

            if (!user.active) {
                //TODO: 用户未激活，发送激活邮件
            }

            //jwt
            let token = auth.createJwt({
                name: name,
                timestamp: (new Date()).valueOf()
            });

            /*
            redis.set('token', token, 'EX', tokenService.expiresIn, () => {})
             */

            return tools.getSuccessResponse(ctx, "登录成功", {token: token});
        }


    }).catch((err) => {
        return tools.getFailResponse(ctx, "服务出错", 500);
    });

}

function getPassword(password) {
    let sufix = "ducy";
    return tools.md5(password.trim() + sufix);
}