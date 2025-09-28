
// ! 1. Vuex 简介
// * Vuex 是 Vue.js 官方提供的状态管理库，用于管理 Vue 应用中的全局状态，通过集中式存储和管理，提升组件间状态共享和通信效率。
// ? 标准语法：无（为库和 API 设计）
// 参数说明：无
// 示例：无
// TODO: Vuex 适用于中大型项目的复杂状态管理。

// ! 2. Vuex 的核心概念
// * 包括 State（状态）、Getters（派生状态）、Mutations（同步修改）、Actions（异步操作）、Modules（模块化）。
// ? 标准语法：
//   state: { ... }
//   getters: { ... }
//   mutations: { ... }
//   actions: { ... }
//   modules: { ... }
// 参数说明：
//   state：全局状态对象
//   getters：派生状态对象
//   mutations：同步修改 state 的方法
//   actions：异步操作，最终提交 mutation
//   modules：模块化子 store
// 示例：见下方各节
// TODO: 所有状态变更必须通过 mutation，actions 仅用于异步。

// ! 3. 安装与注册 Vuex
// * 通过 npm 安装并在 Vue 应用中注册 Vuex。
// ? 标准语法：npm install vuex
// 参数说明：无
// 示例：
// import { createApp } from 'vue';
// import App from './App.vue';
// import store from './store';
// const app = createApp(App);
// app.use(store);
// app.mount('#app');
// TODO: Vue3 推荐使用 vuex@4 版本。

// ! 4. 创建 Store
// * 使用 createStore 创建全局状态管理对象。
// ? 标准语法：
// import { createStore } from 'vuex';
// const store = createStore({ state, getters, mutations, actions, modules });
// 参数说明：同上
// 示例：
// const store = createStore({
//   state: { count: 0 },
//   getters: { doubleCount: state => state.count * 2 },
//   mutations: { increment(state) { state.count++; } },
//   actions: { asyncIncrement({ commit }) { setTimeout(() => { commit('increment'); }, 1000); } }
// });
// export default store;
// TODO: 推荐将 store 单独拆分文件管理。

// ! 5. 在组件中使用 Vuex
// * 通过 mapState、mapGetters、mapMutations、mapActions 等辅助函数将 Vuex 状态和方法映射到组件。
// ? 标准语法：
//   computed: { ...mapState([...]), ...mapGetters([...]) }
//   methods: { ...mapMutations([...]), ...mapActions([...]) }
// 参数说明：
//   mapState：映射 state
//   mapGetters：映射 getters
//   mapMutations：映射 mutations
//   mapActions：映射 actions
// 示例：
// computed: { ...mapState(['count']), ...mapGetters(['doubleCount']) }
// methods: { ...mapMutations(['increment']), ...mapActions(['asyncIncrement']) }
// TODO: 也可直接 this.$store.state、this.$store.commit 等访问。

// ! 6. 模块化管理
// * 当应用变复杂时，可将 Vuex 状态分割为多个模块，每个模块有独立的 state、getters、mutations、actions。
// ? 标准语法：
// const store = createStore({ modules: { moduleA, moduleB } })
// 参数说明：
//   modules：对象，key 为模块名，value 为模块内容
// 示例：
// const counterModule = { state: () => ({ count: 0 }), mutations: { increment(state) { state.count++; } } };
// const store = createStore({ modules: { counter: counterModule } });
// TODO: 组件中通过 mapState('counter', ['count']) 访问模块状态。

// ! 7. 状态持久化
// * 可通过插件（如 vuex-persistedstate）将 Vuex 状态持久化到本地存储。
// ? 标准语法：npm install vuex-persistedstate
// 参数说明：
//   plugins：插件数组
// 示例：
// import createPersistedState from 'vuex-persistedstate';
// const store = createStore({
//   state: { count: 0 },
//   mutations: { increment(state) { state.count++; } },
//   plugins: [createPersistedState()]
// });
// TODO: 持久化插件可配置存储 key、存储方式等。

// ! 8. 调试工具与严格模式
// * Vue DevTools 支持 Vuex 调试，严格模式确保状态只能通过 mutation 修改。
// ? 标准语法：
// const store = createStore({ ..., strict: process.env.NODE_ENV !== 'production' })
// 参数说明：
//   strict：布尔值，开启后只能通过 mutation 修改 state
// 示例：
// const store = createStore({ state: { count: 0 }, mutations: { increment(state) { state.count++; } }, strict: true });
// TODO: 开发环境建议开启严格模式，生产环境关闭以提升性能。

// ! 9. 优势与不足
// * 优势：集中式管理、可预测性、与 Vue 深度集成、插件支持。
// * 不足：样板代码多、学习曲线高、小型项目不适用。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 小型项目可用 Composition API 或 Pinia 替代。

// ! 10. 示例项目
// * 计数器 Store 与组件的完整用法。
// ? 标准语法：见下
// 参数说明：无
// 示例：
// // Store 文件
// import { createStore } from 'vuex';
// const store = createStore({
//   state: { count: 0 },
//   mutations: { increment(state) { state.count++; }, decrement(state) { state.count--; } },
//   actions: { asyncIncrement({ commit }) { setTimeout(() => { commit('increment'); }, 1000); } }
// });
// export default store;
// // 组件文件
// <template>
//   <div>
//     <h1>Count: {{ count }}</h1>
//     <button @click="increment">Increment</button>
//     <button @click="decrement">Decrement</button>
//     <button @click="asyncIncrement">Async Increment</button>
//   </div>
// </template>
// <script>
// import { mapState, mapMutations, mapActions } from 'vuex';
// export default {
//   computed: { ...mapState(['count']) },
//   methods: { ...mapMutations(['increment', 'decrement']), ...mapActions(['asyncIncrement']) }
// };
// </script>
// TODO: 推荐将 store、模块、组件分文件管理，便于维护和扩展。

// ! 11. 总结
// * Vuex 是 Vue.js 官方推荐的状态管理库，适合中大型项目。通过集中式状态管理和模块化机制，提升了状态共享和维护效率，但小型项目可考虑更轻量的方案。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 新项目可优先考虑 Pinia，Vuex 适合已有大型项目或团队已有 Vuex 经验场景。