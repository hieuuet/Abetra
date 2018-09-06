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
        <TextInput
          placeholder="Nhập số điện thoại"
          underlineColorAndroid="transparent"
          returnKeyType="next"
          onChangeText={text => (this.phone = text)}
          style={[styles.text_input, style_common.boder]}
        />
        <TextInput
          placeholder="Nhập số điện thoại"
          underlineColorAndroid="transparent"
          returnKeyType="next"
          onChangeText={text => (this.phone = text)}
          style={[styles.text_input, style_common.boder]}
        />
        <TextInput
          placeholder="Nhập số điện thoại"
          underlineColorAndroid="transparent"
          returnKeyType="done"
          onChangeText={text => (this.phone = text)}
          style={[styles.text_input, style_common.boder]}
        />
        <TouchableOpacity style={[style_common.boder, styles.btn_register]}>
          <Text>Đăng ký</Text>
        </TouchableOpacity>
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
          <TouchableOpacity style={[style_common.boder, styles.btn_login]}>
            <Text>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.view_login}>
          <Text style={styles.text_login}>Dùng tài khoản khách</Text>
          <TouchableOpacity style={[style_common.boder, styles.btn_login]}>
            <Text>Guest</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view_login}>
          <Text style={styles.text_login}>Dùng tài khoản khách</Text>
          <TouchableOpacity style={[style_common.boder, styles.btn_login]}>
            <Text>Guest</Text>
          </TouchableOpacity>
        </View>
        <CheckBox
          style={{ padding: 10, backgroundColor: "red" }}
          onClick={() => {
            this.setState({
              isChecked: !this.state.isChecked
            });
          }}
          isChecked={this.state.isChecked}
          leftText={"CheckBox"}
          rightText={"afasfassafasas"}
        />

        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate("TabHome")}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._register()}>
          <Text>register</Text>
        </TouchableOpacity> */}
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
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "stretch"
  },
  btn_register: {
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    minWidth: 150
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
  text_login: {
    flex: 1,
    marginRight: 10
  }
});
