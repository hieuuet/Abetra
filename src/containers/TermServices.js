/* Điều khoản dịch vụ */
import React, { Component } from "react";
import { View, Text } from "react-native";
import { COLOR } from "../constant/Color";

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
      headerTintColor: COLOR.COLOR_BLACK,
    };
  };
  render() {
    return (
      <View>
        <Text>Điều khoản dịch vụ</Text>
      </View>
    );
  }
}
export default TermServices;
