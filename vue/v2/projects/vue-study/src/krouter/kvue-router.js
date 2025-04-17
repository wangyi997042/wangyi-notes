let Vue;

// vue插件编写
// 实现一个install方法
class VueRouter {
  constructor(options) {
    console.log(Vue); // 打印Vue构造函数，方便调试
    this.$options = options; // 保存用户传入的路由配置

    // 保存当前hash到current
    // current应该是响应式的
    // 给指定对象定义响应式属性
    Vue.util.defineReactive(
      this,
      "current",
      window.location.hash.slice(1) || "/" // 默认值为根路径
    );

    // 监听hash变化，更新current值
    window.addEventListener("hashchange", () => {
      // #/about => /about
      this.current = window.location.hash.slice(1);
    });
  }
}

// 形参1是Vue构造函数: 目的是便于扩展
VueRouter.install = function(_Vue) {
  Vue = _Vue; // 保存Vue构造函数，供后续使用

  // 1. 将$router注册到Vue实例
  Vue.mixin({
    beforeCreate() {
      // 只需要在根实例时执行一次
      if (this.$options.router) {
        // 将路由实例挂载到Vue原型上，方便所有组件访问
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 2. 注册两个全局组件：router-link, router-view
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true, // to属性是必填的
      },
    },
    render(h) {
      // 渲染一个<a>标签，href指向hash路径
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to, // 拼接hash路径
          },
        },
        this.$slots.default // 渲染插槽内容
      );
    },
  });

  Vue.component("router-view", {
    render(h) {
      // 根据当前路径匹配对应的组件
      let component = null;
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      if (route) {
        component = route.component; // 获取匹配的组件
      }
      return h(component); // 渲染匹配的组件
    },
  });
};

export default VueRouter;
