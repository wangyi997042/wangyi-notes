import React from 'react';
import ReactDOM from 'react-dom';

let hookState = []; // 保存状态的数组
let hookIndex = 0; // 当前Hooks的索引

function App() {
  const initVal = { num: 1 };

  const reducer1 = (state, action) => {
    switch (action.type) {
      case 'add':
        return { num: state.num + 1 }
      case 'subtract':
        return { num: state.num - 1 }
      default:
        return state;
    }
  }

  function useReducer(reducer, initState) {
    hookState[hookIndex] = hookState[hookIndex] || initState;

    let currentIndex = hookIndex;

    function dispatch(action) {
      hookState[currentIndex] = reducer(hookState[currentIndex], action);
      render();
    }

    return [hookState[hookIndex++], dispatch]
  }

  const [state, dispatch] = useReducer(reducer1, initVal)

  return (
    <div>
      <div>{state.num}</div>
      <button onClick={() => dispatch({ type: 'add' })}>+</button>
      <button onClick={() => dispatch({ type: 'subtract' })}>-</button>
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
