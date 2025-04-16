import React from "react";
import { Provider } from 'react-redux'

import store from "./store";

import ConnectReduxPage from "./page/ConnectReduxPage";
import HooksPage from "./page/HooksPage";
import ReduxPage from "./page/ReduxPage";

export default class KReact extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <ReduxPage />
        {/* <HooksPage /> */}
        {/* <ConnectReduxPage /> */}
      </Provider>
    )
  }
}