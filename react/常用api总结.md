# React 常用 API 完整整理

---

## 1. **React 组件**

### 核心概念
- React 组件分为函数式组件和类组件，是构建 UI 的核心单元。
- **推荐优先使用函数式组件**，配合 Hooks。

### 标准语法
```javascript
// 函数组件
function ComponentName(props) { 
  // 组件逻辑
  return <div>Component</div>;
}

// 类组件
class ComponentName extends React.Component {
  render() {
    return <div>Component</div>;
  }
}
```

### 参数说明
- `props`: 组件的输入参数
- `state`: 组件内部状态（类组件或 useState）

### 示例
```javascript
// 函数组件
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// 类组件
class WelcomeClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### 注意事项
- 函数组件是 React 16.8+ 推荐的首选方式
- 类组件在需要复杂生命周期时才使用

---

## 2. **JSX 语法**

### 核心概念
- JSX 是 JavaScript 的语法扩展，用于描述 UI。
- 必须有唯一根节点。

### 标准语法
```jsx
<Tag prop={value}>{content}</Tag>
```

### 参数说明
- 属性名使用 camelCase（如 `className`, `onClick`）
- 支持表达式、条件渲染、列表渲染

### 示例
```jsx
const App = () => {
  const items = ['React', 'Vue', 'Angular'];
  return (
    <div>
      <h1>Hello, React!</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
```

### 注意事项
- JSX 必须有唯一根节点
- 属性名区分大小写

---

## 3. **Props 和 State**

### 核心概念
- **Props**: 用于父子组件通信，只读属性
- **State**: 用于组件内部状态管理，可变状态

### 标准语法
```javascript
// Props
<ChildComponent message="Hello" />

// State (函数式)
const [state, setState] = useState(initialValue);

// State (类组件)
this.state = { count: 0 };
```

### 参数说明
- `props`: 只读属性
- `state`: 通过 `setState`/`useState` 修改

### 示例
```javascript
// Props
function Child({ message }) {
  return <div>{message}</div>;
}

function Parent() {
  return <Child message="Hello" />;
}

// State (函数式)
const [count, setCount] = useState(0);

// State (类组件)
class Counter extends React.Component {
  state = { count: 0 };
  
  increment = () => this.setState({ count: this.state.count + 1 });
  
  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}
```

### 注意事项
- `props` 只读，`state` 通过 `setState`/`useState` 修改
- 状态更新是异步的

---

## 4. **事件处理**

### 核心概念
- React 事件采用 camelCase 命名
- 事件对象为合成事件

### 标准语法
```jsx
<button onClick={handleClick}>Click</button>
```

### 参数说明
- 事件处理函数可接收 `event` 参数

### 示例
```javascript
function App() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked!');
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

### 注意事项
- 事件处理函数建议用箭头函数或 `bind` 绑定 `this`
- 避免在 JSX 中直接写函数表达式（性能问题）

---

## 5. **条件渲染**

### 核心概念
- 根据条件动态渲染组件或元素

### 标准语法
- 三元运算符
- 逻辑与 `&&`
- `if` 语句

### 示例
```javascript
function App({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}
```

### 注意事项
- 推荐用三元运算符或 `&&`，避免复杂嵌套

---

## 6. **列表渲染**

### 核心概念
- 使用 `map()` 渲染列表，每项需唯一 `key`

### 标准语法
```jsx
array.map(item => <li key={key}>{item}</li>)
```

### 参数说明
- `key`: 唯一标识，建议用业务唯一 id

### 示例
```javascript
function List({ items }) {
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
```

### 注意事项
- `key` 不要用 `index`，除非列表不会变动
- `key` 帮助 React 识别哪些元素改变了，从而提高渲染性能

---

## 7. **生命周期方法（类组件）**

### 核心概念
- 类组件有完整生命周期钩子，常用于副作用处理

### 标准语法
```javascript
componentDidMount()
componentDidUpdate()
componentWillUnmount()
```

### 示例
```javascript
class MyComponent extends React.Component {
  componentDidMount() {
    /* 挂载后 */
  }
  
  componentDidUpdate() {
    /* 更新后 */
  }
  
  componentWillUnmount() {
    /* 卸载前 */
  }
  
  render() {
    return <div>Hello</div>;
  }
}
```

### 注意事项
- **推荐用 Hooks 替代生命周期方法**
- 类组件生命周期与 Hooks 的对应关系：
  - `componentDidMount` → `useEffect(() => {}, [])`
  - `componentDidUpdate` → `useEffect(() => {}, [dependencies])`
  - `componentWillUnmount` → `useEffect(() => () => {}, [])`

---

## 8. **Hooks**

### 核心概念
- Hooks 让函数组件拥有状态和副作用等能力

### 常用 Hooks
- `useState`: 状态管理
- `useEffect`: 副作用处理
- `useContext`: 上下文
- `useReducer`: 复杂状态
- `useRef`: 引用 DOM 或变量

### 标准语法
```javascript
const [state, setState] = useState(initialValue);
useEffect(() => { /* 副作用 */ }, [dependencies]);
```

### 示例
```javascript
function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

### 注意事项
- `useEffect` 返回函数用于清理副作用
- Hooks 必须在函数组件顶层调用，不能在条件语句中使用

---

## 9. **Context API**

### 核心概念
- 用于跨组件共享数据，避免多层 props 传递

### 标准语法
```javascript
const Context = React.createContext(defaultValue);
<Context.Provider value={value}>...</Context.Provider>
React.useContext(Context);
```

### 参数说明
- `Provider`: 提供数据
- `Consumer`/`useContext`: 消费数据

### 示例
```javascript
const ThemeContext = React.createContext('light');

function Toolbar() {
  const theme = React.useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

### 注意事项
- Context 适合全局数据，如主题、用户信息
- 避免过度使用 Context，只在必要时使用

---

## 10. **性能优化**

### 核心概念
- React 提供多种性能优化手段

### 常用优化方法
- `React.memo`: 组件记忆化
- `useMemo`: 缓存计算结果
- `useCallback`: 缓存函数
- `React.lazy` 和 `Suspense`: 懒加载

### 标准语法
```javascript
const MemoizedComponent = React.memo(Component);
const memoizedValue = useMemo(() => compute(value), [value]);
const memoizedFn = useCallback(() => doSomething(), []);
```

### 示例
```javascript
// 组件记忆化
const Expensive = React.memo(function Expensive({ value }) {
  /* ... */
});

// 缓存计算结果
const memoizedValue = React.useMemo(() => compute(value), [value]);

// 缓存函数
const memoizedFn = React.useCallback(() => doSomething(), []);
```

### 注意事项
- 仅在性能瓶颈时使用优化手段
- `React.memo` 会浅比较 props，避免不必要的渲染

---

## 11. **错误边界**

### 核心概念
- 错误边界用于捕获子组件的 JS 错误并显示回退 UI（仅类组件）

### 标准语法
```javascript
static getDerivedStateFromError(error)
componentDidCatch(error, info)
```

### 示例
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  
  render() {
    return this.state.hasError 
      ? <h1>Something went wrong.</h1> 
      : this.props.children;
  }
}
```

### 注意事项
- **函数组件无法作为错误边界**
- 通常用于整个应用或某个页面的错误处理

---

## 12. **Portals**

### 核心概念
- Portals 可将子组件渲染到父组件 DOM 结构之外的节点

### 标准语法
```javascript
ReactDOM.createPortal(child, container)
```

### 参数说明
- `child`: 要渲染的元素
- `container`: 目标 DOM 节点

### 示例
```javascript
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">
      {children}
    </div>,
    document.getElementById('modal-root')
  );
}
```

### 注意事项
- 常用于弹窗、全局提示等场景
- 需要在 DOM 中预先创建目标容器

---

## 13. **Fragment**

### 核心概念
- Fragment 用于返回多个元素而不增加额外 DOM 节点

### 标准语法
```jsx
<React.Fragment>...</React.Fragment>
或
<>
  ...
</>
```

### 示例
```javascript
function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}
```

### 注意事项
- Fragment 可带 `key` 属性用于列表渲染
- 与 `<>` 语法糖等价

---

## 14. **PropTypes 和 defaultProps**

### 核心概念
- PropTypes 用于类型校验，defaultProps 用于设置默认属性

### 标准语法
```javascript
Component.propTypes = { ... };
Component.defaultProps = { ... };
```

### 示例
```javascript
function Greeting({ name }) {
  return <div>Hello, {name}</div>;
}

Greeting.propTypes = {
  name: PropTypes.string
};

Greeting.defaultProps = {
  name: 'Guest'
};
```

### 注意事项
- 推荐在大型项目中使用 PropTypes 辅助开发
- `propTypes` 在开发环境中检查，生产环境不运行

---

## 15. **受控与非受控组件**

### 核心概念
- **受控组件**: 由 React 状态驱动
- **非受控组件**: 由 DOM 自身状态驱动

### 标准语法
```javascript
// 受控
<input value={value} onChange={fn} />

// 非受控
<input ref={ref} />
```

### 参数说明
- `value`/`onChange`: 受控
- `ref`: 非受控

### 示例
```javascript
// 受控组件
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input 
      value={value} 
      onChange={e => setValue(e.target.value)} 
    />
  );
}

