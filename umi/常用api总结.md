以下是 **Umi.js 常用 API 总结**，涵盖了路由配置、插件机制、运行时配置、请求处理、状态管理等核心功能，帮助快速掌握 Umi.js 的使用技巧。

---

# Umi.js 常用 API 总结

---

## **1. 路由配置**

### **1.1 基本路由**
- **语法**: 在 `config.ts` 中配置路由。
- **作用**: 定义页面路径和组件的映射关系。

#### **示例**
```typescript
export default {
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/about', component: '@/pages/about' },
  ],
};
```

---

### **1.2 动态路由**
- **语法**: 使用 `:参数名` 定义动态路由。
- **作用**: 支持路径参数。

#### **示例**
```typescript
export default {
  routes: [
    { path: '/user/:id', component: '@/pages/user' },
  ],
};
```

在页面组件中获取参数：
```typescript
import { useParams } from 'umi';

const UserPage = () => {
  const params = useParams();
  return <div>User ID: {params.id}</div>;
};

export default UserPage;
```

---

### **1.3 嵌套路由**
- **语法**: 使用 `routes` 字段定义子路由。
- **作用**: 支持页面的嵌套结构。

#### **示例**
```typescript
export default {
  routes: [
    {
      path: '/dashboard',
      component: '@/layouts/dashboard',
      routes: [
        { path: '/dashboard/analysis', component: '@/pages/analysis' },
        { path: '/dashboard/monitor', component: '@/pages/monitor' },
      ],
    },
  ],
};
```

---

## **2. 插件机制**

### **2.1 使用插件**
- **语法**: 在 `config.ts` 中配置插件。
- **作用**: 扩展 Umi.js 的功能。

#### **示例**
```typescript
export default {
  plugins: [
    '@umijs/plugins/dist/antd', // 使用 Ant Design 插件
    '@umijs/plugins/dist/dva',  // 使用 Dva 状态管理插件
  ],
};
```

---

### **2.2 自定义插件**
- **语法**: 创建插件文件并导出插件函数。
- **作用**: 实现自定义功能。

#### **示例**
```javascript
// plugin-example.js
export default (api) => {
  api.onStart(() => {
    console.log('Umi 项目启动');
  });
};
```

在 `config.ts` 中引入插件：
```typescript
export default {
  plugins: ['./plugin-example'],
};
```

---

## **3. 运行时配置**

### **3.1 修改运行时配置**
- **语法**: 在 `src/app.ts` 中定义运行时配置。
- **作用**: 动态修改应用的全局配置。

#### **示例**
```typescript
export const layout = {
  title: 'Umi 应用',
  logo: '/logo.png',
};

export const request = {
  timeout: 1000,
  errorHandler: (error) => {
    console.error('请求错误:', error);
  },
};
```

---

### **3.2 修改路由渲染**
- **语法**: 使用 `patchRoutes` 修改路由。
- **作用**: 动态添加或修改路由。

#### **示例**
```typescript
export function patchRoutes({ routes }) {
  routes.push({
    path: '/new',
    component: '@/pages/new',
  });
}
```

---

## **4. 数据请求**

### **4.1 使用 `umi-request`**
- **语法**: 使用 `umi-request` 发送 HTTP 请求。
- **作用**: 提供封装好的请求库。

#### **示例**
```typescript
import { request } from 'umi';

request('/api/users', {
  method: 'GET',
}).then((response) => {
  console.log(response);
});
```

---

### **4.2 配置全局请求拦截器**
- **语法**: 在 `src/app.ts` 中配置。
- **作用**: 统一处理请求和响应。

#### **示例**
```typescript
import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  requestInterceptors: [
    (url, options) => {
      console.log('请求拦截:', url);
      return { url, options };
    },
  ],
  responseInterceptors: [
    (response) => {
      console.log('响应拦截:', response);
      return response;
    },
  ],
};
```

---

## **5. 状态管理**

### **5.1 使用 Dva**
- **语法**: 配置 Dva 插件并定义模型。
- **作用**: 管理全局状态。

#### **示例**
```typescript
// 配置 Dva 插件
export default {
  plugins: ['@umijs/plugins/dist/dva'],
};

// 定义模型
export default {
  namespace: 'user',
  state: {
    list: [],
  },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload };
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchUsers);
      yield put({ type: 'save', payload: response });
    },
  },
};
```

在组件中使用：
```typescript
import { useDispatch, useSelector } from 'umi';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.list);

  useEffect(() => {
    dispatch({ type: 'user/fetch' });
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
```

---

## **6. 国际化**

### **6.1 配置国际化**
- **语法**: 使用 `locale` 插件。
- **作用**: 实现多语言支持。

#### **示例**
```typescript
export default {
  plugins: ['@umijs/plugins/dist/locale'],
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
};
```

在组件中使用：
```typescript
import { useIntl } from 'umi';

const Welcome = () => {
  const intl = useIntl();
  return <h1>{intl.formatMessage({ id: 'welcome' })}</h1>;
};

export default Welcome;
```

---

