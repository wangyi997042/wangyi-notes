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
    render() // 重新渲染页面
  }

  return [hookState[hookIndex++], setState]
}


function memo(OldComponent) {
  return class extends React.PureComponent {
    render() {
      return <OldComponent {...this.props} /> // 要记得props解构过去
    }
  }
}

function Child() {
  console.log('Child: ');
  return <div>child</div>
}

let ChildComponent = memo(Child);

// useMemo, memo => PureComponent, useCallback

function useCallback(callback, dependencies) {
  if (hookState[hookIndex]) { // 不是第一次
    const [lastCallback, lastDependcies] = hookState[hookIndex];
    const same = dependencies.every((item, index) => item === lastDependcies[index]);
    if (same) { // 依赖没有改变
      hookIndex++;
      return lastCallback;
    } else {
      hookState[hookIndex++] = [callback, dependencies];
      return callback;
    }

  } else { // 是第一次
    hookState[hookIndex++] = [callback, dependencies];
    return callback;
  }
}


function useMemo(factory, dependencies) {
  if (hookState[hookIndex]) { // 不是第一次
    const [lastDestroy, lastDependcies] = hookState[hookIndex];
    const same = dependencies.every((item, index) => item === lastDependcies[index]);
    if (same) { // 依赖没有改变
      hookIndex++;
      return lastDestroy;
    } else {
      let newMemo = factory();
      hookState[hookIndex++] = [newMemo, dependencies];
      return newMemo;
    }

  } else { // 是第一次
    let newMemo = factory();
    hookState[hookIndex++] = [newMemo, dependencies];
    return newMemo;
  }
}

function App() {
  const [name, setName] = useState('2');
  const [num, setNum] = useState(1);

  // const data = {num};
  const data = useMemo(() => ({ num }), [num])

  // const handleClick = React.useCallback(() => setName(num + 1), [num])

  // const handleClick = () => {
  //   setName(num + 1);
  // }

  const handleClick = useCallback(() => {
    setName(num + 1);
  }, [num])

  // useCallback为useMemo语法糖
  // const handleClick = useMemo(() => {
  //   return () => {
  //     setName(num + 1);
  //   }
  // }, [num])


  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <ChildComponent data={data} handle={handleClick} />
      <div>{num}</div>
      <button onClick={() => setNum((val) => val + 1)}>click</button>

    </div>
  )
}



function render() {
  hookIndex = 0; // 索引render要重置
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
};

render();
