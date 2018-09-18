import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import EditView from "./EditView";
import { COLOR } from "../../../constant/Color";
import { strings } from "../../../i18n";
import RadioForm from "../../../components/SimpleRadioButton";
import PhotoGrid from "../../../components/PhotoGrid";
import Icon from "react-native-vector-icons/dist/FontAwesome5";
import MenuItem from "../../../components/MenuItem";
import _ from "lodash";
const { width } = Dimensions.get("window");

import Ionicon from "react-native-vector-icons/dist/Ionicons";
import PropTypes from "prop-types";
class MyProfileTab1 extends Component {
  constructor(props) {
    super(props);

    this.radioData = [
      {
        label: strings("profile.man"),
        value: 0,
      },
      { label: strings("profile.women"), value: 1 },
      { label: strings("profile.undefined"), value: 2 },
    ];

    //get dataUser
    this.dataUser = this.props.dataUser ? this.props.dataUser : undefined;

    this.dataImage = [
      "https://drscdn.500px.org/photo/216465193/m%3D2048_k%3D1_a%3D1/dda61fd7cea5013f8ebe7661b7abea3a",
      "https://drscdn.500px.org/photo/215467843/m%3D2048_k%3D1_a%3D1/344703e86f31e1fffb2d63effa2cee33",
      "https://drscdn.500px.org/photo/216340727/m%3D2048_k%3D1_a%3D1/20d583e15467fb39d06d48131767edc2",
      "https://drscdn.500px.org/photo/215498077/m%3D2048_k%3D1_a%3D1/f79e906eb96938807f6f9d758fc652fd",
      "https://drscdn.500px.org/photo/216559713/m%3D2048_k%3D1_a%3D1/393ef5251fa94964fe62cad52a416b7e",
      // 'https://drscdn.500px.org/photo/214943889/m%3D2048_k%3D1_a%3D1/90bd2e3619dfcaae53fed683561aae1b',
      // 'https://drscdn.500px.org/photo/216158509/m%3D2048_k%3D1_a%3D1/cf70d51aab6ca4c4a3c1ecc225c69990',
      // 'https://drscdn.500px.org/photo/216111469/m%3D2048_k%3D1_a%3D1/d2d83296c838258095dbf2bffda70602',
      // 'https://drscdn.500px.org/photo/216051623/m%3D2048_k%3D1_a%3D1/5a3732bb413f240ad71b8279b038a3ff',
      // 'https://drscdn.500px.org/photo/216047335/m%3D2048_k%3D1_a%3D1/4237ac4606474f0ec7ccc05ca311772e',
      // 'https://drscdn.500px.org/photo/216000289/m%3D2048_k%3D1_a%3D1/5ac2a21092f9281feef3ab8484d2b19c'
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      _.isEqual(nextProps.dataUser, this.props.dataUser) &&
      _.isEqual(nextState, this.state)
    );
  }

  reLoadProfile = async () => {
    const { loaddataUser, dataUser } = this.props;
    if (!dataUser || !dataUser.UserID) {
      return null;
    }

    await loaddataUser({
      user_id: dataUser.UserID,
      option: 100,
      lang_name: "vi_VN",
    });
  };

  getGender = () => {
    return this.dataUser &&
      this.dataUser.Gender &&
      typeof this.dataUser.Gender === "number"
      ? this.dataUser.Gender
      : 2;
  };

