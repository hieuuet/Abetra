/* Quyền lợi và chính sách hội viên */
import React, { Component } from "react";
import { View, WebView, Platform } from "react-native";
import { COLOR } from "../constant/Color";
import { getBenifet } from "../actions";
import { ViewLoading } from "../components/CommonView";
class Benifet extends Component {
  static navigationOptions = ({ navigation }) => {
    // console.log("state change redender");
    return {
      title: "Quyền lợi & Chính sách",
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
    getBenifet()
      .then(data => {
        this.setState({ isLoading: false, dataHtml: data.Value || "" });
      })
      .catch(err => this.setState({ isLoading: false }));
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
          // javaScriptEnabledAndroid={true}
          mixedContentMode="always"
          scalesPageToFit={Platform.OS === "ios" ? false : true}
        />
        {this._renderLoading()}
      </View>
    );
  }
}
export default Benifet;
