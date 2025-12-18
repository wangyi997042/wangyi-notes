module.exports = {
  plugins: {
    // 关闭 rem 适配（彻底弃用）
    "postcss-pxtorem": false,
    // 开启 vw 适配（核心）
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 设计稿宽度（Vant 官方设计稿是 375px，和你之前的 rootValue 一致）
      unitPrecision: 2, // 转换后保留 2 位小数
      viewportUnit: 'vw', // 目标单位（推荐 vw，全屏适配）
      selectorBlackList: ['.norem'], // 过滤 .norem 开头的类，不转换 px
      minPixelValue: 1, // 小于 1px 的 px 不转换（避免极小数值）
      mediaQuery: false, // 不转换媒体查询中的 px
      // 关键：仅转换 Vant 的 px，其他第三方包（如 ant-design-vue）跳过（避免样式错乱）
      exclude: /node_modules\/(?!vant)/ 
    }
  }
};