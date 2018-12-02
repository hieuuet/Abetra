import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  AsyncStorage,
  BackHandler
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import { ButtonBorder, ViewLoading } from "../../components/CommonView";
import { postLogin, loginGuest, loginFacebook } from "../../actions";
import { facebookLogin } from "./Loginfb";
import { NavigationActions, StackActions } from "react-navigation";
import { USER_ID } from "../../constant/KeyConstant";
import { web } from "../../components/Communications";
import { TEXT_COMMON, TEXT_LOGIN } from "../../language";
import BackgroundImage from "../../components/BackgroundImage";
import { COLOR } from "../../constant/Color";
import AppContext from "../../AppContext";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingIndicator: true
    };
    this.dataUser = {
      userName: "",
      password: ""
    };

    this.TEXT_COMMON = TEXT_COMMON();
    this.TEXT_LOGIN = TEXT_LOGIN();
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (!this.context.isShowAlert) {
        this.loginAsGuest();
        return true;
      }
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  goToHomeTab = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "WrapperTab" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  loginAsGuest = () => {
    this.props.loginGuest(true);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
      this.goToHomeTab();
    }, 500);
  };
  //Call api login account
  _login = async () => {
    const { userName, password } = this.dataUser;

    const { postLogin } = this.props;
    this.setState({ isLoading: true });
    let login = await postLogin({
      so_dien_thoai: userName,
      mat_khau: password
    });
    this.setState({ isLoading: false });
    this._handleLoginResult(login);
  };
  //Call api login facebook
  handleLoginFB = async () => {
    this.setState({ isLoading: true, isLoadingIndicator: false });

    const dataFB = await facebookLogin();
    this.setState({ isLoading: false, isLoadingIndicator: true });

    if (dataFB !== undefined) {
      this.setState({ isLoading: true });

      const resultLogin = await this.props.loginFacebook({
        Username: dataFB.id,
        FullName: dataFB.fullName,
        Email: dataFB.email || "",
        Password: "123456"
      });
      console.log("resultLogin", resultLogin);
      this.setState({ isLoading: false });
      this._handleLoginResult(resultLogin);
    } else {
      this.context.showAlert({ content: this.TEXT_COMMON.GetDataFBFail });
    }
  };

  //Handle result after login
  _handleLoginResult = async loginResult => {
    if (loginResult.ErrorCode === "00") {
      const IntUserID = loginResult.Value[0].IntUserID.toString();
      const ProfileID = loginResult.Value[0].ProfileID.toString();
      if (
        loginResult.Value &&
        loginResult.Value.length > 0 &&
        loginResult.Value[0].UserID
      ) {
        await AsyncStorage.setItem(USER_ID, loginResult.Value[0].UserID);
        await AsyncStorage.setItem("IntUserID", IntUserID);
        await AsyncStorage.setItem("ProfileID", ProfileID);
        this.props.loginGuest(false);
        this.goToHomeTab();
      } else {
        this.context.showAlert({ content: this.TEXT_COMMON.NotFoundUserId });
      }
    } else {
      this.context.showAlert({ content: loginResult.Message });
    }
  };

  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          defaultValue=""
          placeholder={this.TEXT_LOGIN.InputPhone}
          placeholderTextColor={COLOR.COLOR_WHITE}
          keyboardType="numeric"
          onChangeText={text => (this.dataUser.userName = text)}
          style={styles.text_input}
          onSubmitEditing={event => {
            this.refs.pass.focus();
          }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          defaultValue=""
          secureTextEntry={true}
          placeholder={this.TEXT_LOGIN.InputPass}
          placeholderTextColor={COLOR.COLOR_WHITE}
          ref="pass"
          onChangeText={text => (this.dataUser.password = text)}
          style={styles.text_input}
        />
        <ButtonBorder label={this.TEXT_COMMON.Login} onPress={this._login} />
        <View style={styles.view_login}>
          <Text style={styles.text_fb1}>{this.TEXT_COMMON.LoginFB}</Text>
          <TouchableOpacity onPress={this.handleLoginFB}>
            <Text style={styles.text_fb2}>FACEBOOK</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text_notacc}>{this.TEXT_LOGIN.NotAccount}</Text>
        <ButtonBorder
          label={this.TEXT_LOGIN.Register}
          onPress={() => {
            this.props.navigation.navigate("Register");
          }}
          my_style={style_common.btn_blue_radius}
        />

        <View />
      </View>
    );
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

  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
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
            onBackPress={() => this.loginAsGuest()}
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

const mapStateToProps = state => {
  return {
    // login: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postLogin: bindActionCreators(postLogin, dispatch),
    loginGuest: bindActionCreators(loginGuest, dispatch),
    loginFacebook: bindActionCreators(loginFacebook, dispatch)
  };
};

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
export default Login;
const styles = StyleSheet.create({
  img_logo: {
    width: 100,
    height: 100 * (354 / 379)
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
  text_fb1: { color: COLOR.COLOR_WHITE },
  text_fb2: { color: COLOR.COLOR_WHITE, fontWeight: "900" },
  view_login: {
    flexDirection: "row",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
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
    marginTop: 10,
    color: COLOR.COLOR_WHITE,
    alignSelf: "center"
  },
  text_notacc: {
    marginTop: 10,
    color: COLOR.COLOR_WHITE,
    alignSelf: "center"
  },
  txt_underline: {
    textDecorationLine: "underline",
    paddingLeft: 5
  }
});
