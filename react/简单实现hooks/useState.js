import React from 'react';
import ReactDOM from 'react-dom';

// let lastState;

// function useState(initState) {
//   lastState = lastState || initState;

//   function setState(newState) {
//     lastState = newState;
//     render();
//   }

//   return [lastState, setState]
// }

let hookState = []; // 保存状态的数组 [1]
let hookIndex = 0; // 当前Hooks的索引 0

function useState(initState) {
  hookState[hookIndex] = hookState[hookIndex] || initState; // 不够严谨

  let currentIndex = hookIndex; // 缓存索引

  function setState(newState) {
    if (typeof newState === 'function') {
      newState = newState(hookState[currentIndex]);
    }
    // console.log('hookIndex: ', currentIndex); // 0 // 1

    hookState[currentIndex] = newState;
    render() // 重新渲染页面
  }

  return [hookState[hookIndex++], setState]
}

function App() {
  const [num, setNum] = useState(1);
  const [num1, setNum1] = useState(2);

  return (
    <div>
      <div>{num}</div>
      <button onClick={() => setNum((val) => val + 1)}>click</button>
      <div>{num1}</div>
      <button onClick={() => setNum1(num1 + 1)}>click</button>
    </div>
  )
}



function render() {
  hookIndex = 0;
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
};

render();
