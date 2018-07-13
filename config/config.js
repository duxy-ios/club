const env = process.env

const config = {
    db: 'mongodb://127.0.0.1:27017/club',
    tokenExpiresIn: env.tokenExpiresIn || 3600,
    tokenSecret: "ducy",
    auth_cookie_name = 'club'
}

module.exports = config;
