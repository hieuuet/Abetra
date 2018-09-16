import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import _ from "lodash";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import RadioForm from "../../../components/SimpleRadioButton";
import { ButtonBorder } from "../../../components/CommonView";
import HashTagEdit from "../../../components/hashtag/HashTagEdit";

class RegisterMember extends Component {
  constructor(props) {
    super(props);

    this.allTags = [
      {
        hashtag: "#FoodMessage",
      },
      {
        hashtag: "#FoodMessage",
      },
      {
        hashtag: "#FoodMessage",
      },
      {
        hashtag: "#FoodMessage",
      },
      {
        hashtag: "#FoodMessage",
      },
      {
        hashtag: "#FoodMessage",
      },
    ];

    this.radioRankData = [
      {
        label: "Hạng đồng",
        value: 0,
      },
      { label: "Hạng bạc", value: 1 },
      { label: "Hạng vàng", value: 2 },
      { label: "Hạng kim cương", value: 3 },
    ];
    this.radioTypeData = [
      {
        label: "Cá nhân",
        value: 0,
      },
      { label: "Doanh nghiệp", value: 1 },
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      _.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state)
    );
  }

  onPressItemTag = () => {};

  render() {
    return (
      <KeyboardAvoidingView
        style={style_common.container_white}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <ScrollView
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
                secureTextEntry={true}
                placeholder={"Nhập họ tên"}
                onChangeText={(text) => {}}
                style={[style_common.input_border, styles.text_input]}
              />
            </View>

            <View style={styles.wrap_text}>
              <Text style={style_common.text_color_base}>Phone</Text>
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                returnKeyType="done"
                secureTextEntry={true}
                placeholder={"01678910"}
                onChangeText={(text) => {}}
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
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

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
    minHeight: 40,
    marginTop: 20,
    backgroundColor: COLOR.COLOR_GRAY,
    borderColor: COLOR.COLOR_BLACK,
  },
});
