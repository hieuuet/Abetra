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
  TextInput
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import { ButtonBorder, ViewLoading } from "../../components/CommonView";
import { postLogin } from "../../actions/loginActions";
import { facebookLogin } from "./Loginfb";
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

  _login = async () => {
    const { userName, password } = this.dataUser;

    const { postLogin } = this.props;
    this.setState({ isLoading: true });
    let login = await postLogin({
      so_dien_thoai: userName,
      mat_khau: password,
      lang_name: "vi_VN"
    });
    console.log("login", login);
    this.setState({ isLoading: false });
    if (login.ErrorCode === "00") {
      this.props.navigation.navigate("TabHome");
    } else {
      Alert.alert(
        "Thông báo",
        login.Message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  handleLoginFB = async () => {
    this.setState({ isLoading: true, isLoadingIndicator: false });

    dataFB = await facebookLogin();
    this.setState({ isLoading: false, isLoadingIndicator: true });

    if (dataFB !== undefined) {
      this.dataUser = { ...this.dataUser, ...dataFB };
      console.log("dataUser", this.dataUser);
      //TODO: Call api server with data from fb
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <ScrollView
          style={style_common.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={style_common.content_center}>
            <Image
              style={styles.img_logo}
              resizeMode="cover"
              source={IMAGE.logo}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              returnKeyType="next"
              placeholder="Nhập số điện thoại"
              keyboardType="numeric"
              onChangeText={text => (this.dataUser.userName = text)}
              style={[style_common.input_boder, styles.text_input]}
              onSubmitEditing={event => {
                this.refs.pass.focus();
              }}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              returnKeyType="done"
              secureTextEntry={true}
              placeholder="Nhập mật khẩu"
              ref="pass"
              onChangeText={text => (this.dataUser.password = text)}
              style={[style_common.input_boder, styles.text_input]}
            />
            <ButtonBorder
              lable="Đăng nhập"
              onPress={this._login}
              my_style={styles.btn_register}
            />
            <View style={styles.view_login}>
              <Text>Đăng nhập bằng Facebook</Text>
              <TouchableOpacity onPress={this.handleLoginFB}>
                <Image
                  style={styles.img_fb}
                  resizeMode="cover"
                  source={IMAGE.logo_fb}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.view_login}>
              <Text style={styles.text_login}>Chưa có tài khoản</Text>
              <ButtonBorder
                lable="Đăng ký"
                onPress={() => {
                  this.props.navigation.navigate("Register");
                }}
              />
            </View>
            <View style={styles.view_login}>
              <Text style={styles.text_login}>Dùng tài khoản khách</Text>
              <ButtonBorder
                lable="Guest"
                onPress={() => {
                  this.setState({ isLoading: true });
                  setTimeout(() => {
                    this.setState({ isLoading: false });
                  }, 3000);
                }}
              />
            </View>

            <View style={styles.content_footer}>
              <View style={styles.view_fanpage}>
                <Text>Để được hỗ trợ vui lòng liên hệ qua fanpage</Text>
                <TouchableOpacity onPress={this.facebookLogin}>
                  <Image
                    style={styles.img_fb}
                    resizeMode="cover"
                    source={IMAGE.logo_fb}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {this.state.isLoading ? (
          <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
        ) : null}
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
    postLogin: bindActionCreators(postLogin, dispatch)
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
  text_input: {
    marginHorizontal: 60,
    marginTop: 10,
    padding: 5
  },
  btn_register: {
    margin: 10
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
