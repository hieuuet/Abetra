/* Điều khoản dịch vụ */
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { getCertificate } from "../actions";
import { ViewLoading } from "../components/CommonView";
import { TEXT_CERTIFICATE } from "../language";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import FastImage from "react-native-fast-image";

class CertificateMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      img: ""
    };
    this.TEXT_CERTIFICATE = TEXT_CERTIFICATE();
    this.userID = this.props.navigation.getParam("userID") || "";
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    getCertificate(this.userID)
      .then(data => {
        const img =
          (data && data.Value && data.Value[0] && data.Value[0].ImageCrt) || "";
        this.setState({ isLoading: false, img });
      })
      .catch(err => this.setState({ isLoading: false }));
  }

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        {this.state.img.length > 0 && (
          <FastImage
            style={{ width: "100%", height: "100%", marginTop: 25 }}
            source={{
              uri: this.state.img
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 10,
            top: 35
          }}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon name="close" size={30} color="#ffffff" />
        </TouchableOpacity>
        {this._renderLoading()}
      </View>
    );
  }
}
export default CertificateMember;
