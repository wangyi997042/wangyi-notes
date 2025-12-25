# Vue 3 常用 API 完整整理

---

## 1. **创建应用 (createApp)**  
### 核心概念  
- `createApp()`：创建 Vue 应用实例并挂载到 DOM。  
- 支持 `data`、`methods`、`computed`、`watch` 等选项。  

### 示例  
```javascript
import { createApp } from 'vue';

const app = createApp({
  data() {
    return {
      message: 'Hello Vue 3!',
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    }
  },
  watch: {
    count(newVal, oldVal) {
      console.log(`Count changed from ${oldVal} to ${newVal}`);
    }
  }
});

app.mount('#app');
```

---

## 2. **响应式数据 (ref & reactive)**  
### 核心概念  
- `ref`：包装任意类型（基本类型/对象），需通过 `.value` 访问。  
- `reactive`：仅处理对象类型，直接访问属性。  

### 示例  
```javascript
import { ref, reactive } from 'vue';

// 基本类型用 ref
const count = ref(0);
const message = ref('Hello');

// 对象类型用 reactive
const user = reactive({
  name: 'Alice',
  age: 25
});

// 重新赋值对象时，reactive 会丢失响应性
const newUser = reactive({ name: 'Bob' });
user = newUser; // ❌ 错误！响应性失效

// 正确更新 reactive 对象
user.name = 'Charlie'; // ✅ 正确更新
```

---

## 3. **计算属性 (computed)**  
### 核心概念  
- `computed`：基于响应式数据派生新值，自动缓存结果。  

### 示例  
```javascript
import { ref, computed } from 'vue';

const count = ref(0);

// 计算属性：返回 count 的两倍
const doubleCount = computed(() => count.value * 2);

// 在模板中直接使用
// <div>Double: {{ doubleCount }}</div>

function increment() {
  count.value++; // doubleCount 自动更新
}
```

---

## 4. **数据监听 (watch & watchEffect)**  
### 核心概念  
- `watch`：显式监听特定数据变化，支持获取新旧值。  
- `watchEffect`：自动追踪依赖，无需指定监听源。  

### 示例  
```javascript
import { ref, watch, watchEffect } from 'vue';

const count = ref(0);

// 显式监听 count 变化
watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`);
});

// 自动追踪依赖
watchEffect(() => {
  console.log('Count is now:', count.value);
  // 修改 count 会触发重新执行
});
```

---

## 5. **跨组件通信 (provide & inject)**  
### 核心概念  
- `provide`：祖先组件提供数据/方法。  
- `inject`：子孙组件注入数据/方法。  

### 示例  
```javascript
// 祖先组件
import { provide, ref } from 'vue';

export default {
  setup() {
    const theme = ref('light');
    provide('theme', theme);
    provide('toggleTheme', () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
    });
  }
};

// 子孙组件
import { inject } from 'vue';

export default {
  setup() {
    const theme = inject('theme');
    const toggleTheme = inject('toggleTheme');
    return { theme, toggleTheme };
  }
};
```

---

## 6. **<script setup> 语法糖**  
### 核心概念  
- `<script setup>`：Vue 3 的语法糖，简化组件编写，减少样板代码。  
- 自动暴露变量、函数、组件给模板使用。  

### 示例  
```vue
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="increment">{{ count }}</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 自动暴露给模板
const count = ref(0);
const message = ref('Hello Vue 3!');

const doubleCount = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>
```

---

## 7. **组件通信 (defineProps & defineEmits)**  
### 核心概念  
- `defineProps`：声明组件 props，支持类型推导。  
- `defineEmits`：声明组件 emits，支持类型推导。  

### 示例  
```vue
<!-- 父组件 -->
<template>
  <ChildComponent :count="count" @increment="increment" />
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const count = ref(0);
const increment = () => count.value++;
</script>

<!-- 子组件 -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="handleClick">Increment</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['increment']);

const handleClick = () => {
  emit('increment');
};
</script>
```

---

## 8. **组件暴露 (defineExpose)**  
### 核心概念  
- `defineExpose`：在 `<script setup>` 中暴露特定属性给父组件。  
- 用于父组件通过 `ref` 访问子组件内部方法或数据。  

### 示例  
```vue
<!-- 子组件 -->
<template>
  <div>子组件</div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

// 暴露给父组件
defineExpose({ count, increment });
</script>

<!-- 父组件 -->
<template>
  <div>
    <ChildComponent ref="childRef" />
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ChildComponent from './ChildComponent.vue';

