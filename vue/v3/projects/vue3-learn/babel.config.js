module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // Vant 按需引入（原有配置，保留）
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true // 自动引入vant的样式
    }, 'vant'],
    // 新增：ant-design-vue 按需引入
    ['import', {
      libraryName: 'ant-design-vue',
      libraryDirectory: 'es',
      style: true // 自动引入antd的样式（less格式，需确保less依赖已装）
    }, 'ant-design-vue']
  ]
}