
// for in遍历的是数组的索引（index），而for of遍历的是数组元素值（value）

// for in总是得到对象的key或数组、字符串的下标

// for of总是得到对象的value或数组、字符串的值

/*
const arr = [1, 2, 3, 4, 5];

const obj = {
  mark: "mark-v",
  jack: "jack-v",
  amy: "amy-v",
};

for (const i in arr) {  // 输出 0 1 2 3 4
  console.log(i);
}

for (const i in obj) { // 输出 mark jack amy
  console.log(i);
}


// for in
var obj = {a:1, b:2, c:3}
    
for (let key in obj) {
  console.log(key)
}
// a b c

//for of
const array1 = ['a', 'b', 'c']

for (const val of array1) {
  console.log(val)
}
// a b c

*/