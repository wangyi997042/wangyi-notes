import React, { Component } from "react";
import { ThemeContext, UserContext } from "./Context";

export default class ContextTypePage extends Component {
  static contextType = UserContext;

  render() {
    console.log(this.context);

    return (
      <div>
        <h3>h3</h3>
      </div>
    );
  }
}
