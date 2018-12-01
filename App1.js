/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { NetInfo, YellowBox, Text, View, BackHandler } from "react-native";
import RootStack from "./src/routers/Navigation";
import AnimatedModal from "./src/components/AnimatedModal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AppContext from "./src/AppContext";

import store from "./src/store/index";

class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false,
      showAlert: this.showAlert,
      hideAlert: this.hideAlert
    };
    this.dataAlert = {
      title: undefined,
      content: undefined,
      onClose: undefined,
      onSubmit: undefined
    };
  }

  componentDidMount() {
    //listen backpress android and close alert
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.state.isShowAlert) {
        this.hideAlert();
        return true;
      }
      console.log("222222");
      return false;
    });

    //listen network change
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    //show alert from state change (message loss network when call api)
    if (this.props.showAlert.id !== nextProps.showAlert.id) {
      //prevent show loss network multiple time call api
      if (
        this.state.isShowAlert &&
        nextProps.showAlert.content === this.dataAlert.content
      ) {
        return false;
      }
      console.log("1111111", nextProps.showAlert);
      this.showAlert(nextProps.showAlert);

      return false;
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

  showAlert = data => {
    if (data) {
      this.dataAlert = data;
    }
    this.setState({ isShowAlert: true });
  };
  hideAlert = () => {
    this.dataAlert = undefined;
    this.setState({ isShowAlert: false });
  };

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
            visible={this.state.isShowAlert}
            onClose={() => {
              this.dataAlert &&
                this.dataAlert.onClose &&
                this.dataAlert.onClose();
              this.setState({ isShowAlert: false });
            }}
            onSubmit={() => {
              this.dataAlert &&
                this.dataAlert.onSubmit &&
                this.dataAlert.onSubmit();
              this.setState({ isShowAlert: false });
            }}
            vi
          >
            <Text style={{ color: "#000000" }}>
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
    showAlert: state.showAlert
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

App1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(App1);
export default App1;

export class Root extends Component {
  componentDidMount() {
    //listen backpress android and close alert
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      console.log("77777777");
    });
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
