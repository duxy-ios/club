const Router = require('koa-router')
const logic = require('../logic/service/sign')

let router = new Router()

router.post('/login', logic.signin)
router.post('/signup', logic.signup)

module.exports = router