const childRef = ref(null);

const increment = () => {
  childRef.value.increment();
};

onMounted(() => {
  console.log('Child count:', childRef.value.count);
});
</script>
```

---

## 9. **生命周期钩子 (onMounted, onUnmounted)**  
### 核心概念  
- Vue 3 提供组合式 API 的生命周期钩子，需从 `vue` 导入。  
- 支持 `onBeforeMount`、`onMounted`、`onBeforeUpdate`、`onUpdated`、`onBeforeUnmount`、`onUnmounted`。  

### 示例  
```javascript
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

export default {
  setup() {
    onBeforeMount(() => {
      console.log('Before mounting');
    });
    
    onMounted(() => {
      console.log('Mounted');
    });
    
    onBeforeUpdate(() => {
      console.log('Before updating');
    });
    
    onUpdated(() => {
      console.log('Updated');
    });
    
    onBeforeUnmount(() => {
      console.log('Before unmounting');
    });
    
    onUnmounted(() => {
      console.log('Unmounted');
    });
  }
};
```

---

## 10. **自定义指令 (directives)**  
### 核心概念  
- 全局注册：`app.directive('name', { mounted() { ... } })`  
- 局部注册：在组件中使用 `directives` 选项  
- 指令钩子：`created`、`mounted`、`updated`、`beforeUnmount`、`unmounted`  

### 示例  
```javascript
// 全局注册高亮指令
const app = createApp({});
app.directive('highlight', {
  mounted(el, binding) {
    el.style.color = binding.value || 'yellow';
  }
});

// 局部注册
export default {
  directives: {
    'capitalize': {
      mounted(el) {
        el.textContent = el.textContent.toUpperCase();
      }
    }
  }
};
```

---

## 11. **keep-alive 缓存组件**  
### 核心概念  
- 缓存动态组件状态，避免重复渲染。  
- 配合 `include`、`exclude` 控制缓存范围。  

### 示例  
```vue
<template>
  <div>
    <keep-alive :include="['Tab1', 'Tab2']">
      <component :is="currentTab" />
    </keep-alive>
    <button @click="currentTab = 'Tab1'">Tab 1</button>
    <button @click="currentTab = 'Tab2'">Tab 2</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Tab1 from './Tab1.vue';
import Tab2 from './Tab2.vue';

const currentTab = ref('Tab1');
</script>
```

---

## 12. **Vue Router 相关 API**  
### 核心概念  
- `useRoute`：获取当前路由信息  
- `useRouter`：获取路由实例，用于编程式导航  
- `onBeforeRouteEnter`：路由进入前的守卫  
- `onBeforeRouteLeave`：路由离开前的守卫  

### 示例  
```vue
<template>
  <div>
    <h1>User: {{ route.params.id }}</h1>
    <button @click="goBack">Back</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
```

```vue
<template>
  <div>
    <h1>Admin Page</h1>
  </div>
</template>

<script setup>
import { onBeforeRouteEnter, onBeforeRouteLeave } from 'vue-router';

onBeforeRouteEnter((to, from, next) => {
  if (localStorage.getItem('token')) {
    next();
  } else {
    next('/login');
  }
});

onBeforeRouteLeave((to, from, next) => {
  const answer = window.confirm('Are you sure you want to leave?');
  if (answer) {
    next();
  } else {
    next(false);
  }
});
</script>
```

---

## 13. **Pinia 状态管理**  
### 核心概念  
- `defineStore`：定义状态管理模块  
- `state`：定义全局状态  
- `getters`：定义派生状态  
- `actions`：定义同步或异步操作  
- `storeToRefs`：将 store 中的响应式状态解构为独立的 refs  

### 示例  
```javascript
// store/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    isLoggedIn: false
  }),
  getters: {
    userInfo: (state) => `${state.name} (${state.email})`,
    isUserLoggedIn: (state) => state.isLoggedIn
  },
  actions: {
    login(name, email) {
      this.name = name;
      this.email = email;
      this.isLoggedIn = true;
    },
    async fetchUser() {
      const response = await fetch('/api/user');
      const data = await response.json();
      this.name = data.name;
      this.email = data.email;
    }
  }
});
```

```vue
<template>
  <div>
    <p v-if="isUserLoggedIn">Welcome, {{ userInfo }}</p>
    <button v-if="!isUserLoggedIn" @click="login">Login</button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { name, email, isLoggedIn } = storeToRefs(userStore);
const userInfo = userStore.userInfo;
const isUserLoggedIn = userStore.isUserLoggedIn;

