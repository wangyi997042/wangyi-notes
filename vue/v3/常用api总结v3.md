
# Vue 3 常用 API 总结

---

## 1. **Vue 应用实例**
### **`createApp()`**
- **作用**: 创建 Vue 应用实例，初始化应用。
- **常见选项**:
  - `data`: 定义响应式数据。
  - `methods`: 定义方法。
  - `computed`: 定义计算属性。
  - `watch`: 监听数据变化。
  - `provide` 和 `inject`: 用于跨层级组件通信。
  - `directives`: 定义局部指令。

### **示例**
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

## 2. **模板语法**
### **插值表达式**
- **作用**: 在模板中动态绑定数据。
- **语法**: `{{ expression }}`

### **指令中的动态绑定**
- **动态绑定属性**: 使用 `v-bind` 或简写 `:attr`。
- **动态绑定事件**: 使用 `v-on` 或简写 `@event`。

### **示例**
```html
<div id="app">
  {{ message }}
  <a :href="url">点击这里</a>
  <button @click="greet">点击我</button>
</div>
<script>
import { createApp } from 'vue';

createApp({
  data() {
    return {
      message: 'Hello Vue 3!',
      url: 'https://example.com'
    };
  },
  methods: {
    greet() {
      alert(this.message);
    }
  }
}).mount('#app');
</script>
```

---

## 3. **Composition API**
### **核心概念**
- **`setup`**: Vue 3 的新特性，用于定义组件逻辑。
- **`ref` 和 `reactive`**: 创建响应式数据。
- **`computed`**: 定义计算属性。
- **`watch` 和 `watchEffect`**: 监听数据变化。
- **`provide` 和 `inject`**: 跨层级组件通信。

### **示例**
```javascript
import { ref, reactive, computed, watch } from 'vue';

export default {
  setup() {
    const count = ref(0); // 响应式数据
    const state = reactive({ message: 'Hello Vue 3!' });

    const doubleCount = computed(() => count.value * 2); // 计算属性

    watch(count, (newVal, oldVal) => {
      console.log(`Count changed from ${oldVal} to ${newVal}`);
    });

    function increment() {
      count.value++;
    }

    return {
      count,
      state,
      doubleCount,
      increment
    };
  }
};
```

---

## 4. **指令**
### **常用指令**
- **`v-bind`**: 动态绑定属性。
- **`v-model`**: 双向绑定表单输入。
- **`v-if` / `v-else-if` / `v-else`**: 条件渲染。
- **`v-for`**: 列表渲染。
- **`v-on`**: 绑定事件。
- **`v-show`**: 控制元素显示/隐藏。
- **`v-html`**: 渲染 HTML 字符串。

### **示例**
```html
<div v-if="isVisible">显示内容</div>
<ul>
  <li v-for="(item, index) in items" :key="index">{{ item }}</li>
</ul>
<input v-model="message" />
```

---

## 5. **组件**
### **父子组件通信**
- **父传子**: 使用 `props`。
- **子传父**: 使用 `emit`。
- **兄弟组件通信**: 使用 `provide` 和 `inject` 或状态管理工具（如 Pinia）。

### **示例**
```javascript
// 父组件
<template>
  <ChildComponent :message="parentMessage" @child-event="handleChildEvent" />
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  data() {
    return {
      parentMessage: '来自父组件的消息'
    };
  },
  methods: {
    handleChildEvent(msg) {
      console.log('收到子组件的消息:', msg);
    }
  },
  components: {
    ChildComponent
  }
};
</script>

// 子组件
<template>
  <div>
    {{ message }}
    <button @click="sendEvent">发送事件</button>
  </div>
</template>

<script>
export default {
  props: ['message'],
  methods: {
    sendEvent() {
      this.$emit('child-event', '子组件的消息');
    }
  }
};
</script>
```

---

## 6. **生命周期钩子**
### **常用钩子**
- **`onBeforeMount`**: 组件挂载之前。
- **`onMounted`**: 组件挂载完成。
- **`onBeforeUpdate`**: 数据更新之前。
- **`onUpdated`**: 数据更新完成。
- **`onBeforeUnmount`**: 组件卸载之前。
- **`onUnmounted`**: 组件卸载完成。

setup相当于 vue2 的 created

### **示例**
```javascript
import { onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载');
    });

    onUnmounted(() => {
      console.log('组件已卸载');
    });
  }
};
```

---

## 7. **Teleport**
### **作用**
将组件渲染到 DOM 的指定位置。

### **示例**
```html
<template>
  <teleport to="body">
    <div class="modal">这是一个模态框</div>
  </teleport>
</template>
```

---

## 8. **Suspense**
### **作用**
用于处理异步组件加载时的占位内容。

### **示例**
```html
<template>
  <suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>加载中...</div>
    </template>
  </suspense>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() =>
  import('./MyAsyncComponent.vue')
);

export default {
  components: {
    AsyncComponent
  }
};
</script>
```

---

## 9. **全局 API**
### **`app.config.globalProperties`**
- **作用**: 添加全局属性或方法。
- **示例**:
```javascript
const app = createApp({});
app.config.globalProperties.$myGlobalMethod = () => {
  console.log('这是一个全局方法');
};
```

---

## 10. **Pinia（推荐的状态管理工具）**
### **安装**
```bash
npm install pinia
```

### **使用**
```javascript
import { createPinia, defineStore } from 'pinia';

const pinia = createPinia();

const useStore = defineStore('main', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++;
    }
  }
});

const app = createApp(App);
app.use(pinia);

export default useStore;
```

---

