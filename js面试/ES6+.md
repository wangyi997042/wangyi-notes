以下是 **ES6+（包括 ES6、ES7、ES8、ES9、ES10 等）** 的知识总结，涵盖了每个重要的特性，包含原理解析和具体示例，帮助您全面掌握现代 JavaScript 的核心内容。

---

# ES6+ 知识总结

## 1. **变量声明**
### 1.1 `let` 和 `const`
- **原理**：
  - `let`：块级作用域变量，可以重新赋值。
  - `const`：块级作用域常量，声明后不可重新赋值。
  - 都不会提升到全局作用域，避免了 `var` 的变量提升问题。

#### 示例：
```javascript
if (true) {
    let a = 10;
    const b = 20;
    console.log(a, b); // 输出：10, 20
}
// console.log(a); // 报错：a is not defined
```

---

## 2. **模板字符串**
- **原理**：使用反引号（`` ` ``）定义字符串，支持多行字符串和嵌入变量。
- **特性**：
  - 嵌入变量：`${变量名}`。
  - 支持多行字符串。

#### 示例：
```javascript
const name = "John";
const greeting = `Hello, ${name}!
Welcome to ES6+!`;
console.log(greeting);
// 输出：
// Hello, John!
// Welcome to ES6+!
```

---

## 3. **箭头函数**
- **原理**：
  - 简化函数定义。
  - 不绑定自己的 `this`，继承自外层作用域。
- **语法**：
  - 单行返回值：`(参数) => 表达式`。
  - 多行代码块：`(参数) => { 代码块 }`。

#### 示例：
```javascript
const add = (a, b) => a + b;
console.log(add(2, 3)); // 输出：5

const greet = name => {
    console.log(`Hello, ${name}`);
};
greet("Alice"); // 输出：Hello, Alice
```

---

## 4. **解构赋值**
- **原理**：从数组或对象中提取值，赋值给变量。
- **特性**：
  - 支持默认值。
  - 支持嵌套解构。

#### 示例：
```javascript
// 数组解构
const [a, b, c = 3] = [1, 2];
console.log(a, b, c); // 输出：1, 2, 3

// 对象解构
const user = { name: "John", age: 30 };
const { name, age } = user;
console.log(name, age); // 输出：John, 30
```

---

## 5. **扩展运算符**
### 5.1 展开运算符（`...`）
- **原理**：将数组或对象展开为单独的元素。
#### 示例：
```javascript
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2); // 输出：[1, 2, 3, 4]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2); // 输出：{ a: 1, b: 2, c: 3 }
```

### 5.2 剩余参数
- **原理**：将剩余参数收集为数组。
#### 示例：
```javascript
function sum(...nums) {
    return nums.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3)); // 输出：6
```

---

## 6. **模块化**
- **原理**：通过 `import` 和 `export` 实现模块化。
- **特性**：
  - `export` 导出模块。
  - `import` 导入模块。

#### 示例：
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from './math.js';
console.log(add(2, 3)); // 输出：5
```

---

## 7. **Promise**
- **原理**：用于处理异步操作，避免回调地狱。
- **状态**：
  - `pending`：进行中。
  - `fulfilled`：已成功。
  - `rejected`：已失败。

#### 示例：
```javascript
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Data fetched"), 1000);
    });
};

fetchData().then(data => console.log(data)); // 输出：Data fetched
```

---

## 8. **`async/await`**
- **原理**：基于 Promise 的语法糖，用于简化异步代码。
#### 示例：
```javascript
const fetchData = async () => {
    const data = await new Promise(resolve => setTimeout(() => resolve("Data fetched"), 1000));
    console.log(data);
};
fetchData(); // 输出：Data fetched
```

---

## 9. **`Map` 和 `Set`**
### 9.1 `Map`
- **原理**：键值对集合，键可以是任意类型。
#### 示例：
```javascript
const map = new Map();
map.set("name", "John");
console.log(map.get("name")); // 输出：John
```

### 9.2 `Set`
- **原理**：值的集合，值唯一。
#### 示例：
```javascript
const set = new Set([1, 2, 2, 3]);
console.log(set); // 输出：Set { 1, 2, 3 }
```

---

## 10. **可选链操作符（`?.`）**
- **原理**：安全访问嵌套属性，避免 `undefined` 错误。
#### 示例：
```javascript
const user = { profile: { name: "John" } };
console.log(user.profile?.name); // 输出：John
console.log(user.address?.city); // 输出：undefined
```

---

## 11. **空值合并操作符（`??`）**
- **原理**：当左侧值为 `null` 或 `undefined` 时，返回右侧值。
#### 示例：
```javascript
const name = null;
console.log(name ?? "Default Name"); // 输出：Default Name
```

---

## 12. **`Array.prototype.includes`**
- **原理**：判断数组是否包含某个值。
#### 示例：
```javascript
const arr = [1, 2, 3];
console.log(arr.includes(2)); // 输出：true
```

---

## 13. **`Object.entries` 和 `Object.values`**
- **原理**：
  - `Object.entries`：返回对象的键值对数组。
  - `Object.values`：返回对象的值数组。

#### 示例：
```javascript
const obj = { a: 1, b: 2 };
console.log(Object.entries(obj)); // 输出：[["a", 1], ["b", 2]]
console.log(Object.values(obj)); // 输出：[1, 2]
```

---

## 14. **`Array.prototype.flat`**
- **原理**：将嵌套数组展开为一维数组。
#### 示例：
```javascript
const arr = [1, [2, [3, 4]]];
console.log(arr.flat(2)); // 输出：[1, 2, 3, 4]
```

---
