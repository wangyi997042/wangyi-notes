### **Vue Router 详细总结**

**Vue Router** 是 Vue.js 官方提供的路由管理库，用于构建单页面应用（SPA）。它允许开发者通过路由在不同的页面或组件之间导航，并支持动态路由、嵌套路由、路由守卫等功能。

---

## **1. Vue Router 的核心概念**

1. **路由（Route）**:
   - 路由是 URL 与组件之间的映射关系。
   - 每个路由都定义了一个路径（`path`）和对应的组件（`component`）。

2. **路由器（Router）**:
   - 路由器是 Vue Router 的核心实例，负责管理路由的切换和导航。

3. **动态路由（Dynamic Route）**:
   - 动态路由允许在路径中使用动态参数（如 `/user/:id`）。

4. **嵌套路由（Nested Route）**:
   - 嵌套路由允许在父路由中嵌套子路由，构建复杂的页面结构。

5. **路由守卫（Navigation Guards）**:
   - 路由守卫用于在路由切换前后执行逻辑（如权限验证）。

---

## **2. 安装和基本使用**

### **2.1 安装 Vue Router**
```bash
npm install vue-router
```

### **2.2 创建路由**
```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 的 History 模式
  routes,
});

export default router;
```

### **2.3 在 Vue 应用中使用**
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router); // 注册路由
app.mount('#app');
```

---

## **3. 路由配置**

### **3.1 基本路由**
- 定义路径和组件的映射关系。
```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];
```

### **3.2 动态路由**
- 使用 `:参数名` 定义动态参数。
```javascript
const routes = [
  { path: '/user/:id', component: User },
];
```
- 在组件中获取动态参数：
```javascript
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    console.log(route.params.id); // 动态参数
  },
};
```

### **3.3 嵌套路由**
- 在父路由中定义子路由。
```javascript
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: 'profile', component: Profile },
      { path: 'settings', component: Settings },
    ],
  },
];
```
- 在父组件中使用 `<router-view>` 渲染子路由：
```html
<template>
  <div>
    <h1>Dashboard</h1>
    <router-view></router-view> <!-- 渲染子路由 -->
  </div>
</template>
```

### **3.4 重定向和别名**
- **重定向**:
  ```javascript
  const routes = [
    { path: '/home', redirect: '/' }, // 重定向到根路径
  ];
  ```
- **别名**:
  ```javascript
  const routes = [
    { path: '/profile', component: Profile, alias: '/user-profile' },
  ];
  ```

---

## **4. 路由守卫**

### **4.1 全局守卫**
- **beforeEach**: 在每次路由切换前触发。
```javascript
router.beforeEach((to, from, next) => {
  console.log('全局前置守卫');
  next(); // 必须调用 next()，否则路由不会跳转
});
```

- **afterEach**: 在每次路由切换后触发。
```javascript
router.afterEach((to, from) => {
  console.log('全局后置守卫');
});
```

### **4.2 路由独享守卫**
- 在路由配置中定义守卫。
```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      console.log('路由独享守卫');
      next();
    },
  },
];
```

### **4.3 组件内守卫**
- 在组件中定义守卫。
```javascript
export default {
  beforeRouteEnter(to, from, next) {
    console.log('组件内守卫 - 进入前');
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log('组件内守卫 - 路由更新');
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('组件内守卫 - 离开前');
    next();
  },
};
```

---

## **5. 路由模式**

### **5.1 History 模式**
- 使用 HTML5 的 `history.pushState`。
- URL 示例：`http://example.com/about`
- 配置：
  ```javascript
  createRouter({
    history: createWebHistory(),
    routes,
  });
  ```

### **5.2 Hash 模式**
- 使用 URL 的哈希部分（`#`）。
- URL 示例：`http://example.com/#/about`
- 配置：
  ```javascript
  createRouter({
    history: createWebHashHistory(),
    routes,
  });
  ```

---

## **6. 路由元信息**

- 路由可以携带元信息（`meta`），用于存储额外的数据。
```javascript
const routes = [
  { path: '/admin', component: Admin, meta: { requiresAuth: true } },
];
```

- 在守卫中访问元信息：
```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('需要权限验证');
  }
  next();
});
```

---

## **7. 路由懒加载**

- 使用动态 `import` 实现按需加载组件。
```javascript
const routes = [
  {
    path: '/about',
    component: () => import('./components/About.vue'),
  },
];
```

---

## **8. 路由过渡动画**

- 使用 Vue 的 `<transition>` 组件为路由切换添加动画。
```html
<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
```

---

## **9. 常见问题**

### **9.1 路由跳转方法**
- 使用 `<router-link>`：
  ```html
  <router-link to="/about">About</router-link>
  ```
- 使用编程式导航：
  ```javascript
  import { useRouter } from 'vue-router';

  const router = useRouter();
  router.push('/about');
  ```

### **9.2 动态参数变化时组件不刷新**
- 解决方法：使用 `beforeRouteUpdate` 监听参数变化。

---

## **10. 总结**

Vue Router 是 Vue.js 构建单页面应用的核心工具，提供了灵活的路由管理功能。通过动态路由、嵌套路由、路由守卫等特性，开发者可以轻松实现复杂的页面导航和权限控制。
