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
  Alert,
  BackHandler
} from "react-native";
import style_common from "../../style-common/index";
import { IMAGE } from "../../constant/assets";
import CheckBox from "../../components/CheckBox ";
import { ButtonBorder, ViewLoading } from "../../components/CommonView";
import { facebookLogin } from "./Loginfb";
import { NavigationActions, StackActions } from "react-navigation";
import { postRegister, loginGuest } from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/dist/Ionicons";
import { TEXT_COMMON, TEXT_LOGIN, TEXT_REGISTER } from "../../language";
class Register extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: TEXT_REGISTER.Register,
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
      isChecked: true,
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
      actions: [NavigationActions.navigate({ routeName: "TabHome" })]
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
    this.props.navigation.navigate("VerifyAccount", {
      userName: this.dataUser.userName,
      password: this.dataUser.password
    });
  };
  _register = async () => {
    const { userName, fullName, password, rePassword } = this.dataUser;
    console.log("data register", this.dataUser);

    if (password.length === 0 || rePassword.length === 0) {
      Alert.alert(
        "Thông báo",
        "Bạn phải nhập mật khẩu",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
      return;
    }
    if (password.length < 6 || password !== rePassword) {
      Alert.alert(
        "Thông báo",
        "Mật khẩu không trùng khớp",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
      return;
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
      Alert.alert(
        "Thông báo",
        register.Message,
        [{ text: "OK", onPress: this.gotToVerify }],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Thông báo",
        register.Message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
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
      let register = await postRegister({
        Username: userName,
        FullName: fullName,
        Email: email,
        Password: password
      });
      this.setState({ isLoading: false });
      console.log("register result", register);
      // if (register.ErrorCode === "00") {
      //   Alert.alert(
      //     "Thông báo",
      //     register.Message,
      //     [{ text: "OK", onPress: this.gotToVerify }],
      //     { cancelable: false }
      //   );
      // } else {
      //   Alert.alert(
      //     "Thông báo",
      //     register.Message,
      //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      //     { cancelable: false }
      //   );
      // }
    }
  };

  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          placeholder={TEXT_LOGIN.InputPhone}
          keyboardType="numeric"
          onChangeText={text => (this.dataUser.userName = text)}
          style={[style_common.input_border, styles.text_input]}
          onSubmitEditing={event => {
            this.refs.full_name.focus();
          }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          ref="full_name"
          placeholder={TEXT_REGISTER.InputName}
          onChangeText={text => (this.dataUser.fullName = text)}
          style={[style_common.input_border, styles.text_input]}
          onSubmitEditing={event => {
            this.refs.pass.focus();
          }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          secureTextEntry={true}
          placeholder={TEXT_LOGIN.InputPass}
          ref="pass"
          onChangeText={text => (this.dataUser.password = text)}
          style={[style_common.input_border, styles.text_input]}
          onSubmitEditing={event => {
            this.refs.rePass.focus();
          }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          secureTextEntry={true}
          placeholder={TEXT_REGISTER.InputRePass}
          ref="rePass"
          onChangeText={text => (this.dataUser.rePassword = text)}
          style={[style_common.input_border, styles.text_input]}
        />
        <ButtonBorder label={TEXT_REGISTER.Register} onPress={this._register} />
        {/* <DismissKeyboardView>
          <Text >afv</Text>
        </DismissKeyboardView> */}
        <View style={styles.view_login}>
          <Text>{TEXT_COMMON.LoginFB}</Text>
          <TouchableOpacity onPress={this.handleLoginFB}>
            <Image
              style={styles.img_fb}
              resizeMode="cover"
              source={IMAGE.logo_fb}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.view_login}>
          <Text style={styles.text_login}>{TEXT_REGISTER.HasAccount}</Text>
          <ButtonBorder
            label={TEXT_COMMON.Login}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    );
  };
  _renderFooter = () => {
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
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TermServices")}
          >
            <Text style={styles.txt_underline}>{TEXT_REGISTER.AgreeTerm}</Text>
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
    loginGuest: bindActionCreators(loginGuest, dispatch)
  };
};

Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
export default Register;

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
  parent_checkbox: {
    justifyContent: "flex-start",
    alignSelf: "stretch",
    flexDirection: "row"
  },
  text_login: {
    flex: 1,
    marginRight: 10
  },
  txt_underline: {
    textDecorationLine: "underline",
    paddingLeft: 5
  },
  content_footer: {
    justifyContent: "flex-end",
    marginTop: 10,
    marginRight: 10,
    marginLeft: 30,
    marginBottom: 10,
    flex: 1
  }
});
