import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import _ from "lodash";
import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import { COLOR } from "../../constant/Color";
import { ButtonBorder } from "../../components/CommonView";
import EditTags from "./EditTags";

class Member extends Component {
  constructor(props) {
    super(props);

    this.isMember = true;
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
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(nextProps, this.props)) return false;
    return true;
  }

  _renderRegisterMember = () => {
    return (
      <View style={styles.container}>
        <Text style={style_common.text_color_base}>
          Tài khoản của bạn chưa đăng ký hội viên của Aibetra
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Benifet");
          }}
        >
          <Text style={styles.text_link}>
            Tham khảo quyền lợi và chính sách hội viên
          </Text>
        </TouchableOpacity>
        <ButtonBorder
          my_style={[style_common.input_border, styles.btn_register]}
          text_style={styles.text_btn}
          label={"Đăng ký ngay"}
          onPress={() => this.props.navigation.navigate("RegisterMember")}
        />
      </View>
    );
  };

  _renderMember = () => {
    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <ScrollView
          style={style_common.container}
          contentContainerStyle={styles.scroll_view}
        >
          <View style={styles.container}>
            <Text style={styles.text_h1}>HỘI VIÊN VÀNG</Text>
            <View style={styles.wrap_header}>
              <View style={style_common.container}>
                <Text style={style_common.text_color_base}>
                  Ngày đăng ký: 01-01-2018
                </Text>
                <Text style={style_common.text_color_base}>
                  Ngày hết hạn: 01-01-2019
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Benifet");
                  }}
                >
                  <Text style={styles.text_link}>Giấy chứng nhận hội viên</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Benifet");
                  }}
                >
                  <Text style={styles.text_link}>
                    Tham khảo quyền lợi chính sách hội viên
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={IMAGE.logo}
                resizeMode="cover"
                style={styles.avatar}
              />
            </View>
            <View style={style_common.line} />
            <EditTags data={this.allTags} />
            <View style={style_common.line} />
            <Text style={style_common.text_color_base}>Đăng bài viết mới</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("TaoBaiViet")}
              style={styles.btn_create_post}
            >
              <Text style={style_common.text_color_base}>
                Nội dung bài viết
              </Text>
            </TouchableOpacity>
            <Text style={style_common.text_color_base}>Bài viết đã tạo</Text>

            {/* Tạo flatlist bài viết ở đây */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  render() {
    return this.isMember ? this._renderMember() : this._renderRegisterMember();
  }
}

export default Member;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  btn_register: {
    alignContent: "center",
    alignSelf: "center",
    padding: 5,
    minHeight: 40,
    backgroundColor: COLOR.COLOR_SKY,
    borderColor: COLOR.COLOR_SKY,
  },

  text_link: {
    color: COLOR.COLOR_SKY,
  },
  text_btn: {
    color: COLOR.COLOR_BLACK,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  btn_create_post: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    borderColor: COLOR.COLOR_GRAY,
    backgroundColor: COLOR.COLOR_WHITE,
    borderRadius: 25,
    minHeight: 40,
  },
  text_h1: {
    alignSelf: "stretch",
    textAlign: "center",
    color: COLOR.COLOR_ORANGE,
    fontWeight: "bold",
  },
  scroll_view: { flexGrow: 1 },
  wrap_header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
