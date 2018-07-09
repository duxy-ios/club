'use strict'
const config = require('../../config/config');
const mongoose = require('mongoose');
const user = require('./user');


mongoose.connect(config.db, {
    server: { poolSize: 20 }
}, function (err) {
    if (err) {
        logger.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});


exports.User = user;