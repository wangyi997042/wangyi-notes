const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const session = require('koa-session');
const path = require('path');
console.log(session);
// 路由模块
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/upload'); // 引入上传路由

// 创建 Koa 实例
const app = new Koa();
// 配置会话
app.keys = ['some secret key']; // 用于签名会话 cookie

const CONFIG = {
  key: 'koa:sess', // cookie 键名
  maxAge: 86400000, // 会话的最大存活时间（毫秒）
  autoCommit: true, // 自动提交会话
  overwrite: true, // 是否允许覆盖会话
  httpOnly: true, // 是否只允许通过 HTTP 访问会话
  signed: true, // 是否对会话进行签名
  rolling: false, // 是否在每次请求时重置会话的过期时间
  renew: false, // 是否在会话快过期时自动更新
};

// 使用会话中间件
app.use(session(CONFIG, app));

const router = new Router();

// 配置 Session
// app.keys = ['some secret']; // 用于加密 session 的密钥
// const CONFIG = {
//   key: 'koa.sess', // cookie 的名称
//   maxAge: 86400000, // cookie 的有效期（毫秒）
//   httpOnly: true, // 是否只允许服务器访问 cookie
//   signed: true, // 是否对 cookie 进行签名
// };
// app.use(session(CONFIG, app)); // 正确的 session 配置


app.use(async (ctx) => {
  if (ctx.path === '/set') {
    ctx.session.user = 'KoaUser';
    ctx.body = 'Session 已设置';
  } else if (ctx.path === '/get') {
    ctx.body = `Session 用户: ${ctx.session.user || '未设置'}`;
  }
});

app.use(cors({
  origin: '*', // 允许所有来源
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的 HTTP 方法
}));

// 中间件
app.use(logger()); // 日志记录
app.use(cors()); // 跨域处理
app.use(bodyParser()); // 解析请求体
app.use(serve(path.join(__dirname, 'public'))); // 静态文件服务

// 路由
router.use('/', indexRoutes.routes());
router.use('/user', userRoutes.routes());
router.use('/api', uploadRoutes.routes()); // 上传路由
app.use(router.routes()).use(router.allowedMethods());

// 错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
    console.error('错误捕获:', err);
  }
});


// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});