import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Dimensions from "Dimensions";
import MenuItem from "../components/MenuItem";
import { connect } from "react-redux";
import { IMAGE } from "../constant/assets";
import style_common from "../style-common";
import { USER_ID } from "../constant/KeyConstant";
import { StackActions } from "react-navigation";
import { resetStore, requestRegister } from "../actions";
import { bindActionCreators } from "redux";
import { URL_BASE } from "../constant/api";
import { getRank } from "../constant/UtilsFunction";
import { TEXT_MENU } from "../language";
import { isEqual } from "lodash";
import { web, phonecall } from "../components/Communications";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.userProfile = {};
    this.TEXT_MENU = TEXT_MENU();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_MENU = TEXT_MENU();
    }
  }

  logout = () => {
    AsyncStorage.removeItem(USER_ID);
    AsyncStorage.removeItem("IntUserID");
    AsyncStorage.removeItem("ProfileID");
    this.props.resetStore();
    const resetAction = StackActions.reset({
      index: 0,
      // actions: [NavigationActions.navigate({ routeName: "Login" })]
      actions: this.props.screenProps.navigate("Login")
    });
    this.props.navigation.dispatch(resetAction);
  };
  renderHeader = () => {
    const rank = getRank(this.userProfile.PackgeID, this.props.allRank);

    return (
      <TouchableOpacity
        style={[style_common.card_view, styles.header_container]}
        onPress={() => {
          // return this.props.screenProps.navigate("Register");

          if (this.props.isGuest)
            return requestRegister(this.props.screenProps);
          this.props.screenProps.navigate("Profile", { isMenu: true });
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
            {this.props.isGuest
              ? "GUEST"
              : this.userProfile && this.userProfile.FullName
                ? this.userProfile.FullName
                : ""}
          </Text>
          <Text style={styles.text_rank}>{(rank && rank.RankName) || ""}</Text>
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

    return (
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          justifyContent: "space-between",
          flex: 1
        }}
      >
        <View>
          {this.renderHeader()}
          <MenuItem
            title={this.TEXT_MENU.MarkedPost}
            source={require("../../assets/menu/icon_baivietdaluu.png")}
            onPress={() => {
              if (this.props.isGuest)
                return requestRegister(this.props.screenProps);
              this.props.screenProps.navigate("SavePost");
            }}
          />

          <MenuItem
            title={this.TEXT_MENU.Event}
            source={require("../../assets/menu/icon_sukien.png")}
            onPress={() => {
              this.props.screenProps.navigate("Event", { isMenu: true });
            }}
          />

          {/*<MenuItem*/}
          {/*title={this.TEXT_MENU.Nearly}*/}
          {/*source={require("../../assets/menu/icon_dichvuquanhday.png")}*/}
          {/*/>*/}
          {/*<MenuItem*/}
          {/*title={this.TEXT_MENU.Promotion}*/}
          {/*source={require("../../assets/menu/icon_khuyenmai.png")}*/}
          {/*/>*/}
          {/*<MenuItem*/}
          {/*title={this.TEXT_MENU.Intro}*/}
          {/*source={require("../../assets/menu/icon_huongdan.png")}*/}
          {/*onPress={() => this.props.screenProps.navigate("About")}*/}
          {/*/>*/}

          {/*<MenuItem*/}
          {/*title={this.TEXT_MENU.Guide}*/}
          {/*source={require("../../assets/menu/icon_huongdan.png")}*/}
          {/*onPress={() => this.props.screenProps.navigate("Guide")}*/}
          {/*/>*/}
          <MenuItem
            title={this.TEXT_MENU.Term}
            source={require("../../assets/menu/icon_dieukhoan.png")}
            onPress={() => this.props.screenProps.navigate("TermServices")}
          />

          <MenuItem
            title={this.TEXT_MENU.Language}
            source={require("../../assets/menu/icon_ngonngu.png")}
            style={styles.style_menu}
            onPress={() => this.props.screenProps.navigate("Language")}
          />
          {/* <MenuItem
                        title={this.TEXT_MENU.Support}
                        // title={strings("menu.support")}
                        source={require("../../assets/menu/icon_theodoi.png")}
                        style={styles.style_menu}
                    /> */}
          <MenuItem
            title={
              this.props.isGuest ? this.TEXT_MENU.Login : this.TEXT_MENU.Logout
            }
            source={require("../../assets/menu/icon_dangxuat.png")}
            onPress={this.logout}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
            justifyContent: "space-between",
            marginBottom: 10,
            paddingBottom: 2
          }}
        >
          <TouchableOpacity
            onPress={() =>
              phonecall(this.props.commonSetting.HotLine || "", true)
            }
          >
            <Text style={{ fontSize: 11 }}>
              Hotline: {this.props.commonSetting.HotLine || ""}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => web("fb://page/331230823580420")}>
            <Image
              style={styles.img_fb}
              resizeMode="cover"
              source={IMAGE.icon_fanpage_white}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            // onPress={this.handleLoginFB}
            style={styles.wrapper_fb}
          >
            <Image source={IMAGE.icon_fanpage} style={styles.logo_fb} />
          </TouchableOpacity> */}
        </View>

        {/*<View style={{height: 1, backgroundColor: '#E0E0E0', marginTop:5, marginLeft: 55, marginBottom: 5}}/>*/}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.loadUserProfile,
    isGuest: state.loginGuest.isGuest,
    allRank: state.allRank,
    currentLanguage: state.currentLanguage,
    commonSetting: state.commonSetting
  };
};

const mapDispatchToProps = dispatch => {
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
    paddingBottom: 10,
    paddingTop: 10,
    margin: 0,
    marginBottom: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5F5F5"
  },
  name_container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  text_name: {
    // fontWeight: "bold",
    color: "black",
    fontSize: 15
  },
  text_rank: {
    // fontWeight: "",
    fontSize: 12
  },
  style_menu: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10
  },
  avatar: {
    width: 50,
    height: 50 * (437 / 488),
    marginLeft: 20,
    borderRadius: 25
  },
  canhbao: {
    width: DEVICE_WIDTH / 2,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#EF6C00",
    backgroundColor: "#F57C00"
  },
  modalContent: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 22,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  bottomModal: {
    height: DEVICE_HEIGHT / 4,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  text_fb2: { color: "blue", fontWeight: "900" },
  logo_fb: { width: (20 * 233) / 74, height: 20, marginLeft: 5 },
  img_fb: {
    marginLeft: 5,
    width: 20 * (223 / 74),
    height: 20
  },
  view_fanpage: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  wrapper_fb: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center"
  }
});
