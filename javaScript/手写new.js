var New = function (Fn) {
  var obj = {}; // 创建空对象
  var arg = Array.prototype.slice.call(arguments, 1);
  obj.__proto__ = Fn.prototype; // 将obj的原型链__proto__指向构造函数的原型prototype
  obj.__proto__.constructor = Fn; // 在原型链 __proto__上设置构造函数的构造器constructor，为了实例化Fn
  Fn.apply(obj, arg); // 执行Fn，并将构造函数Fn执行obj
  return obj; // 返回结果
};



function A(name) {
  this.name = name;
  return {
    age: 12
  }
}
var a = New(A('tom'));
console.dir(a);