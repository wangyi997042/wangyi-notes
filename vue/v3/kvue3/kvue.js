/*
### **实现说明**

1. **响应式系统**:
   - 使用 `Proxy` 和 `Reflect` 替代 `Object.defineProperty` 实现响应式数据。
   - `track` 和 `trigger` 实现了依赖收集和触发更新。

2. **模板编译**:
   - `Compile` 类负责解析模板中的指令和插值表达式，并绑定到响应式数据。

3. **指令处理**:
   - 支持 `k-text` 和 `k-html` 指令，动态更新节点内容。

4. **副作用管理**:
   - 使用 `effect` 函数注册副作用，依赖数据变化时自动更新视图。

*/ 


// 创建响应式数据
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      console.log("get", key); // 打印日志
      track(target, key); // 依赖收集
      return typeof res === "object" && res !== null ? reactive(res) : res; // 递归处理嵌套对象
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      console.log("set", key, value); // 打印日志
      trigger(target, key); // 触发依赖更新
      return res;
    },
  });
}

// 存储依赖的全局变量
let activeEffect = null;

// 依赖收集
function track(target, key) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  dep.add(activeEffect);
}

// 触发依赖更新
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }
}

// 存储所有依赖的映射
const targetMap = new WeakMap();

// 创建一个 effect 函数，用于注册副作用
function effect(fn) {
  const effectFn = () => {
    activeEffect = effectFn;
    fn(); // 执行副作用函数
    activeEffect = null;
  };
  effectFn();
}

// 简单的模板编译器
class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    if (this.$el) {
      this.compile(this.$el); // 编译模板
    }
  }

  // 遍历节点，判断节点类型并进行处理
  compile(node) {
    const childNodes = node.childNodes;

    Array.from(childNodes).forEach((n) => {
      if (this.isElement(n)) {
        // 如果是元素节点，编译元素
        this.compileElement(n);
        // 递归编译子节点
        if (n.childNodes.length > 0) {
          this.compile(n);
        }
      } else if (this.isInter(n)) {
        // 如果是插值表达式，编译文本
        this.compileText(n);
      }
    });
  }

  // 判断是否是元素节点
  isElement(n) {
    return n.nodeType === 1;
  }

  // 判断是否是插值表达式
  isInter(n) {
    return n.nodeType === 3 && /\{\{(.*)\}\}/.test(n.textContent);
  }

  // 编译插值文本 {{ooxx}}
  compileText(n) {
    this.update(n, RegExp.$1.trim(), "text");
  }

  // 编译元素：处理指令和事件
  compileElement(n) {
    const attrs = n.attributes;
    Array.from(attrs).forEach((attr) => {
      const attrName = attr.name;
      const exp = attr.value;

      // 如果是指令（k-开头）
      if (this.isDir(attrName)) {
        const dir = attrName.substring(2); // 获取指令名称
        this[dir] && this[dir](n, exp); // 执行指令处理函数
      }
    });
  }

  // 更新节点内容
  update(node, exp, dir) {
    const fn = this[dir + "Updater"];
    fn && fn(node, this.$vm[exp]);

    // 创建一个 effect，监听数据变化并更新视图
    effect(() => {
      fn && fn(node, this.$vm[exp]);
    });
  }

  // k-text 指令
  text(node, exp) {
    this.update(node, exp, "text");
  }

  textUpdater(node, val) {
    node.textContent = val;
  }

  // k-html 指令
  html(node, exp) {
    this.update(node, exp, "html");
  }

  htmlUpdater(node, val) {
    node.innerHTML = val;
  }

  // 判断是否是指令
  isDir(attrName) {
    return attrName.startsWith("k-");
  }
}

// KVue3 类：实现一个简单的 Vue 3 框架
class KVue3 {
  constructor(options) {
    this.$options = options;
    this.$data = reactive(options.data); // 使用 reactive 创建响应式数据

    // 编译模板
    new Compile(options.el, this);
  }
}

// 测试代码
const vm = new KVue3({
  el: "#app",
  data: {
    message: "Hello Vue 3!",
    htmlContent: "<strong>Bold Text</strong>",
  },
});

// HTML 示例
// <div id="app">
//   <p k-text="message"></p>
//   <div k-html="htmlContent"></div>
// </div>