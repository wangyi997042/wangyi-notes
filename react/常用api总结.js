// 本文件适合“标题 + 解释 + 标准语法 + 参数说明 + 示例 + 注意事项/扩展用法”结构输出。
// 建议配合 VS Code 插件 Better Comments 阅读，支持注释高亮。
// 对内容顺序进行了优化，并补充了常用 API，如 Fragment、PropTypes、默认Props、受控与非受控组件等。

// ! 1. React 组件
// * React 组件分为函数式组件和类组件，是构建 UI 的核心单元。
// ? 标准语法：
//   函数组件：function 组件名(props) { ... }
//   类组件：class 组件名 extends React.Component { ... }
// 参数说明：
//   props：组件的输入参数
//   state：组件内部状态（类组件或 useState）
// 示例：
// 函数组件
function MyComponent({ message }) {
  return <div>{message}</div>;
}
// 类组件
class MyComponentClass extends React.Component {
  render() {
    return <div>{this.props.message}</div>;
  }
}
// TODO: 推荐优先使用函数式组件，配合 Hooks。

// ! 2. JSX 语法
// * JSX 是 JavaScript 的语法扩展，用于描述 UI。
// ? 标准语法：<标签 属性={值}>{内容}</标签>
// 参数说明：
//   属性名使用 camelCase，如 className、onClick
//   支持表达式、条件渲染、列表渲染
// 示例：
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
// TODO: JSX 必须有唯一根节点，属性名区分大小写。

// ! 3. Props 和 State
// * Props 用于父子组件通信，State 用于组件内部状态管理。
// ? 标准语法：
//   props 通过组件参数传递
//   state 通过 useState/useReducer 或 this.state 管理
// 参数说明：
//   props：只读属性
//   state：可变状态
// 示例：
// Props
function Child({ message }) { return <div>{message}</div>; }
function Parent() { return <Child message="Hello" />; }
// State（函数式）
const [count, setCount] = React.useState(0);
// State（类组件）
class Counter extends React.Component {
  state = { count: 0 };
  increment = () => this.setState({ count: this.state.count + 1 });
  render() { return <button onClick={this.increment}>{this.state.count}</button>; }
}
// TODO: props 只读，state 通过 setState/useState 修改。

// ! 4. 事件处理
// * React 事件采用 camelCase 命名，事件对象为合成事件。
// ? 标准语法：<button onClick={handleClick}>Click</button>
// 参数说明：
//   事件处理函数可接收 event 参数
// 示例：
function App() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked!');
  };
  return <button onClick={handleClick}>Click Me</button>;
}
// TODO: 事件处理函数建议用箭头函数或 bind 绑定 this。

// ! 5. 条件渲染
// * 根据条件动态渲染组件或元素。
// ? 标准语法：三元运算符、逻辑与 &&、if 语句
// 参数说明：无
// 示例：
function App({ isLoggedIn }) {
  return <div>{isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}</div>;
}
// TODO: 推荐用三元运算符或 &&，避免复杂嵌套。

// ! 6. 列表渲染
// * 使用 map() 渲染列表，每项需唯一 key。
// ? 标准语法：array.map(item => <li key={key}>{item}</li>)
// 参数说明：
//   key：唯一标识，建议用业务唯一 id
// 示例：
function List({ items }) {
  return <ul>{items.map((item, idx) => <li key={idx}>{item}</li>)}</ul>;
}
// TODO: key 不要用 index，除非列表不会变动。

// ! 7. 生命周期方法（类组件）
// * 类组件有完整生命周期钩子，常用于副作用处理。
// ? 标准语法：componentDidMount、componentDidUpdate、componentWillUnmount 等
// 参数说明：无
// 示例：
class MyComponent extends React.Component {
  componentDidMount() { /* 挂载后 */ }
  componentDidUpdate() { /* 更新后 */ }
  componentWillUnmount() { /* 卸载前 */ }
  render() { return <div>Hello</div>; }
}
// TODO: 推荐用 Hooks 替代生命周期方法。

