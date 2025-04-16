/**
注释说明
Store 类:

负责维护响应式的 state。
提供 commit 方法触发同步的 mutation。
提供 dispatch 方法触发异步的 action。
响应式 state:

使用 Vue 实例的 data 选项将 state 转为响应式数据。
通过 get state 暴露响应式 state，并禁止直接修改。
commit 和 dispatch:

commit 用于触发同步的 mutation，直接修改 state。
dispatch 用于触发异步的 action，可以包含异步逻辑。
install 方法:

注册全局混入，在组件的 beforeCreate 生命周期中挂载 $store。
使得所有组件都可以通过 this.$store 访问 Store 实例。
导出对象:

包含 Store 类和 install 方法，类似 Vuex 的插件结构。

*/ 


// 实现一个简单的 Vuex 插件：
// 1. 声明一个 Store 类：维护响应式 state，暴露 commit 和 dispatch 方法。
// 2. 实现 install 方法：用于注册 $store，使其可以在 Vue 组件中通过 this.$store 访问。

class Store {
  constructor(options) {
    // 保存用户传入的选项
    this.$options = options;

    // 保存 mutations 和 actions
    this._mutations = options.mutations;
    this._actions = options.actions;

    console.log(Vue);

    // 创建响应式的 state
    // 使用 Vue 实例的 data 选项将 state 转为响应式数据
    this._vm = new Vue({
      data() {
        return {
          // 使用 $$state 避免 Vue 对其代理
          $$state: options.state,
        };
      },
    });

    // 绑定 commit 和 dispatch 的上下文为当前 Store 实例
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    // TODO: getter 接口如何暴露
  }

  // 使用 getter 暴露 state，确保外部只能通过 this.state 访问
  get state() {
    return this._vm._data.$$state; // 返回响应式的 state
  }

  // 禁止直接修改 state，提示用户使用 replaceState 方法
  set state(v) {
    console.error('请使用 replaceState() 去修改状态');
  }

  // commit 方法：用于触发同步的 mutation
  // 示例：this.$store.commit('add', payload)
  commit(type, payload) {
    // 查找对应的 mutation
    const entry = this._mutations[type];
    if (!entry) {
      console.error(`Mutation "${type}" 不存在`);
      return;
    }
    // 调用 mutation，并传入 state 和 payload
    entry(this.state, payload);
  }

  // dispatch 方法：用于触发异步的 action
  // 示例：this.$store.dispatch('asyncAdd', payload)
  dispatch(type, payload) {
    // 查找对应的 action
    const entry = this._actions[type];
    if (!entry) {
      console.error(`Action "${type}" 不存在`);
      return;
    }
    // 调用 action，并传入当前 Store 实例和 payload
    // 上下文包含 { commit, dispatch, state }
    return entry(this, payload);
  }
}

// 保存 Vue 构造函数的引用
let Vue;

// install 方法：用于注册 $store
function install(_Vue) {
  Vue = _Vue; // 保存 Vue 构造函数

  // 使用全局混入，在每个组件的 beforeCreate 生命周期中注册 $store
  Vue.mixin({
    beforeCreate() {
      // 如果当前组件有 store 选项，则将其挂载到 Vue 原型上
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

// 导出对象是一个类似 Vuex 的插件
// 包含 Store 类和 install 方法
export default { Store, install };