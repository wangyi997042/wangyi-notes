
// createStore, applyMiddleware,
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from '../redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from "redux-promise"

import isPromise from 'is-promise'

export const countReducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'MINUS':
      return state - action.payload;
    default:
      return state
  }
}
// combineReducers({ home: countReducer })
// 
const store = createStore(combineReducers({ count: countReducer }), applyMiddleware(thunk, logger, promise))

export default store;

