/**
 * applyMiddleware 是一个高阶函数，用于增强 Redux 的 store，支持中间件功能。
 * 它接收多个中间件，并返回一个增强后的 createStore 函数。
 * @param {...Function} middlewares - 中间件函数列表
 * @returns {Function} - 增强后的 createStore 函数
 */
function applyMiddleware(...middlewares) {
  // 返回一个增强后的 createStore 函数
  return createStore => reducer => {
    // 创建原始的 store
    const store = createStore(reducer);
    // 保存原始的 dispatch 方法
    let dispatch = store.dispatch;

    // 中间件 API，提供 getState 和 dispatch 方法给中间件使用
    const midApi = {
      getState: store.getState, // 获取当前 state
      dispatch: (action, ...args) => dispatch(action, ...args) // 调用增强后的 dispatch
    };

    // 将所有中间件初始化，并传入 midApi
    const middlewareChain = middlewares.map(middleware => middleware(midApi));

    // 使用 compose 将所有中间件组合起来，生成增强后的 dispatch 方法
    dispatch = compose(...middlewareChain)(store.dispatch);

    // 返回增强后的 store，其中包含增强后的 dispatch 方法
    return {
      ...store,
      dispatch
    };
  };
}

/**
 * compose 是一个函数组合工具，用于将多个函数从右到左依次执行。
 * @param {...Function} funcs - 要组合的函数列表
 * @returns {Function} - 组合后的函数
 */
function compose(...funcs) {
  if (funcs.length === 0) {
    // 如果没有传入函数，返回一个原样返回参数的函数
    return args => args;
  }
  if (funcs.length === 1) {
    // 如果只有一个函数，直接返回该函数
    return funcs[0];
  }
  // 使用 reduce 从右到左组合函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export default applyMiddleware;