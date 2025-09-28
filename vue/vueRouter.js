
// ! 1. Vue Router 简介
// * Vue Router 是 Vue.js 官方提供的路由管理库，用于构建单页面应用（SPA），支持动态路由、嵌套路由、路由守卫等功能。
// ? 标准语法：无（为库和 API 设计）
// 参数说明：无
// 示例：无
// TODO: Vue Router 需单独安装，Vue3 推荐使用 vue-router@4。

// ! 2. 安装和基本使用
// * 通过 npm 安装并在 Vue 应用中注册 Vue Router。
// ? 标准语法：npm install vue-router
// 参数说明：无
// 示例：
// import { createRouter, createWebHistory } from 'vue-router';
// import Home from './components/Home.vue';
// const routes = [{ path: '/', component: Home }];
// const router = createRouter({ history: createWebHistory(), routes });
// app.use(router);
// TODO: 路由必须在 app.mount 之前 use。

// ! 3. 路由配置
// * 配置路由映射关系，包括基本路由、动态路由、嵌套路由、重定向和别名。
// ? 标准语法：
//   const routes = [{ path: '/路径', component: 组件 }]
//   动态路由：path: '/user/:id'
//   嵌套路由：children: [{ path: '子路径', component: 子组件 }]
//   重定向：redirect: '/目标路径'
//   别名：alias: '/别名'
// 参数说明：
//   path：路由路径
//   component：对应组件
//   children：子路由数组
//   redirect：重定向目标
//   alias：别名路径
// 示例：
// const routes = [
//   { path: '/', component: Home },
//   { path: '/about', component: About },
//   { path: '/user/:id', component: User },
//   { path: '/dashboard', component: Dashboard, children: [
//     { path: 'profile', component: Profile },
//     { path: 'settings', component: Settings },
//   ] },
//   { path: '/home', redirect: '/' },
//   { path: '/profile', component: Profile, alias: '/user-profile' },
// ];
// TODO: 嵌套路由需在父组件中使用 <router-view> 渲染子路由。

// ! 4. 路由守卫
// * 路由守卫用于在路由切换前后执行逻辑，如权限验证、登录判断等。
// ? 标准语法：
//   router.beforeEach((to, from, next) => { ... })
//   router.afterEach((to, from) => { ... })
//   路由独享守卫：beforeEnter
//   组件内守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
// 参数说明：
//   to：目标路由对象
//   from：来源路由对象
//   next：必须调用以继续导航
// 示例：
// router.beforeEach((to, from, next) => { next(); });
// const routes = [{ path: '/admin', component: Admin, beforeEnter: (to, from, next) => { next(); } }];
// export default {
//   beforeRouteEnter(to, from, next) { next(); },
//   beforeRouteUpdate(to, from, next) { next(); },
//   beforeRouteLeave(to, from, next) { next(); },
// };
// TODO: 忘记调用 next() 会导致路由无法跳转。

// ! 5. 路由模式
// * Vue Router 支持 History 模式和 Hash 模式。
// ? 标准语法：
//   createWebHistory() // HTML5 History 模式
//   createWebHashHistory() // Hash 模式
// 参数说明：
//   history：路由历史记录模式
// 示例：
// createRouter({ history: createWebHistory(), routes });
// createRouter({ history: createWebHashHistory(), routes });
// TODO: History 模式需服务器支持，Hash 模式兼容性好。

// ! 6. 路由元信息
// * 路由可携带 meta 元信息，用于权限、标题等扩展用途。
// ? 标准语法：
//   { path: '/admin', component: Admin, meta: { requiresAuth: true } }
// 参数说明：
//   meta：自定义元数据对象
// 示例：
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) { /* 权限校验 */ }
//   next();
// });
// TODO: meta 可用于动态设置页面标题、权限等。

// ! 7. 路由懒加载
// * 通过动态 import 实现组件按需加载，优化首屏性能。
// ? 标准语法：
//   component: () => import('./components/About.vue')
// 参数说明：无
// 示例：
// const routes = [{ path: '/about', component: () => import('./components/About.vue') }];
// TODO: 懒加载适合大型应用，减少初始包体积。

// ! 8. 路由过渡动画
// * 使用 <transition> 组件为路由切换添加动画效果。
// ? 标准语法：
//   <transition name="fade"><router-view></router-view></transition>
// 参数说明：
//   name：动画名称
// 示例：
// <transition name="fade"><router-view></router-view></transition>
// .fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
// .fade-enter, .fade-leave-to { opacity: 0; }
// TODO: 可自定义多种动画效果，提升用户体验。

// ! 9. 常见问题与技巧
// * 包括路由跳转方法、动态参数变化组件不刷新等常见问题。
// ? 标准语法：
//   <router-link to="/about">About</router-link>
//   router.push('/about')
//   组件内：beforeRouteUpdate 监听参数变化
// 参数说明：
//   to：目标路径
// 示例：
// <router-link to="/about">About</router-link>
// import { useRouter } from 'vue-router';
// const router = useRouter(); router.push('/about');
// TODO: 动态参数变化时需用 beforeRouteUpdate 响应。

// ! 10. 总结
// * Vue Router 是 Vue.js 构建单页面应用的核心工具，支持灵活的路由管理、导航守卫、懒加载、动画等功能。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 推荐结合官方文档和实际项目多实践，掌握路由高级用法。