
// ! 1. 微前端注册与启动
// * qiankun 支持注册多个子应用，并统一启动微前端框架。
// ? 标准语法：
//   import { registerMicroApps, start } from 'qiankun';
//   registerMicroApps(apps, config);
//   start(options);
// 参数说明：
//   apps：子应用配置数组
//   config：注册时的全局配置
//   options：启动参数（如 sandbox、prefetch 等）
// 示例：
import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:3000',
    container: '#subapp-container',
    activeRule: '/react',
  },
  {
    name: 'vueApp',
    entry: '//localhost:8080',
    container: '#subapp-container',
    activeRule: '/vue',
  },
]);
start();
// TODO: registerMicroApps 可多次调用，start 只需调用一次。

// ! 2. 启动微前端（高级配置）
// * 启动 qiankun 时可配置沙箱、预加载、日志等参数。
// ? 标准语法：start(options)
// 参数说明：
//   sandbox：沙箱配置对象或布尔值
//   prefetch：是否预加载子应用
//   singular：是否同一时刻只加载一个子应用
//   logLevel：日志级别（如 'debug'）
// 示例：
start({
  sandbox: { strictStyleIsolation: true },
  prefetch: true,
  singular: true,
  logLevel: 'debug',
});
// TODO: 沙箱建议开启 strictStyleIsolation，提升样式隔离安全性。

// ! 3. 子应用生命周期
// * 子应用需导出 bootstrap、mount、unmount 等生命周期方法，供主应用调用。
// ? 标准语法：
//   export async function bootstrap() { ... }
//   export async function mount(props) { ... }
//   export async function unmount() { ... }
// 参数说明：
//   props：主应用传递的参数对象
// 示例：
export async function bootstrap() { console.log('子应用初始化'); }
export async function mount(props) { console.log('子应用挂载', props); }
export async function unmount() { console.log('子应用卸载'); }
// TODO: 子应用可通过 props 获取主应用传递的数据和方法。

// ! 4. 主应用与子应用通信
// * 主应用通过 props 向子应用传递数据，子应用通过 props.onGlobalStateChange 和 props.setGlobalState 实现全局状态通信。
// ? 标准语法：
//   registerMicroApps([{ ..., props: { user, actions } }])
//   props.onGlobalStateChange(fn)
//   props.setGlobalState(state)
// 参数说明：
//   props：主应用传递的对象
//   onGlobalStateChange：监听全局状态变化
//   setGlobalState：修改全局状态
// 示例：
// 主应用
import { initGlobalState } from 'qiankun';
const actions = initGlobalState({ user: { name: 'John Doe' } });
actions.onGlobalStateChange((state, prev) => { console.log('全局状态变化:', state, prev); });
registerMicroApps([
  { name: 'reactApp', entry: '//localhost:3000', container: '#subapp-container', activeRule: '/react', props: { actions } },
]);
// 子应用
export async function mount(props) {
  props.setGlobalState({ user: { name: 'Jane Doe' } });
  props.onGlobalStateChange((state) => { console.log('子应用监听到全局状态:', state); });
}
// TODO: 推荐所有主子应用都通过全局状态 actions 进行通信。

// ! 5. 沙箱隔离
// * 沙箱用于隔离子应用的全局变量和样式，防止相互污染。
// ? 标准语法：start({ sandbox: { strictStyleIsolation: true } })
// 参数说明：
//   legacy：兼容模式，适用于不支持 Proxy 的浏览器
//   strictStyleIsolation：严格样式隔离（Shadow DOM）
//   experimentalStyleIsolation：实验性样式隔离（CSS 前缀）
// 示例：
start({ sandbox: { strictStyleIsolation: true } });
// TODO: 沙箱模式可根据实际兼容性和安全性选择。

// ! 6. 动态加载子应用
// * 可通过 loadMicroApp 动态加载和卸载子应用，适合弹窗、动态区域等场景。
// ? 标准语法：import { loadMicroApp } from 'qiankun'; loadMicroApp(config)
// 参数说明：
//   config：子应用配置对象
// 示例：
import { loadMicroApp } from 'qiankun';
const app = loadMicroApp({
  name: 'reactApp',
  entry: '//localhost:3000',
  container: '#dynamic-container',
  props: { user: { name: 'John Doe' } },
});
app.unmount();
// TODO: 动态加载适合弹窗、临时区域等场景，记得及时卸载。

// ! 7. 错误处理
// * 可通过 addErrorHandler 捕获子应用加载和运行时错误，便于统一处理异常。
// ? 标准语法：import { addErrorHandler } from 'qiankun'; addErrorHandler(fn)
// 参数说明：
//   fn：错误处理函数，参数为 error 对象
// 示例：
import { addErrorHandler } from 'qiankun';
addErrorHandler((error) => { console.error('子应用加载错误:', error); });
// TODO: 建议全局注册错误处理，提升系统健壮性。

// ! 8. 预加载子应用
// * 通过 prefetch 配置可在子应用激活前预加载资源，提升切换速度。
// ? 标准语法：start({ prefetch: true })
// 参数说明：
//   prefetch：true/false 或自定义函数
// 示例：
start({ prefetch: true });
// TODO: 预加载适合常用子应用，避免首次加载慢。

// ! 9. 调试工具与日志
// * 通过 logLevel 配置可开启调试日志，便于开发排查问题。
// ? 标准语法：start({ logLevel: 'debug' })
// 参数说明：
//   logLevel：'info' | 'warn' | 'error' | 'debug'
// 示例：
start({ logLevel: 'debug' });
// TODO: 生产环境建议关闭 debug 日志。

// ! 10. 补充：子应用独立运行与主应用集成
// * 子应用需兼容独立运行和被主应用加载两种模式，便于本地开发和联调。
// ? 标准语法：判断 window.__POWERED_BY_QIANKUN__
// 参数说明：
//   __POWERED_BY_QIANKUN__：qiankun 注入的全局变量
// 示例：
if (!window.__POWERED_BY_QIANKUN__) {
  // 独立运行逻辑
}
// TODO: 推荐所有子应用都实现独立运行能力，提升开发效率。

// ! 总结
// * qiankun 提供了完善的微前端解决方案，支持多子应用注册、沙箱隔离、主子通信、动态加载、错误处理等功能，适合中大型前端项目的微服务化改造。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 推荐结合官方文档和实际项目多实践，掌握 qiankun 高级用法。