import React from 'react';
import { connect } from 'react-redux'

import store from '../store';

class ReduxPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    if (this.unsubscribe) {

      this.unsubscribe()
    }
  }

  add = () => {
    store.dispatch({ type: 'ADD' })
  }

  addAsy = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: 'ADD' })
        console.log('addAsy', getState());
      }, 1000)
    })
  }

  addPromise = () => {
    store.dispatch(
      Promise.resolve({
        type: 'MINUS',
        payload: '10'
      })
    )
  }


  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.addAsy}>addAsy</button>
        <button onClick={this.addPromise}>addPromise</button>
      </div>
    )
  }
}

export default ReduxPage;