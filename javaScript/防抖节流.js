/**
 // !防抖：
 * 多次触发事件，事件处理函数只执行一次，并且是在触发操作结束时执行。
 * 也就是说，当一个事件被触发，准备执行事件函数前，会等待一定的时间，在这个等待时间内，如果没有再次被触发，那么就执行，如果又触发了，那就本次作废，重置等待时间，直到最终能执行。
 * 主要应用场景：搜索框搜索输入，用户最后一次输入完，再发送请求；手机号、邮箱验证输入检测
 * 
 // !节流：
 * 事件触发后，规定时间内，事件处理函数不能再次被调用。也就是说在规定的时间内，函数只能被调用一次，且是最先被触发调用的那次。
 * 主要应用场景：高频点击、表单重复提交等。
 */


/*** 防抖函数 n 秒后再执行该事件，若在 n 秒内被重复触发，则重新计时
  * @param func 要被防抖的函数
  * @param wait 规定的时间
  */
function debounce(func, wait) {
  let timeout;
  return function () {
    let context = this; // 保存this指向
    let args = arguments; // 拿到event对象

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}

/*** 节流函数 n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
 * @param fn 要被节流的函数
 * @param wait 规定的时间
 */
function throttled(fn, wait) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, wait);
    }
  }
}
