import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import Dimensions from "Dimensions";
import MenuItem from "../components/MenuItem";
import { connect } from "react-redux";
import { COLOR } from "../constant/Color";
import { IMAGE } from "../constant/assets";
import style_common from "../style-common";
import { USER_ID } from "../constant/KeyConstant";
import { NavigationActions, StackActions } from "react-navigation";
import { resetStore, requestRegister } from "../actions";
import { bindActionCreators } from "redux";
import { URL_BASE } from "../constant/api";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.userProfile = {};
  }

  logout = () => {
    AsyncStorage.removeItem(USER_ID);
    AsyncStorage.removeItem('IntUserID');
    AsyncStorage.removeItem('ProfileID');
    this.props.resetStore();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Login" })],
    });
    this.props.navigation.dispatch(resetAction);
  };
  renderHeader = () => {
    return (
      <TouchableOpacity
        style={[style_common.card_view, styles.header_container]}
        onPress={() => {
          if (this.props.isGuest) return requestRegister(this.props.navigation);
          this.props.navigation.navigate("Profile");
        }}
      >
        <Image
          source={
            this.userProfile && this.userProfile.Avatar
              ? { uri: URL_BASE + this.userProfile.Avatar }
              : IMAGE.logo
          }
          resizeMode="cover"
          style={styles.avatar}
        />
        <View style={styles.name_container}>
          <Text style={styles.text_name}>
            {this.userProfile && this.userProfile.FullName
              ? this.userProfile.FullName
              : ""}
          </Text>
          <Text style={styles.text_rank}>
            {this.props.isGuest ? "Guest" : "Hội viên bạch kim"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    this.userProfile =
      this.props.userProfile &&
      this.props.userProfile.Value &&
      this.props.userProfile.Value.length > 0
        ? this.props.userProfile.Value[0]
        : {};
    console.log("render menu");
    return (
      <ScrollView style={{ flexDirection: "column", backgroundColor: "white" }}>
        {this.renderHeader()}
        <MenuItem
          title="Bài viết đã lưu"
          nameIcon="bookmark"
          style={styles.style_menu}
          onPress={() => {
            if (this.props.isGuest)
              return requestRegister(this.props.navigation);
            this.props.navigation.navigate("SavePost");
          }}
        />
        <MenuItem
          title="Đăng xuất"
          nameIcon="sign-out-alt"
          style={styles.style_menu}
          onPress={this.logout}
        />
        <MenuItem
          title="Sự kiện"
          nameIcon="calendar-alt"
          style={styles.style_menu}
          onPress={() => {
              this.props.navigation.navigate('Event')
          }}
        />

        <MenuItem
          title="Dịch vụ quanh đây"
          nameIcon="map-marked-alt"
          style={styles.style_menu}
          // onPress={() => {
          //     // this.props.navigation.navigate('BaoSuCoKDT')
          //     this.state.Profile ? this.props.navigation.navigate('BaoSuCoKDT') : this.refs.modal.open()
          // }}
        />
        <MenuItem
          title="Chương trình khuyến mãi"
          nameIcon="glide"
          style={styles.style_menu}
          // onPress={() => this.props.navigation.navigate('ChoFaceHome')}
        />
        <MenuItem
          title="Giới thiệu"
          nameIcon="glide"
          style={styles.style_menu}
          // onPress={() => {
          //     // this.props.navigation.navigate('BepAnGiaDinh')
          //     this.state.Profile ? this.props.navigation.navigate('BepAnGiaDinh') : this.refs.modal.open()
          // }}
        />

        <MenuItem
          title="Hướng dẫn"
          nameIcon="glide"
          style={styles.style_menu}
          // onPress={() => this.props.navigation.navigate('HuongDan')}
        />
        <MenuItem
          title="Điều khoản dịch vụ"
          nameIcon="glide"
          style={styles.style_menu}
          // onPress={() => this.props.navigation.navigate('GioiThieuCuDan')}
        />

        <MenuItem title="Ngôn ngữ" nameIcon="glide" style={styles.style_menu} />
        <MenuItem title="Hỗ trợ" nameIcon="glide" style={styles.style_menu} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.loadUserProfile,
    isGuest: state.loginGuest.isGuest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { resetStore: bindActionCreators(resetStore, dispatch) };
};

Menu = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
export default Menu;

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const styles = StyleSheet.create({
  header_container: {
    flexDirection: "row",
    flex: 1,
    margin: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLOR.COLOR_GRAY,
  },
  name_container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text_name: {
    fontWeight: "bold",
    color: COLOR.COLOR_GREEN1,
  },
  text_rank: {
    fontWeight: "bold",
    color: COLOR.COLOR_ORANGE,
  },
  style_menu: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  canhbao: {
    width: DEVICE_WIDTH / 2,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#EF6C00",
    backgroundColor: "#F57C00",
  },
  modalContent: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 22,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  bottomModal: {
    height: DEVICE_HEIGHT / 4,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});
