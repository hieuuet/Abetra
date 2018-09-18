import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import style_common from "../../../style-common";
import { ViewLoading, TabView } from "../../../components/CommonView";
import { COLOR } from "../../../constant/Color";
import MemberProfileTab1 from "./MemberProfileTab1";
import MemberProfileTab2 from "./MemberProfileTab2";
class MemberProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: params.title,
      headerTitleStyle: { color: COLOR.COLOR_BLACK },
      headerTintColor: COLOR.COLOR_BLACK,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      tabIndex: 0,
    };

    this.userProfile = {};
    //set title for title bar
    this.props.navigation.setParams({
      title: "MemberProfile",
    });
  }

  componentDidMount() {
    this.reLoadProfile();
  }

  reLoadProfile = async () => {};

  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
  };

  render() {
    console.log("render member");
    return (
      <View style={style_common.container}>
        <View style={styles.tab}>
          <TabView
            label="Tài khoản"
            onPress={() => {
              this.setState({ tabIndex: 0 });
            }}
            isActive={this.state.tabIndex === 0}
            style={styles.btn_margin_right}
          />
          <TabView
            label="Hội viên"
            onPress={() => {
              this.setState({ tabIndex: 1 });
            }}
            isActive={this.state.tabIndex === 1}
            style={styles.btn_margin_left}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.content,
              { zIndex: this.state.tabIndex === 0 ? 1 : 0 },
            ]}
          >
            <MemberProfileTab1
              dataUser={this.userProfile}
              navigation={this.props.navigation}
            />
          </View>
          <View
            style={[
              styles.content,
              { zIndex: this.state.tabIndex === 1 ? 1 : 0 },
            ]}
          >
            <MemberProfileTab2 navigation={this.props.navigation} />
          </View>
        </View>
        {this._renderLoading()}
      </View>
    );
  }
}

export default MemberProfile;

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    backgroundColor: COLOR.COLOR_WHITE,
  },

 
  content: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLOR.COLOR_WHITE,
  },
  btn_margin_left: {
    marginLeft: 5,
  },
  btn_margin_right: {
    marginRight: 5,
  },
});
