import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  AsyncStorage,
  BackHandler
} from "react-native";
import style_common from "../../style-common/index";
import { IMAGE } from "../../constant/assets";
import CheckBox from "../../components/CheckBox ";
import { ButtonBorder, ViewLoading } from "../../components/CommonView";
import { facebookLogin } from "./Loginfb";
import { NavigationActions, StackActions } from "react-navigation";
import { postRegister, loginGuest, loginFacebook } from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { TEXT_COMMON, TEXT_LOGIN, TEXT_REGISTER } from "../../language";
import BackgroundImage from "../../components/BackgroundImage";
import { COLOR } from "../../constant/Color";
import { USER_ID } from "../../constant/KeyConstant";
import AppContext from "../../AppContext";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      isLoading: false,
      isLoadingIndicator: true
    };

    this.dataUser = {
      userName: "",
      fullName: "",
      password: "",
      rePassword: "",
      email: ""
    };

    this.TEXT_COMMON = TEXT_COMMON();
    this.TEXT_REGISTER = TEXT_REGISTER();
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

  loginAsGuest = () => {
    this.props.loginGuest(true);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
      this.goToHomeTab();
    }, 500);
  };
  goToHomeTab = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "WrapperTab" })]
    });
    this.props.navigation.dispatch(resetAction);
  };
  goTologin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });
    this.props.navigation.dispatch(resetAction);
  };
  gotToVerify = () => {
    this.props.navigation.navigate("InputPhone", {
      userName: this.dataUser.userName,
      password: this.dataUser.password,
      phone: this.dataUser.userName
    });
  };
  _register = async () => {
    const { userName, fullName, password, rePassword } = this.dataUser;
    console.log("data register", this.dataUser);

    if (!this.state.isChecked) {
      return this.context.showAlert({
        content: this.TEXT_REGISTER.RequiredTerm
      });
    }

    if (password.length === 0 || rePassword.length === 0) {
      return this.context.showAlert({
        content: this.TEXT_REGISTER.PassRequired
      });
    }

    if (password.length < 6) {
      return this.context.showAlert({
        content: this.TEXT_REGISTER.PassLenght
      });
    }

    if (password !== rePassword) {
      return this.context.showAlert({
        content: this.TEXT_REGISTER.PassNotMatch
      });
    }

    this.setState({ isLoading: true });
    let register = await postRegister({
      Username: userName,
      FullName: fullName,
      Password: password,
      Email: `${userName}@aibrtra.vn`
    });
    this.setState({ isLoading: false });
    console.log("register result", register);
    if (register.ErrorCode === "00") {
      return this.context.showAlert({
        content: register.Message,
        onSubmit: this.gotToVerify
      });
    } else {
      return this.context.showAlert({
        content: register.Message
      });
    }
  };
  handleLoginFB = async () => {
    this.setState({ isLoading: true, isLoadingIndicator: false });

    const dataFB = await facebookLogin();
    this.setState({ isLoading: false, isLoadingIndicator: true });

    if (dataFB !== undefined) {
      this.dataUser = {
        userName: dataFB.id,
        fullName: dataFB.fullName,
        email: dataFB.email ? dataFB.email : "",
        password: "123456",
        rePassword: "123456"
      };
      console.log("dataUser", this.dataUser);
      //TODO: Call api server with data from fb
      const { userName, fullName, password, email } = this.dataUser;

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
      return this.context.showAlert({
        content: this.TEXT_COMMON.GetDataFBFail
      });
    }
  };
  //Handle result after login
  _handleLoginResult = async loginResult => {
    if (loginResult.ErrorCode === "00") {
      if (
        !loginResult.Value[0].Phone ||
        loginResult.Value[0].Phone.length === 0
      ) {
        return this.props.navigation.navigate("InputPhone", {
          userName: loginResult.Value[0].userName,
          password: "",
          phone: undefined,
          isLoginFb: true
        });
      }
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
        return this.context.showAlert({
          content: this.TEXT_COMMON.NotFoundUserId
        });
      }
    } else {
      return this.context.showAlert({
        content: loginResult.Message
      });
    }
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
  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          placeholderTextColor={COLOR.COLOR_WHITE}
          placeholder={this.TEXT_REGISTER.InputName}
          onChangeText={text => (this.dataUser.fullName = text)}
          style={styles.text_input}
          onSubmitEditing={event => {
            this.refs.phone.focus();
          }}
        />

        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          ref="phone"
          placeholder={this.TEXT_LOGIN.InputPhone}
          keyboardType="numeric"
          placeholderTextColor={COLOR.COLOR_WHITE}
          onChangeText={text => (this.dataUser.userName = text)}
          style={styles.text_input}
          onSubmitEditing={event => {
            this.refs.pass.focus();
          }}
        />

        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          secureTextEntry={true}
          placeholderTextColor={COLOR.COLOR_WHITE}
          placeholder={this.TEXT_LOGIN.InputPass}
          ref="pass"
          onChangeText={text => (this.dataUser.password = text)}
          style={styles.text_input}
          onSubmitEditing={event => {
            this.refs.rePass.focus();
          }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          secureTextEntry={true}
          placeholderTextColor={COLOR.COLOR_WHITE}
          placeholder={this.TEXT_REGISTER.InputRePass}
          ref="rePass"
          onChangeText={text => (this.dataUser.rePassword = text)}
          style={styles.text_input}
        />
        <ButtonBorder
          label={this.TEXT_REGISTER.Register}
          onPress={this._register}
        />

        <View style={styles.view_login}>
          <Text style={styles.text_fb1}>{this.TEXT_COMMON.LoginFB}</Text>
          <TouchableOpacity
            onPress={this.handleLoginFB}
            style={styles.wrapper_fb}
          >
            <Text style={styles.text_fb2}>FACEBOOK</Text>
            <Image source={IMAGE.logo_fb} style={styles.logo_fb} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text_hasacc}>{this.TEXT_REGISTER.HasAccount}</Text>
        <ButtonBorder
          label={this.TEXT_COMMON.Login}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
          my_style={style_common.btn_blue_radius}
        />
      </View>
    );
  };
  _renderFooter = () => {
    const iconCheck = (
      <Image
        source={IMAGE.checked}
        style={{ width: 15, height: 15 * (56 / 38) }}
        resizeMode="contain"
      />
    );
    const iconUnCheck = (
      <Image
        source={IMAGE.unchecked}
        style={{ width: 15, height: 15 * (56 / 38) }}
        resizeMode="contain"
      />
    );
    return (
      <View style={styles.content_footer}>
        <View style={styles.parent_checkbox}>
          <CheckBox
            onClick={() => {
              this.setState({
                isChecked: !this.state.isChecked
              });
            }}
            isChecked={this.state.isChecked}
            checkedImage={iconCheck}
            unCheckedImage={iconUnCheck}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TermServices")}
          >
            <Text style={styles.txt_underline}>
              {this.TEXT_REGISTER.AgreeTerm}
            </Text>
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

  render() {
    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <ScrollView
          // keyboardShouldPersistTaps="always"
          // keyboardDismissMode="on-drag"
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
    loginGuest: bindActionCreators(loginGuest, dispatch),
    loginFacebook: bindActionCreators(loginFacebook, dispatch)
  };
};

Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
export default Register;

const styles = StyleSheet.create({
  logo_fb: { width: 30, height: 30, marginLeft: 5 },
  wrapper_fb: {
    flexDirection: "row",
    alignItems: "center"
  },
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
    flexDirection: "row",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    alignItems: "center"
  },
  parent_checkbox: {
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row"
  },
  text_login: {
    flex: 1,
    marginRight: 10,
    color: COLOR.COLOR_WHITE,
    alignSelf: "center"
  },
  txt_underline: {
    // textDecorationLine: "underline",
    paddingLeft: 5,
    color: COLOR.COLOR_WHITE
  },
  content_footer: {
    justifyContent: "flex-end",
    marginTop: 10,
    marginRight: 10,
    marginLeft: 30,
    marginBottom: 10,
    flex: 1
  },
  text_hasacc: {
    marginTop: 10,
    color: COLOR.COLOR_WHITE,
    alignSelf: "center",
    fontWeight: "bold"
  },
  text_fb1: { color: COLOR.COLOR_WHITE },
  text_fb2: { color: COLOR.COLOR_WHITE, fontWeight: "900" }
});