  _renderHeader = () => {
    return (
      <View>
        <View style={styles.contain_avatar}>
          <Image
            source={
              this.dataUser && this.dataUser.Avatar
                ? { uri: this.dataUser.Avatar }
                : IMAGE.logo
            }
            resizeMode="cover"
            style={styles.avatar}
          />
          <View style={styles.right_avatar}>
            <EditView
              label={strings("profile.name_login")}
              text_edit={
                this.dataUser && this.dataUser.UserName
                  ? this.dataUser.UserName
                  : ""
              }
              style_edit={styles.text_name}
            />
            <EditView
              label={strings("profile.name_display")}
              text_edit={
                this.dataUser && this.dataUser.FullName
                  ? this.dataUser.FullName
                  : ""
              }
              isEditAble={true}
              style_edit={styles.text_name}
            />
            <View style={styles.change_pass}>
              <Text style={style_common.text_color_base}>
                {strings("profile.change_pass")}
              </Text>
              <TouchableOpacity style={styles.icon_pass}>
                <Ionicon name="ios-lock" size={30} color={COLOR.COLOR_SKY} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <EditView
          label={strings("profile.birth_day")}
          text_edit={
            this.dataUser && this.dataUser.BirdDate
              ? this.dataUser.BirdDate
              : ""
          }
          isEditAble={true}
        />
        <View style={styles.change_pass}>
          <Text
            style={[style_common.text_color_base, styles.label_radio_group]}
          >
            {strings("profile.gender")}
          </Text>
          <RadioForm
            radio_props={this.radioData}
            initial={this.getGender()}
            formHorizontal={true}
            buttonColor={"gray"}
            selectedButtonColor={"gray"}
            buttonSize={5}
            animation={true}
            style={styles.radio_form}
            onPress={(value) => {
              alert(value);
            }}
          />
        </View>

        <EditView
          label={strings("profile.email")}
          text_edit={
            this.dataUser && this.dataUser.Email ? this.dataUser.Email : ""
          }
          isEditAble={true}
        />
        <EditView
          label={strings("profile.mobile")}
          text_edit={
            this.dataUser && this.dataUser.Phone ? this.dataUser.Phone : ""
          }
          isEditAble={true}
        />
      </View>
    );
  };
  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          placeholder={"Địa chỉ"}
          onChangeText={(text) => {}}
          style={[style_common.input_border, styles.text_address]}
        />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          numberOfLines={5}
          multiline={true}
          placeholder={`Giới thiệu về ${
            this.dataUser && this.dataUser.FullName
              ? this.dataUser.FullName
              : ""
          }`}
          onChangeText={(text) => {}}
          style={[style_common.input_border, styles.text_area]}
          onSubmitEditing={(event) => {}}
        />

        <View style={styles.action}>
          <TouchableOpacity style={styles.btn_action}>
            <Icon name="smile-beam" size={30} color={COLOR.COLOR_YELLOW} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_action}>
            <Image
              style={styles.icon_img}
              source={IMAGE.imag_icon}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_save}>
            <Text>Luu</Text>
          </TouchableOpacity>
        </View>
        <PhotoGrid
          source={this.dataImage}
          width={width - 20}
          height={width / 1.5}
          ratio={0.5}
          navigation={this.props.navigation}
        />
      </View>
    );
  };

  _renderFooter = () => {
    return (
      <View style={styles.content_footer}>
        <MenuItem
          title="Bài viết đã lưu"
          nameIcon="bookmark"
          icon_color={COLOR.COLOR_SKY}
          title_color={COLOR.COLOR_SKY}
          onPress={() => {}}
          style={styles.menu_bottom}
        />
        <MenuItem
          title="Cac hoi vien dang theo doi"
          nameIcon="user-plus"
          icon_color={COLOR.COLOR_SKY}
          title_color={COLOR.COLOR_SKY}
          onPress={() => {}}
          style={styles.menu_bottom}
        />
        <MenuItem
          title="Su kien da tham gia"
          nameIcon="calendar-check"
          icon_color={COLOR.COLOR_SKY}
          title_color={COLOR.COLOR_SKY}
          onPress={() => {}}
          style={styles.menu_bottom}
        />
      </View>
    );
  };

  render() {
    // console.log("render tab1");
    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <ScrollView
          style={style_common.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.parent}>
            {this._renderHeader()}
            {this._renderContent()}
            {this._renderFooter()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
export default MyProfileTab1;

MyProfileTab1.propTypes = {
  dataUser: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  contain_avatar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  right_avatar: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
  },
  text_name: {
    color: COLOR.COLOR_SKY,
    fontWeight: "bold",
  },

  content_footer: {
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },

  change_pass: { flexDirection: "row", alignItems: "center" },
  icon_pass: {
    marginLeft: 10,
  },
  label_radio_group: {
    width: 100,
  },
  radio_form: { justifyContent: "space-around", flex: 1 },
  menu_bottom: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  icon_img: {
    width: 40,
    height: 30,
  },
  text_area: { flex: 1, textAlignVertical: "top", height: 100, marginTop: 10 },
  text_address: { marginTop: 10 },
  action: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
  },
  btn_action: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_save: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.COLOR_SKY,
    backgroundColor: COLOR.COLOR_SKY,
    borderRadius: 5,
    minWidth: 50,
    padding: 5,
    borderWidth: 1,
  },
});
