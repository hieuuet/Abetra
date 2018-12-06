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
  AsyncStorage
} from "react-native";

import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import { ButtonBorder, ViewLoading } from "../../components/CommonView";
import { TEXT_COMMON, TEXT_VERIFY } from "../../language";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  postLogin,
  loginGuest,
  loadUserProfile,
  verifyOTP
} from "../../actions";
import { USER_ID } from "../../constant/KeyConstant";
import { COLOR } from "../../constant/Color";
import { web } from "../../components/Communications";
import BackgroundImage from "../../components/BackgroundImage";
import { NavigationActions, StackActions } from "react-navigation";
import AppContext from "../../AppContext";
class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.verifyCode = "";
    this.TEXT_COMMON = TEXT_COMMON();
    this.TEXT_VERIFY = TEXT_VERIFY();
  }

  verify = async () => {
    if (this.verifyCode.length === 0) {
      return this.context.showAlert({ content: this.TEXT_VERIFY.RequiredOTP });
    }
    const userName = this.props.navigation.getParam("userName");
    this.setState({ isLoading: true });
    const verifyResult = await verifyOTP({
      OTP: this.verifyCode,
      UserName: userName
    });
    this.setState({ isLoading: false });
    if (!verifyResult || verifyResult.ErrorCode !== "00") {
      this.setState({ isLoading: false });
      return this.context.showAlert({
        content:
          (verifyResult && verifyResult.Message) || this.TEXT_VERIFY.VerifyFail
      });
    }
    await this._login();
  };
  reSendCode = () => {
    return this.context.showAlert({ content: this.TEXT_COMMON.FeatureDev });
  };
  loadUserProfile = async userID => {
    const { loadUserProfile } = this.props;
    const userProfile = await loadUserProfile({
      user_id: userID,
      option: 100
    });
    this.setState({ isLoading: false });
    if (!userProfile) {
      return this.context.showAlert({
        content: this.TEXT_COMMON.LoadProfileFail
      });
    }

    this.goToProfile();
  };
  goToProfile = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Profile",
          params: { fromVerify: true }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
    // this.props.navigation.navigate("Profile", { fromVerify: true });
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
        return this.context.showAlert({
          content: this.TEXT_COMMON.NotFoundUserId
        });
      }
    } else {
      this.setState({ isLoading: false });
      return this.context.showAlert({ content: login.Message });
    }
  };

  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          placeholder={this.TEXT_VERIFY.InputCode}
          placeholderTextColor={COLOR.COLOR_WHITE}
          keyboardType="numeric"
          onChangeText={text => (this.verifyCode = text)}
          style={styles.text_input}
        />
        {/* <Text style={styles.text_info}>{TEXT_VERIFY.Info}</Text> */}
        <ButtonBorder label={this.TEXT_COMMON.Confirm} onPress={this.verify} />

        <Text style={styles.text_info}>{this.TEXT_VERIFY.NotRecevie}</Text>
        <ButtonBorder
          label={this.TEXT_VERIFY.Resend}
          onPress={this.reSendCode}
          my_style={style_common.btn_blue_radius}
        />
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
          <TouchableOpacity onPress={() => web("fb://page/331230823580420")}>
            <Text style={styles.text_login}>{this.TEXT_COMMON.FanPage}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _bindeGlobalContext = () => {
    return (
      <AppContext.Consumer>
        {context => {
          this.context = context;
        }}
      </AppContext.Consumer>
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
        {this._bindeGlobalContext()}
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
    marginRight: 10,
    color: COLOR.COLOR_WHITE
  },
  text_info: {
    margin: 10,
    color: COLOR.COLOR_WHITE
  }
});
