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
  BackHandler
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import { ButtonBorder, ViewLoading } from "../../components/CommonView";
import { postLogin, loginGuest, loginFacebook } from "../../actions";
import { facebookLogin } from "./Loginfb";
import { strings } from "../../i18n";
import { NavigationActions, StackActions } from "react-navigation";
import { USER_ID } from "../../constant/KeyConstant";
import { web } from "../../components/Communications";
import Icon from "react-native-vector-icons/dist/Ionicons";

class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    console.log("params", params);
    return {
      title: "Đăng Nhập",
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            params.loginAsGuest();
          }}
        >
          <Icon
            style={styles.back}
            name={
              Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
            }
            color="#000000"
            size={30}
          />
        </TouchableOpacity>
      )
    };
  };
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

    this.props.navigation.setParams({ loginAsGuest: this.loginAsGuest });
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
      actions: [NavigationActions.navigate({ routeName: "TabHome" })]
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
          placeholder={strings("login.placeholder.input_phone")}
          keyboardType="numeric"
          onChangeText={text => (this.dataUser.userName = text)}
          style={[style_common.input_border, styles.text_input]}
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
          placeholder={strings("login.placeholder.input_pass")}
          ref="pass"
          onChangeText={text => (this.dataUser.password = text)}
          style={[style_common.input_border, styles.text_input]}
        />
        <ButtonBorder
          label={strings("login.btn_login")}
          onPress={this._login}
        />
        <View style={styles.view_login}>
          <Text>{strings("login.login_fb")}</Text>
          <TouchableOpacity onPress={this.handleLoginFB}>
            <Image
              style={styles.img_fb}
              resizeMode="cover"
              source={IMAGE.logo_fb}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.view_login}>
          <Text style={styles.text_login}>{strings("login.not_account")}</Text>
          <ButtonBorder
            label={strings("register.btn_register")}
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          />
        </View>
        <View style={styles.view_login}>
          <Text style={styles.text_login}>{strings("login.login_guest")}</Text>
          <ButtonBorder label="Guest" onPress={this.loginAsGuest} />
        </View>
      </View>
    );
  };
  _renderFooter = () => {
    return (
      <View style={styles.content_footer}>
        <View style={styles.view_fanpage}>
          <Text>{strings("verify.txt_fanpage")}</Text>
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
    height: 100
  },
  back: {
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10
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
  txt_underline: {
    textDecorationLine: "underline",
    paddingLeft: 5
  }
});
