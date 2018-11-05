/* Quyền lợi và chính sách hội viên */
import React, { Component } from "react";
import { View, WebView, Platform } from "react-native";
import { getBenifet } from "../actions";
import { ViewLoading, CustomizeHeader } from "../components/CommonView";
import { TEXT_BENIFET } from "../language";
class Benifet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dataHtml: ""
    };
    this.TEXT_BENIFET = TEXT_BENIFET();
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
    return (
      <View style={{ flex: 1 }}>
        <CustomizeHeader
          label={this.TEXT_BENIFET.CertificateTitle}
          onBackPress={() => this.props.navigation.goBack()}
        />
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
export default Benifet;
