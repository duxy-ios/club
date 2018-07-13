const jwt = require('jsonwebtoken');
const config = require('../config');
let expiresIn = config.tokenExpiresIn;
let secret = config.tokenSecret;

function gen_session(user, res) {
    var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
}

exports.gen_session = gen_session;

//jwt
function createToken(userinfo) {
    let token = jwt.sign(userinfo, secret, {
        expiresIn
    })
    return token
}

exports.createJwt = createToken;

function verifyToken(token) {
    if (!token) {
        return false
    }

    try {
        let result = jwt.verify(token, secret)
        return result
    } catch (err) {
        return false
    }
}

exports.verifyJwt = verifyToken;