# spy-debugger 使用手册

简介
- spy-debugger：一站式页面调试与抓包工具。可远程调试手机浏览器和移动端 WebView（如微信、Hybrid App），支持 HTTP/HTTPS，免 USB 连接设备。集成 weinre、node-mitmproxy、AnyProxy 等。

主要特性
- 页面远程调试（we inre 接口注入，Console/DOM 操作）  
- HTTP/HTTPS 抓包（AnyProxy / node-mitmproxy）  
- 页面编辑模式（编辑 DOM 内容）  
- 自动忽略原生 App 发起的 HTTPS 请求（减少对 SSL pinning 的影响）  
- 支持外部代理（与 Charles/Fiddler 协作）

安装
- Windows:
    npm install spy-debugger -g
- macOS:
    sudo npm install spy-debugger -g

快速上手（3 分钟）
1. 保证手机与电脑在同一局域网（同一 Wi‑Fi）。  
2. 在电脑终端运行：
    spy-debugger
   按命令行提示，用浏览器打开显示地址（Dashboard）。  
3. 在手机的 Wi‑Fi 设置中配置 HTTP 代理，代理地址为电脑 IP，端口为 spy-debugger 启动端口（默认 9888）。  
4. 在手机浏览器访问命令行给出的安装证书地址，安装并信任证书（iOS 需手动信任）。  
5. 在手机浏览器打开要调试的页面，开始调试与抓包。

常用命令行选项
- 指定端口：
    spy-debugger -p 8888
- 设置外部代理（使用 Charles/Fiddler）：
    spy-debugger -e http://127.0.0.1:8888
- 页面编辑模式（使页面内容可编辑）：
    spy-debugger -w true
- 允许 weinre 监听 iframe（默认 false）：
    spy-debugger -i true
- 仅拦截浏览器发起的 HTTPS 请求（默认 false；iOS15 受限）：
    spy-debugger -b true
- 允许 HTTP 缓存（默认 false）：
    spy-debugger -c true

功能说明
- 页面编辑模式：在页面内注入 `document.body.contentEditable = true`，便于在线修改内容（不支持使用 iscroll 的页面）。  
- weinre：提供远程 Console/DOM 操作界面，spy-debugger 在 HTML 返回时注入 weinre 所需脚本，免去手动在页面中插入。  
- 抓包：内置 AnyProxy，提供请求/响应查看、修改、流量回放能力；也可通过 -e 指定外部代理与其它工具配合。  
- HTTPS 处理：需要在手机端安装并信任自签证书，工具会为 webview/浏览器流量做中间人解密（对使用 SSL pinning 的原生 App 无效）。

证书安装注意
- 必须先设置手机代理，随后用手机浏览器访问 spy-debugger 提供的证书安装地址；若先安装证书再设置代理可能无效。  
- iOS：安装证书后需在“设置 → 通用 → 关于本机 → 证书信任设置”中手动信任。  
- 部分 App（采用严格的 SSL pinning）无法被中间人解密，请谨慎对待。

界面与使用示例
- Dashboard：包含 weinre 调试入口与 AnyProxy 抓包页面链接。  
- 页面编辑：启动 `spy-debugger -w true`，在 Dashboard 点击 weinre 调试页面或直接用 weinre 地址访问。  
- 抓包查看：打开 AnyProxy 页面，浏览请求列表、请求/响应详情、重放/断点等。

高级用法
- 自动忽略非浏览器来源请求：启用 `-b true` 可减少对原生 App HTTPS 请求的拦截（iOS15 限制需注意）。  
- 与 CI/脚本结合：可在本地调试脚本中启动 spy-debugger，或将其作为调试/测试阶段的代理工具。  
- 与其他代理协作：通过 `-e` 设定上游代理，将流量转发至 Charles/Fiddler 进行更复杂规则处理。

常见问题（FAQ）
- 手机无法访问 Dashboard：检查手机与电脑是否处于同一网络，确认防火墙/路由器是否阻断端口。  
- 安装证书后仍无法解密 HTTPS：确认代理已正确设置并使用手机浏览器访问安装地址；在 iOS 上必须手动信任证书。  
- 抓不到流量或报错：确认 spy-debugger 已正常启动、端口未被占用、目标页面未使用 pinning。  
- weinre 日志不完整：spy-debugger 已修复 weinre 在某些 Node 版本的问题，但仍受限于页面加载时机，建议按 Dashboard 指引操作。

安全与注意事项
- 切勿在不受信任的网络或生产环境开启全局代理/中间人证书。  
- 不要将私钥或证书文件上传到公开仓库。  
- 使用时注意遵循目标站点和平台的使用协议，避免越权调试他人数据。

贡献与反馈
- 源码与 issue：参见 npm 或 GitHub 仓库（README 中链接）。  
- 问题提交：在仓库 issue 中描述复现步骤、环境、日志。

参考链接
- spy-debugger npm： https://www.npmjs.com/package/spy-debugger  
- weinre： http://people.apache.org/~pmuellr/weinre/docs/latest/  
- AnyProxy： https://github.com/alibaba/anyproxy
