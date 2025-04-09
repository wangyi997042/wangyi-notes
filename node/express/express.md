body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
cookie-parser - 这就是一个解析 Cookie 的工具。通过 req.cookies 可以取到传过来的 cookie，并把它们转成对象。
multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的 MIME 编码）的表单数据。

静态文件服务： express.static

app.use('/public', express.static('public'));

## request 和 response 对象的具体介绍：

### Request 对象 - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

req.app：当 callback 为外部文件时，用 req.app 访问 express 的实例 2.
req.baseUrl：获取路由当前安装的 URL 路径 3.
req.body / req.cookies：获得「请求主体」/ Cookies 4.
req.fresh / req.stale：判断请求是否还「新鲜」 5.
req.hostname / req.ip：获取主机名和 IP 地址 6.
req.originalUrl：获取原始请求 URL 7.
req.params：获取路由的 parameters 8.
req.path：获取请求路径 9.
req.protocol：获取协议类型 10.
req.query：获取 URL 的查询参数串 11.
req.route：获取当前匹配的路由 12.
req.subdomains：获取子域名 13.
req.accepts()：检查可接受的请求的文档类型 14.
req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码 15.
req.get()：获取指定的 HTTP 请求头 16.
req.is()：判断请求头 Content-Type 的 MIME 类型

### Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

res.app：同 req.app 一样 2.
res.append()：追加指定 HTTP 头 3.
res.set()在 res.append()后将重置之前设置的头 4.
res.cookie(name，value [，option])：设置 Cookie 5.
opition: domain / expires / httpOnly / maxAge / path / secure / signed 6.
res.clearCookie()：清除 Cookie 7.
res.download()：传送指定路径的文件 8.
res.get()：返回指定的 HTTP 头 9.
res.json()：传送 JSON 响应 10.
res.jsonp()：传送 JSONP 响应 11.
res.location()：只设置响应的 Location HTTP 头，不设置状态码或者 close response 12.
res.redirect()：设置响应的 Location HTTP 头，并且设置状态码 302 13.
res.render(view,[locals],callback)：渲染一个 view，同时向 callback 传递渲染后的字符串，如果在渲染过程中有错误发生 next(err)将会被自动调用。callback 将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。 14.
res.send()：传送 HTTP 响应 15.
res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件 extension 设定 Content-Type 16.
res.set()：设置 HTTP 头，传入 object 可以一次设置多个头 17.
res.status()：设置 HTTP 状态码 18.
res.type()：设置 Content-Type 的 MIME 类型
