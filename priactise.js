function instanceOf(left, right) {
  let proto = left.__proto__;
  let prototype = right.prototype;

  while (true) {
    if (proto === null) {
      return false
    } else if (proto === prototype) {
      return true
    }
    proto = proto.__proto__;
  }
}

console.log(instanceOf({}, Function.prototype.__proto__)); // false;
