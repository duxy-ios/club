const Koa = require('koa');
const app = new Koa();
const userRouter = require('./src/route/user')
// 响应
// app.use(ctx => {
//     ctx.body = 'Hello Koa';
// });

app.use(userRouter.routes())

app.listen(3000);