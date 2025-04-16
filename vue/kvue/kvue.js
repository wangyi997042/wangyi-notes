/*
### **注释说明**

1. **响应式系统**:
   - `defineReactive` 和 `observe` 实现了响应式数据的核心逻辑。
   - `Dep` 和 `Watcher` 实现了依赖收集和视图更新。

2. **模板编译**:
   - `Compile` 类负责解析模板中的指令和插值表达式，并绑定到响应式数据。

3. **指令处理**:
   - 支持 `k-text` 和 `k-html` 指令，动态更新节点内容。

4. **代理机制**:
   - `proxy` 方法将 `data` 中的属性代理到 `KVue` 实例上，方便访问。

5. **依赖管理**:
   - `Dep` 类管理依赖关系，`Watcher` 类监听数据变化并更新视图。


*/ 


// 给一个对象 obj 定义一个响应式的属性
function defineReactive(obj, key, val) {
  // 如果 val 是对象，则递归处理，使其内部属性也变为响应式
  observe(val);

  // 创建一个依赖管理器实例，用于管理依赖关系
  const dep = new Dep();

  // 使用 Object.defineProperty 定义响应式属性
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      // 依赖收集：如果当前有依赖目标（Watcher），将其添加到依赖管理器中
      Dep.target && dep.addDep(Dep.target);
      return val; // 返回属性值
    },
    set(newVal) {
      // 当属性值发生变化时触发
      if (newVal !== val) {
        console.log("set", key);
        val = newVal; // 更新属性值
        // 如果新值是对象，递归处理使其变为响应式
        observe(newVal);
        // 通知依赖更新
        dep.notify();
      }
    },
  });
}

// 遍历对象的所有属性并将其转为响应式
function observe(obj) {
  // 如果 obj 不是对象或为 null，则直接返回
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }

  // 创建一个 Observer 实例，对对象进行响应式处理
  new Observer(obj);
}

// 将传入对象中的所有 key 代理到指定对象上
function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]; // 代理读取操作到 $data
      },
      set(v) {
        vm.$data[key] = v; // 代理写入操作到 $data
      },
    });
  });
}

// Observer 类：负责将对象的所有属性转为响应式
class Observer {
  constructor(obj) {
    // 判断传入对象的类型
    if (Array.isArray(obj)) {
      // 如果是数组，进行特殊处理（此处未实现）
    } else {
      this.walk(obj); // 遍历对象的所有属性
    }
  }

  // 遍历对象的所有属性并调用 defineReactive
  walk(obj) {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

// KVue 类：实现一个简单的 Vue 框架
class KVue {
  constructor(options) {
    // 保存用户传入的选项
    this.$options = options;
    this.$data = options.data;

    // 对 data 进行响应式处理
    observe(options.data);

    // 将 data 中的属性代理到 KVue 实例上
    proxy(this);

    // 编译模板
    new Compile(options.el, this);
  }
}

// Compile 类：负责模板编译
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
    this.update(n, RegExp.$1, "text");
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

    // 创建 Watcher 实例，监听数据变化并更新视图
    new Watcher(this.$vm, exp, (val) => {
      fn && fn(node, val);
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

// Watcher 类：负责依赖收集和视图更新
class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm;
    this.key = key;
    this.updater = updater;

    // 将当前 Watcher 实例设置为 Dep.target
    Dep.target = this;
    this.vm[this.key]; // 触发 getter，完成依赖收集
    Dep.target = null; // 重置 Dep.target
  }

  // 更新视图
  update() {
    this.updater.call(this.vm, this.vm[this.key]);
  }
}

// Dep 类：依赖管理器，负责管理多个 Watcher
class Dep {
  constructor() {
    this.deps = []; // 存储依赖（Watcher 实例）
  }

  // 添加依赖
  addDep(dep) {
    this.deps.push(dep);
  }

  // 通知所有依赖更新
  notify() {
    this.deps.forEach((dep) => dep.update());
  }
}