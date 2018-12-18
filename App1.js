/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { NetInfo, YellowBox, Text, View, BackHandler } from "react-native";
import RootStack from "./src/routers/Navigation";
import AnimatedModal from "./src/components/AnimatedModal";
import { connect } from "react-redux";
import AppContext from "./src/AppContext";
import { compose } from "redux";
import injectShowAlert from "./src/constant/injectShowAlert";
import store from "./src/store/index";

class App1 extends Component {
  constructor(props) {
    super(props);

    this.dataAlert = {
      title: undefined,
      content: undefined,
      onClose: undefined,
      onSubmit: undefined,
      labelSubmit: undefined,
      labelClose: undefined
    };
  }

  componentDidMount() {
    //listen backpress android and close alert
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.props.closeAlert()) {
        return true;
      }
      return false;
    });

    //listen network change
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.alertState.id !== nextProps.alertState.id) {
      if (nextProps.alertState.isShow) {
        this.dataAlert = nextProps.alertState;
      } else {
        this.dataAlert = undefined;
      }
    }
    return true;
  }
  componentWillUnmount() {
    //remoce all listener
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
    this.backHandler.remove();
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
      <View style={{ flex: 1 }}>
        <AppContext.Provider value={this.state}>
          <Root />
          <AnimatedModal
            title={this.dataAlert && this.dataAlert.title}
            labelSubmit={this.dataAlert && this.dataAlert.labelSubmit}
            labelClose={this.dataAlert && this.dataAlert.labelClose}
            isShowCloseButton={
              !!this.dataAlert &&
              (this.dataAlert.onClose !== undefined ||
                this.dataAlert.labelClose !== undefined)
            }
            visible={this.props.alertState.isShow}
            onClose={() => {
              this.dataAlert &&
                this.dataAlert.onClose &&
                this.dataAlert.onClose();
              this.dataAlert = undefined;
              this.props.closeAlert();
            }}
            onSubmit={() => {
              this.dataAlert &&
                this.dataAlert.onSubmit &&
                this.dataAlert.onSubmit();
              this.dataAlert = undefined;
              this.props.closeAlert();
            }}
            vi
          >
            <Text
              style={{ color: "#000000", textAlign: "center", padding: 10 }}
            >
              {(this.dataAlert && this.dataAlert.content) || ""}
            </Text>
          </AnimatedModal>
        </AppContext.Provider>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    alertState: state.alertState
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

App1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(App1);
export default compose(injectShowAlert)(App1);

export class Root extends Component {
  componentDidMount() {
    //listen backpress android and close alert
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {}
    );
  }

  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    console.log("render root stack");
    return <RootStack />;
  }
}
