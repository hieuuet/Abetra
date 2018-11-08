/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";

import { WrapperRoot } from "./src/routers/Navigation";

import { Provider } from "react-redux";
import store from "./src/store/index";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <WrapperRoot />
      </Provider>
    );
  }
}
