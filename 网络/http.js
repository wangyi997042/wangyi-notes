// 101：服务器根据客户端的请求切换协议，主要用于websocket或http2升级
// 200：请求已成功，请求所希望的数据将随响应一起返回。
// 201：请求成功并且服务器创建了新的资源。
// 202：服务器已接受响应请求，但尚未处理。
// 301：请求的网页已永久移动至新的位置。
// 302：临时重定向 / 临时转移。服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
// 304：本次获取到的内容是读取缓存中的数据，会每次去服务器校验。
// 401：请求需要进行身份验证，尚未认证，没有登录网站。
// 403：禁止访问，服务器拒绝请求。
// 404：服务器没有找到相应资源。
// 500：服务器遇到错误，无法完成对请求的处理。
// 503：服务器无法使用。
