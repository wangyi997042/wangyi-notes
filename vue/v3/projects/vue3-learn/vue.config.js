const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  outputDir: process.env.VUE_APP_OUTPUT_DIR || 'dist',
  assetsDir: 'static',
  // 开发环境强制开启sourcemap，生产环境读环境变量
  productionSourceMap: process.env.NODE_ENV === 'production' 
    ? process.env.VUE_APP_SOURCEMAP === 'true' 
    : true,
  // 只转译核心依赖，减少编译耗时
  transpileDependencies: ['vue', 'vue-router', 'pinia', 'axios'],

  // 开发服务器配置（完全适配 4.x 规范，无非法属性）
  devServer: {
    port: process.env.VUE_APP_DEV_PORT || 8080,
    open: true, // 自动打开浏览器
    host: '0.0.0.0', // 允许局域网访问
    client: {
      overlay: {
        warnings: false, // 关闭警告弹窗
        errors: true // 只显示错误弹窗
      },
      progress: false // 关闭编译进度条（减少日志干扰）
    },
    hot: true, // 强制开启热更新（HMR）
    liveReload: true, // 热更新失效时自动刷新
    // 接口代理配置（保留调试日志）
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: ''
        },
        logLevel: 'debug' // 调试时打印代理日志
      }
    },
    // devMiddleware 仅保留合法属性
    devMiddleware: {
      writeToDisk: false // 不写入磁盘，加快编译速度（合法属性）
    }
  },

  // webpack 核心配置（禁用缓存 + 差异化优化）
  configureWebpack: {
    // 禁用 webpack 编译缓存（替代原 devServer.cache，核心关键）
    cache: false,
    // 路径别名（保留）
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components')
      }
    },
    // 差异化代码拆分 + 压缩
    optimization: {
      splitChunks: process.env.NODE_ENV === 'production'
        ? { chunks: 'all' } // 生产环境拆分所有代码块
        : { chunks: 'async', minSize: 100000 }, // 开发环境只拆异步代码
      minimize: process.env.NODE_ENV === 'production', // 开发环境禁用压缩
      minimizer: process.env.NODE_ENV === 'production' ? [] : []
    },
    // 开发环境高精度 sourcemap（断点精准）
    devtool: process.env.NODE_ENV === 'development' 
      ? 'eval-cheap-module-source-map' 
      : false,
    // 开发环境关闭性能提示
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    }
  },

  // 链式配置（保留所有优化逻辑）
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      // 开发环境友好提示
      config.plugin('friendly-errors').tap(options => {
        options[0].compilationSuccessInfo = {
          messages: [`你的应用运行在: http://localhost:${process.env.VUE_APP_DEV_PORT || 8080}`]
        }
        return options
      })
      // 禁用预加载/预获取（减少启动耗时）
      config.plugins.delete('prefetch')
      config.plugins.delete('preload')
      // 禁用图片压缩（加快编译）
      config.module.rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .tap(() => ({ disable: true }))
    }

    // 生产环境移除 console/debugger
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.drop_console = true
        args[0].terserOptions.compress.drop_debugger = true
        return args
      })
    }
  }
})