import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import _ from "lodash";
import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import EditView from "./EditView";
import { COLOR } from "../../constant/Color";
import { strings } from "../../i18n";
import RadioForm from "../../components/SimpleRadioButton";
import PhotoGrid from "../../components/PhotoGrid";
import Icon from "react-native-vector-icons/dist/FontAwesome5";
import MenuItem from "../../components/MenuItem";
import { ButtonBorder } from "../../components/CommonView";

class Member extends Component {
  constructor(props) {
    super(props);

    this.isMember = true;
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
          onPress={() => {}}
        />
      </View>
    );
  };

  _renderMember = () => {
    return (
      <View style={styles.container}>
        <Text
          style={{
            alignSelf: "stretch",
            textAlign: "center",
            color: COLOR.COLOR_ORANGE,
            fontWeight: "bold",
          }}
        >
          HỘI VIÊN VÀNG
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
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
          <Image source={IMAGE.logo} resizeMode="cover" style={styles.avatar} />
        </View>
        <View
          style={{ height: 1, backgroundColor: COLOR.COLOR_GRAY, marginTop: 5 }}
        />
      </View>
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
});
