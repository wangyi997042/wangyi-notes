1，在对应 npm 包项目目录下 npm link，使包创建了一个全局的链接，去除全局链接（npm unlink）
npm ls --global --depth 0 （查看所有全局的链接名称）

2，在项目目录下 npn link packName(npm 包名)，去除软链 npm unlink packageName

3、react 项目里要保持 npm 包和项目使用同一个 react 包
![npm调试本地包](./install原理/npm%E8%B0%83%E8%AF%95%E5%8C%85.png)
