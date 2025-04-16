import React, { useState } from "react";
import ReactDOM from "react-dom";
import myUseState from "./myHooks/myUseState";
import { Button } from "antd";

const ReactHooks = () => {
  // const [count, setCount] = myUseState(0);
  // const [count1, setCount1] = myUseState(100);
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(100);

  console.log(count, count1);

  const handleAdd = () => {
    new Promise((resolve, reject) => {
      resolve()
    }).then(() => {
      setCount(count + 1)
      setCount1(count1 + 1)
    })
  }
  const handleSub = () => {
    setCount(count - 1)
    setCount1(count1 - 1)
  }

  return (
    <div>
      <div>点击次数：{count}</div>
      <Button onClick={handleAdd}>+</Button>
      <Button onClick={handleSub}>-</Button>
    </div>
  )
}

export default ReactHooks;
