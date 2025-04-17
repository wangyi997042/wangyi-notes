import React, { useReducer, useEffect, useLayoutEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { countReducer } from "../store";

const init = initArg => {
  return initArg - 0;
}

export default function HooksPage(props) {
  const count = useSelector(({ count }) => count)
  const [state, dispatch] = useReducer(countReducer, '0', init);
  const dispatc = useDispatch()

  useEffect(() => {
    console.log('useEffect', state, store.getState());
  }, [state])

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
  }, [])


  const minus = useCallback(
    () => {
      dispatc({ type: 'MINUS', payload: 1 })
    },
    []
  )
  return <div>
    <h3>HooksPage</h3>
    <p>{state}</p>
    <p>{count}</p>
    <button onClick={() => dispatch({ type: 'ADD' })}>add</button>
    <button onClick={minus}>minus</button>
  </div>
}