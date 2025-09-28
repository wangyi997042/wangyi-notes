
// ! 1. 路由配置
// * Umi.js 支持配置式和约定式路由，常用 config.ts 配置页面路径与组件映射。
// ? 标准语法：
//   routes: [
//     { path: '/路径', component: '@/pages/组件' },
//     { path: '/user/:id', component: '@/pages/user' },
//     { path: '/dashboard', component: '@/layouts/dashboard', routes: [...] }
//   ]
// 参数说明：
//   path：路由路径，支持动态参数（:id）
//   component：页面或布局组件路径
//   routes：子路由数组，实现嵌套路由
// 示例：
// export default {
//   routes: [
//     { path: '/', component: '@/pages/index' },
//     { path: '/about', component: '@/pages/about' },
//     { path: '/user/:id', component: '@/pages/user' },
//     {
//       path: '/dashboard',
//       component: '@/layouts/dashboard',
//       routes: [
//         { path: '/dashboard/analysis', component: '@/pages/analysis' },
//         { path: '/dashboard/monitor', component: '@/pages/monitor' },
//       ],
//     },
//   ],
// };
// TODO: 动态参数可用 useParams 获取，嵌套路由需在父组件中用 <Outlet /> 或 <Routes /> 渲染。

// ! 2. 插件机制
// * Umi.js 支持丰富的插件体系，可通过 config.ts 配置官方或自定义插件，扩展框架能力。
// ? 标准语法：
//   plugins: ['@umijs/plugins/dist/antd', '@umijs/plugins/dist/dva', ...]
// 参数说明：
//   plugins：插件包名或本地插件路径
// 示例：
// export default {
//   plugins: [
//     '@umijs/plugins/dist/antd',
//     '@umijs/plugins/dist/dva',
//     './plugin-example',
//   ],
// };
// // 自定义插件
// export default (api) => { api.onStart(() => { console.log('Umi 项目启动'); }); };
// TODO: 插件可扩展路由、构建、运行时等各环节。

// ! 3. 运行时配置
// * 可在 src/app.ts 中定义 layout、request、patchRoutes 等运行时配置，动态修改全局行为。
// ? 标准语法：
//   export const layout = { ... }
//   export const request = { ... }
//   export function patchRoutes({ routes }) { ... }
// 参数说明：
//   layout：布局相关配置
//   request：全局请求配置
//   patchRoutes：动态修改路由
// 示例：
// export const layout = { title: 'Umi 应用', logo: '/logo.png' };
// export const request = { timeout: 1000, errorHandler: (error) => { console.error(error); } };
// export function patchRoutes({ routes }) { routes.push({ path: '/new', component: '@/pages/new' }); }
// TODO: 运行时配置适合动态场景，如权限路由、全局请求拦截等。

// ! 4. 数据请求
// * 推荐使用 umi-request 发送 HTTP 请求，支持全局拦截器、错误处理等功能。
// ? 标准语法：
//   import { request } from 'umi';
//   request(url, options).then(...)
// 参数说明：
//   url：请求地址
//   options：请求参数（method、data、headers 等）
// 示例：
// request('/api/users', { method: 'GET' }).then(res => { console.log(res); });
// // 全局请求拦截器
// export const request = {
//   requestInterceptors: [(url, options) => { return { url, options }; }],
//   responseInterceptors: [(response) => { return response; }],
// };
// TODO: 全局拦截器可统一处理 token、错误提示等。

// ! 5. 状态管理
// * Umi.js 推荐通过 Dva 插件进行全局状态管理，支持 model、reducers、effects 等。
// ? 标准语法：
//   plugins: ['@umijs/plugins/dist/dva']
//   model: { namespace, state, reducers, effects }
// 参数说明：
//   namespace：模型命名空间
//   state：初始状态
//   reducers：同步更新方法
//   effects：异步操作（如请求）
// 示例：
// export default {
//   namespace: 'user',
//   state: { list: [] },
//   reducers: { save(state, action) { return { ...state, list: action.payload }; } },
//   effects: {
//     *fetch(_, { call, put }) {
//       const response = yield call(fetchUsers);
//       yield put({ type: 'save', payload: response });
//     },
//   },
// };
// // 组件中
// import { useDispatch, useSelector } from 'umi';
// const users = useSelector(state => state.user.list);
// useEffect(() => { dispatch({ type: 'user/fetch' }); }, []);
// TODO: Dva 支持 generator 异步流，适合复杂业务场景。

// ! 6. 国际化
// * Umi.js 支持多语言，通过 locale 插件和 useIntl 实现国际化。
// ? 标准语法：
//   plugins: ['@umijs/plugins/dist/locale']
//   locale: { default, antd, baseNavigator }
// 参数说明：
//   default：默认语言
//   antd：是否集成 Ant Design 国际化
//   baseNavigator：是否根据浏览器语言切换
// 示例：
// export default {
//   plugins: ['@umijs/plugins/dist/locale'],
//   locale: { default: 'zh-CN', antd: true, baseNavigator: true },
// };
// // 组件中
// import { useIntl } from 'umi';
// const intl = useIntl();
// intl.formatMessage({ id: 'welcome' });
// TODO: 推荐所有文案用 id 管理，便于多语言切换和维护。