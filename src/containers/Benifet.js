/* Quyền lợi và chính sách hội viên */
import React, { Component } from "react";
import { View, Text } from "react-native";
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
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    getBenifet()
      .then(data => {
        console.log("-----", data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>{"Quyền lợi & Chính sách"}</Text>
        {this._renderLoading()}
      </View>
    );
  }
}
export default Benifet;
