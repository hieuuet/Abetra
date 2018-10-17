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
  Alert
} from "react-native";

import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import { ButtonBorder, ViewLoading } from "../../../components/CommonView";

import { changePassword } from "../../../actions";
import { COLOR } from "../../../constant/Color";
import { web } from "../../../components/Communications";
import { TEXT_COMMON, TEXT_CHANGE_PASSWORD } from "../../../language";
class ChangePassword extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: TEXT_CHANGE_PASSWORD().ChangePass,

      headerTitleStyle: { color: COLOR.COLOR_BLACK },
      headerTintColor: COLOR.COLOR_BLACK
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.oldPass = "";
    this.newPass = "";
    this.reNewPass = "";
    this.userName = this.props.navigation.getParam("user_name");
  }

  onChangePass = async () => {
    if (!this.userName)
      return Alert.alert(
        "Thông báo",
        "Không tìm thấy UserID",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    if (
      this.oldPass.trim().length === 0 ||
      this.newPass.trim().length === 0 ||
      this.reNewPass.trim().length === 0
    )
      return Alert.alert(
        "Thông báo",
        "Bạn chưa nhập đủ mật khẩu",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );

    if (this.newPass.trim() !== this.reNewPass.trim())
      return Alert.alert(
        "Thông báo",
        "Mật khẩu mới không trùng khớp nhau",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    this.setState({ isLoading: true });
    const result = await changePassword({
      ten_dang_nhap: this.userName,
      mat_khau_cu: this.oldPass,
      mat_khau_moi: this.newPass
    });
    this.setState({ isLoading: false });
    if (result) {
      if (result.ErrorCode === "00")
        return Alert.alert(
          "Thông báo",
          result.Message,
          [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
          { cancelable: false }
        );
      return Alert.alert(
        "Thông báo",
        result.Message,
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } else {
      return Alert.alert(
        "Thông báo",
        "Đổi mật khẩu thất bại",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
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
          placeholder={TEXT_CHANGE_PASSWORD().InputOldPass}
          onChangeText={text => (this.oldPass = text)}
          style={[style_common.input_border, styles.text_input]}
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
          placeholder={TEXT_CHANGE_PASSWORD().InputNewPass}
          onChangeText={text => (this.newPass = text)}
          style={[style_common.input_border, styles.text_input]}
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
          placeholder={TEXT_CHANGE_PASSWORD().InputReNewPass}
          onChangeText={text => (this.reNewPass = text)}
          style={[style_common.input_border, styles.text_input]}
        />
        <View style={styles.wraper_btn}>
          <ButtonBorder
            label={TEXT_COMMON().Confirm}
            onPress={this.onChangePass}
            my_style={styles.btn_left}
          />
          <ButtonBorder
            label={TEXT_COMMON().Cancel}
            my_style={styles.btn_right}
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
          <Text style={style_common.text_color_base}>
            {TEXT_COMMON().FanPage}
          </Text>
          <TouchableOpacity onPress={() => web("fb://page/331230823580420")}>
            <Image
              style={styles.img_fb}
              resizeMode="cover"
              source={IMAGE.logo_fb}
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
        keyboardVerticalOffset={64}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={style_common.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={style_common.content_center}>
            <Image
              style={styles.img_logo}
              resizeMode="cover"
              source={IMAGE.logo}
            />

            {this._renderContent()}
            {this._renderFooter()}
          </View>
        </ScrollView>
        {this._renderLoading()}
      </KeyboardAvoidingView>
    );
  }
}

export default ChangePassword;

const styles = StyleSheet.create({
  img_logo: {
    width: 100,
    height: 100
  },
  text_input: {
    marginHorizontal: 60,
    marginTop: 10,
    padding: 5
  },

  img_fb: {
    width: 50,
    height: 50
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
  btn_left: { flex: 1, marginRight: 10 },
  btn_right: { flex: 1, marginRight: 10 },
  wraper_btn: { marginHorizontal: 60, flexDirection: "row" }
});
