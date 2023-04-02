import React from 'react';
import ReactDOM from 'react-dom';

let hookState = []; // 保存状态的数组 [1]
let hookIndex = 0; // 当前Hooks的索引 0

function useState(initState) {
  hookState[hookIndex] = hookState[hookIndex] || initState; // 不够严谨

  let currentIndex = hookIndex;

  function setState(newState) {
    if (typeof newState === 'function') {
      newState = newState(hookState[currentIndex]);
    }

    hookState[currentIndex] = newState;
    console.log('hookState: ', hookState);
    render() // 重新渲染页面
  }

  return [hookState[hookIndex++], setState]
}

function useEffect(callback, dependencies) {
  if (hookState[hookIndex]) {
    const [lastDestroy, lastDependencies] = hookState[hookIndex];
    const same = dependencies.every((item, index) => item === lastDependencies[index]);
    if (same) { //没更新
      hookIndex++;
    } else {
      lastDestroy();
      let destroy = callback();
      hookState[hookIndex++] = [destroy, dependencies];
    }
  } else {
    let destroy = callback();
    hookState[hookIndex++] = [destroy, dependencies];
  }
}

function App() {
  const [num, setNum] = useState(1);

  useEffect(() => {
    let time = setInterval(() => {
      setNum((val) => val + 1)
    }, 1000);
    return () => {
      clearInterval(time)
    }
  }, [num])

  return (
    <div>
      {num}
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