// 非受控组件
function UncontrolledInput() {
  const inputRef = useRef();
  
  return (
    <input ref={inputRef} />
  );
}
```

### 注意事项
- **推荐优先使用受控组件**，便于状态同步
- 非受控组件适用于需要 DOM 原生行为的场景

---

## 16. **自定义 Hook**

### 核心概念
- 自定义 Hook 用于复用组件逻辑

### 标准语法
```javascript
function useXXX(...) { ... }
```

### 示例
```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  
  return { count, increment };
}
```

### 注意事项
- 自定义 Hook 需以 `use` 开头，便于识别和规范
- 不能在条件语句中调用 Hook

---

## 17. **useReducer**

### 核心概念
- 用于复杂状态管理，替代 `useState` 处理复杂状态逻辑

### 标准语法
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

### 示例
```javascript
const initialState = { count: 0 };

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
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

### 注意事项
- 适合状态逻辑复杂、状态之间有依赖关系的场景
- 比 `useState` 更适合处理多个状态和复杂的更新逻辑

---

## 18. **useRef**

### 核心概念
- 用于访问 DOM 元素或存储可变值（不触发重新渲染）

### 标准语法
```javascript
const refContainer = useRef(initialValue);
```

### 示例
```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### 注意事项
- `useRef` 返回一个可变的 ref 对象
- `current` 属性可以存储任何可变值
- 与 `ref` 属性不同，`useRef` 不会触发重新渲染

---

## 19. **useEffect 依赖数组**

### 核心概念
- `useEffect` 的第二个参数（依赖数组）控制副作用的执行时机

### 标准语法
```javascript
useEffect(() => { /* 副作用 */ }, [dependencies]);
```

### 示例
```javascript
// 仅在组件挂载时执行
useEffect(() => {
  console.log('Component mounted');
}, []);

// 在 count 变化时执行
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);

// 在组件卸载时执行清理
useEffect(() => {
  return () => {
    console.log('Component unmounted');
  };
}, []);
```

### 注意事项
- 依赖数组为空表示只在挂载时执行
- 依赖数组包含变量，表示当变量变化时执行
- 避免空依赖数组（可能导致旧值问题）

---

## 20. **React.memo**

### 核心概念
- 用于优化组件渲染，避免不必要的重新渲染

### 标准语法
```javascript
const MemoizedComponent = React.memo(Component);
```

### 示例
```javascript
function Child({ count }) {
  console.log('Child rendered');
  return <div>Count: {count}</div>;
}

const MemoizedChild = React.memo(Child);

