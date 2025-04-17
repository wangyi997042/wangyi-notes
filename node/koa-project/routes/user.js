const Router = require('koa-router');
const router = new Router();

// 模拟用户数据
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// 获取用户列表
router.get('/', async (ctx) => {
  ctx.body = users;
});

// 获取单个用户
router.get('/:id', async (ctx) => {
  const user = users.find((u) => u.id === parseInt(ctx.params.id));
  if (user) {
    ctx.body = user;
  } else {
    ctx.status = 404;
    ctx.body = { message: '用户未找到' };
  }
});

module.exports = router;