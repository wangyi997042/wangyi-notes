以下是 **qiankun 常用 API 总结**，涵盖了微前端的注册、加载、通信、沙箱隔离等核心功能，帮助快速掌握 qiankun 的使用技巧。

---

# qiankun 常用 API 总结

---

## **1. 微前端注册与启动**

### **1.1 注册子应用**
- **API**: `registerMicroApps`
- **作用**: 注册微前端子应用。

#### **示例**
```javascript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'reactApp', // 子应用名称
    entry: '//localhost:3000', // 子应用入口
    container: '#subapp-container', // 子应用挂载的 DOM 容器
    activeRule: '/react', // 激活规则
  },
  {
    name: 'vueApp',
    entry: '//localhost:8080',
    container: '#subapp-container',
    activeRule: '/vue',
  },
]);

start(); // 启动 qiankun
```

---

### **1.2 启动微前端**
- **API**: `start`
- **作用**: 启动微前端框架。

#### **示例**
```javascript
import { start } from 'qiankun';

start({
  sandbox: { strictStyleIsolation: true }, // 开启严格样式隔离
  prefetch: true, // 预加载子应用
});
```

---

## **2. 子应用生命周期**

### **2.1 自定义生命周期**
- **API**: 子应用中导出 `bootstrap`、`mount` 和 `unmount` 方法。
- **作用**: 定义子应用的生命周期钩子。

#### **示例**
```javascript
// 子应用入口文件
export async function bootstrap() {
  console.log('子应用初始化');
}

export async function mount(props) {
  console.log('子应用挂载', props);
}

export async function unmount() {
  console.log('子应用卸载');
}
```

---

## **3. 主应用与子应用通信**

### **3.1 主应用向子应用传递数据**
- **API**: `props` 参数
- **作用**: 主应用通过 `props` 向子应用传递数据。

#### **示例**
```javascript
registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:3000',
    container: '#subapp-container',
    activeRule: '/react',
    props: { user: { name: 'John Doe' } }, // 传递数据
  },
]);
```

子应用中接收数据：
```javascript
export async function mount(props) {
  console.log('接收到的主应用数据:', props.user);
}
```

---

### **3.2 子应用向主应用通信**
- **API**: `props.onGlobalStateChange` 和 `props.setGlobalState`
- **作用**: 使用全局状态管理实现主子应用通信。

#### **示例**
主应用中定义全局状态：
```javascript
import { initGlobalState } from 'qiankun';

const actions = initGlobalState({ user: { name: 'John Doe' } });

actions.onGlobalStateChange((state, prev) => {
  console.log('全局状态变化:', state, prev);
});

registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:3000',
    container: '#subapp-container',
    activeRule: '/react',
    props: { actions }, // 传递 actions
  },
]);
```

子应用中修改全局状态：
```javascript
export async function mount(props) {
  props.setGlobalState({ user: { name: 'Jane Doe' } });
}
```

---

## **4. 沙箱隔离**

### **4.1 开启沙箱**
- **API**: `sandbox` 配置
- **作用**: 隔离子应用的全局变量和样式。

#### **示例**
```javascript
start({
  sandbox: { strictStyleIsolation: true }, // 开启严格样式隔离
});
```

---

### **4.2 沙箱模式**
- **`legacy`**: 兼容模式，适用于不支持 Proxy 的浏览器。
- **`strictStyleIsolation`**: 严格样式隔离，通过 Shadow DOM 实现。
- **`experimentalStyleIsolation`**: 实验性样式隔离，通过动态添加 CSS 前缀实现。

---

## **5. 动态加载子应用**

### **5.1 加载子应用**
- **API**: `loadMicroApp`
- **作用**: 动态加载子应用。

#### **示例**
```javascript
import { loadMicroApp } from 'qiankun';

const app = loadMicroApp({
  name: 'reactApp',
  entry: '//localhost:3000',
  container: '#dynamic-container',
  props: { user: { name: 'John Doe' } },
});

// 卸载子应用
app.unmount();
```

---

## **6. 错误处理**

### **6.1 捕获子应用加载错误**
- **API**: `onError`
- **作用**: 捕获子应用加载过程中的错误。

#### **示例**
```javascript
import { registerMicroApps, start, addErrorHandler } from 'qiankun';

addErrorHandler((error) => {
  console.error('子应用加载错误:', error);
});

registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:3000',
    container: '#subapp-container',
    activeRule: '/react',
  },
]);

start();
```

---

## **7. 预加载子应用**

### **7.1 开启预加载**
- **API**: `prefetch` 配置
- **作用**: 在子应用激活前预加载资源。

#### **示例**
```javascript
start({
  prefetch: true, // 开启预加载
});
```

---

## **8. 调试工具**

### **8.1 开启日志**
- **API**: `start` 配置
- **作用**: 开启调试日志。

#### **示例**
```javascript
start({
  sandbox: true,
  prefetch: true,
  singular: true,
  logLevel: 'debug', // 开启调试日志
});
```

---
