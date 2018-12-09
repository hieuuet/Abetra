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

import { bindActionCreators, compose } from "redux";
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
import AccountKit, {
  LoginButton,
  Color,
  StatusBarStyle
} from "react-native-facebook-account-kit";
class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      authToken: null,
      loggedAccount: null
    };
    this.verifyCode = "";
    this.TEXT_COMMON = TEXT_COMMON();
    this.TEXT_VERIFY = TEXT_VERIFY();
  }

  componentWillMount() {
    this.configureAccountKit();

    AccountKit.getCurrentAccessToken()
      .then(token => {
        if (token) {
          AccountKit.getCurrentAccount().then(account => {
            this.setState({
              authToken: token,
              loggedAccount: account
            });
          });
        } else {
          console.log("No user account logged");
        }
      })
      .catch(e => console.log("Failed to get current access token", e));
  }

  configureAccountKit() {
    AccountKit.configure({
      theme: {
        //backgroundColor:       Color.rgba(0,120,0,0.1),
        //buttonBackgroundColor: Color.rgba(0, 153, 0, 1.00),
        //buttonDisabledBackgroundColor: Color.rgba(100, 153, 0, 0.5),
        //buttonBorderColor:     Color.rgba(0,255,0,1),
        //buttonTextColor:       Color.rgba(0,255,0,1),
        //headerBackgroundColor: Color.rgba(0, 153, 0, 1.00),
        //headerTextColor:       Color.rgba(0,255,0,1),
        //headerButtonTextColor: Color.rgba(0,255,0,1),
        //iconColor:             Color.rgba(0,255,0,1),
        //inputBackgroundColor:  Color.rgba(0,255,0,1),
        //inputBorderColor:      Color.hex('#ccc'),
        //inputTextColor:        Color.hex('#0f0'),
        //textColor:             Color.hex('#0f0'),
        //titleColor:            Color.hex('#0f0'),
        //backgroundImage:       "background.png",
        //statusBarStyle:        StatusBarStyle.LightContent,
      },
      //countryWhitelist: [ "AR", "BR", "US" ],
      //countryBlacklist: [ "BR" ],
      //defaultCountry: "AR"
      initialEmail: "example.com",
      initialPhoneCountryPrefix: "+84",
      responseType: "code"
      // initialPhoneNumber: "123-456-7890"
    });
  }

  verify = async () => {
    if (this.verifyCode.length === 0) {
      return this.props.showAlert({ content: this.TEXT_VERIFY.RequiredOTP });
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
      return this.props.showAlert({
        content:
          (verifyResult && verifyResult.Message) || this.TEXT_VERIFY.VerifyFail
      });
    }
    await this._login();
  };
  reSendCode = () => {
    AccountKit.loginWithPhone().then(token => {
      if (!token) {
        console.log("Login cancelled");
      } else {
        console.log(`Logged with phone. Token: ${token}`);
      }
      console.log("token-------------", token);
      
    });
    // return this.props.showAlert({ content: this.TEXT_COMMON.FeatureDev });
  };
  loadUserProfile = async userID => {
    const { loadUserProfile } = this.props;
    const userProfile = await loadUserProfile({
      user_id: userID,
      option: 100
    });
    this.setState({ isLoading: false });
    if (!userProfile) {
      return this.props.showAlert({
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
        return this.props.showAlert({
          content: this.TEXT_COMMON.NotFoundUserId
        });
      }
    } else {
      this.setState({ isLoading: false });
      return this.props.showAlert({ content: login.Message });
    }
  };

  onLogin(token) {
    console.log("errrr", token);
    if (!token) {
      console.warn("User canceled login");
      this.setState({});
    } else {
      AccountKit.getCurrentAccount().then(account => {
        this.setState({
          authToken: token,
          loggedAccount: account
        });
      });
    }
  }

  onLoginError(e) {
    console.log("Failed to login", e);
  }

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
        <LoginButton
          style={styles.button}
          type="phone"
          onLogin={token => this.onLogin(token)}
          onError={e => this.onLogin(e)}
        >
          {/* <ButtonBorder
            label={this.TEXT_COMMON.Confirm}
            // onPress={() => this.onLogin(token)}
          /> */}
          <Text style={styles.buttonText}>{this.TEXT_COMMON.Confirm}</Text>
        </LoginButton>

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
