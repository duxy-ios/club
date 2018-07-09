const Router = require('koa-router')
const logic = require('../logic/service/sign')

let router = new Router()

router.get('/signin', logic.signin)
router.post('/signup', logic.signup)

module.exports = router