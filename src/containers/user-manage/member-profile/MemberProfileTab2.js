import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { isEqual } from "lodash";
import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import HashTagEdit from "../../../components/hashtag/HashTagEdit";
import PropTypes from "prop-types";

class MemberProfileTab2 extends Component {
  constructor(props) {
    super(props);

    //get tag has been selected when register and bind with select of all tab
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    this.loadData();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      isEqual(nextProps.dataUser, this.props.dataUser) &&
      isEqual(nextState, this.state)
    );
  }

  loadData = () => {
    let tagSelected = this.props.dataUser.HashTag;
    if (tagSelected) {
      tagSelected = JSON.parse(tagSelected);
      if (!Array.isArray(tagSelected)) tagSelected = [];
    } else {
      tagSelected = [];
    }
    this.allTags = this.props.allHashTag.filter(tag => {
      tagSelected.includes(tag.CatID);
    });
  };
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
            <Text style={styles.text_h1}>{this.props._getRank()}</Text>
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
MemberProfileTab2.propTypes = {
  dataUser: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  allHashTag: PropTypes.array.isRequired,
  _getRank: PropTypes.func.isRequired
};
export default MemberProfileTab2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },

  text_link: {
    color: COLOR.COLOR_SKY
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },

  text_h1: {
    alignSelf: "stretch",
    textAlign: "center",
    color: COLOR.COLOR_ORANGE,
    fontWeight: "bold"
  },
  scroll_view: { flexGrow: 1 },
  wrap_header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
