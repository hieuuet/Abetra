import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
  ImageBackground
} from "react-native";
import { IMAGE } from "../../../constant/assets";
import { URL_BASE } from "../../../constant/api";
import { COLOR } from "../../../constant/Color";
import EditView from "../my-profile/EditView";
import FastImage from "react-native-fast-image";
import { isEqual } from "lodash";
import style_common from "../../../style-common";
import {
  formatDate,
  getGender,
  getRank
} from "../../../constant/UtilsFunction";

class HeaderMember extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  _renderHeaderTab1 = () => {
    const source = this.state.localAvatar
      ? { uri: this.state.localAvatar }
      : this.props.userProfile && this.props.userProfile.Avatar
        ? { uri: URL_BASE + this.props.userProfile.Avatar }
        : IMAGE.logo;
    const rank = getRank(
      this.props.userProfile && this.props.userProfile.PackgeID,
      this.props.allRank
    );
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
            <TouchableOpacity>
              <FastImage
                style={styles.avatar}
                source={source}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <View style={styles.wrap_rank}>
              <Image
                source={{ uri: rank && rank.Icon2 }}
                resizeMode="cover"
                style={styles.img_rank_thumb}
              />
              <Text style={styles.text_rank_thumb}>
                {rank && rank.RankName}
              </Text>
            </View>
          </View>
          <View style={styles.wrapper_right}>
            <EditView
              text_edit={
                (this.props.userProfile && this.props.userProfile.FullName) ||
                "Not Found"
              }
              type={1}
              isEditAble={false}
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
            <Text style={styles.edit_userName}>
              {getGender(this.props.userProfile.Gender)}
            </Text>
            <Text style={styles.edit_userName}>
              {`${(this.props.TEXT_PROFILE &&
                this.props.TEXT_PROFILE.Birth_day) ||
                ""}: ${
                this.props.userProfile && this.props.userProfile.BirdDate
                  ? formatDate(this.props.userProfile.BirdDate)
                  : ""
              }`}
            </Text>
            <Text style={styles.edit_userName}>
              {`${(this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.Mobile) ||
                ""}: ${
                this.props.userProfile && this.props.userProfile.UserName
                  ? this.props.userProfile.UserName
                  : ""
              }`}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  _renderHeaderTab2 = () => {
    const rank = getRank(
      this.props.userProfile && this.props.userProfile.PackgeID,
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

export default HeaderMember;
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
  wrap_rank: {
    flexDirection: "row",
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
  wrap_tab2: {
    flexDirection: "row",
    alignItems: "center"
  },
  edit_name: {
    fontSize: 25,
    color: COLOR.COLOR_WHITE
  },
  text_rank_thumb: { color: COLOR.COLOR_WHITE, textAlign: "center" },
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
  img_rank: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  img_rank_thumb: {
    width: 20,
    height: 20
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
  wrap_header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  text_link: {
    color: COLOR.COLOR_TEXT_SEA
  }
});
