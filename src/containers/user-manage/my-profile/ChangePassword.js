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

import { changePassword } from "../../../actions";
import { COLOR } from "../../../constant/Color";
import { web } from "../../../components/Communications";
import { TEXT_CHANGE_PASSWORD } from "../../../language";
import BackgroundImage from "../../../components/BackgroundImage";
import { compose } from "redux";
import { connect } from "react-redux";

import injectShowAlert from "../../../constant/injectShowAlert";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.oldPass = "";
    this.newPass = "";
    this.reNewPass = "";
    this.userName = this.props.navigation.getParam("user_name");
    this.TEXT_CHANGE_PASSWORD = TEXT_CHANGE_PASSWORD();
  }

  onChangePass = async () => {
    if (!this.userName)
      return this.props.showAlert({
        content: this.TEXT_CHANGE_PASSWORD.ProfileNotFound
      });

    if (
      this.oldPass.trim().length === 0 ||
      this.newPass.trim().length === 0 ||
      this.reNewPass.trim().length === 0
    )
      return this.props.showAlert({
        content: this.TEXT_CHANGE_PASSWORD.RequirePass
      });

    if (this.newPass.trim() !== this.reNewPass.trim())
      return this.props.showAlert({
        content: this.TEXT_CHANGE_PASSWORD.PassNotMatch
      });

    this.setState({ isLoading: true });
    const result = await changePassword({
      ten_dang_nhap: this.userName,
      mat_khau_cu: this.oldPass,
      mat_khau_moi: this.newPass
    });
    this.setState({ isLoading: false });
    if (result) {
      if (result.ErrorCode === "00")
        return this.props.showAlert({
          content: result && result.Message,
          onSubmit: this.props.navigation.goBack()
        });

      return this.props.showAlert({
        content: result && result.Message
      });
    } else {
      return this.props.showAlert({
        content: this.TEXT_CHANGE_PASSWORD.ChangePassFail
      });
    }
  };

  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          secureTextEntry={true}
          placeholder={this.TEXT_CHANGE_PASSWORD.InputOldPass}
          onChangeText={text => (this.oldPass = text)}
          style={styles.text_input}
          placeholderTextColor={COLOR.COLOR_WHITE}
          onSubmitEditing={event => {
            this.refs.newPass.focus();
          }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          ref="newPass"
          secureTextEntry={true}
          placeholder={this.TEXT_CHANGE_PASSWORD.InputNewPass}
          onChangeText={text => (this.newPass = text)}
          style={styles.text_input}
          placeholderTextColor={COLOR.COLOR_WHITE}
          onSubmitEditing={event => {
            this.refs.reNewPass.focus();
          }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          ref="reNewPass"
          secureTextEntry={true}
          placeholder={this.TEXT_CHANGE_PASSWORD.InputReNewPass}
          onChangeText={text => (this.reNewPass = text)}
          style={styles.text_input}
          placeholderTextColor={COLOR.COLOR_WHITE}
        />
        <View style={styles.wraper_btn}>
          <ButtonBorder
            label={this.TEXT_CHANGE_PASSWORD.Confirm}
            onPress={this.onChangePass}
            my_style={styles.btn_left}
          />
          <ButtonBorder
            label={this.TEXT_CHANGE_PASSWORD.Cancel}
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
            {this.TEXT_CHANGE_PASSWORD.FanPage}
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
    commonSetting: state.commonSetting
  };
};

const mapDispatchToProps = dispatch => {
  return { };
};

ChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

export default compose(injectShowAlert)(ChangePassword);

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
    margin: 10,
    color: COLOR.COLOR_BLACK
  },
  btn_left: { flex: 1, marginRight: 5, minWidth: 100 },
  btn_right: { flex: 1, marginLeft: 5, minWidth: 100 },
  wraper_btn: {
    marginHorizontal: 60,
    flexDirection: "row",
    justifyContent: "center"
  }
});
