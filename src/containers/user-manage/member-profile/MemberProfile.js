import React, { Component } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import style_common from "../../../style-common";
import { ViewLoading, TabView } from "../../../components/CommonView";
import { COLOR } from "../../../constant/Color";
import MemberProfileTab1 from "./MemberProfileTab1";
import MemberProfileTab2 from "./MemberProfileTab2";
import { loadProfileMember } from "../../../actions";
import { connect } from "react-redux";
import HeaderMember from "./HeaderMember";
import AppContext from "../../../AppContext";
// import { isEqual } from "lodash";
import { TEXT_PROFILE } from "../../../language";

class MemberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      tabIndex: 0,
      memberProfile: {}
    };

    this.TEXT_PROFILE = TEXT_PROFILE();
  }

  componentDidMount() {
    this._loadMemberProfile();

    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.context.isShowAlert) {
        this.context.hideAlert();
        return true;
      }
      this.props.navigation.goBack();
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  _loadMemberProfile = async () => {
    const dataMember = this.props.navigation.getParam("item");
    if (!dataMember || !dataMember.UserID) return;
    this.setState({ isLoading: true });
    const dataProfile = await loadProfileMember({
      user_id: dataMember.UserID,
      option: 100
    });
    console.log("dataProfile", dataProfile);
    if (!dataProfile || dataProfile.Message !== null) {
      return this.setState({
        memberProfile: dataProfile.Value[0],
        isLoading: false
      });
    }
    this.setState({
      isLoading: false
    });
    return this.context.showAlert({
      content: dataProfile && dataProfile.Message
    });
  };

  onLoading = isLoading => {
    this.setState({ isLoading });
  };

  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
  };

  _bindeGlobalContext = () => {
    return (
      <AppContext.Consumer>
        {context => {
          this.context = context;
        }}
      </AppContext.Consumer>
    );
  };

  render() {
    return (
      <View style={style_common.container_white}>
        <HeaderMember
          navigation={this.props.navigation}
          userProfile={this.state.memberProfile}
          TEXT_PROFILE={this.TEXT_PROFILE}
          currentTab={this.state.tabIndex}
          allRank={this.props.allRank}
          onLoading={this.onLoading}
        />
        <View style={styles.tab}>
          <TabView
            label={this.TEXT_PROFILE.Account}
            onPress={() => {
              this.setState({ tabIndex: 0 });
            }}
            isActive={this.state.tabIndex === 0}
            style={styles.btn_margin_right}
          />
          <TabView
            label={this.TEXT_PROFILE.Member}
            onPress={() => {
              this.setState({ tabIndex: 1 });
            }}
            isActive={this.state.tabIndex === 1}
            style={styles.btn_margin_left}
          />
        </View>

        <View style={style_common.container}>
          <View
            style={[
              styles.content,
              { zIndex: this.state.tabIndex === 0 ? 1 : 0 }
            ]}
          >
            <MemberProfileTab1
              dataUser={this.state.memberProfile}
              navigation={this.props.navigation}
              onLoading={this.onLoading}
              TEXT_PROFILE={this.TEXT_PROFILE}
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
              allHashTag={this.props.allHashTag}
              dataUser={this.state.memberProfile}
              onLoading={this.onLoading}
              TEXT_PROFILE={this.TEXT_PROFILE}
            />
          </View>
        </View>
        {this._renderLoading()}
        {this._bindeGlobalContext()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    allRank: state.allRank,
    allHashTag: state.categoryType3
  };
};

MemberProfile = connect(mapStateToProps)(MemberProfile);
export default MemberProfile;

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    marginTop: -40,
    backgroundColor: "transparent"
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
