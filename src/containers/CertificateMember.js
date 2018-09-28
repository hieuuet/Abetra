/* Điều khoản dịch vụ */
import React, { Component } from "react";
import { View, Text } from "react-native";
import { COLOR } from "../constant/Color";

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
  render() {
    return (
      <View>
        <Text>Chứng nhận hội viên</Text>
      </View>
    );
  }
}
export default CertificateMember;
