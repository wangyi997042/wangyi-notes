// call()可以传递两个参数，第一个参数是指定函数内部中this的指向，第二个参数是函数调用时需要传递的参数。改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次。

Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this != "function") {
    throw new Error("type error");
  }
  // 首先获取参数
  let args = [...arguments].slice(1);
  let res = null;
  // 判断context是否传入，如果没有，就设置为window
  context = context || window;
  // 将被调用的方法置入context的属性
  // this 即为要调用的方法
  context.fn = this;
  // 执行要被调用的方法
  res = context.fn(...args);
  // 删除手动增加的属性方法
  delete context.fn;
  // 执行结果返回
  return res;
}

// apply()接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入。改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次。
Function.prototype.myApply = function (context) {
  if (typeof this != "function") {
    throw new Error("type error");
  }
  let res = null;
  context = context || window;
  // 使用 symbol 来保证属性唯一
  // 也就是保证不会重写用户自己原来定义在context中的同名属性
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  // 执行被调用的方法
  if (arguments[1]) {
    res = context[fnSymbol](...arguments[1]);
  } else {
    res = context[fnSymbol]();
  }
  delete context[fnSymbol];
  return res;
}

// bind()方法的第一参数也是this的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)。
// 改变this指向后不会立即执行，而是返回一个永久改变this指向的函数。
Function.prototype.myBind = function (context) {
  if (typeof this != "function") {
    throw new Error("type error");
  }
  let args = [...arguments].slice(1);
  const fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      // 当前这个 arguments 是指 Fn 的参数
      args.concat(...arguments)
    );
  };
}

let obj = {
  name: '老鼠',
  age: '2',
  myFuc: function (hobby) {
    console.log(this.name + '年龄' + this.age + hobby)
  }
}

let db = {
  name: '小猫',
  age: 5
}

obj.myFuc() // 老鼠年龄2undefined
obj.myFuc.apply(db, ['抓老鼠']) // 小猫年龄5抓老鼠
obj.myFuc.call(db, '抓老鼠') // 小猫年龄5抓老鼠
obj.myFuc.bind(db, '抓小鸡')('抓老鼠') // 小猫年龄5抓小鸡
obj.myFuc() // 老鼠年龄2undefined

obj.myFuc.myCall(db, '抓老鼠') // 小猫年龄5抓老鼠
obj.myFuc.myApply(db, ['抓老鼠']) // 小猫年龄5抓老鼠
obj.myFuc.myBind(db, '抓小鸡')('抓老鼠') // 小猫年龄5抓小鸡