const login = () => {
  userStore.login('John Doe', 'john@example.com');
};
</script>
```

---

## 14. **Composition API 高级特性**  
### 核心概念  
- `toRefs`：将 `reactive` 对象的属性解构为独立的 `ref`  
- `toRef`：将 `reactive` 对象的单个属性转换为 `ref`  
- `customRef`：自定义 `ref`，实现复杂的响应式逻辑  
- `shallowRef`：浅层响应式，只追踪 `.value` 的替换  
- `shallowReactive`：浅层响应式，只追踪根级别属性变化  
- `readonly`：将整个对象转换为只读状态  
- `shallowReadonly`：只对顶层属性设置只读  

### 示例  
```javascript
import { reactive, toRefs, toRef, customRef, shallowRef, shallowReactive, readonly, shallowReadonly } from 'vue';

// toRefs 示例
const state = reactive({
  count: 0,
  message: 'Hello'
});

const { count, message } = toRefs(state);

// 修改 count 会触发更新
count.value++;

// toRef 示例
const messageRef = toRef(state, 'message');

// customRef 示例
function useDebouncedRef(value, delay = 300) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      }
    };
  });
}

// shallowRef 示例
const deepState = ref({ count: 0 });
const shallowState = shallowRef({ count: 0 });

deepState.value.count++; // 触发更新
shallowState.value.count++; // 不触发更新
shallowState.value = { count: 2 }; // 触发更新

// shallowReactive 示例
const shallowUser = shallowReactive({
  name: 'Alice',
  details: { age: 25 }
});

shallowUser.details.age = 26; // 不触发更新
shallowUser.name = 'Bob'; // 触发更新

// readonly 示例
const userData = reactive({ name: 'User', details: { job: 'Developer' } });
const lockedUserData = readonly(userData);
lockedUserData.name = 'New Name'; // ❌ 报错

// shallowReadonly 示例
const shallowLockedData = shallowReadonly(userData);
shallowLockedData.name = 'New Name'; // ❌ 报错
shallowLockedData.details.job = 'Designer'; // ✅ 不报错
```

---

## 15. **useSlots & useAttrs**  
### 核心概念  
- `useSlots`：访问组件的插槽内容  
- `useAttrs`：访问非 props 的 attribute  

### 示例  
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <slot name="header"></slot>
    <slot name="default"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import { useSlots, useAttrs } from 'vue';

const slots = useSlots();
const attrs = useAttrs();

const title = attrs.title;
</script>
```

---

## 16. **插件系统 (app.use)**  
### 核心概念  
- 插件用于扩展 Vue 功能，如 Vue Router、Pinia  
- 插件需实现 `install(app)` 方法  

### 示例  
```javascript
// my-plugin.js
const MyPlugin = {
  install(app, options) {
    // 添加全局方法
    app.config.globalProperties.$myMethod = () => {
      console.log('This is a global method', options);
    };
    
    // 添加全局指令
    app.directive('focus', {
      mounted(el) {
        el.focus();
      }
    });
    
    // 添加全局组件
    app.component('MyButton', {
      template: '<button class="btn">{{ text }}</button>',
      props: {
        text: {
          type: String,
          default: 'Button'
        }
      }
    });
  }
};

// main.js
import { createApp } from 'vue';
import App from './App.vue';
import MyPlugin from './my-plugin';

const app = createApp(App);
app.use(MyPlugin, { theme: 'dark' });
app.mount('#app');
```

---

## 17. **异步组件 (Suspense & defineAsyncComponent)**  
### 核心概念  
- `defineAsyncComponent`：定义异步组件  
- `Suspense`：处理异步组件加载时的占位内容  
- `loadingComponent`：加载状态组件  
- `errorComponent`：错误状态组件  
- `delay`：延迟显示加载状态  
- `timeout`：超时时间  

### 示例  
```javascript
import { defineAsyncComponent } from 'vue';

// 无加载状态的异步组件
const AsyncComponent = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
);

// 带加载状态的异步组件
const AsyncComponentWithLoading = defineAsyncComponent({
  loader: () => import('./components/AsyncComponent.vue'),
  loadingComponent: () => import('./components/LoadingComponent.vue'),
  errorComponent: () => import('./components/ErrorComponent.vue'),
  delay: 200,
  timeout: 3000
});
```

```vue
<template>
  <div>
    <Suspense>
      <template #default>
        <AsyncComponentWithLoading />
      </template>
      <template #fallback>
        <div class="loading">Loading...</div>
      </template>
    </Suspense>
  </div>
</template>
```

