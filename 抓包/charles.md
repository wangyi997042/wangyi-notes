## 一、这是Charles首次启动后的**基础代理配置步骤**（适配macOS），跟着做就能正常抓包啦：

### 1. 开启系统代理（让请求走Charles）
- 启动Charles后，顶部菜单栏点「Proxy」→ 勾选「macOS Proxy」（首次会弹系统权限请求，点“允许”）；
- 此时电脑的网络请求会自动转发到Charles，左侧列表会开始显示请求记录。


### 2. 安装根证书（解决HTTPS抓包乱码/无法抓取）
Charles默认抓不了HTTPS请求，需要信任它的证书：
1. 顶部菜单栏点「Help」→ 「SSL Proxying」→ 「Install Charles Root Certificate」；
2. 自动打开「钥匙串访问」，找到名为「Charles Proxy...」的证书，右键→「显示简介」；
3. 点「信任」→ 把「使用此证书时」设为「始终信任」，关闭窗口（会提示输入系统密码确认）；
4. （若用Chrome/Firefox）再点「Help」→ 「SSL Proxying」→ 「Install Charles Root Certificate in Chrome/Firefox」，按浏览器提示完成导入。


### 3. 开启SSL代理（允许抓HTTPS请求）
1. 顶部菜单栏点「Proxy」→ 「SSL Proxying Settings」；
2. 点「Add」，在「Host」填`*`（表示所有域名）、「Port」填`443`（HTTPS默认端口）；
3. 点「OK」保存，此时HTTPS请求会正常显示内容（不再是乱码）。


### 4. 验证抓包
打开浏览器访问任意网站（比如百度），Charles左侧会出现对应的请求列表，点击请求就能看请求/响应详情，说明配置成功。

## 二、这是Charles**移动端（iOS+安卓）抓包的完整步骤**，核心是让手机和电脑在同一网络下，并通过Charles代理转发请求：


### 前提条件
电脑和手机必须连接**同一个WiFi/局域网**（比如连家里同一个路由器，或电脑开热点给手机）。


### 步骤1：获取电脑的IP地址
- **macOS**：顶部菜单栏点「苹果图标」→「系统偏好设置」→「网络」，在当前WiFi的信息里找到「IP地址」（比如`192.168.1.100`）。
- **Windows**：按`Win+R`输入`cmd`，在终端里输入`ipconfig`，找到当前WiFi对应的「IPv4地址」。


### 步骤2：配置Charles的代理权限
1. 打开Charles，顶部菜单栏点「Proxy」→「Proxy Settings」；
2. 确认「Port」是`8888`（默认，也可以自定义，记好这个端口），勾选「Allow external computers to connect」（允许外部设备连接），点「OK」；
3. 若弹出防火墙提示，选择「允许」（否则手机连不上Charles）。


### 步骤3：手机端配置WiFi代理
#### iOS（iPhone/iPad）
1. 打开手机「设置」→「WiFi」，点击当前连接的WiFi右侧的「ⓘ」；
2. 滑到「HTTP代理」，选择「手动」；
3. 填写：
   - 「服务器」：填刚才查到的**电脑IP地址**（比如`192.168.1.100`）；
   - 「端口」：填Charles的代理端口（默认`8888`）；
4. 关闭设置，此时Charles会弹出「Allow/deny」对话框，点「Allow」（允许手机请求）。


#### 安卓
1. 打开手机「设置」→「WLAN」，长按当前连接的WiFi，选择「修改网络」；
2. 勾选「显示高级选项」，将「代理」设为「手动」；
3. 填写：
   - 「代理服务器主机名」：电脑IP地址；
   - 「代理服务器端口」：`8888`；
4. 保存设置，Charles弹出请求时点「Allow」。


### 步骤4：手机安装Charles根证书（抓HTTPS请求）
没有这一步，手机的HTTPS请求会显示“无法连接”或乱码：
#### iOS
1. 打开Charles，顶部菜单栏点「Help」→「SSL Proxying」→「Install Charles Root Certificate on a Mobile Device or Remote Browser」；
2. 按照弹窗提示，在手机浏览器里输入`chls.pro/ssl`，下载证书；
3. 打开手机「设置」→「已下载描述文件」，安装Charles证书；
4. 再去「设置」→「通用」→「关于本机」→「证书信任设置」，开启Charles证书的信任。


#### 安卓
1. 同样在Charles里打开「Install Charles Root Certificate on a Mobile Device...」；
2. 手机浏览器输入`chls.pro/ssl`，下载证书文件（一般是`.pem`格式）；
3. 打开手机「设置」→「安全」→「加密与凭据」→「安装证书」→「CA证书」，选择下载的Charles证书完成安装。


### 步骤5：验证抓包
手机打开任意APP（比如微信、抖音），Charles左侧列表会显示手机发起的请求，点击请求即可查看HTTPS的明文内容。


要不要我帮你整理一份Charles**移动端抓包的常见问题解决清单**（比如连不上、HTTPS抓不到的处理方法）？