
// ! 1. Pinia 简介
// * Pinia 是 Vue.js 官方推荐的状态管理库，作为 Vuex 的替代方案，提供更简单、灵活的 API，支持 Vue 3 的 Composition API。
// ? 标准语法：无（Pinia 是库，不是 SQL 语句）
// 参数说明：无
// 示例：无
// TODO: Pinia 仅适用于 Vue 3 及以上版本。

// ! 2. Pinia 的核心概念
// * Pinia 主要包括 State（状态）、Getters（派生状态）、Actions（修改状态和处理逻辑）、Plugins（插件）。
// ? 标准语法：
//   State：存储全局共享状态
//   Getters：从 state 派生新数据
//   Actions：同步/异步修改 state
//   Plugins：扩展功能
// 参数说明：
//   state：函数，返回状态对象
//   getters：对象，定义派生状态
//   actions：对象，定义方法
// 示例：见下方各节
// TODO: Pinia 的 actions 可直接修改 state，无需 mutations。

// ! 3. 安装与注册 Pinia
// * 在 Vue 3 项目中安装并注册 Pinia。
// ? 标准语法：npm install pinia
// 参数说明：无
// 示例：
/*
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount('#app');
*/
// TODO: 需在根实例注册 Pinia。

// ! 4. 创建 Store
// * 通过 defineStore 创建一个独立的 Store。
// ? 标准语法：
/*
import { defineStore } from 'pinia';
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: { doubleCount: (state) => state.count * 2 },
  actions: {
    increment() { this.count++; },
    asyncIncrement() { setTimeout(() => { this.count++; }, 1000); }
  }
});
*/
// 参数说明：
//   'counter'：store 名称
//   state：返回状态对象
//   getters：派生状态
//   actions：方法
// 示例：见上
// TODO: 每个 store 文件建议单独管理，便于模块化。

// ! 5. 在组件中使用 Store
// * 在组件 setup 中调用 store，访问状态、getters、actions。
// ? 标准语法：
/*
import { useCounterStore } from '@/stores/counter';
export default {
  setup() {
    const counterStore = useCounterStore();
    return {
      count: counterStore.count,
      doubleCount: counterStore.doubleCount,
      increment: counterStore.increment,
      asyncIncrement: counterStore.asyncIncrement,
    };
  },
};
*/
// 参数说明：无
// 示例：见上
// TODO: Pinia 的 state、getters、actions 都是响应式的，可直接解构使用。

// ! 6. 持久化插件
// * 通过插件（如 pinia-plugin-persistedstate）将状态持久化到本地存储。
// ? 标准语法：
/*
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
*/
// 参数说明：
//   persist: true // 在 store 中启用持久化
// 示例：
/*
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  persist: true,
});
*/
// TODO: 需安装插件 npm install pinia-plugin-persistedstate

// ! 7. 调试与开发工具
// * Pinia 与 Vue DevTools 深度集成，可查看状态、派生状态和 actions 调用。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 可通过自定义插件记录状态变化和操作日志。

// ! 8. 优势与不足
// * Pinia 的主要优势和不足。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 
//   优势：API 简单、模块化、支持 Composition API、性能优、插件丰富。
//   不足：生态系统尚在完善，旧项目迁移成本较高。

// ! 9. 示例项目
// * 计数器 Store 与组件的完整用法。
// ? 标准语法：见下
// 参数说明：无
// 示例：
/*
// Store 文件
import { defineStore } from 'pinia';
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++; },
    asyncIncrement() { setTimeout(() => { this.count++; }, 1000); }
  }
});

// 组件文件
<template>
  <div>
    <h1>Count: {{ count }}</h1>
    <button @click="increment">Increment</button>
    <button @click="asyncIncrement">Async Increment</button>
  </div>
</template>
<script>
import { useCounterStore } from '@/stores/counter';
export default {
  setup() {
    const counterStore = useCounterStore();
    return {
      count: counterStore.count,
      increment: counterStore.increment,
      asyncIncrement: counterStore.asyncIncrement,
    };
  },
};
</script>
*/
// TODO: 推荐每个业务领域单独一个 store 文件，便于维护和扩展。

// ! 10. 总结
// * Pinia 是 Vue 3 官方推荐的状态管理库，API 简单，功能强大，适合现代 Vue 项目。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 未来 Vue 项目建议优先选用 Pinia 替代 Vuex。