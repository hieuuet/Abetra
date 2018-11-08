import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  AsyncStorage,
  BackHandler,
  SafeAreaView
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import {
  ButtonBorder,
  ViewLoading,
  showAlert2
} from "../../components/CommonView";
import { postLogin, loginGuest, loginFacebook } from "../../actions";
import { facebookLogin } from "./Loginfb";
import { NavigationActions, StackActions } from "react-navigation";
import { USER_ID } from "../../constant/KeyConstant";
import { web } from "../../components/Communications";
import { TEXT_COMMON, TEXT_LOGIN } from "../../language";
import BackgroundImage from "../../components/BackgroundImage";
import { COLOR } from "../../constant/Color";

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
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      async () => {
        return await this.loginAsGuest();
      }
    );
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
    // return showAlert2({ title: "", message: "", positive: "", negative: "" });
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
      Alert.alert(
        "Thông báo",
        "Không lấy được dữ liệu từ Facebook",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
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
        Alert.alert(
          "Thông báo",
          "Không tìm thấy UserID",
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        "Thông báo",
        loginResult.Message,
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
          defaultValue=""
          placeholder={TEXT_LOGIN().InputPhone}
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
          placeholder={TEXT_LOGIN().InputPass}
          placeholderTextColor={COLOR.COLOR_WHITE}
          ref="pass"
          onChangeText={text => (this.dataUser.password = text)}
          style={styles.text_input}
        />
        <ButtonBorder label={TEXT_COMMON().Login} onPress={this._login} />
        <View style={styles.view_login}>
          <Text style={styles.text_fb1}>{TEXT_COMMON().LoginFB}</Text>
          <TouchableOpacity onPress={this.handleLoginFB}>
            <Text style={styles.text_fb2}>FACEBOOK</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text_notacc}>{TEXT_LOGIN().NotAccount}</Text>
        <ButtonBorder
          label={TEXT_LOGIN().Register}
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
            <Text style={styles.text_login}>{TEXT_COMMON().FanPage}</Text>
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
