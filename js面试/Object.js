


// 对象的key 可以是 Boolean/null/undifined

// 属性名不能相同， 一般数字 == 字符串属性名 数组是特殊的对象类型 
/*
let obj = {};
let a = 0;
let b = '0';

obj[a] = '王一';
obj[b] = 'wangyi';

console.log(obj[a]) // wangyi
*/


// Symbol 是创建唯一值的 Symbol(1) != Symbol(1)
/*
let obj = {},
  a = Symbol(1),
  b = Symbol(1);

obj[a] = '王一';
obj[b] = 'wangyi';

console.log(obj[a]) // 王一
*/

// 对象被转换成字符串 {}.toString() => '[object Object]'
// let obj = {},
//   a = {
//     m: '1'
//   },
//   b = {
//     n: '2'
//   };

// obj[a] = '王一';
// obj[b] = 'wangyi';

// console.log(obj[a]) // wangyi
// console.dir(obj) // { '[object Object]': 'wangyi' }


// ! Object (分为 : 属性、 原型方法、实例方法)
// ! 属性 :
// * 1.Object.prototype.writable : 默认为false

// * 2.Object.prototype.enumerable : 默认为false

// * 3.Object.prototype.configurable : 默认为false

// * 4.Object.prototype.constructor :用于创建一个对象的原型

// ! 原型方法 :
// * 1.Object.prototype.hasOwnProperty() : 是否包含某个属性,不来自于原型

// * 2.Object.prototype.IfPrototypeOf() : 在原型链中是否包含某个属性

// * 3.Object.prototype.propertylsEnumerable() : 判断指定属性是否可枚举

// * 4.Object.prototype.toString() : 返回对象的字符串表示

// * 5.Object.prototype.watch() : 给对象的某个属性增加监听

// * 6.Object.prototype.unwatch() : 移除对象某个属性的监听

// * 7.Object.prototype.valueOf() : 返回指定对象的原始值

// ! 实例方法:
// * Object.create(pro,obj) : 创建一个对象

// * Object.assign(target,...obj) : 浅拷贝
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(target); // expected output: Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget); // expected output: Object { a: 1, b: 4, c: 5 }

// * Object.defineProperty(obj, prop, descriptor) : 添加或修改一个自有属性并返回对象
// const object1 = {};
// Object.defineProperty(object1, 'property1', {
//   value: 42,
//   writable: false
// });
// object1.property1 = 77; // throws an error in strict mode
// console.log(object1.property1); // expected output: 42


// * Object.getOwnPropertyDescriptor(obj, prop) : 返回属性描述

// * Object.defineProperties(obj, props) : 添加或修改多个自有属性并返回对象
// var obj = {};
// Object.defineProperties(obj, {
//   'property1': {
//     value: true,
//     writable: true
//   },
//   'property2': {
//     value: 'Hello',
//     writable: false
//   }
//   // etc. etc.
// });

// * Object.freeze(obj) : 冻结对象,对象不可改变

// * Object.entries(obj) : 返回对象键值对数据

// * Object.getOwnPropertyNames(obj) : 返回属性名构成的数组

// * Object.getPrototypeOf(obj) : 返回对象原型

// * Object.is(value1, value2) : 判断两个字是否相等,约等于 ===
// Object.is('foo', 'foo');     // true
// Object.is(window, window);   // true

// Object.is('foo', 'bar');     // false
// Object.is([], []);           // false

// var foo = { a: 1 };
// var bar = { a: 1 };
// Object.is(foo, foo);         // true
// Object.is(foo, bar);         // false

// Object.is(null, null);       // true

// // 特例
// Object.is(0, -0);            // false
// Object.is(-0, -0);           // true
// Object.is(NaN, 0/0);         // true

// * Object.values() 返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )
// var obj = { foo: 'bar', baz: 42 };
// console.log(Object.values(obj)); // ['bar', 42]

// var obj = { 0: 'a', 1: 'b', 2: 'c' };
// console.log(Object.values(obj)); // ['a', 'b', 'c']

// var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
// console.log(Object.values(an_obj)); // ['b', 'c', 'a']

// var my_obj = Object.create({}, { getFoo: { value: function() { return this.foo; } } });
// my_obj.foo = 'bar';
// console.log(Object.values(my_obj)); // ['bar']

// console.log(Object.values('foo')); // ['f', 'o', 'o']

// * Object.keys()  会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 
// var arr = ['a', 'b', 'c'];
// console.log(Object.keys(arr)); // console: ['0', '1', '2']

// var obj = { 0: 'a', 1: 'b', 2: 'c' };
// console.log(Object.keys(obj)); // console: ['0', '1', '2']

// var anObj = { 100: 'a', 2: 'b', 7: 'c' };
// console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// var myObj = Object.create({}, {
//   getFoo: {
//     value: function () { return this.foo; }
//   }
// });
// myObj.foo = 1;
// console.log(Object.keys(myObj)); // console: ['foo']