

/**

var num = 1;
let obj = {
    num: 2,
    add: function() {
        this.num = 3;
        // 这里的立即指向函数，因为我们没有手动去指定它的this指向，所以都会指向window
        (function() {
            // 所有这个 this.num 就等于 window.num
            console.log(this.num);
            this.num = 4;
        })();
        console.log(this.num);
    },
    sub: function() {
        console.log(this.num)
    }
}

obj.add();  // undefined 3
console.log(obj.num);  // 3
console.log(num); // 1
const sub = obj.sub;
sub(); // 4



*/

/**
 * 在通过obj.add 调用add 函数时，函数的this指向的是obj,这时候第一个this.num=3
 * 相当于 obj.num = 3 但是里面的立即指向函数this依然是window,
 * 所以 立即执行函数里面console.log(this.num)输出1，同时 window.num = 4
 *立即执行函数之后，再输出`this.num`,这时候`this`是`obj`,所以输出3
 obj.add() // 输出 1 3

 // 通过上面`obj.add`的执行，obj.name 已经变成了3
 console.log(obj.num) // 输出3
 // 这个num是 window.num
 console.log(num) // 输出4
 // 如果将obj.sub 赋值给一个新的变量，那么这个函数的作用域将会变成新变量的作用域
 const sub = obj.sub
 // 作用域变成了window window.num 是 4
 sub() // 输出4

*/



/*

var num = 10
const obj = { num: 20 }
obj.fn = (function (num) {
  this.num = num * 3
  num++
  return function (n) {
    this.num += n
    num++
    console.log(num)
  }
})(obj.num)
var fn = obj.fn
fn(5) // 22  this指向window
obj.fn(10) // 23 this指向 obj
console.log(num, obj.num) // 60 30


*/

