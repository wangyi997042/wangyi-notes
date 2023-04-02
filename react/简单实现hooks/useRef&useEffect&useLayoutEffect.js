import React from 'react';
import ReactDOM from 'react-dom';

let hookState = []; // 存放全局的状态数组
let hookIndex = 0; // 索引

function useEffect(callback, dependencies) {
  if (hookState[hookIndex]) { // 不是第一次
    const [lastDestory, lastDependencies] = hookState[hookIndex];
    const same = dependencies.every((item, index) => item === lastDependencies[index]);

    if (same) { // 依赖没有更新
      hookIndex++;
    } else { // 依赖更新了
      setTimeout(() => {
        lastDestory();
        let destory = callback();
        hookState[hookIndex++] = [destory, dependencies];
      })

    }
  } else {
    setTimeout(() => {
      let destory = callback();
      hookState[hookIndex++] = [destory, dependencies];
    })
  }
}

function useLayoutEffect(callback, dependencies) {
  if (hookState[hookIndex]) { // 不是第一次
    const [lastDestory, lastDependencies] = hookState[hookIndex];
    const same = dependencies.every((item, index) => item === lastDependencies[index]);

    if (same) { // 依赖没有更新
      hookIndex++;
    } else { // 依赖更新了
      lastDestory();

      queueMicrotask(() => {
        let destory = callback();
        hookState[hookIndex++] = [destory, dependencies];
      })

    }
  } else {
    queueMicrotask(() => {
      let destory = callback();
      hookState[hookIndex++] = [destory, dependencies];
    })
  }
}


function useRef(initRef = { current: null }) {
  if (hookState[hookIndex]) { // 不是第一次
    return hookState[hookIndex++];
  } else { // 第一次render
    hookState[hookIndex++] = initRef;
    return initRef;
  }
}

function App() {
  const red = useRef();
  const blue = useRef();

  useEffect(() => {
    red.current.style.transform = 'translate(500px)';
    red.current.style.transition = 'all 1s';
  }, [])

  useLayoutEffect(() => {
    blue.current.style.transform = 'translate(500px)';
    blue.current.style.transition = 'all 1s';
  }, [])
  return (
    <div>
      <div style={{ background: 'red', width: '100px', height: '100px' }} ref={red}></div>
      <div style={{ background: 'blue', width: '100px', height: '100px' }} ref={blue}></div>
    </div>
  )
}

function render() {
  hookIndex = 0;
  ReactDOM.render(
    < App />,
    document.getElementById('root')
  );
}
render();