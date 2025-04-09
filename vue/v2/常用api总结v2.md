

# Vue 2 常用 API 总结

---

## 1. **Vue 实例**
### **`new Vue()`**
- **作用**: 创建 Vue 实例，初始化应用。
- **常见选项**:
  - `el`: 指定挂载的 DOM 元素。
  - `data`: 定义响应式数据。
  - `methods`: 定义方法。
  - `computed`: 定义计算属性。
  - `watch`: 监听数据变化。
  - `template`: 定义模板。
  - `render`: 渲染函数，用于动态生成 DOM。
  - `props`: 接收父组件传递的数据。
  - `provide` 和 `inject`: 用于跨层级组件通信。
  - `filters`: 定义局部过滤器。
  - `directives`: 定义局部指令。

### **示例**
```javascript
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    count: 0
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
  },
  render(h) {
    return h('div', [
      h('p', this.message),
      h('button', { on: { click: this.increment } }, 'Increment')
    ]);
  }
});
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
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    url: 'https://example.com'
  },
  methods: {
    greet() {
      alert(this.message);
    }
  }
});
</script>
```

---

## 3. **指令**
### **常用指令**
- **`v-bind`**: 动态绑定属性。
- **`v-model`**: 双向绑定表单输入。
- **`v-if` / `v-else-if` / `v-else`**: 条件渲染。
- **`v-for`**: 列表渲染。
- **`v-on`**: 绑定事件。
- **`v-show`**: 控制元素显示/隐藏。
- **`v-html`**: 渲染 HTML 字符串。
- **`v-cloak`**: 防止模板闪烁。
- **`v-pre`**: 跳过模板编译。
- **`v-once`**: 只渲染一次。

### **补充指令的高级用法**
- **`v-for` 的索引**:
  ```html
  <ul>
    <li v-for="(item, index) in items" :key="index">{{ index }}: {{ item }}</li>
  </ul>
  ```
- **`v-bind` 绑定多个属性**:
  ```html
  <div v-bind="{ id: someId, class: someClass }"></div>
  ```

---

## 4. **计算属性和侦听器**
### **计算属性 (`computed`)**
- **作用**: 根据已有数据计算新数据，具有缓存功能。
- **特点**: 只有依赖的数据发生变化时才会重新计算。

### **侦听器 (`watch`)**
- **作用**: 监听数据变化并执行回调。
- **特点**: 适用于异步操作或需要在数据变化时执行复杂逻辑的场景。

### **示例**
```javascript
new Vue({
  el: '#app',
  data: {
    number: 10
  },
  computed: {
    doubleNumber() {
      return this.number * 2;
    }
  },
  watch: {
    number(newVal) {
      console.log('number 改变为:', newVal);
    }
  }
});
```

---

## 5. **组件**
### **父子组件通信**
- **父传子**: 使用 `props`。
- **子传父**: 使用 `$emit`。
- **兄弟组件通信**: 使用事件总线或 Vuex。

### **插槽**
- **默认插槽**: `<slot></slot>`。
- **具名插槽**: `<slot name="header"></slot>`。
- **作用域插槽**: 用于父组件访问子组件的数据。

### **示例**
```html
<div id="app">
  <child-component :message="parentMessage" @child-event="handleChildEvent"></child-component>
</div>

<script>
Vue.component('child-component', {
  props: ['message'],
  template: '<div>{{ message }} <button @click="sendEvent">发送事件</button></div>',
  methods: {
    sendEvent() {
      this.$emit('child-event', '子组件的消息');
    }
  }
});

new Vue({
  el: '#app',
  data: {
    parentMessage: '来自父组件的消息'
  },
  methods: {
    handleChildEvent(msg) {
      console.log('收到子组件的消息:', msg);
    }
  }
});
</script>
```

---

## 6. **生命周期钩子**
### **常用钩子**
- **`beforeCreate`**: 实例初始化之前。
- **`created`**: 实例创建完成。
- **`beforeMount`**: 挂载之前。
- **`mounted`**: 挂载完成。
- **`beforeUpdate`**: 数据更新之前。
- **`updated`**: 数据更新完成。
- **`beforeDestroy`**: 实例销毁之前。
- **`destroyed`**: 实例销毁完成。

### **补充钩子用法**
- **异步数据加载**:
  ```javascript
  created() {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        this.items = data;
      });
  }
  ```

---

## 7. **自定义指令**
### **定义自定义指令**
- **全局指令**:
  ```javascript
  Vue.directive('focus', {
    inserted(el) {
      el.focus();
    }
  });
  ```

- **局部指令**:
  ```javascript
  new Vue({
    el: '#app',
    directives: {
      focus: {
        inserted(el) {
          el.focus();
        }
      }
    }
  });
  ```

### **使用示例**
```html
<input v-focus />
```

---

## 8. **过滤器**
### **定义过滤器**
- **全局过滤器**:
  ```javascript
  Vue.filter('capitalize', function(value) {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  });
  ```

- **局部过滤器**:
  ```javascript
  new Vue({
    el: '#app',
    filters: {
      capitalize(value) {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  });
  ```

### **使用示例**
```html
<p>{{ message | capitalize }}</p>
```

---

## 9. **事件修饰符**
- **`.stop`**: 阻止事件冒泡。
- **`.prevent`**: 阻止默认行为。
- **`.capture`**: 使用捕获模式。
- **`.self`**: 只触发自身事件。
- **`.once`**: 事件只触发一次。

### **示例**
```html
<button @click.stop="handleClick">阻止冒泡</button>
```
