
### 查看当前项目的webpage版本
    npx webpack -v
    webpack -v 全局webpage版本
### 查看webpage可用版本
    npm info webpack
    npm i webpack@x.xx webpack-cli -D 安装指定版本的webpage
### 单文件 指定入口文件
    npx webpage index.js


### 创建webpage.config.js

### webpage只认识js文件，遇到不认识的用loader
    

### html-webpack-plugin
    打包后创建html文件，在html文件title上设置<%= htmlWebpackPlugin.options.title %>
    打包完成后会替换他，变成我们自己起的名字

### 热模块替换 hot module replacement (HMR)
    // js文件更新了，页面没有反应，所以要用module.hot进行处理不会对页面进行更新
    // HMR对css文件支持比较好，对js就不行了，所以需要用module.hot处理

### Babel处理es6
    npm i babel-loader @babel/core @babel/preset-env -D