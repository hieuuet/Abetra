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
  ScrollView
} from "react-native";
import style_common from "../../style-common/index";
import { IMAGE } from "../../constant/assets";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { postRegister } from "../../actions/registerActions";
import CheckBox from "../../components/CheckBox ";
import { ButtonBorder, TextInputBorder } from "../../components/ViewBorder";
import { LoginButton, AccessToken } from "react-native-fbsdk";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }
  _register = async () => {
    const { postRegister } = this.props;
    let register = await postRegister({
      Username: "0983145317",
      FullName: "Nguyễn Thị Hiền",
      Email: "sdfsdf@gmail.com",
      Password: "123456",
      lang_name: "vi_VN"
    });
    console.log("register", register);
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={style_common.content_center}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <Image style={styles.img_logo} resizeMode="cover" source={IMAGE.logo} />
        <TextInputBorder
          placeholder="Nhập số điện thoại"
          onChangeText={() => {}}
          my_style={styles.text_input}
        />
        <TextInputBorder
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
          onChangeText={() => {}}
          my_style={styles.text_input}
        />
        <TextInputBorder
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={true}
          onChangeText={() => {}}
          returnKeyType="done"
          my_style={styles.text_input}
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
              this.props.navigation.navigate("TabHome");
            }}
          />
        </View>
        <View style={styles.view_login}>
          <Text style={styles.text_login}>Dùng tài khoản khách</Text>
          <ButtonBorder
            lable="Guest"
            onPress={() => {
              alert(1);
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
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  },
  btn_register: {
    margin: 10
  },
  btn_login: {
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    alignSelf: "flex-end",
    minWidth: 100
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
