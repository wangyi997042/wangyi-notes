### **React 常用 Hook 介绍**

React 的 Hook 是在函数组件中使用状态和生命周期的方式。以下是 React 中常用的 Hook 及其详细介绍：

---

## **1. `useState`**
- **作用**: 用于在函数组件中声明状态变量。
- **特点**:
  - 接受一个初始状态值作为参数。
  - 返回一个状态值和更新状态的函数。
  - 每次状态更新都会触发组件重新渲染。
- **使用场景**:
  - 管理组件内部的状态，例如表单输入值、计数器等。

### **示例**
```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## **2. `useEffect`**
- **作用**: 用于处理副作用，例如数据获取、订阅、手动 DOM 操作等。
- **特点**:
  - 接受一个回调函数和依赖数组。
  - 依赖数组为空时，回调函数只在组件挂载和卸载时执行。
  - 依赖数组中指定的变量发生变化时，回调函数会重新执行。
- **使用场景**:
  - 数据获取、订阅事件、清理操作等。

### **示例**
```javascript
import React, { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(interval); // 清理定时器
  }, []);

  return <p>Timer: {count}</p>;
}
```

---

## **3. `useContext`**
- **作用**: 用于在组件树中共享状态，而无需通过 props 一层层传递。
- **特点**:
  - 与 `React.createContext` 配合使用。
  - 直接访问上下文中的值。
- **使用场景**:
  - 全局状态管理，例如主题、用户信息等。

### **示例**
```javascript
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}
```

---

## **4. `useReducer`**
- **作用**: 用于管理复杂状态逻辑，类似于 Redux 的 reducer。
- **特点**:
  - 接受一个 reducer 函数和初始状态。
  - 返回当前状态和 dispatch 函数。
- **使用场景**:
  - 状态逻辑复杂或多个状态相互关联时。

### **示例**
```javascript
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}
```

---

## **5. `useRef`**
- **作用**: 用于访问 DOM 元素或保存可变值。
- **特点**:
  - 返回一个可变的 `ref` 对象，其 `.current` 属性可以存储值。
  - 更新 `ref` 的值不会触发组件重新渲染。
- **使用场景**:
  - 获取 DOM 元素的引用。
  - 保存组件生命周期内的可变值。

### **示例**
```javascript
import React, { useRef } from 'react';

function InputFocus() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

---

## **6. `useMemo`**
- **作用**: 用于缓存计算结果，避免不必要的重复计算。
- **特点**:
  - 接受一个工厂函数和依赖数组。
  - 只有依赖数组中的值发生变化时，才会重新计算。
  - 返回缓存的值。
- **使用场景**:
  - 优化性能，避免在每次渲染时重复执行昂贵的计算。

### **示例**
```javascript
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ num }) {
  const result = useMemo(() => {
    console.log('Calculating...');
    return num * 2;
  }, [num]);

  return <p>Result: {result}</p>;
}
```

---

## **7. `useCallback`**
- **作用**: 用于缓存函数实例，避免不必要的函数重新创建。
- **特点**:
  - 接受一个回调函数和依赖数组。
  - 只有依赖数组中的值发生变化时，才会返回新的函数实例。
  - 返回缓存的函数。
- **使用场景**:
  - 优化性能，避免子组件因父组件传递的函数引用变化而重新渲染。

### **示例**
```javascript
import React, { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return <Child onClick={increment} />;
}

function Child({ onClick }) {
  console.log('Child rendered');
  return <button onClick={onClick}>Increment</button>;
}
```

---

## **8. `useId`**
- **作用**: 用于生成稳定的唯一 ID，适合在服务端渲染（SSR）和客户端渲染中使用。
- **特点**:
  - 避免手动生成 ID。
- **使用场景**:
  - 表单元素的 `id` 和 `label` 关联。

### **示例**
```javascript
import React, { useId } from 'react';

function Form() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Name</label>
      <input id={id} type="text" />
    </div>
  );
}
```

---

## **9. `useTransition`**
- **作用**: 用于处理并发更新，标记非紧急的状态更新。
- **特点**:
  - 返回一个布尔值 `isPending` 和一个函数 `startTransition`。
  - 标记的更新会被延迟处理。
- **使用场景**:
  - 优化用户体验，避免界面卡顿。

### **示例**
```javascript
import React, { useState, useTransition } from 'react';

function App() {
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      const newList = Array(10000).fill(0).map((_, i) => i);
      setList(newList);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Generate List</button>
      {isPending ? <p>Loading...</p> : <ul>{list.map(i => <li key={i}>{i}</li>)}</ul>}
    </div>
  );
}
```

---

## **总结**

| Hook 名称       | 作用                                   | 使用场景                           |
|------------------|----------------------------------------|------------------------------------|
| `useState`       | 管理状态                               | 组件内部状态管理                   |
| `useEffect`      | 处理副作用                             | 数据获取、订阅事件、清理操作       |
| `useContext`     | 使用上下文                             | 全局状态共享                       |
| `useReducer`     | 管理复杂状态逻辑                       | 替代 Redux 的轻量状态管理          |
| `useRef`         | 获取 DOM 或保存可变值                  | 访问 DOM 元素或保存组件生命周期内的值 |
| `useMemo`        | 缓存计算结果                           | 优化性能，避免重复计算             |
| `useCallback`    | 缓存函数实例                           | 避免子组件因函数引用变化而重新渲染 |
| `useId`          | 生成唯一 ID                            | 表单元素的 ID 关联                 |
| `useTransition`  | 标记非紧急更新                         | 优化用户体验，避免界面卡顿         |

