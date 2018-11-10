/* Điều khoản dịch vụ */
import React, { Component } from "react";
import { View, WebView, Platform, BackHandler } from "react-native";
import { COLOR } from "../constant/Color";
import { getcommonSetting } from "../actions";
import { ViewLoading, CustomizeHeader } from "../components/CommonView";
import { TEXT_MENU } from "../language";
import { isEqual } from "lodash";
import {showAlert,closeAlert} from '../constant/UtilsFunction'

class TermServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dataHtml: ""
    };

    this.TEXT_TITLE = TEXT_MENU().Term;
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
        closeAlert();
        return this.props.navigation.goBack();
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_TITLE = TEXT_MENU().Term;
    }
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading MarginTop={75} /> : null;
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomizeHeader
          label={this.TEXT_TITLE}
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
export default TermServices;
