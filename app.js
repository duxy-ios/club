const Koa = require('koa');
const app = new Koa();
const userRouter = require('./src/route/user')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser());
app.use(userRouter.routes());
app.listen(3000);

