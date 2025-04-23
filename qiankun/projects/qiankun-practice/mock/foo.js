

export default {
  'GET /foo/users': { users: [1, 2] },
  'GET /bar/users': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },

}