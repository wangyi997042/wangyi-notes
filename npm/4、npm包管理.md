## SemVer规范

`npm包` 中的模块版本都需要遵循 `SemVer`规范——由 `Github` 起草的一个具有指导意义的，统一的版本号表示规则。实际上就是 `Semantic Version`（语义化版本）的缩写。

> SemVer规范官网： [semver.org/](https://link.juejin.cn/?target=https%3A%2F%2Fsemver.org%2F)

#### 标准版本

`SemVer`规范的标准版本号采用 `X.Y.Z` 的格式，其中 X、Y 和 Z 为非负的整数，且禁止在数字前方补零。X 是主版本号、Y 是次版本号、而 Z 为修订号。每个元素必须以数值来递增。

- 主版本号(`major`)：当你做了不兼容的API 修改
- 次版本号(`minor`)：当你做了向下兼容的功能性新增
- 修订号(`patch`)：当你做了向下兼容的问题修正。

例如：`1.9.1 -> 1.10.0 -> 1.11.0`

#### 先行版本

当某个版本改动比较大、并非稳定而且可能无法满足预期的兼容性需求时，你可能要先发布一个先行版本。

先行版本号可以加到“主版本号.次版本号.修订号”的后面，先加上一个连接号再加上一连串以句点分隔的标识符和版本编译信息。

- 内部版本(`alpha`):
- 公测版本(`beta`):
- 正式版本的候选版本`rc`: 即 `Release candiate`
- 先行版本`next:`，npm install foo@next安装，例如3.0.2-alpha.0

### version版本管理

**major | minor | patch | premajor | preminor | prepatch | prerelease**

| npm verseion | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| major        | - 如果没有预发布号，则直接升级一位大号，其他位都置为0 - 如果有预发布号： -- 中号和小号都为0，则不升级大号，而将预发布号删掉。即2.0.0-1变成2.0.0，这就是预发布的作用 -- 如果中号和小号有任意一个不是0，那边会升级一位大号，其他位都置为0，清空预发布号。即 2.0.1-0变成3.0.0 |
| minor        | - 如果没有预发布号，则升级一位中号，大号不动，小号置为空 - 如果有预发布号: -- 如果小号为0，则不升级中号，将预发布号去掉 -- 如果小号不为0，同理没有预发布号 |
| patch        | - 如果没有预发布号：直接升级小号，去掉预发布号 - 如果有预发布号：去掉预发布号，其他不动 |
| premajor     | - 直接升级大号，中号和小号置为0，增加预发布号为0             |
| preminor     | - 直接升级中号，小号置为0，增加预发布号为0                   |
| prepatch     | - 直接升级小号，增加预发布号为0                              |
| prerelease   | - 如果没有预发布号：增加小号，增加预发布号为0 - 如果有预发布号，则升级预发布号 |

## 如何使用Dist-tags(分发标签)标记npm包

Dist-tags来标记不同版本的npm包，相当于给版本取了一个语义化的标签，用户通过标签来安装包，一种更为人性化的做法。

### **添加标签**

```
# npm dist-tag add <pkg>@<version> [<tag>]
# 发布了包npm-demos-test，发布版本分别有1.0.0，1.0.1，1.0.2

# 给版本1.0.0添加标签marktag
> npm dist-tag add npm-demos-test@1.0.0 marktag
```

注意：最后发布的版本（如上是1.0.2），一般自带latest标签。

### **用标签发布**

上面这种做法稍显复杂，这里提供一种更为简便的方式，用标签发布。

```
npm publish --tag marktag
```

### **用户通过标签安装npm包**

默认npm install < pkg >会使用latest标签。要覆盖此行为，请使用npm install < pkg >@< tag >。以下示例将通过标签marktag安装npm-demos-test

```
> npm install npm-demos-test@marktag
+ npm-demos-test@1.0.0
```







## 常用命令总结

#### 安装包

```
npm install <package_name> //安装
npm uninstall <package_name> // 移除
```

控制包安装的位置

- -P, --save-prod：记录在`dependencies`中
- -D, --save-dev：记录在`devDependencies`中
- -O, --save-optional：记录在`optionalDependencies`
- --no-save：不会记录在`dependencies`中node_modules会安装包但不会生成package-lock.json
- -E, --save-exact：版本号不会按照语义化记录，会显示具体的"1.2.3" 例如：`"loadsh": "0.0.4"`
- -B, --save-bundle：依赖也会记录在`bundleDependencies`中

安装全局包

```
npm install -g <package_name>
// 有时候我们记不清某个包，想查看所有已安装的包
// depth代表遍历的深度，如果没有该参数，会把所有包的依赖也显示 
npm list -g --depth 0
```

##### 包版本的管理

```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]

> npm version patch 
v1.0.1
> npm version prerelease --preid=alpha // alpha版本发布，beta同理
v3.0.0-alpha1
```

```
> npm version patch 
v1.0.1
```

##### Dist-tag 常用命令

```
 npm dist-tag add <pkg>@<version> [<tag>] // 添加标记
 > npm dist-tag add npm-demos-test@1.0.0 marktag
 
 npm dist-tag rm <pkg> <tag> // 移除标记
 
 npm dist-tag ls [<pkg>] // 查看标记列表
 
 npm publish --tag marktag // 发布时标记
 
```

##### 查看包的信息

```
npm view wnagyi-utils // 指定包在注册表上的信息
npm view jquery@1.11.3 // 查看指定版本的包信息
npm view jquery versions //查看某包的所有可用的历史版本
npm info wnagyi-utils
npm ls // 查看本地包信息
npm ls wangyi-utils // 查看指定本地包信息 没有返回位空（empty）
npm outdated // 检查本地包与最新包版本信息
```

#### 缓存

```
npm config get cache // 查看缓存位置
npm cache add // 官方解释说这个命令主要是 `npm` 内部使用，但是也可以用来手动给一个指定的 package 添加缓存。
npm cache clean // 删除缓存目录下的所有数据，为了保证缓存数据的完整性，需要加上 `--force` 参数。
npm cache verify // 验证缓存数据的有效性和完整性，清理垃圾数据。

基于缓存数据，npm 提供了离线安装模式，分别有以下几种：

--prefer-offline // 优先使用缓存数据，如果没有匹配的缓存数据，则从远程仓库下载。
--prefer-online // 优先使用网络数据，如果网络数据请求失败，再去请求缓存数据，这种模式可以及时获取最新的模块。
--offline： 不请求网络，直接使用缓存数据，一旦缓存数据不存在，则安装失败。
```