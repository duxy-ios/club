exports.signup = async ctx => {
    ctx.body = {
        code: 500,
        message: '用户存在'
    };

}

exports.signin = async ctx => {
    ctx.body = {
        code: 200,
        message: '登录成功'
    };

}