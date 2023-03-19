const getType = (data) => {
  // 获取数据类型
  const baseType = Object.prototype.toString
    .call(data)
    .replace(/^\[object\s(.+)\]$/g, "$1")
    .toLowerCase();
  const type = data instanceof Element ? "element" : baseType;
  return type;
};
const isPrimitive = (data) => {
  // 判断是否是基本数据类型
  const primitiveType = "undefined,null,boolean,string,symbol,number,bigint,map,set,weakmap,weakset".split(
    ","
  ); // 其实还有很多类型
  return primitiveType.includes(getType(data));
};
const isObject = (data) => getType(data) === "object";
const isArray = (data) => getType(data) === "array";
const deepClone = (data) => {
  let cache = {}; // 缓存值，防止循环引用
  const baseClone = (_data) => {
    let res;
    if (isPrimitive(_data)) {
      return data;
    } else if (isObject(_data)) {
      res = { ..._data };
    } else if (isArray(_data)) {
      res = [..._data];
    }
    // 判断是否有复杂类型的数据，有就递归
    Reflect.ownKeys(res).forEach((key) => {
      if (res[key] && getType(res[key]) === "object") {
        // 用cache来记录已经被复制过的引用地址。用来解决循环引用的问题
        if (cache[res[key]]) {
          res[key] = cache[res[key]];
        } else {
          cache[res[key]] = res[key];
          res[key] = baseClone(res[key]);
        }
      }
    });
    return res;
  };
  return baseClone(data);
};


// 方法2
function deepClone2(obj = {}, map = new Map()) {
  if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj
  if (map.get(obj)) {
    return map.get(obj);
  }
  let result = {}; // 初始化返回结果
  if (
    obj instanceof Array ||
    // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
    Object.prototype.toString(obj) === "[object Array]"
  ) {
    result = [];
  }
  // 防止循环引用
  map.set(obj, result);
  for (const key in obj) {
    // 保证 key 不是原型属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key], map);
    }
  }
  return result;
}