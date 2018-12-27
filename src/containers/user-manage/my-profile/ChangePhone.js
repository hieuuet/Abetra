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
  TouchableOpacity
} from "react-native";

import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import { ButtonBorder, ViewLoading } from "../../../components/CommonView";
import { TEXT_CHANGE_PHONE } from "../../../language";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { updateUserProfile, loadUserProfile } from "../../../actions";
import { COLOR } from "../../../constant/Color";
import { web } from "../../../components/Communications";
import BackgroundImage from "../../../components/BackgroundImage";
import injectShowAlert from "../../../constant/injectShowAlert";
class ChangePhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.userProfile =
      this.props.userProfile &&
      this.props.userProfile.Value &&
      this.props.userProfile.Value.length > 0
        ? this.props.userProfile.Value[0]
        : undefined;
    this.newPhone = "";
    this.code = "";
    this.TEXT_CHANGE_PHONE = TEXT_CHANGE_PHONE();
  }

  onChangePhone = async () => {
    if (!this.userProfile)
      return this.props.showAlert({
        content: this.TEXT_CHANGE_PHONE.ProfileNotFound
      });

    if (this.newPhone.trim().length === 0 || this.code.trim().length === 0)
      return this.props.showAlert({
        content: this.TEXT_CHANGE_PHONE.RequiredInput
      });

    this.setState({ isLoading: true });
    const result = await updateUserProfile({
      profile_id: this.userProfile.ProfileID,
      user_id: this.userProfile.UserID,
      field: "Phone",
      value: this.newPhone
    });
    this.setState({ isLoading: false });
    //success
    if (result && result.ErrorCode === "00")
      return this.props.showAlert({
        content: result && result.Message,
        onSubmit: () => {
          this.props.loadUserProfile({
            user_id: this.userProfile.UserID,
            option: 100
          });
          this.props.navigation.goBack();
        }
      });

    //error
    return this.props.showAlert({
      content:
        (result && result.Message) || this.TEXT_CHANGE_PHONE.ChangePhoneFail
    });
  };

  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="numeric"
          placeholder={this.TEXT_CHANGE_PHONE.NewPhone}
          onChangeText={text => (this.newPhone = text)}
          placeholderTextColor={COLOR.COLOR_WHITE}
          style={styles.text_input}
          onSubmitEditing={event => {
            this.refs.code.focus();
          }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          ref="code"
          placeholder={this.TEXT_CHANGE_PHONE.InputCode}
          placeholderTextColor={COLOR.COLOR_WHITE}
          onChangeText={text => (this.code = text)}
          style={styles.text_input}
        />

        <Text style={styles.text_info}>{this.TEXT_CHANGE_PHONE.InfoSMS}</Text>
        <View style={styles.wraper_btn}>
          <ButtonBorder
            label={this.TEXT_CHANGE_PHONE.Confirm}
            onPress={this.onChangePhone}
            my_style={styles.btn_left}
          />
          <ButtonBorder
            label={this.TEXT_CHANGE_PHONE.Cancel}
            my_style={[style_common.btn_blue_radius, styles.btn_right]}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  };

  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
  };

  _renderFooter = () => {
    return (
      <View style={styles.content_footer}>
        <View style={styles.view_fanpage}>
          <Text style={style_common.text_color_White}>
            {this.TEXT_CHANGE_PHONE.FanPage}
          </Text>
          <TouchableOpacity onPress={() => web(this.props.commonSetting.FanPage || "")}>
            <Image
              style={styles.img_fb}
              resizeMode="cover"
              source={IMAGE.icon_fanpage_white}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        // keyboardVerticalOffset={64}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={style_common.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <BackgroundImage
            style={style_common.content_center}
            onBackPress={() => this.props.navigation.goBack()}
          >
            <Image
              style={styles.img_logo}
              resizeMode="cover"
              source={IMAGE.logo_white}
            />

            {this._renderContent()}
            {this._renderFooter()}
          </BackgroundImage>
        </ScrollView>
        {this._renderLoading()}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.loadUserProfile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch)
  };
};

ChangePhone = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePhone);
export default compose(injectShowAlert)(ChangePhone);

const styles = StyleSheet.create({
  img_logo: {
    width: 100,
    height: 100 * (437 / 488)
  },
  text_input: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.COLOR_WHITE,
    padding: 5,
    alignSelf: "stretch",
    marginHorizontal: 60,
    marginTop: 10,
    color: COLOR.COLOR_WHITE,
    textAlign: "center"
  },

  img_fb: {
    marginLeft: 5,
    width: 20 * (223 / 74),
    height: 20
  },
  view_login: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    alignSelf: "stretch"
  },
  view_fanpage: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  content_footer: {
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
    flex: 1
  },
  text_login: {
    flex: 1,
    marginRight: 10
  },
  text_info: {
    marginHorizontal: 60,
    marginTop: 10,
    color: COLOR.COLOR_WHITE,
    textAlign: "center"
  },
  btn_left: { flex: 1, marginRight: 5, minWidth: 100 },
  btn_right: { flex: 1, marginLeft: 5, minWidth: 100 },
  wraper_btn: {
    marginHorizontal: 60,
    flexDirection: "row",
    justifyContent: "center"
  }
});
