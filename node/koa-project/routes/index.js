const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = '欢迎访问 Koa 项目首页！';
});

module.exports = router;