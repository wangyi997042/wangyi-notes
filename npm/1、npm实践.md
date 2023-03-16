### 1. 安装

#### 1.1 管理本地包

```
npm install <package_name> //安装
npm uninstall <package_name> // 移除
```

控制包安装的位置

- -S, --save-prod：记录在`dependencies`中
- -D, --save-dev：记录在`devDependencies`中
- -O, --save-optional：记录在`optionalDependencies`
- --no-save：不会记录在`dependencies`中node_modules会安装包但不会生成package-lock.json
- -E, --save-exact：版本号不会按照语义化记录，会显示具体的"1.2.3" 例如：`"loadsh": "0.0.4"`，没有~^这些，会是固定版本
- -B, --save-bundle：依赖也会记录在`bundleDependencies`中

#### 1.2 安装全局包

```
npm install -g <package_name>
// 有时候我们记不清某个包，想查看所有已安装的包
// depth代表遍历的深度，如果没有该参数，会把所有包的依赖也显示 
npm list -g --depth 0
```

### 2 发布自己的包

#### 2.1 初始化

首先需要在[www.npmjs.com/signup](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fsignup)注册账号。

完成之后在终端中执行`npm login`，输入账号密码之后即登录成功。

这里有一点需要注意，如果设置过`taobao`源，需要修改为`npm`源，使用如下指令还原：

```
npm config set registry http://registry.npmjs.org
```

但是鉴于实际情况，我们在`taobao`和`npm`源之间互相切换其实太麻烦了，比较好的解决方案就是配置`package.json`中的`publishConfig`字段。

可以使用`npm adduser` 添加用户信息

```text
npm adduser --registry http://your_ip:4873 
// 后续需要填写自己的相关信息 
// 填完回车就可以
```

如需要更改信息：

```
> npm profile get // 查看信息
> npm profile set <prop> <value> // 更改信息
eg: npm profile set fullname wangyi997042
		npm profile set password
```

|                 |                                 |
| --------------- | ------------------------------- |
| name            | wangyi997042                    |
| email           | wangyi997042@163.com (verified) |
| two-factor auth | disabled                        |
| fullname        | wangyi997042                    |
| homepage        |                                 |
| freenode        |                                 |
| twitter         |                                 |
| github          |                                 |
| created         | 2022-01-12T06:46:15.059Z        |
| updated         | 2022-02-23T05:35:54.246Z        |

Github 或 Gitee 上新建仓库并克隆到本地

```
git clone https://github.com/wangyi997042/wangyi-utils.git
```

```
npm init -y // 初始化 package.json信息
```

```
{
  "name": "wangyi-utils",
  "version": "2.2.3-alpha.2",
  "description": "",
  "main": "index.js",
  "keywords": [
    "utils"
  ],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/wangyi997042/wangyi-utils.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/wangyi997042/wangyi-utils/issues"
  },
  "homepage": "https://github.com/wangyi997042/wangyi-utils#readme",
  "dependencies": {
    "express": "^3.0.0-alpha1"
  },
  "peerDependencies": {},
  "devDependencies": {
    "lodash": "^3.3.0"
  }
}
```



#### 2.2 package.json 配置

#### 2.3 版本管理

版本号遵循[语义化版本](https://link.juejin.cn?target=https%3A%2F%2Fsemver.org%2Flang%2Fzh-CN%2F)的规则，由`MAJOR.MINOR.PATCH`组成，在末尾还可以加上扩展的预发布版本号信息。

- MAJOR：当你做了不兼容的 API 修改，
- MINOR：当你做了向下兼容的功能性新增，
- PATCH：当你做了向下兼容的问题修正。

版本号可以手动修改，也可以通过`npm version`命令管理：

```
// 假设当前版本号 v1.0.0

npm version patch
// v1.0.1

npm version prepatch
// v1.0.2-0

npm version minor
// v1.1.0

npm version major
// v2.0.0
```

`npm version`的完整命令如下：

```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]
```

如果我们要生成`1.0.0-alpha.1`风格的版本号，可以带上参数`--preid`:

```
npm version prerelease --preid=alpha
```

当我们执行了`npm version`之后，脚本会自动修改版本号，并在`git`中创建提交和标签，如果想要禁用该行为，可以传入`--no-git-tag-version`来阻止。

#### 2.4 tag

`npm`的`tag`是用于标记不同用途的版本，一个`npm`包至少会有`latest`标签，我们可以根据测试版、预览版等不同需求定制标签。

比如我们有一个测试版本要发布，我们可以指定`dist tag`为`beta`：

```
npm publish --tag beta
npm dist-tag add <pkg>@<version> [<tag>]
```

当我们测试完成，准备正式发布的时候，就可以把`beta`对应版本号演进到`latest`上。

```
npm dist-tag rm <pkg> <tag>
```



#### 2.5 发布

当一切准备就绪之后，我们就可以进入发包的冲刺了。

```
npm publish
```

注意！可能有人说我为什么看到的只有错误，一般这个时候可以这样排查：

- registry检查是否正确
- 包名是否为`@somescope/somepackagename`形式
- 版本号是否未更新

如果包属于某个组织下，即`@somescope/somepackagename`形式的包名，执行命令需要调整为`npm publish --access public`。

经过千辛万苦之后，我们终于发布成功了，可是如果我们发现某个文件漏掉了，再发布一个版本也不太值得，我们就可以使用`npm unpublish`命令取消24小时之内发布的包，需要注意的是`unpublish`并不推荐使用。

#### 2.6 搭建自己的npm源

```
npm i -g verdaccio // 安装工具
verdaccio // 启动verdaccio 访问http://localhost:4873/
> /Users/frankie/.config/verdaccio/config.yaml // 配置文件地址
nrm add verdaccio http://localhost:4873/ // 添加源
nrm use verdaccio  // 切换源
npm adduser --registry http://localhost:4873/ // 登陆账号设置密码 19

// github上创建项目
git clone https://github.com/wangyi997042/wangyi-verdaccio.git
npm init -y //生成package.json文件

npm version patch // 控制版本号
npm publish [http://localhost:4873/] // 发布

```



### 3. 每次发布流程

1. 开发功能，并提交代码(需要依赖打包文件的，需要先build一下)
2. npm version major or minor or patch
3. 确定npm源
4. npm publish
