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
import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import HashTagEdit from "../../../components/hashtag/HashTagEdit";

class MemberProfileTab2 extends Component {
  constructor(props) {
    super(props);

    this.allTags = [
      {
        hashtag: "#FoodMessage",
        select: true,
      },
      {
        hashtag: "#FoodMessage",
        select: true,
      },
      {
        hashtag: "#FoodMessage",
        select: true,
      },
      {
        hashtag: "#FoodMessage",
        select: true,
      },
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !// _.isEqual(nextProps, this.props) &&
    _.isEqual(nextState, this.state);
  }

  render() {
    // console.log("render tab2 member");
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
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Benifet");
                  }}
                >
                  <Text style={styles.text_link}>Giấy chứng nhận hội viên</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={IMAGE.logo}
                resizeMode="cover"
                style={styles.avatar}
              />
            </View>
            <View style={style_common.line} />
            <HashTagEdit
              data={this.allTags}
              editable={false}
              selectable={false}
              numColumns={2}
              ref="hashTag"
            />
            <View style={style_common.line} />
            <Text style={style_common.text_h1}>Bài viết đã đăng</Text>

            {/* Tạo flatlist bài viết ở đây */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default MemberProfileTab2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },

  text_link: {
    color: COLOR.COLOR_SKY,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
