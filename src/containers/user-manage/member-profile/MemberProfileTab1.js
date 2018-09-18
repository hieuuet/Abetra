import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import PhotoGrid from "../../../components/PhotoGrid";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import _ from "lodash";
const { width } = Dimensions.get("window");
import PropTypes from "prop-types";
class MemberProfileTab1 extends Component {
  constructor(props) {
    super(props);

    this.dataUser = undefined;

    this.dataImage = [
      "https://drscdn.500px.org/photo/216465193/m%3D2048_k%3D1_a%3D1/dda61fd7cea5013f8ebe7661b7abea3a",
      "https://drscdn.500px.org/photo/215467843/m%3D2048_k%3D1_a%3D1/344703e86f31e1fffb2d63effa2cee33",
      "https://drscdn.500px.org/photo/216340727/m%3D2048_k%3D1_a%3D1/20d583e15467fb39d06d48131767edc2",
      "https://drscdn.500px.org/photo/215498077/m%3D2048_k%3D1_a%3D1/f79e906eb96938807f6f9d758fc652fd",
      "https://drscdn.500px.org/photo/216559713/m%3D2048_k%3D1_a%3D1/393ef5251fa94964fe62cad52a416b7e",
      // 'https://drscdn.500px.org/photo/214943889/m%3D2048_k%3D1_a%3D1/90bd2e3619dfcaae53fed683561aae1b',
      // 'https://drscdn.500px.org/photo/216158509/m%3D2048_k%3D1_a%3D1/cf70d51aab6ca4c4a3c1ecc225c69990',
      // 'https://drscdn.500px.org/photo/216111469/m%3D2048_k%3D1_a%3D1/d2d83296c838258095dbf2bffda70602',
      // 'https://drscdn.500px.org/photo/216051623/m%3D2048_k%3D1_a%3D1/5a3732bb413f240ad71b8279b038a3ff',
      // 'https://drscdn.500px.org/photo/216047335/m%3D2048_k%3D1_a%3D1/4237ac4606474f0ec7ccc05ca311772e',
      // 'https://drscdn.500px.org/photo/216000289/m%3D2048_k%3D1_a%3D1/5ac2a21092f9281feef3ab8484d2b19c'
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      _.isEqual(nextProps.dataUser, this.props.dataUser) &&
      _.isEqual(nextState, this.state)
    );
  }
  _renderHeader = () => {
    return (
      <View>
        <View style={styles.contain_avatar}>
          <View>
            <Image
              source={
                this.dataUser && this.dataUser.Avatar
                  ? { uri: this.dataUser.Avatar }
                  : IMAGE.logo
              }
              resizeMode="cover"
              style={styles.avatar}
            />
            <Text style={styles.text_h1}>HỘI VIÊN VÀNG</Text>
          </View>
          <View style={styles.right_avatar}>
            <Text style={styles.text_name}>
              {this.dataUser && this.dataUser.UserName
                ? this.dataUser.UserName
                : "Beauty Spa"}
            </Text>
            <Text style={style_common.text_color_base}>
              {this.dataUser && this.dataUser.UserName
                ? this.dataUser.UserName
                : "Nam"}
            </Text>
            <Text style={style_common.text_color_base}>
              {this.dataUser && this.dataUser.UserName
                ? this.dataUser.UserName
                : "Sinh nhật"}
            </Text>
            <Text style={style_common.text_color_base}>
              {this.dataUser && this.dataUser.UserName
                ? this.dataUser.UserName
                : "Mobile: 0423432234"}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Icon name="message-processing" size={32} color={COLOR.COLOR_SKY} />
            <Text style={style_common.text_color_base}>Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={style_common.line} />
      </View>
    );
  };
  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <Text style={{ height: 100 }}>Beauty spa la co so lam dep uy tin</Text>
        <PhotoGrid
          source={this.dataImage}
          width={width - 20}
          height={width / 1.5}
          ratio={0.5}
          navigation={this.props.navigation}
        />
        <Text style={{ height: 100 }}>
          Dia chi so 1 tran hung dao hoan kiem ha noi
        </Text>
      </View>
    );
  };

  render() {
    console.log("render tab1 member");
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
          <View style={styles.parent}>
            {this._renderHeader()}
            {this._renderContent()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
export default MemberProfileTab1;

MemberProfileTab1.propTypes = {
  dataUser: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  contain_avatar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  right_avatar: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    marginLeft: 10,
  },
  text_name: {
    color: COLOR.COLOR_SKY,
    fontWeight: "bold",
  },
  text_h1: {
    alignSelf: "stretch",
    textAlign: "center",
    color: COLOR.COLOR_ORANGE,
    fontWeight: "bold",
  },
});
