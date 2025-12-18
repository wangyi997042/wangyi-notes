module.exports = {
  root: true,
  // 👇 核心修正：顶层parser改为vue-eslint-parser（解析.vue文件）
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 👇 嵌套配置：让babel解析<script>里的JS代码（保留这行，删除重复的parser）
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    ecmaVersion: 2022,
    babelOptions: {
      presets: ['@vue/cli-plugin-babel/preset']
    },
    allowImportExportEverywhere: true
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ['vue'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  rules: {
    "comma-dangle": ["off"],
    "no-unexpected-multiline": ["off"],
    "no-irregular-whitespace": ["off"],
    "vue/no-parsing-error": ["off"],
    "no-extra-semi": ["off"],
    "no-empty": ["off"],
    "semi": ["off"],
    "vue/multi-word-component-names": ["off"],
    "no-console": ["off"],
    "no-debugger": ["off"]
  },
  overrides: [
    {
      files: ["src/**/*.vue", "src/**/*.js"],
      rules: {
        "no-unexpected-multiline": ["off"],
        "vue/no-parsing-error": ["off"]
      }
    }
  ]
};