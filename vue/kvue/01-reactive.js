// defineReactive 函数:

// 核心功能是为对象的某个属性定义响应式行为。
// 使用 Object.defineProperty 拦截属性的 get 和 set 操作。
// 在 get 中打印日志并返回属性值。
// 在 set 中更新属性值，并递归处理新值（如果是对象）。
// observe 函数:

// 遍历对象的所有属性，并调用 defineReactive 将其转为响应式。
// 如果传入的值不是对象或为 null，直接返回。
// set 函数:

// 用于动态添加一个新的响应式属性。
// 调用 defineReactive 为新属性定义响应式行为。
// 测试代码:

// 创建一个包含嵌套对象的测试对象 obj。
// 调用 observe 将对象转为响应式。
// 测试访问和修改属性时是否触发 get 和 set。
// 测试动态添加新属性并访问。




// 给一个对象 obj 定义一个响应式的属性
function defineReactive(obj, key, val) {
  // 递归处理：如果 val 是对象，则递归调用 observe 使其内部属性也变为响应式
  observe(val);

  // 使用 Object.defineProperty 定义响应式属性
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key); // 当属性被访问时，打印日志
      return val; // 返回属性值
    },
    set(newVal) {
      // 当属性被修改时触发
      if (newVal !== val) {
        console.log("set", key); // 打印日志
        val = newVal; // 更新属性值
        // 如果新值是对象，递归处理使其变为响应式
        observe(newVal);
        // update() // 可在此处触发视图更新逻辑
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

  // 遍历对象的所有属性，调用 defineReactive 使其变为响应式
  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}

// 动态为对象添加一个响应式属性
function set(obj, key, val) {
  // 调用 defineReactive 为新属性定义响应式
  defineReactive(obj, key, val);
}

// 测试代码
const obj = {
  foo: 'foo', // 普通字符串属性
  bar: 'bar', // 普通字符串属性
  baz: {      // 嵌套对象
    n: 1      // 嵌套对象的属性
  }
};

// 将对象 obj 转为响应式
observe(obj);

// 测试访问和修改属性
// obj.foo; // 访问 foo 属性，触发 get
// obj.baz = { n: 10 }; // 修改 baz 属性，触发 set
// obj.baz.n; // 访问嵌套对象 baz 的 n 属性，触发 get

// 动态添加一个新属性并访问
set(obj, 'dong', 'dong'); // 动态添加响应式属性 dong
obj.dong; // 访问 dong 属性，触发 get