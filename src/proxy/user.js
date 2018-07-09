const models = require('../model');
const User = models.User;
const md5 = require("md5");
const uuid = require('node-uuid');

exports.findUsersByNames = async function (names) {
    return User.find({loginname: {$in: names}});
};

exports.newAndSave = function (name, loginname, pass, email, avatar_url, active, callback) {
    let user = new User();
    user.name = loginname;
    user.loginname = loginname;
    user.pass = pass;
    user.email = email;
    user.avatar = avatar_url;
    user.active = active || false;
    user.accessToken = uuid.v4();

    user.save(callback);
};

exports.createUser = async function (name, password) {
    let user = new User();
    user.name = name;
    user.pass = password;
    user.loginname = name;
    user.active = false;
    user.accessToken = uuid.v4();
    return user.save();
};

exports.makeGravatar = function (str) {
    return 'http://www.gravatar.com/avatar/' + md5(str.toLowerCase()) + '?size=48';
};

