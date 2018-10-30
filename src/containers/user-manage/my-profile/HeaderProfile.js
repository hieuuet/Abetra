import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
  ImageBackground,
  NativeModules
} from "react-native";
import { IMAGE } from "../../../constant/assets";
import { URL_BASE } from "../../../constant/api";
import { COLOR } from "../../../constant/Color";
import EditView from "./EditView";
import FastImage from "react-native-fast-image";
import { isEqual } from "lodash";
import { getRank } from "../../../constant/UtilsFunction";
import style_common from "../../../style-common";
import { updateUserProfile, uploadImage2 } from "../../../actions";
import { TYPE_ACCOUNT, STATUS_ACCOUNT } from "../../../constant/KeyConstant";
const ImagePicker = NativeModules.ImageCropPicker;

class HeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localAvatar: undefined
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      isEqual(nextProps.userProfile, this.props.userProfile) &&
      isEqual(nextProps.TEXT_PROFILE, this.props.TEXT_PROFILE) &&
      isEqual(nextProps.currentTab, this.props.currentTab) &&
      isEqual(nextProps.allRank, this.props.allRank) &&
      isEqual(nextState, this.state)
    );
  }
  callApiUpdateProfile = async ({ field, value }) => {
    return updateUserProfile({
      profile_id: this.props.userProfile.ProfileID,
      user_id: this.props.userProfile.UserID,
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
          this.setState({ localAvatar: image.path });
          this.props.onLoading(true);
          const responUpload = await uploadImage2({
            base64Data: image.data,
            user_id: this.props.userProfile.UserID,
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

          return this.props.onLoading(false);
        }
      })
      .catch(e => console.log(e));
  };
  _renderHeaderTab1 = () => {
    const source = this.state.localAvatar
      ? { uri: this.state.localAvatar }
      : this.props.userProfile && this.props.userProfile.Avatar
        ? { uri: URL_BASE + this.props.userProfile.Avatar }
        : IMAGE.logo;
    return (
      <View style={style_common.container}>
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
        <View style={styles.wrapper_left}>
          <View style={styles.wrap_avatar}>
            <TouchableOpacity onPress={this.pickOneImageToUpload}>
              <FastImage
                style={styles.avatar}
                source={source}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper_right}>
            <EditView
              text_edit={
                (this.props.userProfile && this.props.userProfile.FullName) ||
                "Not Found"
              }
              type={1}
              isEditAble={true}
              style_edit={styles.edit_name}
              onSubmit={text => {
                if (
                  !this.props.userProfile ||
                  text.trim() === this.props.userProfile.FullName
                )
                  return;
                this.props.userProfile.FullName = text.trim();
                this.callApiUpdateProfile({
                  field: "FullName",
                  value: text.trim()
                });
              }}
            />
            <EditView
              text_edit={
                (this.props.userProfile && this.props.userProfile.UserName) ||
                "Not Found"
              }
              style_edit={styles.edit_userName}
            />
            <TouchableOpacity
              style={styles.btn_change_pass}
              onPress={() => this.props.navigation.navigate("ChangePassword")}
            >
              <Image
                resizeMode="contain"
                source={IMAGE.bg_change_pass}
                style={styles.bg_change_pass}
              />
              <Text style={styles.text_change_pass}>
                {(this.props.TEXT_PROFILE &&
                  this.props.TEXT_PROFILE.ChangePass) ||
                  ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  _renderHeaderTab2NotRegister = () => {
    return (
      <View style={style_common.container}>
        <View style={styles.wrap_tab2}>
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
        </View>
        <View style={styles.wrap_header}>
          <View style={style_common.container}>
            <Text style={style_common.text_color_White}>
              {this.props.TEXT_PROFILE &&
                this.props.TEXT_PROFILE.NotRegisterMember}
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Benifet");
              }}
            >
              <Text style={styles.text_link}>
                {`• ${(this.props.TEXT_PROFILE &&
                  this.props.TEXT_PROFILE.Term) ||
                  ""}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  _renderHeaderTab2 = () => {
    if (this.props.userProfile.Type === TYPE_ACCOUNT.TEMP)
      return this._renderHeaderTab2NotRegister();
    if (
      this.props.userProfile.Status &
      (this.props.userProfile.Status === STATUS_ACCOUNT.INACTIVE)
    )
      return <View />;

    const rank = getRank(
      (this.props.userProfile && this.props.userProfile.PackgeID) || "",
      this.props.allRank
    );
    return (
      <View style={style_common.container}>
        <View style={styles.wrap_tab2}>
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
          <Text style={styles.text_title_rank}>
            {((rank && rank.RankName) || "").toUpperCase()}
          </Text>
        </View>
        <View style={styles.wrap_header}>
          <View style={style_common.container}>
            <Text style={style_common.text_color_White}>
              {`${(this.props.TEXT_PROFILE &&
                this.props.TEXT_PROFILE.DateRegister) ||
                ""}:${(this.props.userProfile &&
                this.props.userProfile.StartPackage) ||
                ""}`}
            </Text>
            <Text style={style_common.text_color_White}>
              {`${(this.props.TEXT_PROFILE &&
                this.props.TEXT_PROFILE.DateExpire) ||
                ""}:${(this.props.userProfile &&
                this.props.userProfile.EndPackage) ||
                ""}`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("CertificateMember");
              }}
            >
              <Text style={styles.text_link}>
                {`• ${(this.props.TEXT_PROFILE &&
                  this.props.TEXT_PROFILE.Certificate) ||
                  ""}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Benifet");
              }}
            >
              <Text style={styles.text_link}>
                {`• ${(this.props.TEXT_PROFILE &&
                  this.props.TEXT_PROFILE.Term) ||
                  ""}`}
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: rank && rank.Icon }}
            resizeMode="cover"
            style={styles.img_rank}
          />
        </View>
      </View>
    );
  };

  render() {
    const renderHeader =
      this.props.currentTab === 0
        ? this._renderHeaderTab1()
        : this._renderHeaderTab2();

    return (
      <View style={styles.parrent}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <ImageBackground
          style={styles.backgound_header}
          source={IMAGE.bg_head_profile}
          resizeMode="cover"
        >
          {renderHeader}
        </ImageBackground>
      </View>
    );
  }
}

