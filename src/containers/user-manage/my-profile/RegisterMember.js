import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { isEqual } from "lodash";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import RadioForm from "../../../components/SimpleRadioButton";
import { ButtonBorder } from "../../../components/CommonView";
import HashTagEdit from "../../../components/hashtag/HashTagEdit";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { TYPE_ACCOUNT } from "../../../constant/KeyConstant";

class RegisterMember extends Component {
  static navigationOptions = ({ navigation }) => {
    // const { params = {} } = navigation.state;
    return {
      title: "Đăng ký hội viên",
      headerTitleStyle: { color: COLOR.COLOR_BLACK },
      headerTintColor: COLOR.COLOR_BLACK,
    };
  };

  constructor(props) {
    super(props);

    this.allTags = this.props.allHashTag.map((tag) => {
      return {
        ...tag,
        hashtag: tag.Name,
      };
    });

    this.radioRankData = this.props.allRank.map((rank) => {
      return {
        ...rank,
        label: rank.RankName,
        value: rank.ID,
      };
    });

    this.radioTypeData = [
      {
        label: "Cá nhân",
        value: TYPE_ACCOUNT.PERSONAL,
      },
      {
        label: "Doanh nghiệp",
        value: TYPE_ACCOUNT.BUSINESS,
      },
    ];

    this.phone = this.props.userProfile ? this.props.userProfile.Phone : "";
    this.name = this.props.userProfile ? this.props.userProfile.FullName : "";
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state));
  }

  onDataSelected = (hashtagSelected) => {
    if (hashtagSelected !== undefined) this.tagSelected = hashtagSelected;
  };

  registerMember = () => {
    if (
      !this.tagSelected ||
      this.tagSelected.every((tag) => tag.select === false)
    ) {
      return Alert.alert(
        "Thông báo",
        "Bạn chưa chọn lĩnh vực hoạt động nào",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    }

    if (this.name.trim().length === 0 || this.phone.trim().length === 0) {
      return Alert.alert(
        "Thông báo",
        "Thông tin liên hệ không được để trống",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    }

    return Alert.alert(
      "Thông báo",
      "Chức năng đang phát triển",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={style_common.container_white}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={style_common.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.container}>
            <Text style={style_common.text_h1}>Hạng hội viên</Text>
            <RadioForm
              radio_props={this.radioRankData}
              initial={0}
              formHorizontal={false}
              buttonColor={"gray"}
              selectedButtonColor={"gray"}
              buttonSize={5}
              animation={true}
              style={styles.radio_form}
              onPress={(value) => {
                alert(value);
              }}
            />
            <Text style={style_common.text_h1}>Lĩnh vực hoạt động</Text>
            <HashTagEdit
              data={this.allTags}
              editable={false}
              selectable
              onPressItemTag={this.onPressItemTag}
              onDataSelected={this.onDataSelected}
              numColumns={2}
              ref="hashTag"
            />
            <Text style={style_common.text_h1}>Mô hình hoạt động</Text>
            <RadioForm
              radio_props={this.radioTypeData}
              initial={0}
              formHorizontal={true}
              buttonColor={"gray"}
              selectedButtonColor={"gray"}
              buttonSize={5}
              animation={true}
              style={styles.radio_form}
              onPress={(value) => {
                alert(value);
              }}
            />
            <View style={style_common.line} />
            <Text style={style_common.text_h1}>Xác nhận thông tin liên hệ</Text>
            <View style={styles.wrap_text}>
              <Text style={style_common.text_color_base}>Họ tên</Text>
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                returnKeyType="done"
                defaultValue={this.name}
                placeholder={"Nhập họ tên"}
                onChangeText={(text) => {
                  this.name = text;
                }}
                style={[style_common.input_border, styles.text_input]}
              />
            </View>

            <View style={styles.wrap_text}>
              <Text style={style_common.text_color_base}>Phone</Text>
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="numeric"
                returnKeyType="done"
                defaultValue={this.phone}
                placeholder={"01678910"}
                onChangeText={(text) => {
                  this.phone = text;
                }}
                style={[style_common.input_border, styles.text_input]}
              />
            </View>
            <Text style={style_common.text_h1}>
              Mô tả hướng dẫn quá trình đăng ký
            </Text>
            <View style={{ height: 100 }} />
            <Text style={style_common.text_h1}>Thông tin liên hệ khi cần</Text>
            <Text style={style_common.text_color_base}>
              Để được hỗ trợ vui lòng liên hệ qua Hotline 19006776 hoặc fanpage.
            </Text>
            <ButtonBorder
              my_style={[
                style_common.input_border,
                style_common.card_view,
                styles.btn_register,
              ]}
              text_style={style_common.text_color_base}
              label={"Đăng ký"}
              onPress={this.registerMember}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.loadUserProfile.Value[0],
    allRank: state.allRank,
    allHashTag: state.allHashTag,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadUserProfile: bindActionCreators(loadUserProfile, dispatch),
  };
};
RegisterMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterMember);
export default RegisterMember;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: COLOR.COLOR_WHITE,
  },
  radio_form: { justifyContent: "flex-start", alignItems: "flex-start" },
  text_input: {
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  wrap_text: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  btn_register: {
    alignContent: "center",
    alignSelf: "center",
    padding: 5,
    minHeight: 35,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: COLOR.COLOR_GRAY,
    borderColor: COLOR.COLOR_BLACK,
  },
});
