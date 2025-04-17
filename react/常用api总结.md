
---

# React 常用 API 扩展总结

---

## **1. React 组件**
### **函数式组件**
- **定义**: 使用函数定义组件，推荐使用 Hooks 管理状态和生命周期。
- **特点**:
  - 简洁、易读。
  - 支持 React Hooks。
- **示例**:
```javascript
import React from 'react';

function MyComponent({ message }) {
  return <div>{message}</div>;
}

export default MyComponent;
```

### **类组件**
- **定义**: 使用类定义组件，适用于需要使用生命周期方法的场景。
- **特点**:
  - 支持完整的生命周期方法。
  - 适合复杂逻辑的组件。
- **示例**:
```javascript
import React, { Component } from 'react';

class MyComponent extends Component {
  render() {
    return <div>{this.props.message}</div>;
  }
}

export default MyComponent;
```

---

## **2. JSX 语法**
- **定义**: JSX 是一种 JavaScript 的语法扩展，用于描述 UI。
- **特点**:
  - 使用 `{}` 嵌入表达式。
  - 必须返回一个根元素。
  - 支持条件渲染和列表渲染。
  - 属性名使用 camelCase（如 `className` 替代 `class`）。

### **示例**
```javascript
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

export default App;
```

---

## **3. Props 和 State**
### **Props**
- **定义**: 用于父组件向子组件传递数据，子组件通过 `props` 接收。
- **特点**:
  - 只读属性，不能在子组件中修改。
- **示例**:
```javascript
function ChildComponent({ message }) {
  return <div>{message}</div>;
}

function ParentComponent() {
  return <ChildComponent message="Hello from Parent!" />;
}
```

### **State**
- **定义**: 用于管理组件内部的状态。
- **特点**:
  - 状态是可变的，通常通过 `setState` 或 `useState` 修改。
- **示例（函数式组件）**:
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

- **示例（类组件）**:
```javascript
import React, { Component } from 'react';

class Counter extends Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

---

## **4. 事件处理**
- **定义**: React 使用 camelCase 语法定义事件（如 `onClick`）。
- **特点**:
  - 事件处理函数可以是箭头函数或绑定的类方法。
  - 使用 `e.preventDefault()` 阻止默认行为。

### **示例**
```javascript
function App() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

---

## **5. 条件渲染**
- **定义**: 根据条件动态渲染组件或元素。
- **常用方法**:
  - 使用三元运算符。
  - 使用逻辑与（`&&`）运算符。
  - 使用 `if` 语句。

### **示例**
```javascript
function App({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}
```

---

## **6. 列表渲染**
- **定义**: 使用 `map()` 方法渲染列表。
- **注意**: 每个列表项需要一个唯一的 `key` 属性。
- **示例**:
```javascript
function App() {
  const items = ['React', 'Vue', 'Angular'];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

---

## **7. 生命周期方法（类组件）**
### **常用方法**
- **`componentDidMount`**: 组件挂载后调用。
- **`componentDidUpdate`**: 组件更新后调用。
- **`componentWillUnmount`**: 组件卸载前调用。

### **示例**
```javascript
import React, { Component } from 'react';

class MyComponent extends Component {
  componentDidMount() {
    console.log('Component mounted');
  }

  componentDidUpdate() {
    console.log('Component updated');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  render() {
    return <div>Hello, React!</div>;
  }
}
```

---

## **8. Hooks**
### **常用 Hooks**
- **`useState`**: 管理状态。
- **`useEffect`**: 处理副作用（如数据获取、订阅）。
- **`useContext`**: 使用上下文。
- **`useReducer`**: 替代 Redux 的轻量状态管理。
- **`useRef`**: 获取 DOM 元素或保存可变值。

### **示例**
```javascript
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count: ${count}`);
    return () => {
      console.log('Cleanup');
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## **9. Context API**
### **定义**
- **作用**: 用于跨组件共享数据（如主题、用户信息）。
- **示例**:
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
  return <div>Current theme: {theme}</div>;
}
```

---

## **10. 性能优化**
### **常用方法**
- **`React.memo`**: 防止不必要的重新渲染。
- **`useMemo`**: 缓存计算结果。
- **`useCallback`**: 缓存函数引用。
- **`React.lazy` 和 `Suspense`**: 实现组件的懒加载。

### **示例**
```javascript
import React, { useState, useMemo } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const expensiveCalculation = useMemo(() => {
    console.log('Calculating...');
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Calculation: {expensiveCalculation}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## **11. 错误边界**
### **定义**
- **作用**: 捕获子组件的 JavaScript 错误并显示回退 UI。
- **注意**: 只能用于类组件。
- **示例**:
```javascript
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('Error:', error, 'Info:', info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## **12. Portals**
### **定义**
- **作用**: 将子组件渲染到父组件 DOM 结构之外的 DOM 节点。
- **示例**:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
}

export default Modal;
```

---
