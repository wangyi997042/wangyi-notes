# 1. useState
- 作用: 用于在函数组件中声明状态变量。
- 特点:
  每次状态更新都会触发组件重新渲染。
 接受初始状态值作为参数。
返回一个状态值和更新状态的函数。
- 使用场景:
管理组件内部的状态，例如表单输入值、计数器等。
```
const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
}
```

# 2. useEffect
- 作用: 用于处理副作用，例如数据获取、订阅、手动 DOM 操作等。
- 特点:
接受一个回调函数和依赖数组。
依赖数组为空时，回调函数只在组件挂载和卸载时执行。
依赖数组中指定的变量发生变化时，回调函数会重新执行。
- 使用场景:
数据获取、订阅事件、清理操作等。

```
useEffect(() => {
  console.log('Component mounted or updated');
  return () => {
    console.log('Component unmounted');
  };
}, [dependency]);

```

# 3. useMemo
- 作用: 用于缓存计算结果，避免不必要的重复计算。
- 特点:
接受一个工厂函数和依赖数组。
只有依赖数组中的值发生变化时，才会重新计算。
返回缓存的值。
- 使用场景:
优化性能，避免在每次渲染时重复执行昂贵的计算。

```
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

# 4. useCallback
- 作用: 用于缓存函数实例，避免不必要的函数重新创建。
- 特点:
接受一个回调函数和依赖数组。
只有依赖数组中的值发生变化时，才会返回新的函数实例。
返回缓存的函数。
- 使用场景:
优化性能，避免子组件因父组件传递的函数引用变化而重新渲染。

```
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

```


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