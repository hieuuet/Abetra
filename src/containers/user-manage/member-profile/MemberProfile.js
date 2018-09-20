import React, { Component } from "react";
import {View, StyleSheet, AsyncStorage} from "react-native";
import style_common from "../../../style-common";
import { ViewLoading, TabView } from "../../../components/CommonView";
import { COLOR } from "../../../constant/Color";
import MemberProfileTab1 from "./MemberProfileTab1";
import MemberProfileTab2 from "./MemberProfileTab2";
import {loadUserProfile} from "../../../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {USER_ID} from "../../../constant/KeyConstant";
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
        profileMember: [],
    };

    this.userProfile = {};
    //set title for title bar
    this.props.navigation.setParams({
      title: "MemberProfile",
    });
  }

  componentDidMount() {
    this.reLoadProfile();
    this._loadUserProfile()
  }

    _loadUserProfile = async () => {
        const { navigation } = this.props;
        const itemStatus = navigation.getParam('item');
        const { loadUserProfile } = this.props;
        let profile_member = await loadUserProfile({
            user_id: itemStatus.UserID,
            option: 100,
        });
        console.log('profile', profile_member)
        if(profile_member.ErrorCode ==="00"){
          this.setState({
              profileMember: profile_member.Value
          })
        }
    };
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
              dataUser={this.state.profileMember}
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

const mapStateToProps = (state) => {
    return {
        LoginData: state.login,
        UserProfile: state.loadUserProfile,
        isGuest: state.loginGuest.isGuest,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserProfile: bindActionCreators(loadUserProfile, dispatch),
    };
};

MemberProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberProfile);
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
