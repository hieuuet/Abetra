import React, { Component } from "react";
import { View,  WebView, Platform } from "react-native";
import { ViewLoading, CustomizeHeader } from "../../components/CommonView";
import { connect } from "react-redux";
import { getcommonSetting } from "../../actions";

import { isEqual } from "lodash";
import { TEXT_MENU } from "../../language";

class Guide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: ""
    };

    this.TEXT_TITLE = TEXT_MENU().Guide;
  }
  componentDidMount() {
    this.getdataGuide();
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_TITLE = TEXT_MENU().Guide;
    }
  }

  getdataGuide = async () => {
    this.setState({ isLoading: true });
    const result = await getcommonSetting({ Option: 2 }, false);

    this.setState({
      isLoading: false,
      data:
        (result &&
          result.Value &&
          result.Value[0] &&
          result.Value[0].Introduction) ||
        ""
    });
  };

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
          source={{ html: this.state.data, baseUrl: "" }}
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
const mapStateToProps = state => {
  return {
    currentLanguage: state.currentLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

Guide = connect(
  mapStateToProps,
  mapDispatchToProps
)(Guide);
export default Guide;
