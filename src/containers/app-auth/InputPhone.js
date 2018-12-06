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
  TouchableOpacity
} from "react-native";

import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import { ButtonBorder, ViewLoading } from "../../components/CommonView";
import { TEXT_COMMON, TEXT_INPUTPHONE } from "../../language";

// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updatePhoneFb, sendOTP } from "../../actions";
// import { USER_ID } from "../../constant/KeyConstant";
import { COLOR } from "../../constant/Color";
import { web } from "../../components/Communications";
import BackgroundImage from "../../components/BackgroundImage";
// import { NavigationActions, StackActions } from "react-navigation";
import AppContext from "../../AppContext";

class InputPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };

    this.userName = this.props.navigation.getParam("userName") || "";
    this.password = this.props.navigation.getParam("password") || "";
    this.phone = this.props.navigation.getParam("passphoneword") || "";
    this.hasPhone = this.phone.length > 0;
    this.TEXT_INPUTPHONE = TEXT_INPUTPHONE();
  }

  _bindeGlobalContext = () => {
    return (
      <AppContext.Consumer>
        {context => {
          this.context = context;
        }}
      </AppContext.Consumer>
    );
  };

  updatePhoneAndNavigate = async () => {
    if (this.phone.length <= 9) {
      return this.context.showAlert({
        content: this.TEXT_INPUTPHONE.PhoneInvalid
      });
    }
    this.setState({ isLoading: true });
    if (!this.hasPhone) {
      const updatePhone = await updatePhoneFb({
        Phone: this.phone,
        UserName: this.userName,
      });
      if (!updatePhone || updatePhone.ErrorCode !== "00") {
        this.setState({ isLoading: false });
        return this.context.showAlert({
          content:
            (updatePhone && updatePhone.Message) ||
            this.TEXT_INPUTPHONE.UpdatePhoneFail
        });
      }
    }
    const requestSendOTP = await sendOTP({
      Phone: this.phone,
      UserName: this.userName
    });
    if (!requestSendOTP || requestSendOTP.ErrorCode !== "00") {
      this.setState({ isLoading: false });
      return this.context.showAlert({
        content:
          (requestSendOTP && requestSendOTP.Message) ||
          this.TEXT_INPUTPHONE.RequestOTPFail
      });
    }
    this.setState({ isLoading: false });
    this.props.navigation.navigate("VerifyAccount", {
      phone: this.phone,
      userName: this.userName,
      password: this.password,
      isLoginFb: this.props.navigation.getParam("isLoginFb")
    });
  };

  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          placeholder={TEXT_COMMON().InputPhone}
          placeholderTextColor={COLOR.COLOR_WHITE}
          keyboardType="numeric"
          defaultValue={this.phone}
          onChangeText={text => (this.phone = text)}
          style={styles.text_input}
          editable={this.phone !== undefined && this.phone.length === 0}
        />
        <ButtonBorder
          label={TEXT_COMMON().Next}
          onPress={this.updatePhoneAndNavigate}
        />
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
          <TouchableOpacity onPress={() => web("fb://page/331230823580420")}>
            <Text style={styles.text_login}>{TEXT_COMMON().FanPage}</Text>
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
          keyboardShouldPersistTaps="handled"
          style={style_common.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <BackgroundImage
            style={style_common.content_center}
            onBackPress={() => this.props.navigation.goBack()}
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

const mapDispatchToProps = dispatch => {
  return {};
};

InputPhone = connect(
  null,
  mapDispatchToProps
)(InputPhone);
export default InputPhone;

const styles = StyleSheet.create({
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
    marginRight: 10,
    color: COLOR.COLOR_WHITE
  },
  text_info: {
    margin: 10,
    color: COLOR.COLOR_WHITE
  }
});
