/* Điều khoản dịch vụ */
import React, { Component } from "react";
import { View } from "react-native";
import { getCertificate } from "../actions";
import { ViewLoading, CustomizeHeader } from "../components/CommonView";
import ListImage from "../components/ListImage";
import { TEXT_CERTIFICATE } from "../language";

class CertificateMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      imageArr: []
    };
    this.TEXT_CERTIFICATE = TEXT_CERTIFICATE();
    this.userID = this.props.navigation.getParam("userID") || "";
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    getCertificate(this.userID)
      .then(data => {
        const img =
          data && data.Value && data.Value[0] && data.Value[0].ImageCrt;
        const imageArr = [];
        if (img && img !== "") imageArr.push(img);
        this.setState({ isLoading: false, imageArr });
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
          label={this.TEXT_CERTIFICATE.CertificateTitle}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <ListImage
          imageArr={this.state.imageArr}
          navigation={this.props.navigation}
        />
        {this._renderLoading()}
      </View>
    );
  }
}
export default CertificateMember;
