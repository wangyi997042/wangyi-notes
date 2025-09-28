

// ! 1. 性能优化
// * Vue3 在性能方面有显著提升，包括更快的虚拟 DOM、更小的体积和更快的启动与更新速度。
// ? 标准语法：无（为框架底层优化）
// 参数说明：无
// 示例：无
// TODO: 性能提升对大型项目和移动端尤为明显。

// ! 2. 响应式系统升级
// * Vue3 用 Proxy 替代了 Object.defineProperty，实现了更强大和灵活的响应式系统，并新增了组合式 API。
// ? 标准语法：
//   ref、reactive、computed、watch 等组合式 API
// 参数说明：
//   ref：用于基本类型响应式
//   reactive：用于对象/数组响应式
//   computed：计算属性
//   watch：侦听响应式数据变化
// 示例：
// import { ref, reactive, computed, watch } from 'vue';
// const count = ref(0);
// const state = reactive({ name: '张三' });
// const double = computed(() => count.value * 2);
// watch(count, (newVal) => { console.log(newVal); });
// TODO: Proxy 支持对象/数组属性的新增和删除，性能更优。

// ! 3. 组合式 API（Composition API）
// * 通过 setup() 函数和组合式 API，逻辑复用更简单，代码更清晰，类型推断更友好。
// ? 标准语法：
//   setup(props, context) { ... }
//   自定义组合函数（composables）
// 参数说明：
//   setup：组件入口函数
//   composables：可复用的逻辑函数
// 示例：
// export default {
//   setup() {
//     const count = ref(0);
//     function inc() { count.value++; }
//     return { count, inc };
//   }
// }
// TODO: 推荐用组合式 API 替代 mixins，便于逻辑拆分和复用。

// ! 4. TypeScript 支持
// * Vue3 源码和 API 均以 TypeScript 编写，类型推断更完善，开发体验更好。
// ? 标准语法：支持 TS 语法和类型注解
// 参数说明：
//   props、emit、slots 等均支持类型推断
// 示例：
// defineProps<{ msg: string }>();
// TODO: 推荐新项目直接用 TypeScript，提升代码健壮性。

// ! 5. Fragment、Teleport、Suspense 新特性
// * Fragment 支持多根节点，Teleport 可将内容渲染到任意 DOM，Suspense 支持异步组件加载和占位。
// ? 标准语法：
//   <template> 多根节点 </template>
//   <Teleport to="body">...</Teleport>
//   <Suspense>...</Suspense>
// 参数说明：
//   Teleport 的 to 属性指定目标容器
//   Suspense 用于包裹异步组件
// 示例：
// <template>
//   <div>1</div><div>2</div>
//   <Teleport to="body"><Modal /></Teleport>
//   <Suspense><AsyncComp /></Suspense>
// </template>
// TODO: Fragment 减少无意义 DOM 层级，Teleport 常用于弹窗，Suspense 优化异步体验。

// ! 6. 生命周期钩子变化
// * 生命周期钩子命名统一为 onMounted、onUpdated、onUnmounted 等，更易理解和记忆。
// ? 标准语法：
//   import { onMounted, onUpdated, onUnmounted } from 'vue';
//   onMounted(() => { ... });
// 参数说明：无
// 示例：
// onMounted(() => { console.log('mounted'); });
// TODO: 组合式 API 下生命周期钩子需在 setup 内调用。

// ! 7. 其它常用功能升级
// * 包括更灵活的自定义指令和组件事件、更好的异步组件和动态导入支持、更优的模板编译和静态提升。
// ? 标准语法：
//   defineAsyncComponent、v-memo、v-on、v-bind 等
// 参数说明：
//   defineAsyncComponent：定义异步组件
//   v-memo：静态提升
// 示例：
// import { defineAsyncComponent } from 'vue';
// const AsyncComp = defineAsyncComponent(() => import('./Comp.vue'));
// TODO: 模板静态提升减少运行时开销，异步组件加载更简单。

// ! 8. 实际开发常用升级点
// * 推荐实际开发中优先使用组合式 API、TypeScript、Teleport、Suspense 等新功能，提升项目质量和开发效率。
// ? 标准语法：见前述各节
// 参数说明：无
// 示例：
// 用 setup 和组合式 API 组织复杂逻辑
// 用 ref/reactive 实现响应式数据
// 用 Teleport 实现弹窗
// 用 Suspense 优化异步加载
// TODO: 结合官方文档和实际项目多实践，体验 Vue3 的优势。

// ! 总结
// * Vue3 在性能、响应式、类型支持、逻辑复用和新特性等方面全面升级，实际开发中推荐优先使用新特性，提升项目质量和开发效率。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 建议新项目优先选用 Vue3，老项目可逐步迁移。