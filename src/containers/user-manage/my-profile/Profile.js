import React, { Component } from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  StatusBar,
  Image,
  NativeModules,
  TouchableOpacity,
  Text
} from "react-native";
import style_common from "../../../style-common";
import { ViewLoading, TabView } from "../../../components/CommonView";
import { COLOR } from "../../../constant/Color";
import MyProfileTab1 from "./MyProfileTab1";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  loadUserProfile,
  updateUserProfile,
  uploadImage2
} from "../../../actions";
import MyProfileTab2 from "./MyProfileTab2";
import { isEqual } from "lodash";
import { IMAGE } from "../../../constant/assets";
import EditView from "./EditView";

import HashTagEdit from "../../../components/hashtag/HashTagEdit";
import ModalBox from "../../../components/ModalBox";
import { NavigationActions, StackActions } from "react-navigation";
import { URL_BASE } from "../../../constant/api";

import { TEXT_PROFILE } from "../../../language";
const ImagePicker = NativeModules.ImageCropPicker;

class Profile extends Component {

  constructor(props) {
    super(props);
    //get tag has been selected when register and bind with select of all tab
    let tagSelected =
      (this.props.userProfile &&
        this.props.userProfile.Value &&
        this.props.userProfile.Value[0].HashTag) ||
      "[]";
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
      allTag: allTags,
      localAvatar:undefined
    };


    this.idTagSelected = [];

    this.TEXT_PROFILE = TEXT_PROFILE();
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
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_PROFILE = TEXT_PROFILE();
    }
  }
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
  onClickCloseModal = () => {
    if (this.refs.modal) {
      this.setState({ allTag: this.tagSelected });
      //get ID of all tab selected
      const idTagSelected = this.tagSelected
        .filter(tag => tag.select)
        .map(tag => tag.CatID);
      //Call api update hastag
      if (this.idTagSelected && !isEqual(idTagSelected, this.idTagSelected)) {
        this.idTagSelected = idTagSelected;
        updateUserProfile({
          profile_id: this.userProfile.ProfileID,
          user_id: this.userProfile.UserID,
          field: "HashTag",
          value: JSON.stringify(this.idTagSelected)
        });
      }
    }
  };
  onDataSelected = hashtagSelected => {
    if (hashtagSelected !== undefined) this.tagSelected = hashtagSelected;
  };

  callApiUpdateProfile = async ({ field, value }) => {
    return updateUserProfile({
      profile_id: this.userProfile.ProfileID,
      user_id: this.userProfile.UserID,
      field,
      value
    });
  };

  /**
   * Pick avatar to upload
   */
  pickOneImageToUpload = () => {
    ImagePicker.openPicker({
      waitAnimationEnd: false,
      includeBase64: true,
      includeExif: true,
      forceJpg: true
    })
      .then(async image => {
        if (image && image.data) {
          this.setState({ isLoading: true, localAvatar: image.path });
          const responUpload = await uploadImage2({
            base64Data: image.data,
            user_id: this.userProfile.UserID,
            extension: "jpeg"
          });

          if (responUpload) {
            const linkImgUploaded = JSON.parse(responUpload);
            if (linkImgUploaded) {
              await this.callApiUpdateProfile({
                field: "Avatar",
                value: linkImgUploaded.Value
              });
            }
          }

          return this.setState({ isLoading: false });
        }
      })
      .catch(e => console.log(e));
  };
  _renderHeader() {
    const source = this.state.localAvatar
      ? { uri: this.state.localAvatar }
      : this.userProfile && this.userProfile.Avatar
        ? { uri: URL_BASE + this.userProfile.Avatar }
        : IMAGE.logo;
    console.log("source", source);

    return (
      <View style={{ height: 190 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Image
          style={styles.backgound_header}
          source={IMAGE.bg_head_profile}
          resizeMode="stretch"
        />
        <TouchableOpacity
          style={styles.btn_back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Image
            style={styles.img_back}
            resizeMode="cover"
            source={IMAGE.icon_back}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={this.pickOneImageToUpload}>
              <Image
                source={
                  source
                }
                resizeMode="cover"
                style={styles.avatar}
                queryCache={[source]}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: "flex-start",
              alignContent: "flex-start",
              marginRight: 10,
              marginLeft: 10
            }}
          >
            <EditView
              text_edit={
                (this.userProfile && this.userProfile.FullName) || "Not Found"
              }
              type={1}
              isEditAble={true}
              style_edit={styles.edit_name}
              onSubmit={text => {
                if (
                  !this.userProfile ||
                  text.trim() === this.userProfile.FullName
                )
                  return;
                this.userProfile.FullName = text.trim();
                this.callApiUpdateProfile({
                  field: "FullName",
                  value: text.trim()
                });
              }}
            />
            <EditView
              text_edit={
                (this.userProfile && this.userProfile.UserName) || "Not Found"
              }
              style_edit={styles.edit_userName}
            />
            <TouchableOpacity
              style={{
                borderRadius: 25,
                width: 140,
                minHeight: 50,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Image
                resizeMode="contain"
                source={IMAGE.bg_change_pass}
                style={{
                  flex: 1,
                  height: 50
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  color: COLOR.COLOR_WHITE
                }}
              >
                {this.TEXT_PROFILE.ChangePass}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
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
      <View style={style_common.container_white}>
        {this._renderHeader()}
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
          onClosed={this.onClickCloseModal}
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
    allHashTag: state.categoryType3,
    currentLanguage: state.currentLanguage
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
  edit_name: {
    fontSize: 25,
    color: COLOR.COLOR_WHITE
  },
  edit_userName: {
    color: COLOR.COLOR_WHITE
  },
  backgound_header: {
    height: 220,
    flex: 1,
    top: -10,
    position: "absolute"
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: COLOR.COLOR_WHITE
  },
  btn_back: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 15
  },
  img_back: {
    width: 35,
    height: 35 * (53 / 82)
  },
  tab: {
    flexDirection: "row",
    marginTop: -20,
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
  },
  modal: { height: 200 }
});
