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
  Alert
} from "react-native";
import style_common from "../../style-common/index";
import { IMAGE } from "../../constant/assets";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { postRegister } from "../../actions/registerActions";
import CheckBox from "../../components/CheckBox ";
import { ButtonBorder, ViewLoading } from "../../components/CommonView";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      isLoading: false
    };

    this.dataUser = {
      userName: "",
      fullName: "test1",
      password: "",
      rePassword: ""
    };
  }

  _register = async () => {
    console.log("Dang ki");

    const { userName, fullName, password, rePassword } = this.dataUser;
    if (password.length < 6 || password !== rePassword) {
      Alert.alert(
        "Thông báo",
        "Password không hợp lệ",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }

    const { postRegister } = this.props;
    let register = await postRegister({
      Username: userName,
      FullName: fullName,
      Email: "fsfd@gmail.com",
      Password: password,
      lang_name: "vi_VN"
    });
    console.log("register", register);
    if (register.ErrorCode === "00") {
      Alert.alert(
        "Thông báo",
        register.Message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
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

  render() {
    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <ScrollView style={style_common.container}>
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
              returnKeyType="next"
              secureTextEntry={true}
              placeholder="Nhập mật khẩu"
              ref="pass"
              onChangeText={text => (this.dataUser.password = text)}
              style={[style_common.input_boder, styles.text_input]}
              onSubmitEditing={event => {
                this.refs.rePass.focus();
              }}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              returnKeyType="done"
              secureTextEntry={true}
              placeholder="Nhập lại mật khẩu"
              ref="rePass"
              onChangeText={text => (this.dataUser.rePassword = text)}
              style={[style_common.input_boder, styles.text_input]}
            />
            <ButtonBorder
              lable="Đăng ký"
              onPress={() => {
                this._register();
              }}
              my_style={styles.btn_register}
            />
            <View style={styles.view_login}>
              <Text>Đăng nhập bằng Facebook</Text>
              <TouchableOpacity>
                <Image
                  style={styles.img_fb}
                  resizeMode="cover"
                  source={IMAGE.logo_fb}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.view_login}>
              <Text style={styles.text_login}>Đã có tài khoản</Text>
              <ButtonBorder
                lable="Đăng nhập"
                onPress={() => {
                  this.props.navigation.navigate("Login");
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
            <View style={styles.parent_checkbox}>
              <CheckBox
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked
                  });
                }}
                isChecked={this.state.isChecked}
              />
              <TouchableOpacity>
                <Text style={styles.txt_underline}>
                  Tôi đã đọc và đồng ý với điều khoản dịch vụ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {this.state.isLoading ? <ViewLoading /> : null}
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
    postRegister: bindActionCreators(postRegister, dispatch)
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
  parent_checkbox: {
    justifyContent: "flex-start",
    alignSelf: "stretch",
    flexDirection: "row",
    marginTop: 10,
    marginRight: 10,
    marginLeft: 30
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
