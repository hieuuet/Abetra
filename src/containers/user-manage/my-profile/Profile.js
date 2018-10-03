import React, { Component } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import style_common from "../../../style-common";
import { ViewLoading, TabView } from "../../../components/CommonView";
import { COLOR } from "../../../constant/Color";
import MyProfileTab1 from "./MyProfileTab1";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadUserProfile } from "../../../actions";
import MyProfileTab2 from "./MyProfileTab2";
import { isEqual } from "lodash";

import HashTagEdit from "../../../components/hashtag/HashTagEdit";
import ModalBox from "../../../components/ModalBox";
import { NavigationActions, StackActions } from "react-navigation";

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    // console.log("state change redender");
    return {
      title: params.title,
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
    //get tag has been selected when register and bind with select of all tab
    let tagSelected = this.props.userProfile.Value[0].HashTag;
    if (tagSelected) {
      tagSelected = JSON.parse(tagSelected);
      if (!Array.isArray(tagSelected)) tagSelected = [];
    }
    const allTags = this.props.allHashTag.map(tag => {
      return {
        ...tag,
        hashtag: tag.Name,
        select: tagSelected.includes(tag.CatID)
      };
    });

    this.state = {
      isLoading: false,
      tabIndex: 0,
      allTag: allTags
    };

    //set title for title bar
    this.props.navigation.setParams({
      title:
        (this.props.userProfile &&
          this.props.userProfile.Value[0] &&
          this.props.userProfile.Value[0].FullName) ||
        "Profile"
    });
  }

  componentDidMount() {
    this.tagSelected = this.state.allTag;
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.refs.modal && this.refs.modal.state.isOpen) {
        this.refs.modal.close();
        return true;
      } else {
        //check if navigate from verify screen,navigate to home
        const fromVerify = this.props.navigation.getParam("fromVerify");
        if (fromVerify) {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "TabHome" })]
          });
          this.props.navigation.dispatch(resetAction);
          return true;
        }
        return false;
      }
    });
  }
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      isEqual(nextProps.userProfile, this.props.userProfile) &&
      isEqual(nextProps.allHashTag, this.props.allHashTag) &&
      isEqual(nextProps.allRank, this.props.allRank) &&
      isEqual(nextState, this.state)
    );
  }
  componentWillUnmount() {
    this.reLoadProfile();
    this.backHandler.remove();
  }

  onLoading = isLoading => {
    this.setState({ isLoading });
  };

  reLoadProfile = async () => {
    const { loadUserProfile } = this.props;
    if (!this.userProfile || !this.userProfile.UserID) {
      return null;
    }
    loadUserProfile({
      user_id: this.userProfile.UserID,
      option: 100
    });
  };

  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
  };
  onClickShowModal = () => {
    if (this.refs.modal) this.refs.modal.open();
  };
  getHashTagSelected = () => {
    if (this.refs.modal) {
      this.setState({ allTag: this.tagSelected });
    }
  };
  onDataSelected = hashtagSelected => {
    if (hashtagSelected !== undefined) this.tagSelected = hashtagSelected;
  };

  render() {
    //get userProfile from Redux
    this.userProfile =
      this.props.userProfile &&
      this.props.userProfile.Value &&
      this.props.userProfile.Value.length > 0
        ? this.props.userProfile.Value[0]
        : {};
    console.log("render profile");
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
            <MyProfileTab1
              dataUser={this.userProfile}
              navigation={this.props.navigation}
              onLoading={this.onLoading}
              reLoadProfile={this.reLoadProfile}
            />
          </View>
          <View
            style={[
              styles.content,
              { zIndex: this.state.tabIndex === 1 ? 1 : 0 }
            ]}
          >
            <MyProfileTab2
              dataUser={this.userProfile}
              navigation={this.props.navigation}
              onClickShowModal={this.onClickShowModal}
              tagSelected={this.state.allTag}
              onLoading={this.onLoading}
              allRank={this.props.allRank}
            />
          </View>
        </View>
        {this._renderLoading()}
        <ModalBox
          position={"bottom"}
          ref={"modal"}
          swipeArea={20}
          onClosed={this.getHashTagSelected}
          style={styles.modal}
        >
          <HashTagEdit
            data={this.state.allTag}
            selectable={true}
            numColumns={2}
            onDataSelected={this.onDataSelected}
            ref="hashTag"
          />
        </ModalBox>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.loadUserProfile,
    allRank: state.allRank,
    allHashTag: state.allHashTag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch)
  };
};
Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
export default Profile;

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
  },
  modal: { height: 200 }
});
