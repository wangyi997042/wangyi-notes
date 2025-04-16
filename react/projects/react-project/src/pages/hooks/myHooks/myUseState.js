

// 存储状态的数组
let state = []
// 存储更改状态方法的数组
let setters = []
// 用来记录状态和更改状态方法对应关系的下标
let stateIndex = 0

// const render = () => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     document.getElementById("root")
//   );
// }

function createSetter(index) {
  return function (newState) {
    state[index] = newState
    // render() 调用一下渲染页面
  }
}

export const myUseState = (initialState) => {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  // 采用闭包缓存每个state对应的setState
  setters.push(createSetter(stateIndex))
  const value = state[stateIndex]
  const setter = setters[stateIndex]
  // 每创建完一组都要+1，用来作为下一组状态的索引
  stateIndex++
  return [value, setter]
}


export default myUseState;