const Router = require('koa-router')
const logic = require('../logic/sign')

let router = new Router()

router.get('/signin', logic.signin)
router.post('/signin', logic.signup)

module.exports = router