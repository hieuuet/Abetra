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
  Alert
} from "react-native";

import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import { ButtonBorder, ViewLoading } from "../../../components/CommonView";
import { TEXT_CHANGE_PHONE } from "../../../language";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateUserProfile, loadUserProfile } from "../../../actions";
import { COLOR } from "../../../constant/Color";
import { web } from "../../../components/Communications";

class ChangePhone extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: TEXT_CHANGE_PHONE.ChangePhone,

      headerTitleStyle: { color: COLOR.COLOR_BLACK },
      headerTintColor: COLOR.COLOR_BLACK
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.userProfile =
      this.props.userProfile &&
      this.props.userProfile.Value &&
      this.props.userProfile.Value.length > 0
        ? this.props.userProfile.Value[0]
        : undefined;
    this.newPhone = "";
    this.code = "";
  }

  onChangePhone = async () => {
    if (!this.userProfile)
      return Alert.alert(
        "Thông báo",
        "Không tìm thấy UserID",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    if (this.newPhone.trim().length === 0 || this.code.trim().length === 0)
      return Alert.alert(
        "Thông báo",
        "Số điện thoại và code không được để trống",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    this.setState({ isLoading: true });
    const result = await updateUserProfile({
      profile_id: this.userProfile.ProfileID,
      user_id: this.userProfile.UserID,
      field: "Phone",
      value: this.newPhone
    });
    this.setState({ isLoading: false });
    //success
    if (result && result.ErrorCode === "00")
      return Alert.alert(
        "Thông báo",
        result.Message,
        [
          {
            text: "OK",
            onPress: () => {
              this.props.loadUserProfile({
                user_id: this.userProfile.UserID,
                option: 100
              });
              this.props.navigation.goBack();
            }
          }
        ],
        { cancelable: false }
      );
    //error
    return Alert.alert(
      "Thông báo",
      (result && result.Message) || "Cập nhật không thành công.",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  };

  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="numeric"
          placeholder={TEXT_CHANGE_PHONE.NewPhone}
          onChangeText={text => (this.newPhone = text)}
          style={[style_common.input_border, styles.text_input]}
          onSubmitEditing={event => {
            this.refs.code.focus();
          }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          ref="code"
          placeholder={TEXT_CHANGE_PHONE.InputCode}
          onChangeText={text => (this.code = text)}
          style={[style_common.input_border, styles.text_input]}
        />

        <Text style={styles.text_info}>
          Mã xác nhận gửi qua tin nhắn đến số điện thoại cũ của bạn
        </Text>
        <View style={styles.wraper_btn}>
          <ButtonBorder
            label={TEXT_CHANGE_PHONE.Confirm}
            onPress={this.onChangePhone}
            my_style={styles.btn_left}
          />
          <ButtonBorder
            label={TEXT_CHANGE_PHONE.Cancel}
            my_style={styles.btn_right}
            onPress={() => this.props.navigation.goBack()}
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
          <Text style={style_common.text_color_base}>
            {TEXT_CHANGE_PHONE.FanPage}
          </Text>
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
    userProfile: state.loadUserProfile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch)
  };
};

ChangePhone = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePhone);
export default ChangePhone;

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
  wraper_btn: { marginHorizontal: 60, flexDirection: "row" },

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
  text_info: {
    margin: 10,
    color: COLOR.COLOR_BLACK,
    textAlign: "center"
  },
  btn_left: { flex: 1, marginRight: 10 },
  btn_right: { flex: 1, marginRight: 10 }
});
