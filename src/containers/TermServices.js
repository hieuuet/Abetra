/* Điều khoản dịch vụ */
import React, { Component } from "react";
import { View, WebView, Platform, BackHandler } from "react-native";
import { COLOR } from "../constant/Color";
import { getcommonSetting } from "../actions";
import { ViewLoading } from "../components/CommonView";
class TermServices extends Component {
  static navigationOptions = ({ navigation }) => {
    // console.log("state change redender");
    return {
      title: "Điều khoản dịch vụ",
      // headerStyle: {
      //   // backgroundColor: "#23b34c",
      //   alignSelf: "center",
      // },
      headerTitleStyle: { color: COLOR.COLOR_BLACK },
      headerTintColor: COLOR.COLOR_BLACK
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dataHtml: ""
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getcommonSetting({ Option: 3 })
      .then(data => {
        const html = (data.Value && data.Value[0] && data.Value[0].Rules) || "";
        this.setState({ isLoading: false, dataHtml: html || "" });
      })
      .catch(err => this.setState({ isLoading: false }));
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      async () => {
        return this.props.navigation.goBack();
      }
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  render() {
    console.log("arr", this.state.dataHtml);
    return (
      <View style={{ flex: 1 }}>
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{ html: this.state.dataHtml, baseUrl: "" }}
          style={{ flex: 1, width: "100%" }}
          javaScriptEnabledAndroid={true}
          mixedContentMode="always"
          scalesPageToFit={Platform.OS === "ios" ? false : true}
        />
        {this._renderLoading()}
      </View>
    );
  }
}
export default TermServices;
