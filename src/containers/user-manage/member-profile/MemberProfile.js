import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import style_common from "../../../style-common";
import { ViewLoading, TabView } from "../../../components/CommonView";
import { COLOR } from "../../../constant/Color";
import MemberProfileTab1 from "./MemberProfileTab1";
import MemberProfileTab2 from "./MemberProfileTab2";
import { loadProfileMember } from "../../../actions";
import { connect } from "react-redux";
import { getRank } from "../../../constant/UtilsFunction";

class MemberProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: params.title ? params.title : "Member Profile",
      headerTitleStyle: { color: COLOR.COLOR_BLACK },
      headerTintColor: COLOR.COLOR_BLACK
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      tabIndex: 0,
      memberProfile: {}
    };
  }

  componentDidMount() {
    this._loadMemberProfile();
  }

  _loadMemberProfile = async () => {
    const dataMember = this.props.navigation.getParam("item");
    if (!dataMember || !dataMember.UserID) return;
    this.setState({ isLoading: true });
    const dataProfile = await loadProfileMember({
      user_id: dataMember.UserID,
      option: 100
    });
    if (!dataProfile || dataProfile.Message !== null) {
      this.setState({
        memberProfile: dataProfile.Value[0],
        isLoading: false
      });
      return this.props.navigation.setParams({
        title: dataProfile.Value[0].FullName
      });
    }
    this.setState({
      isLoading: false
    });
    return Alert.alert(
      "Thông báo",
      (dataProfile && dataProfile.Message) || "Lỗi không xác định",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  };

  _getRank = () => {
    return getRank(this.state.memberProfile.PackgeID, this.props.allRank);
  };

  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
  };

  render() {
    console.log("render member", this.state.memberProfile);
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
              { zIndex: this.state.tabIndex === 0 ? 1 : 0 }
            ]}
          >
            <MemberProfileTab1
              dataUser={this.state.memberProfile}
              navigation={this.props.navigation}
              _getRank={this._getRank}
            />
          </View>
          <View
            style={[
              styles.content,
              { zIndex: this.state.tabIndex === 1 ? 1 : 0 }
            ]}
          >
            <MemberProfileTab2
              navigation={this.props.navigation}
              allHashTag = {this.props.allHashTag}
              dataUser={this.state.memberProfile}
              _getRank={this._getRank}
            />
          </View>
        </View>
        {this._renderLoading()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    allRank: state.allRank,
    allHashTag: state.allHashTag
  };
};

MemberProfile = connect(mapStateToProps)(MemberProfile);
export default MemberProfile;

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    backgroundColor: COLOR.COLOR_WHITE
  },

  content: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLOR.COLOR_WHITE
  },
  btn_margin_left: {
    marginLeft: 5
  },
  btn_margin_right: {
    marginRight: 5
  }
});
