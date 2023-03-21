


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
let obj = {},
  a = {
    m: '1'
  },
  b = {
    n: '2'
  };

obj[a] = '王一';
obj[b] = 'wangyi';

console.log(obj[a]) // wangyi
console.dir(obj) // { '[object Object]': 'wangyi' }