function Parent() {
  const [parentCount, setParentCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setParentCount(parentCount + 1)}>
        Parent Count: {parentCount}
      </button>
      <MemoizedChild count={childCount} />
      <button onClick={() => setChildCount(childCount + 1)}>
        Child Count: {childCount}
      </button>
    </div>
  );
}
```

### 注意事项
- `React.memo` 会浅比较 props，避免不必要的渲染
- 仅在组件接受 props 且可能频繁重新渲染时使用

---

## 21. **useContext**

### 核心概念
- 用于访问 React Context 的值

### 标准语法
```javascript
const value = useContext(Context);
```

### 示例
```javascript
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}
```

### 注意事项
- 与 `Context.Consumer` 相比，`useContext` 更简洁
- 避免在组件内部创建 Context，应放在组件外部

---

## 22. **React.lazy 和 Suspense**

### 核心概念
- 用于代码分割和懒加载组件

### 标准语法
```javascript
const LazyComponent = React.lazy(() => import('./Component'));

<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>
```

### 示例
```javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 注意事项
- `React.lazy` 需要与 `Suspense` 一起使用
- 适合用于大型应用中按需加载组件

---

## 23. **useImperativeHandle**

### 核心概念
- 用于自定义子组件的 ref 传递

### 标准语法
```javascript
useImperativeHandle(ref, () => {
  return { /* methods to expose */ };
});
```

### 示例
```javascript
function Parent() {
  const childRef = useRef();
  
  useEffect(() => {
    childRef.current.focus();
  }, []);
  
  return <Child ref={childRef} />;
}

function Child(props, ref) {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  
  return <input ref={inputRef} type="text" />;
}

Child = forwardRef(Child);
```

### 注意事项
- 通常与 `forwardRef` 一起使用
- 用于暴露子组件内部的方法给父组件

---

## 24. **useDebugValue**

### 核心概念
- 用于在 React DevTools 中显示自定义 hook 的标签

### 标准语法
```javascript
useDebugValue(value, format);
```

### 示例
```javascript
function useCustomHook(value) {
  useDebugValue(`Custom Hook: ${value}`);
  // ...
}
```

### 注意事项
- 用于开发阶段调试，不影响生产环境
- 可以帮助开发者在 DevTools 中更好地理解 Hook 的行为

---

## 25. **React 性能优化最佳实践**

1. **避免不必要的渲染**
   - 使用 `React.memo`
   - 优化 `useEffect` 依赖数组

2. **代码分割**
   - 使用 `React.lazy` 和 `Suspense`
   - 按需加载路由

3. **避免在渲染过程中修改状态**
   - 避免在 `render` 方法中调用 `setState`

4. **使用 `useCallback` 缓存函数**
   - 避免在父组件重新渲染时创建新函数

5. **使用 `useMemo` 缓存计算结果**
   - 避免在每次渲染时重新计算复杂值

---

## 26. **React 与 Vue 3 对比**

| 特性 | React | Vue 3 |
|------|-------|-------|
| **响应式系统** | 基于 `setState` 和 `useState` | 基于 `Proxy` |
| **组件类型** | 函数式组件 + Hooks | 函数式组件 + Composition API |
| **状态管理** | Context API, Redux, MobX | Pinia, Vuex |
| **模板语法** | JSX | 模板语法 |
| **生命周期** | Hooks | 生命周期钩子 |
| **代码结构** | 组件 + 逻辑 | 组件 + 逻辑 |
| **类型支持** | 与 TypeScript 集成良好 | 与 TypeScript 集成更好 |

---

## 总结

React 提供了丰富的 API 和灵活的组件机制，推荐优先使用函数组件和 Hooks，配合 Context、性能优化、错误边界等高级特性，提升开发效率和代码质量。在实际项目中，应根据需求选择合适的 API，避免过度使用不必要的优化手段。

**最佳实践**：
1. 优先使用函数组件和 Hooks
2. 使用 `React.memo` 优化组件渲染
3. 使用 `useEffect` 处理副作用
4. 使用 Context API 管理全局状态
5. 合理使用 `useState` 和 `useReducer` 管理状态
6. 使用 `React.lazy` 和 `Suspense` 进行代码分割
7. 避免在渲染过程中修改状态