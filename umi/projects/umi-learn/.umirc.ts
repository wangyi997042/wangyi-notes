import { defineConfig } from 'umi';
import path from 'path';

export default defineConfig({
  404: true,
  alias: {
    'myutils': require.resolve("./src/utils/utils.js")
  },
  outputPath: 'admin',
  base: '/admin/',
  publicPath: '/admin/',
  antd: {},
  analytics: {
    // Google Analytics 代码，配置后会启用
    ga: 'google analytics code',
    // 百度统计代码，配置后会启用
    baidu: '5a66cxxxxxxxxxx9e13',
  },
  // 开启 antd-mobile
  // hd: {},
  // 为所有非三方脚本加上 crossorigin="anonymous" 属性，通常用于统计脚本错误。
  crossorigin: true,
  dva: {
    immer: true,
    hmr: false, // 启用 dva model 的热更新
  },
  // layout: {
  //   // 支持任何不需要 dom 的
  //   // https://procomponents.ant.design/components/layout#prolayout
  //   name: 'Ant Design',
  //   locale: true,
  //   layout: 'side',
  // },
  // 请求时后端返回的数据
  request: {
    dataField: 'content',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', name: '首页', component: '@/pages/index' },
    { path: '/foo', name: 'foo', component: '@/pages/foo/index' },
    { path: '/bar', name: 'bar', component: '@/pages/bar/index' },
    { path: '/app2', microApp: 'app2', microAppProps: { a: 111 } },
    { path: '/app3', microApp: 'iyb-generate-web', },
    { path: '/renewal', microApp: 'wangyi-project', },
    { path: '/app5', microApp: 'iyb-micro-product-pc', },
  ],
  qiankun: {
    master: {
      apps: [
        {
          name: 'app2',
          entry: '//localhost:8000'
        },
        {
          name: 'wangyi-project',
          entry: '//localhost:8002'
        },
        {
          name: 'iyb-generate-web',
          entry: '//localhost:8081'
        },
        {
          name: 'iyb-micro-product-pc',
          entry: '//localhost:8003'
        }
      ]
    },
  },
  title: "my umi",
  // 快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈。
  fastRefresh: {},
  mfsu: {
    development: {
      output: "./.mfsu-dev",
    },
    production: {
      output: "./.mfsu-prod",
    }
  },
  // devServer: {
  //   port: 8082,
  // },
  // 配置 <head> 里的额外脚本，数组项为字符串或对象。
  // headScripts: [`alert(1);`, `https://a.com/b.js`],
  mock: {
    // 获取不需要走mock的文件
    exclude: []
  },
  plugins: [require.resolve('./plugins/plugin01.ts')],
  // presets: [require.resolve('./presets/presets.ts')],
  // hello: {
  //   name: 'foo',
  // },
  proxy: {
    '/api': {
      'target': 'https://oa-test.iyb.tm',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
  },
  chainWebpack(config) {
    config.resolve.alias.set('@aaa', path.resolve('./src/pages'))

  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd-mobile-v5',
        libraryDirectory: 'es/components',
        style: false,
      },
      'antd-mobile-v5',
    ],
    [
      'import',
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
      },
      'antd-mobile',
    ],
  ],
});