// ! 8. Hooks
// * Hooks 让函数组件拥有状态和副作用等能力。
// ? 标准语法：useState、useEffect、useContext、useReducer、useRef 等
// 参数说明：
//   useState：状态管理
//   useEffect：副作用处理
//   useContext：上下文
//   useReducer：复杂状态
//   useRef：引用 DOM 或变量
// 示例：
function App() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => { document.title = `Count: ${count}`; }, [count]);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
// TODO: useEffect 返回函数用于清理副作用。

// ! 9. Context API
// * 用于跨组件共享数据，避免多层 props 传递。
// ? 标准语法：
//   const Context = React.createContext(defaultValue);
//   <Context.Provider value={value}>...</Context.Provider>
//   React.useContext(Context)
// 参数说明：
//   Provider：提供数据
//   Consumer/useContext：消费数据
// 示例：
const ThemeContext = React.createContext('light');
function Toolbar() {
  const theme = React.useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}
// TODO: Context 适合全局数据，如主题、用户信息。

// ! 10. 性能优化
// * React 提供多种性能优化手段。
// ? 标准语法：React.memo、useMemo、useCallback、React.lazy、Suspense
// 参数说明：
//   React.memo：组件记忆化
//   useMemo：缓存计算结果
//   useCallback：缓存函数
//   React.lazy/Suspense：懒加载
// 示例：
const Expensive = React.memo(function Expensive({ value }) { /* ... */ });
const memoizedValue = React.useMemo(() => compute(value), [value]);
const memoizedFn = React.useCallback(() => doSomething(), []);
// TODO: 仅在性能瓶颈时使用优化手段。

// ! 11. 错误边界
// * 错误边界用于捕获子组件的 JS 错误并显示回退 UI（仅类组件）。
// ? 标准语法：static getDerivedStateFromError、componentDidCatch
// 参数说明：无
// 示例：
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, info) { console.log(error, info); }
  render() { return this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children; }
}
// TODO: 函数组件无法作为错误边界。

// ! 12. Portals
// * Portals 可将子组件渲染到父组件 DOM 结构之外的节点。
// ? 标准语法：ReactDOM.createPortal(child, container)
// 参数说明：
//   child：要渲染的元素
//   container：目标 DOM 节点
// 示例：
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
}
// TODO: 常用于弹窗、全局提示等场景。

// ! 13. Fragment
// * Fragment 用于返回多个元素而不增加额外 DOM 节点。
// ? 标准语法：<React.Fragment>或<></>
// 参数说明：无
// 示例：
function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}
// TODO: Fragment 可带 key 属性用于列表渲染。

// ! 14. PropTypes 和 defaultProps
// * PropTypes 用于类型校验，defaultProps 用于设置默认属性。
// ? 标准语法：Component.propTypes = { ... }; Component.defaultProps = { ... }
// 参数说明：
//   propTypes：属性类型校验对象
//   defaultProps：默认属性对象
// 示例：
function Greeting({ name }) { return <div>Hello, {name}</div>; }
Greeting.propTypes = { name: PropTypes.string };
Greeting.defaultProps = { name: 'Guest' };
// TODO: 推荐在大型项目中使用 PropTypes 辅助开发。

// ! 15. 受控与非受控组件
// * 受控组件由 React 状态驱动，非受控组件由 DOM 自身状态驱动。
// ? 标准语法：
//   受控：<input value={value} onChange={fn} />
//   非受控：<input ref={ref} />
// 参数说明：
//   value/onChange：受控
//   ref：非受控
// 示例：
// 受控
function ControlledInput() {
  const [value, setValue] = React.useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
// 非受控
function UncontrolledInput() {
  const inputRef = React.useRef();
  return <input ref={inputRef} />;
}
// TODO: 推荐优先使用受控组件，便于状态同步。

// ! 16. 补充：自定义 Hook
// * 自定义 Hook 用于复用组件逻辑。
// ? 标准语法：function useXXX(...) { ... }
// 参数说明：自定义
// 示例：
function useCounter(initialValue = 0) {
  const [count, setCount] = React.useState(initialValue);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
// TODO: 自定义 Hook 需以 use 开头，便于识别和规范。

// ! 总结
// * React 提供了丰富的 API 和灵活的组件机制，推荐优先使用函数组件和 Hooks，配合 Context、性能优化、错误边界等高级特性，提升开发效率和代码质量。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 持续关注官方文档和社区最佳实践，提升 React 开发水平。