---

## 18. **性能优化建议**  
### 核心概念  
- `v-once`：静态内容只渲染一次  
- `key`：在列表渲染中使用 `key` 提高性能  
- 事件节流与防抖：限制高频事件的触发次数  

### 示例  
```vue
<template>
  <div>
    <!-- 静态内容只渲染一次 -->
    <div v-once>{{ staticContent }}</div>
    
    <!-- 列表渲染使用 key -->
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.text }}</li>
    </ul>
    
    <!-- 事件防抖 -->
    <input v-model="searchQuery" @input="debouncedSearch" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import _ from 'lodash';

const staticContent = 'This content is static';
const items = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' }
]);
const searchQuery = ref('');

// 防抖搜索
const debouncedSearch = _.debounce((value) => {
  console.log('Searching for:', value);
}, 300);
</script>
```

---

## 19. **Vue 3 与 Vue 2 的主要区别**  

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| **响应式系统** | 基于 `Object.defineProperty` | 基于 `Proxy` |
| **Composition API** | 无 | 有 |
| **模板编译** | 无优化 | 优化编译 |
| **Tree-shaking** | 不支持 | 支持 |
| **类型支持** | 一般 | 与 TypeScript 集成更好 |
| **组件通信** | props & events | props & events, provide & inject |
| **状态管理** | Vuex | Pinia |

### 示例 (Vue 2 vs Vue 3)  
```javascript
// Vue 2
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};

// Vue 3
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    
    const increment = () => {
      count.value++;
    };
    
    return { count, increment };
  }
};
```

---

## 20. **Vue 3 项目结构建议**  

```
src/
├── assets/
├── components/
│   ├── Header.vue
│   ├── Footer.vue
│   └── layout/
│       ├── MainLayout.vue
│       └── AdminLayout.vue
├── views/
│   ├── HomeView.vue
│   ├── AboutView.vue
│   └── AdminView.vue
├── store/
│   └── userStore.js
├── router/
│   └── index.js
├── utils/
│   ├── api.js
│   └── helpers.js
└── App.vue
```

---

## 21. **Vue 3 常见问题与解决方案**  

### 1. **如何在组件中使用 `this`？**
- 在 Composition API 中，`this` 不再可用
- 使用 `setup` 选项，通过返回值暴露给模板

### 2. **如何处理异步数据？**
- 使用 `async/await` 在 `setup` 中
- 使用 `ref` 或 `reactive` 管理状态

### 3. **如何在组件中使用全局方法？**
- 使用 `app.config.globalProperties` 注册
- 在 `setup` 中通过 `inject` 获取

### 4. **如何实现组件通信？**
- 父子组件：`props` 和 `emits`
- 跨层级：`provide` 和 `inject`
- 全局状态：`Pinia` 或 `Vuex`

---

## 22. **Vue 3 与 Vue 2 的迁移指南**  

### 1. **响应式系统变化**
- Vue 3 使用 `Proxy` 替代 `Object.defineProperty`
- 无需 `Vue.set` 和 `Vue.delete`，直接修改响应式对象

### 2. **选项式 API 与组合式 API**
- Vue 3 推荐使用组合式 API
- 选项式 API 仍然支持，但组合式 API 更灵活

### 3. **生命周期钩子变化**
- `beforeCreate` 和 `created`：不再需要，`setup` 代替
- `beforeDestroy` 和 `destroyed`：改为 `beforeUnmount` 和 `unmounted`

### 4. **模板变化**
- `v-model` 现在支持多个绑定
- `v-on` 事件修饰符支持 `.self` 和 `.once`

### 5. **插件系统变化**
- 插件必须实现 `install` 方法
- 不再需要 `Vue.use()`

---

## 23. **Vue 3 最佳实践**  

### 1. **使用 `<script setup>` 语法糖**
- 简化组件编写
- 减少样板代码

### 2. **使用 Pinia 代替 Vuex**
- 更轻量、更易用
- 与 Composition API 集成更好

### 3. **合理使用 `shallowRef` 和 `shallowReactive`**
- 优化复杂对象的性能
- 减少不必要的响应式追踪

### 4. **使用 `useRoute` 和 `useRouter` 管理路由**
- 代码更清晰、可维护性更好

### 5. **使用 `v-once` 优化静态内容**
- 减少不必要的渲染

### 6. **使用 `key` 优化列表渲染**
- 提高性能，避免 DOM 重复

---
