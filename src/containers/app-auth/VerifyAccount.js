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
  Alert,
  AsyncStorage
} from "react-native";

import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import { ButtonBorder, ViewLoading } from "../../components/CommonView";
import { strings } from "../../i18n";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { postLogin, loginGuest, loadUserProfile } from "../../actions";
import { USER_ID } from "../../constant/KeyConstant";
import { COLOR } from "../../constant/Color";
import { web } from "../../components/Communications";

class VerifyAccount extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Xác thực số điện thoại",
      headerTitleStyle: { color: COLOR.COLOR_BLACK },
      headerTintColor: COLOR.COLOR_BLACK
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.verifyCode = "";
  }

  verify = async () => {
    await this._login();
  };
  reSendCode = () => {
    Alert.alert(
      "Thông báo",
      "Tính năng đang phát triển",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  };
  loadUserProfile = async userID => {
    const { loadUserProfile } = this.props;
    const userProfile = await loadUserProfile({
      user_id: userID,
      option: 100
    });
    this.setState({ isLoading: false });
    if (!userProfile) {
      return Alert.alert(
        "Thông báo",
        "Không thể tải trang cá nhân",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }

    this.goToProfile();
  };
  goToProfile = () => {
    this.props.navigation.navigate("Profile", { fromVerify: true });
  };
  _login = async () => {
    const userName = this.props.navigation.getParam("userName");
    const password = this.props.navigation.getParam("password");

    const { postLogin } = this.props;
    this.setState({ isLoading: true });
    let login = await postLogin({
      so_dien_thoai: userName,
      mat_khau: password
    });

    if (login.ErrorCode === "00") {
      if (login.Value && login.Value.length > 0 && login.Value[0].UserID) {
        await AsyncStorage.setItem(USER_ID, login.Value[0].UserID);
        this.props.loginGuest(false);
        this.loadUserProfile(login.Value[0].UserID);
      } else {
        this.setState({ isLoading: false });
        Alert.alert(
          "Thông báo",
          "Không tìm thấy UserID",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } else {
      this.setState({ isLoading: false });
      Alert.alert(
        "Thông báo",
        login.Message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
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
          returnKeyType="done"
          placeholder={strings("verify.placeholder.input_code")}
          keyboardType="numeric"
          defaultValue="1234"
          onChangeText={text => (this.verifyCode = text)}
          style={[style_common.input_border, styles.text_input]}
        />
        <Text style={styles.text_info}>{strings("verify.info")}</Text>
        <ButtonBorder
          label={strings("verify.btn_confirm")}
          onPress={this.verify}
          // my_style={{ marginBottom: 10 }}
        />
        <View style={styles.view_login}>
          <Text style={[styles.text_login, style_common.text_color_base]}>
            {strings("verify.txt_notReceive")}
          </Text>
          <ButtonBorder
            label={strings("verify.btn_reSend")}
            onPress={this.reSendCode}
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
            {strings("verify.txt_fanpage")}
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

const mapDispatchToProps = dispatch => {
  return {
    postLogin: bindActionCreators(postLogin, dispatch),
    loginGuest: bindActionCreators(loginGuest, dispatch),
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch)
  };
};

VerifyAccount = connect(
  null,
  mapDispatchToProps
)(VerifyAccount);
export default VerifyAccount;

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
  }
});
