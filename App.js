/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  NetInfo,
  YellowBox
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RootStack from "./src/routers/Navigation";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

import { Provider } from "react-redux";
import store from "./src/store/index";
import WrapperTab from "./src/containers/WrapperTab";
export default class App extends Component {
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }
  _handleConnectionChange = isConnected => {
    store.dispatch({ type: "NETWORK_CHANGE", payload: { isConnected } });
  };

  render() {
    YellowBox.ignoreWarnings([
      "Warning: componentWillMount is deprecated",
      "Warning: componentWillReceiveProps is deprecated",
      "Warning: isMounted(...) is deprecated"
    ]);
    return (
      // <SafeAreaView style={styles.safeArea}>
      <Provider store={store}>
        <RootStack />
      </Provider>
      //  </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#00c853'
  }
});
