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
} from "react-native";

import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import { ButtonBorder, ViewLoading } from "../../components/CommonView";
import { strings } from "../../i18n";
class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.verifyCode = "";
  }

  verify = () => {
    this.props.navigation.navigate("Login");
  };

  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          placeholder={strings("verify.placeholder.input_code")}
          keyboardType="numeric"
          defaultValue="1234"
          onChangeText={(text) => (this.verifyCode = text)}
          style={[style_common.input_border, styles.text_input]}
        />
        <Text style={styles.text_info}>{strings("verify.info")}</Text>
        <ButtonBorder
          label={strings("verify.btn_confirm")}
          onPress={this.verify}
          // my_style={{ marginBottom: 10 }}
        />
        <View style={styles.view_login}>
          <Text style={styles.text_login}>
            {strings("verify.txt_notReceive")}
          </Text>
          <ButtonBorder
            label={strings("verify.btn_reSend")}
            onPress={() => {
              alert(1);
            }}
          />
        </View>
        <View style={styles.view_login}>
          <Text style={styles.text_login}>
            {strings("verify.txt_phoneIncorrect")}
          </Text>
          <ButtonBorder
            label={strings("verify.btn_reInput")}
            onPress={() => {
              alert(2);
            }}
          />
        </View>
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
          <Text>{strings("verify.txt_fanpage")}</Text>
          <TouchableOpacity onPress={this.facebookLogin}>
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

            {this._renderContent()}
            {this._renderFooter()}
          </View>
        </ScrollView>
        {this._renderLoading()}
      </KeyboardAvoidingView>
    );
  }
}
export default VerifyAccount;

const styles = StyleSheet.create({
  img_logo: {
    width: 100,
    height: 100,
  },
  text_input: {
    marginHorizontal: 60,
    marginTop: 10,
    padding: 5,
  },

  img_fb: {
    width: 50,
    height: 50,
  },
  view_login: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    alignSelf: "stretch",
  },
  view_fanpage: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  content_footer: {
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  text_login: {
    flex: 1,
    marginRight: 10,
  },
  text_info: {
    margin: 10,
  },
});
