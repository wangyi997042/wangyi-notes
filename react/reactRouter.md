### **React Router 详细总结**

**React Router** 是 React 官方推荐的路由管理库，用于构建单页面应用（SPA）。它提供了动态路由、嵌套路由、路由守卫等功能，帮助开发者轻松实现页面导航和组件切换。

---

## **1. React Router 的核心概念**

1. **路由（Route）**:
   - 路由是 URL 与组件之间的映射关系。
   - 每个路由都定义了一个路径（`path`）和对应的组件（`element`）。

2. **路由器（Router）**:
   - 路由器是 React Router 的核心组件，负责管理路由的切换和导航。
   - 常用的路由器有：
     - `BrowserRouter`：使用 HTML5 的 History API。
     - `HashRouter`：使用 URL 的哈希部分（`#`）。

3. **动态路由（Dynamic Route）**:
   - 动态路由允许在路径中使用动态参数（如 `/user/:id`）。

4. **嵌套路由（Nested Route）**:
   - 嵌套路由允许在父路由中嵌套子路由，构建复杂的页面结构。

5. **路由守卫（Navigation Guards）**:
   - React Router 没有内置的路由守卫功能，但可以通过编程式导航和自定义逻辑实现。

---

## **2. 安装和基本使用**

### **2.1 安装 React Router**
```bash
npm install react-router-dom
```

### **2.2 创建路由**
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## **3. 路由配置**

### **3.1 基本路由**
- 定义路径和组件的映射关系。
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### **3.2 动态路由**
- 使用 `:参数名` 定义动态参数。
```javascript
<Routes>
  <Route path="/user/:id" element={<User />} />
</Routes>
```
- 在组件中获取动态参数：
```javascript
```javascript
import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}
```

### **3.3 嵌套路由**
- 在父路由中定义子路由。
```javascript
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```
- 在父组件中使用 `<Outlet>` 渲染子路由：
```javascript
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet /> {/* 渲染子路由 */}
    </div>
  );
}
```

### **3.4 重定向**
- 使用 `<Navigate>` 实现重定向。
```javascript
<Routes>
  <Route path="/home" element={<Navigate to="/" />} />
</Routes>
```

---

## **4. 路由守卫**

React Router 没有内置的路由守卫功能，但可以通过自定义逻辑实现。

### **4.1 基于组件的守卫**
- 创建一个高阶组件，用于检查权限。
```javascript
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}
```
- 使用守卫组件：
```javascript
<Routes>
  <Route
    path="/dashboard"
    element={<PrivateRoute isAuthenticated={true}><Dashboard /></PrivateRoute>}
  />
</Routes>
```

---

## **5. 路由模式**

### **5.1 BrowserRouter**
- 使用 HTML5 的 `history.pushState`。
- URL 示例：`http://example.com/about`
```javascript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
```

### **5.2 HashRouter**
- 使用 URL 的哈希部分（`#`）。
- URL 示例：`http://example.com/#/about`
```javascript
<HashRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</HashRouter>
```

---

## **6. 路由跳转方法**

### **6.1 使用 `<Link>`**
- 用于声明式导航。
```javascript
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
```

### **6.2 使用编程式导航**
- 使用 `useNavigate` 钩子。
```javascript
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/about');
  };

  return <button onClick={goToAbout}>Go to About</button>;
}
```

---

## **7. 路由过渡动画**

React Router 本身不支持动画，但可以结合 **React Transition Group** 实现路由切换动画。

### **示例**
```javascript
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
```

---

## **8. 路由懒加载**

- 使用 `React.lazy` 和 `Suspense` 实现按需加载组件。
```javascript
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

## **9. 常见问题**

### **9.1 动态参数变化时组件不刷新**
- 解决方法：使用 `useEffect` 监听参数变化。
```javascript
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function User() {
  const { id } = useParams();

  useEffect(() => {
    console.log('参数变化:', id);
  }, [id]);

  return <h1>User ID: {id}</h1>;
}
```

---

## **10. 总结**

React Router 是 React 构建单页面应用的核心工具，提供了灵活的路由管理功能。通过动态路由、嵌套路由、路由守卫等特性，开发者可以轻松实现复杂的页面导航和权限控制。
