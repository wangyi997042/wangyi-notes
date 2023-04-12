// 数组的方法
// var arr = [1, 3, 2, 4, 5];
// var arr1 = [6, 7, 8, 9];

// ! 改变原数组的方法有 shift unshift  pop push reverse sort splice fill

// * 1.concat()  连接两个或更多的数组，并返回结果。原数组不变
// arr.concat(arr1)  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// * 2.join()    把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。原数组不变
// arr.join("-") // "1-2-3-4-5"

// * 3.pop()    删除并返回数组的最后一个元素。。原数组改变
// arr.pop() //5

// * 4.push()    向数组的末尾添加一个或更多元素，并返回新的长度。原数组改变
// arr.push(5) //5

// * 5.reverse()    颠倒数组中元素的顺序。原数组改变
// arr.reverse()  //(5) [5, 4, 3, 2, 1]

// * 6.shift()    删除并返回数组的第一个元素.。。原数组改变
// arr.shift()  //1

// * 7.unshift()    向数组的开头添加一个或更多元素，并返回新的长度。原数组改变
// arr.unshift(1) //5

// * 8.slice(start, end)    从某个已有的数组返回选定的元素。。
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
// console.log(animals.slice(2)); // ["camel", "duck", "elephant"]
// console.log(animals.slice(2, 4)); // ["camel", "duck"]
// console.log(animals.slice(1, 5)); // ["bison", "camel", "duck", "elephant"]
// console.log(animals.slice(-2)); // ["duck", "elephant"]
// console.log(animals.slice(2, -1)); // ["camel", "duck"]
// console.log(animals.slice()); // ["ant", "bison", "camel", "duck", "elephant"]

// * 9.sort()    对数组的元素进行排序
// console.log(arr.sort()) // [ 1, 2, 3, 4, 5 ]

// function compareFn(a, b) {
// > 0	a 在 b 后
// < 0	a 在 b 前
// === 0	保持 a 和 b 的顺序

// 在某些排序规则中，a 小于 b
//   if (a<b) {
//     return -1;
//   }
// 在这一排序规则下，a 大于 b
//   if (a>b) {
//     return 1;
//   }
// a 一定等于 b
//   return 0;
// }
// console.log(arr.sort(compareFn)) // [ 1, 2, 3, 4, 5 ]
// console.log(arr.sort((a,b) => a-b)) // [ 1, 2, 3, 4, 5 ]

// * 10.splice(start, deleteCount, item1, item2, itemN)    删除元素，并向数组添加新元素。
// let arr = [1, 2, 3, 4, 5];
// let arr1 = arr.splice(2, 0 'haha')
// let arr2 = arr.splice(2, 3)
// let arr1 = arr.splice(2, 1, 'haha')
// console.log(arr1) //[1, 2, 'haha', 3, 4, 5]新增一个元素
// console.log(arr2) //[1, 2] 删除三个元素
// console.log(arr3) //[1, 2, 'haha', 4, 5] 替换一个元素
// console.log(arr); // [ 1, 2, 'haha', 4, 5 ]


// * 12.toString()    把数组转换为字符串，并返回结果。原数组不变
// arr.toString() //"1,2,3,4,5"

// * 13. toLocaleString()    把数组转换为本地数组，并返回结果。原数组不变
// var a = arr.toLocaleString() //"1,2,3,4,5"
// console.log(a);

// * 14.valueOf()    返回数组对象的原始值
// var arr = [1,null,3,4,5]; 
// console.log(arr.valueOf()); // [ 1, null, 3, 4, 5 ]

// * 15. Array.map() 此方法是将数组中的每个元素调用一个提供的函数，结果作为一个新的数组返回，并没有改变原来的数组
// let arr = [1, 2, 3, 4, 5]
// let newArr = arr.map(x => x*2)
//arr= [1, 2, 3, 4, 5]   原数组保持不变
//newArr = [2, 4, 6, 8, 10] 返回新数组




// * 16. Array.forEach() 此方法是将数组中的每个元素执行传进提供的函数，没有返回值，直接改变原数组，注意和map方法区分

// let arr = [1, 2, 3, 4, 5]
//    num.forEach(x => x*2)
// arr = [2, 4, 6, 8, 10]  数组改变,注意和map区分




// * 17.Array.filter()  此方法是将所有元素进行判断，将满足条件的元素作为一个新的数组返回

// let arr = [1, 2, 3, 4, 5]
// const isBigEnough = value => value >= 3
// let newArr = arr.filter(isBigEnough )
// newNum = [3, 4, 5] 满足条件的元素返回为一个新的数组


// * 18 Array.every() 此方法是将所有元素进行判断返回一个布尔值，如果所有元素都满足判断条件，则返回true，否则为false：
// let arr = [1, 2, 3, 4, 5]
// const isLessThan4 => value => value < 4
// const isLessThan6 => value => value < 6
// arr.every(isLessThan4 ) //false
// arr.every(isLessThan6 ) //true


// * 19 Array.some() 此方法是将所有元素进行判断返回一个布尔值，如果存在元素都满足判断条件，则返回true，若所有元素都不满足判断条件，则返回false：
// let arr= [1, 2, 3, 4, 5]
// const isLessThan4 => value => value < 4
// const isLessThan6 => value => value > 6
// arr.some(isLessThan4 ) //true
// arr.some(isLessThan6 ) //false

// * 20.Array.reduce() 此方法是所有元素调用返回函数，返回值为最后结果,传入的值必须是函数类型：
// let arr = [1, 2, 3, 4, 5]
// const add = (a, b) => a + b
// let sum = arr.reduce(add)
// sum = 15  相当于累加的效果
// 与之相对应的还有一个 Array.reduceRight() 方法，区别是这个是从右向左操作的

// * 21. Array.isArray() 判断一个对象是不是数组，返回的是布尔值
// arr.isArray() // true

// * 22.Array.from( 需要转换为数组的对象，（映射函数）调用的函数， 映射函数中的this对象 )
//  var arr = Array.from([1, 2, 3], x => x * 10);
// arr[0] == 10; 
// arr[1] == 20; 
// arr[2] == 30;

// * 23 fill(value, start, end) 数组填充
// let array1 = [1, 2, 3, 4];
// console.log(array1.fill(0, 2, 4)); // [1, 2, 0, 0]
// // console.log(array1.fill(5, 1)); // [1, 5, 5, 5]
// console.log(array1.fill(6)); // [6, 6, 6, 6]
// console.log(array1) // [6, 6, 6, 6]

// * 23 copyWithin(target, start, end) 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
// const array1 = ['a', 'b', 'c', 'd', 'e'];
// console.log(array1.copyWithin(0, 3, 4)); // ["d", "b", "c", "d", "e"]
// console.log(array1.copyWithin(1, 3)); //  ["d", "d", "e", "d", "e"]
// console.log(array1) // [ 'd', 'b', 'c', 'd', 'e' ]
