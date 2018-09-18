import React, { Component } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import style_common from "../../../style-common";
import { ViewLoading, TabView } from "../../../components/CommonView";
import { COLOR } from "../../../constant/Color";
import MyProfileTab1 from "./MyProfileTab1";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadUserProfile } from "../../../actions/loadUserProfileActions";
import MyProfileTab2 from "./MyProfileTab2";
import _ from "lodash";

import HashTagEdit from "../../../components/hashtag/HashTagEdit";
import ModalBox from "../../../components/ModalBox";
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
      headerTintColor: COLOR.COLOR_BLACK,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      tabIndex: 0,
      allTag: [
        {
          hashtag: "#FoodMessage1",
          select: true,
        },
        {
          hashtag: "#FoodMessage2",
          select: true,
        },
        {
          hashtag: "#FoodMessage3",
          select: true,
        },
        {
          hashtag: "#FoodMessage4",
          select: true,
        },
        {
          hashtag: "#FoodMessage5",
          select: false,
        },
        {
          hashtag: "#FoodMessage6",
          select: false,
        },
        {
          hashtag: "#FoodMessage7",
          select: false,
        },
        {
          hashtag: "#FoodMessage8",
          select: false,
        },
      ],
    };
    //get userProfile from Redux
    this.userProfile =
      this.props.userProfile &&
      this.props.userProfile.Value &&
      this.props.userProfile.Value.length > 0
        ? this.props.userProfile.Value[0]
        : {};

    //set title for title bar
    this.props.navigation.setParams({
      title:
        this.userProfile && this.userProfile.FullName
          ? this.userProfile.FullName
          : "Profile",
    });
  }

  componentDidMount() {
    this.reLoadProfile();
    this.tagSelected = this.state.allTag;
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.refs.modal && this.refs.modal.state.isOpen) {
        this.refs.modal.close();
        return true;
      }
    });
  }
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      _.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state)
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  reLoadProfile = async () => {
    const { loadUserProfile, userProfile } = this.props;
    if (!userProfile || !userProfile.UserID) {
      return null;
    }
    await loadUserProfile({
      user_id: userProfile.UserID,
      option: 100,
      lang_name: "vi_VN",
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
  onDataSelected = (hashtagSelected) => {
    if (hashtagSelected !== undefined) this.tagSelected = hashtagSelected;
  };

  render() {
    // console.log("render profile");

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
            <MyProfileTab1
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
            <MyProfileTab2
              navigation={this.props.navigation}
              onClickShowModal={this.onClickShowModal}
              tagSelected={this.state.allTag}
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

const mapStateToProps = (state) => {
  return {
    userProfile: state.loadUserProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch),
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
  modal: { height: 200 },
});
