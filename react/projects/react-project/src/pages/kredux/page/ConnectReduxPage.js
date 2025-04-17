import React, { Component, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class ConnectReduxPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log('ConnectReduxPage', this.props);
    const { count, add, minus } = this.props;
    return (
      <div>
        <h3>ConnectReduxPage</h3>
        <p>{count}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { count: state.count }
}
const mapDispatchToProps = (dispatch) => {
  let creator = {
    add: () => ({ type: 'ADD' }),
    minus: () => ({ type: 'MINUS', payload: 10 })
  }
  creator = bindActionCreators(creator, dispatch)

  return {
    // add: () => dispatch({ type: 'ADD' }),
    dispatch,
    ...creator
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConnectReduxPage);