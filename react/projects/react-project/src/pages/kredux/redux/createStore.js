function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }

  let currentState = reducer;
  let currentListeners = [];

  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach(listener => listener())
  }
  function getState() {
    return currentState;
  }
  function subscribe(listener) {
    currentListeners.push(listener)

    return () => {
      currentListeners = [];
    }
  }

  return {
    dispatch, // 触发更新
    getState, // 获取状态
    subscribe, //订阅
  }

}

export default createStore;