### **`Object.defineProperty` 与 `Proxy` 的对比**

#### **1. 功能对比**
| 特性                          | `Object.defineProperty`                           | `Proxy`                                   |
|-------------------------------|--------------------------------------------------|-------------------------------------------|
| **支持的操作**                | 只能劫持对象的属性的 `getter` 和 `setter`         | 可以劫持几乎所有操作（如属性访问、删除、函数调用等） |
| **深度监听**                  | 需要递归遍历对象的每个属性，手动实现深度监听       | 原生支持深度监听，无需递归遍历             |
| **新增/删除属性监听**         | 无法监听新增或删除属性                           | 可以监听新增和删除属性                     |
| **数组操作监听**              | 无法监听数组的索引变化                           | 可以监听数组的索引变化                     |
| **性能**                      | 对于深层嵌套对象，递归遍历会导致性能问题          | 性能更优，适合复杂对象                     |
| **兼容性**                    | 支持 IE9 及以上                                  | 不支持 IE，需现代浏览器支持                |

---

#### **2. 使用场景**
- **`Object.defineProperty`**:
  - 适用于简单的对象属性监听。
  - Vue 2 使用 `Object.defineProperty` 实现响应式系统，但需要递归遍历对象，手动处理新增属性和数组操作。

- **`Proxy`**:
  - 适用于复杂对象的全面监听。
  - Vue 3 使用 `Proxy` 实现响应式系统，解决了 Vue 2 中的性能问题和监听局限性。

---

#### **3. 示例对比**

##### **`Object.defineProperty` 示例**
```javascript
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log(`获取属性 ${key}: ${val}`);
      return val;
    },
    set(newVal) {
      console.log(`设置属性 ${key}: ${newVal}`);
      if (newVal !== val) {
        val = newVal;
        // 通知更新
      }
    },
  });
}

const data = {};
defineReactive(data, 'message', 'Hello Vue');
console.log(data.message); // 获取属性 message: Hello Vue
data.message = 'Hello World'; // 设置属性 message: Hello World
```

##### **`Proxy` 示例**
```javascript
const data = new Proxy(
  { message: 'Hello Vue' },
  {
    get(target, key) {
      console.log(`获取属性 ${key}: ${target[key]}`);
      return target[key];
    },
    set(target, key, value) {
      console.log(`设置属性 ${key}: ${value}`);
      target[key] = value;
      // 通知更新
      return true;
    },
  }
);

console.log(data.message); // 获取属性 message: Hello Vue
data.message = 'Hello World'; // 设置属性 message: Hello World
```

---

#### **4. 优缺点对比**

| 特性                          | `Object.defineProperty`                           | `Proxy`                                   |
|-------------------------------|--------------------------------------------------|-------------------------------------------|
| **优点**                      | 兼容性好，支持较老的浏览器                        | 功能强大，支持全面的对象操作监听           |
| **缺点**                      | 无法监听新增/删除属性，需递归处理深层对象          | 不支持 IE 浏览器                          |

---

#### **5. Vue 的应用**

- **Vue 2**:
  - 使用 `Object.defineProperty` 实现响应式系统。
  - 存在以下问题：
    - 无法监听新增/删除属性。
    - 数组操作需要特殊处理。
    - 深层嵌套对象需要递归遍历，性能较差。

- **Vue 3**:
  - 使用 `Proxy` 实现响应式系统。
  - 优势：
    - 支持新增/删除属性监听。
    - 支持数组索引和长度变化监听。
    - 性能更优，无需递归遍历。

---

#### **6. 总结**

- 如果需要兼容老旧浏览器（如 IE），可以选择 `Object.defineProperty`。
- 如果使用现代浏览器，推荐使用 `Proxy`，其功能更强大，性能更优，代码更简洁。