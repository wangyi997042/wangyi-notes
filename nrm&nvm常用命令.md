# nvm 安装

- 1、https://github.com/coreybutler/nvm-windows/releases 下载 exe 版本就行
- 2、安装路径上文件不可有空格
- 3、之后使用 nvm 命令测试即可
- 4、要先安装 nvm 再安装 node 否则容易找不到这个 node 版本

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
