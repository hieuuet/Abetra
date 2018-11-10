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

import store from "./src/store/index";
class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false
    };
    this.currentValue = undefined;
  }

  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   async () => {
    //     // this.closeAlert();
    //     console.log("onbackpresss=======");
    //     return true;
    //   }
    // );

    // this.unsubscribe = store.subscribe(listener => {
    //   //show alert
    //   const previousValue = this.currentValue;
    //   this.currentValue = store.getState().dataAlert;
    //   if (
    //     previousValue &&
    //     this.currentValue &&
    //     this.currentValue.id !== previousValue.id
    //   ) {
    //     this.setState({ isShowAlert: true });
    //   }
    // });
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.closeAlert.id !== nextProps.closeAlert.id) {
      //close alert
      this.closeAlert();
      return false;
    }
    if (this.props.showAlert.id !== nextProps.showAlert.id) {
      //show alert
      this.setState({ isShowAlert: true });
      return false;
    }
    return true;
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
    // this.unsubscribe();
    // this.backHandler.remove();
  }
  closeAlert = () => {
    if (this.state.isShowAlert) {
      this.setState({ isShowAlert: false });
      return true;
    }
    return false;
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
        <Root />
        <AnimatedModal
          title={this.props.showAlert.title}
          visible={this.state.isShowAlert}
          onClose={() => {
            if (this.state.isShowAlert) {
              this.setState({ isShowAlert: false });
              this.props.showAlert.cancelFunc &&
                this.props.showAlert.cancelFunc();
            }
          }}
          onSubmit={() => {
            this.setState({ isShowAlert: false });
            this.props.showAlert.submitFunc &&
              this.props.showAlert.submitFunc();
          }}
        >
          <Text style={{ color: "#000000" }}>
            {this.props.showAlert.message || ""}
          </Text>
        </AnimatedModal>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    closeAlert: state.closeAlert,
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
  shouldComponentUpdate() {
    return false;
  }
  render() {
    console.log("render root stack");
    return <RootStack />;
  }
}