export default HeaderProfile;
const styles = StyleSheet.create({
  parrent: { height: 220, flexDirection: "column" },

  text_title_rank: {
    flex: 1,
    textAlign: "center",
    marginTop: 15,
    marginRight: 45,
    color: COLOR.COLOR_WHITE,
    fontWeight: "bold"
  },
  wrapper_left: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  wrap_avatar: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  wrapper_right: {
    flex: 3,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    marginRight: 10,
    marginLeft: 10
  },
  btn_change_pass: {
    borderRadius: 25,
    width: 140,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  text_change_pass: {
    alignSelf: "center",
    position: "absolute",
    color: COLOR.COLOR_WHITE
  },
  bg_change_pass: {
    flex: 1,
    height: 50
  },
  edit_name: {
    fontSize: 25,
    color: COLOR.COLOR_WHITE
  },
  edit_userName: {
    color: COLOR.COLOR_WHITE
  },
  backgound_header: {
    flex: 1
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: COLOR.COLOR_WHITE
  },
  wrap_tab2: {
    flexDirection: "row",
    alignItems: "center"
  },
  img_rank: {
    width: 90,
    height: 90,
    borderRadius: 45
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
  iconedit: {
    width: 20,
    height: 20
  },
  edit: {
    color: COLOR.COLOR_BLACK,
    justifyContent: "center",
    textAlignVertical: "center",
    alignItems: "center",
    margin: 1,
    flex: 1
  },
  wrap_header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    flex: 1
  },
  text_link: {
    color: COLOR.COLOR_TEXT_SEA
  }
});
