
// 每个堆中总有一个执行栈 test自执行后形成一个 AAAAFFFF0000 的16进制的栈指向test的堆 返回的函数还在当前的上下文中
// const test = (function (i) {
//   return function () {
//     console.log(i * 2);
//   }
// })(2)

// test(5) // 2


// 第一次执行的时候A被覆盖， 但是覆盖的A的作用域还在函数A中 ++a a++ 获取值有延迟
var a = 0,
  b = 0;
function A(a) {
  A = function (b) {
    console.log(a + b++)
  }
  console.log(a++)
}

A(1); // 1
A(2) // 4