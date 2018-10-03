/* Điều khoản dịch vụ */
import React, { Component } from "react";
import { View } from "react-native";
import { COLOR } from "../constant/Color";
import { getCertificate } from "../actions";
import { ViewLoading } from "../components/CommonView";
import ListImage from "../components/ListImage";

class CertificateMember extends Component {
  static navigationOptions = ({ navigation }) => {
    // console.log("state change redender");
    return {
      title: "Chứng nhận hội viên",
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
      imageArr: []
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    getCertificate()
      .then(data => {
        this.setState({ isLoading: false, imageArr: data.Value || [] });
      })
      .catch(err => this.setState({ isLoading: false }));
  }

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
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
