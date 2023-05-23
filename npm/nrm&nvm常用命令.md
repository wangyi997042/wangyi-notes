# nvm 安装
### windows 安装
- 1、https://github.com/coreybutler/nvm-windows/releases 下载 exe 版本就行
- 2、安装路径上文件不可有空格
- 3、之后使用 nvm 命令测试即可
- 4、要先安装 nvm 再安装 node 否则容易找不到这个 node 版本

### mac 安装
1、先把本地的node删除
2、查看本地 安装的包  npm ls -g --depth=0
3、删除本地全局node包 sudo rm -rf /usr/local/lib/node_modules
4、删除本地node包 sudo rm /usr/local/bin/node
5、官网安装 https://github.com/nvm-sh/nvm/blob/master/README.md


# nrm 安装

- 1、安装好 nvm 和 node 后直接命令行安装 npm i nrm -g
- 2、用命令行测试发现报错后 npm install -g nrm open@8.4.2 -save 使用这个方法重新安装，原因是最新版本包版本问题

nvm version 查看当前的版本
nvm install 安装最新版本
nvm install <version> 安装相应版本
nvm use <version> 切换使用指定的版本 node
nvm ls 列出所有版本
nvm current 显示当前版本
nvm uninstall <version> 卸载制定的版本
nvm ls-remote 查看所有可安装版本
nvm ls-remote --lts 查看所有可安装的长期支持版

nrm ls 列出可选的源
nrm use 切换源
nrm add <registry> <url> 添加源
nrm del <registry> 删除源
nrm test 测试源速度
nrm test <registry> 测试指定源速度


## nrm 安装报错问题
- 报错1
```
/Users/xxx/.nvm/versions/node/v16.20.0/lib/node_modules/nrm/cli.js:9  
const open = require('open');  
^  

Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/xxx/.nvm/versions/node/v16.20.0/lib/node_modules/nrm/node_modules/open/index.js from /Users/lixiaoxia/.nvm/versions/node/v16.20.0/lib/node_modules/nrm/cli.js not supported.  
Instead change the require of index.js in /Users/xxx/.nvm/versions/node/v16.20.0/lib/node_modules/nrm/cli.js to a dynamic import() which is available in all CommonJS modules.  
at Object.<anonymous> (/Users/xxx/.nvm/versions/node/v16.20.0/lib/node_modules/nrm/cli.js:9:14) {  
code: 'ERR_REQUIRE_ESM'  
}
```
 - 执行 `npm i -g nrm open@8.4.2 --save`

- 报错2

![nrm报错](./install原理/nrm%20%E6%8A%A5%E9%94%99.png)

这个时候 我们只需要修改改cli.js文件即可
根据报错的文件地址 打开改文件 根据行数 找到第17行 将下列语句
const NRMRC = path.join(process.env.HOME, ‘.nrmrc’);
修改为
const NRMRC = path.join(process.env[(process.platform == ‘win32’) ? ‘USERPROFILE’ : ‘HOME’], ‘.nrmrc’);
保存后 重新执行 即不会报错
