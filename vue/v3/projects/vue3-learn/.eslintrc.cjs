/**
 * ESLint 配置文件（Vue3 + Vue CLI 项目）
 * 核心作用：约束代码规范，禁用易触发误报的规则，适配.vue文件解析
 * 配置优先级：overrides > rules > extends > 插件默认规则
 */
module.exports = {
  /**
   * root: true
   * 作用：标记当前目录为ESLint配置的根目录，停止向上级目录查找配置文件
   * 避免ESLint跑到项目外层目录读取无关配置，导致规则冲突
   */
  root: true,

  /**
   * parser: 解析器
   * vue-eslint-parser：专门用于解析.vue文件的解析器，拆分<template>/<script>/<style>结构
   * 替代@babel/eslint-parser直接解析.vue文件（后者仅能解析纯JS）
   */
  parser: 'vue-eslint-parser',

  /**
   * parserOptions: 解析器选项（给解析器传递额外配置）
   */
  parserOptions: {
    /**
     * parser: 嵌套解析器
     * 作用：让vue-eslint-parser解析完.vue结构后，交给@babel/eslint-parser解析<script>里的JS代码
     * 适配ES6+/Vue3语法，避免JS语法解析报错
     */
    parser: '@babel/eslint-parser',

    /**
     * sourceType: 模块类型
     * 值："module"（默认"script"）
     * 作用：指定代码是ES模块（使用import/export），而非CommonJS（require/module.exports）
     * 必配：Vue3项目均使用ES模块，否则会报import语法错误
     */
    sourceType: 'module',

    /**
     * ecmaVersion: 支持的ES版本
     * 值：2022（可选：2020/2021/2022/"latest"）
     * 作用：告诉解析器支持ES2022语法（如顶层await、私有类字段等）
     * 越高越兼容新语法，但需确保项目Babel/运行环境支持
     */
    ecmaVersion: 2022,

    /**
     * babelOptions: 给@babel/eslint-parser传递的Babel配置
     * presets: 指定Babel预设，复用项目的@vue/cli-plugin-babel配置
     * 避免解析器与项目Babel配置不一致导致的语法解析错误
     */
    babelOptions: {
      presets: ['@vue/cli-plugin-babel/preset']
    },

    /**
     * allowImportExportEverywhere: 允许import/export出现在任意位置
     * 值：true（默认false）
     * 作用：禁用"import/export只能在模块顶层"的校验，避免多行语法误判为非法token
     * 解决：Unexpected token报错的核心配置之一
     */
    allowImportExportEverywhere: true
  },

  /**
   * env: 环境配置
   * 作用：告诉ESLint代码运行的环境，自动识别该环境的全局变量（如window、process）
   * 避免报"window is not defined"等无意义错误
   */
  env: {
    /**
     * browser: 浏览器环境
     * 识别：window、document、alert等浏览器全局变量
     */
    browser: true,
    /**
     * es2021: ES2021环境
     * 识别：ES2021新增的全局变量/语法（如Promise.any、String.prototype.replaceAll）
     */
    es2021: true,
    /**
     * node: Node.js环境
     * 识别：process、__dirname、require等Node全局变量
     * 必配：Vue CLI项目的配置文件（如vue.config.js）运行在Node环境
     */
    node: true
  },

  /**
   * plugins: 启用的ESLint插件
   * vue: eslint-plugin-vue插件
   * 作用：提供Vue单文件组件的专属校验规则（如vue/multi-word-component-names）
   * 依赖：需提前安装npm install eslint-plugin-vue --save-dev
   */
  plugins: ['vue'],

  /**
   * extends: 继承的规则集（复用已有规则，无需重复配置）
   * 规则优先级：后继承的覆盖先继承的，自定义rules覆盖继承的
   */
  extends: [
    /**
     * plugin:vue/vue3-essential
     * 作用：Vue3核心必要规则集（包含语法错误、关键逻辑错误的校验）
     * 包含规则：如vue/no-unused-vars、vue/valid-template-root等
     * 级别：仅包含error级别的关键规则，无过度约束
     */
    'plugin:vue/vue3-essential',
    /**
     * eslint:recommended
     * 作用：ESLint官方推荐的规则集（通用JS语法规范）
     * 包含规则：如no-console（默认warn）、no-debugger（默认error）等
     * 级别：包含error/warn级别的通用规则
     */
    'eslint:recommended'
  ],

  /**
   * rules: 自定义规则（覆盖extends继承的规则）
   * 规则值说明：
   * - "off" / 0: 禁用该规则
   * - "warn" / 1: 触发时警告（不中断编译）
   * - "error" / 2: 触发时报错（中断编译）
   * 部分规则支持数组形式：["error", { 配置项 }]
   */
  rules: {
    /**
     * comma-dangle: 控制对象/数组末尾的逗号
     * 作用：校验是否允许/强制末尾逗号（如const obj = { a: 1, }）
     * 可选项：
     * - "off": 禁用
     * - ["error", "always"]: 强制加末尾逗号
     * - ["error", "never"]: 禁止加末尾逗号
     * - ["error", { "objects": "always", "arrays": "never" }]: 按类型配置
     */
    "comma-dangle": ["off"],

    /**
     * no-unexpected-multiline: 禁止意外的多行语法
     * 作用：避免因换行导致的语法解析错误（如函数调用未加括号导致多行）
     * 可选项："off" / "warn" / "error"
     * 禁用原因：Vue3模板中换行易触发误报
     */
    "no-unexpected-multiline": ["off"],

    /**
     * no-irregular-whitespace: 禁止不规则的空白符
     * 作用：校验全角空格、BOM头、不间断空格等非法空白符
     * 可选项："off" / "warn" / "error" 或 ["error", { "skipComments": true }]
     * 禁用原因：.vue文件中易因复制粘贴引入全角空格，触发Unexpected token报错
     */
    "no-irregular-whitespace": ["off"],

    /**
     * vue/no-parsing-error: 禁用Vue模板/脚本的解析错误提示
     * 作用：覆盖eslint-plugin-vue的解析错误规则
     * 可选项："off" / "warn" / "error" 或 ["error", { "x-invalid-end-tag": false }]
     * 禁用原因：避免.vue文件中合法语法被误判为解析错误
     */
    "vue/no-parsing-error": ["off"],

    /**
     * no-extra-semi: 禁止多余的分号
     * 作用：校验是否有多余的分号（如const a = 1;;）
     * 可选项："off" / "warn" / "error"
     * 禁用原因：允许手写多余分号，避免格式洁癖导致的误报
     */
    "no-extra-semi": ["off"],

    /**
     * no-empty: 禁止空代码块
     * 作用：校验是否有空的if/for/函数等代码块（如function() {}）
     * 可选项："off" / "warn" / "error" 或 ["error", { "allowEmptyCatch": true }]
     * 禁用原因：预留空函数（如showTips() {}）时不报错
     */
    "no-empty": ["off"],

    /**
     * semi: 控制是否强制使用分号
     * 作用：校验语句末尾是否加菲林号
     * 可选项：
     * - ["error", "always"]: 强制加（默认）
     * - ["error", "never"]: 禁止加
     * - ["error", "only-multiline"]: 仅多行语句加
     * 禁用原因：允许手写时灵活选择是否加分号
     */
    "semi": ["off"],

    /**
     * vue/multi-word-component-names: 强制Vue组件名使用多单词
     * 作用：避免组件名与HTML原生标签冲突（如<template>中使用<Home>会报错）
     * 可选项："off" / "warn" / "error" 或 ["error", { "ignores": ["App", "Main"] }]
     * 禁用原因：单单词组件名（如HomeView）无需强制约束
     */
    "vue/multi-word-component-names": ["off"],

    /**
     * no-console: 禁止使用console
     * 作用：校验是否有console.log/info等语句
     * 可选项："off" / "warn" / "error" 或 ["error", { "allow": ["warn", "error"] }]
     * 禁用原因：开发阶段允许使用console调试
     */
    "no-console": ["off"],

    /**
     * no-debugger: 禁止使用debugger
     * 作用：校验是否有debugger断点语句
     * 可选项："off" / "warn" / "error"
     * 禁用原因：开发阶段允许使用debugger调试
     */
    "no-debugger": ["off"],

    /**
     * no-unused-vars: 禁止声明未使用的变量/函数
     * 作用：校验是否有声明但未使用的变量（如const a = 1; 但未使用a）
     * 可选项：
     * - "off" / "warn" / "error"
     * - ["error", { 
     *     "varsIgnorePattern": "^_", // 忽略下划线开头的变量
     *     "argsIgnorePattern": "^_", // 忽略下划线开头的参数
     *     "caughtErrorsIgnorePattern": "^_" // 忽略try/catch中_err这类变量
     *   }]
     * 禁用原因：预留函数/变量（如showTips）时不报错
     */
    "no-unused-vars": "off",
    "vue/no-multiple-template-root": ["off"], // 禁用多根节点校验
    "comma-dangle": ["off"],
    "no-unexpected-multiline": ["off"],
  },

  /**
   * overrides: 覆盖规则（针对特定文件/目录生效）
   * 作用：给src下的.vue/.js文件单独配置规则，优先级高于全局rules
   * 场景：不同类型文件的规则差异化（如.vue文件禁用某规则，.js文件不禁用）
   */
  overrides: [
    {
      //  * files: 匹配的文件路径（glob语法）
      //  * src/**/*.vue: src下所有.vue文件
      //  * src/**/*.js: src下所有.js文件
      files: ["src/**/*.vue", "src/**/*.js"],
      /**
       * 针对上述文件覆盖的规则
       * 重复禁用核心误报规则，确保.vue/.js文件均生效
       */
      rules: {
        "no-unexpected-multiline": ["off"],
        "vue/no-parsing-error": ["off"]
      }
    }
  ]
};