通过合理使用这些 Hook，可以更高效地管理状态、优化性能并提升开发体验。

找到具有 1 个许可证类型的类似代码


# React 中 `useCallback` 和 `useMemo` 的区别

## 1. **`useCallback`**
### **作用**
- `useCallback` 用于缓存函数实例，避免因父组件重新渲染导致子组件不必要的重新渲染。
- 它返回的是**缓存的函数**。

### **使用场景**
- 当一个函数被传递给子组件时，使用 `useCallback` 可以避免子组件因函数引用变化而重新渲染。

### **实现原理**
- `useCallback` 会比较依赖数组中的值是否发生变化。如果依赖未变化，则返回缓存的函数；否则，返回新的函数实例。

### **代码实现**
以下是 `useCallback` 的简单实现：

```javascript
function useCallback(callback, dependencies) {
  if (hookState[hookIndex]) { // 不是第一次调用
    const [lastCallback, lastDependencies] = hookState[hookIndex];
    const same = dependencies.every((item, index) => item === lastDependencies[index]);
    if (same) { // 依赖没有改变
      hookIndex++;
      return lastCallback;
    } else {
      hookState[hookIndex++] = [callback, dependencies];
      return callback;
    }
  } else { // 第一次调用
    hookState[hookIndex++] = [callback, dependencies];
    return callback;
  }
}
```

### **使用示例**
```javascript
const handleClick = useCallback(() => {
  setName(num + 1);
}, [num]);
```

---

## 2. **`useMemo`**
### **作用**
- `useMemo` 用于缓存计算结果，避免每次渲染时重复执行昂贵的计算。
- 它返回的是**缓存的值**。

### **使用场景**
- 当某些计算过程较为复杂且依赖于特定变量时，使用 `useMemo` 可以优化性能。

### **实现原理**
- `useMemo` 会比较依赖数组中的值是否发生变化。如果依赖未变化，则返回缓存的值；否则，重新计算并缓存新的值。

### **代码实现**
以下是 `useMemo` 的简单实现：

```javascript
function useMemo(factory, dependencies) {
  if (hookState[hookIndex]) { // 不是第一次调用
    const [lastValue, lastDependencies] = hookState[hookIndex];
    const same = dependencies.every((item, index) => item === lastDependencies[index]);
    if (same) { // 依赖没有改变
      hookIndex++;
      return lastValue;
    } else {
      const newValue = factory();
      hookState[hookIndex++] = [newValue, dependencies];
      return newValue;
    }
  } else { // 第一次调用
    const newValue = factory();
    hookState[hookIndex++] = [newValue, dependencies];
    return newValue;
  }
}
```

### **使用示例**
```javascript
const data = useMemo(() => ({ num }), [num]);
```

---

## 3. **`useCallback` 和 `useMemo` 的区别**
| 特性              | `useCallback`                     | `useMemo`                     |
|-------------------|------------------------------------|--------------------------------|
| 返回值            | 缓存的函数                        | 缓存的值                      |
| 使用场景          | 缓存函数，避免子组件不必要的渲染   | 缓存计算结果，优化性能         |
| 依赖数组          | 用于判断函数是否需要重新创建       | 用于判断值是否需要重新计算     |
| 语法糖关系        | `useCallback(fn, deps)` 等价于 `useMemo(() => fn, deps)` |

---

## 4. **完整示例：`useCallback` 和 `useMemo` 的应用**

以下是一个完整的示例，展示了 `useCallback` 和 `useMemo` 的实际应用：

```javascript
function App() {
  const [name, setName] = useState('2');
  const [num, setNum] = useState(1);

  // 使用 useMemo 缓存对象，避免子组件因引用变化而重新渲染
  const data = useMemo(() => ({ num }), [num]);

  // 使用 useCallback 缓存函数，避免子组件因函数引用变化而重新渲染
  const handleClick = useCallback(() => {
    setName(num + 1);
  }, [num]);

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <ChildComponent data={data} handle={handleClick} />
      <div>{num}</div>
      <button onClick={() => setNum((val) => val + 1)}>click</button>
    </div>
  );
}

function ChildComponent({ data, handle }) {
  console.log('ChildComponent rendered');
  return (
    <div>
      <div>Data: {data.num}</div>
      <button onClick={handle}>Update Name</button>
    </div>
  );
}
```

---

## 5. **总结**
- **`useCallback`**: 用于缓存函数，避免子组件因函数引用变化而重新渲染。
- **`useMemo`**: 用于缓存计算结果，避免重复计算。
- **优化性能**: 在性能敏感的场景中，合理使用 `useCallback` 和 `useMemo` 可以减少不必要的渲染和计算，但滥用可能会增加代码复杂度。

希望这份文档能帮助你更好地理解和使用 `useCallback` 和 `useMemo`！

找到具有 1 个许可证类型的类似代码