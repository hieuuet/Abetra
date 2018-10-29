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
  ImageBackground,
  Alert
} from "react-native";

import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import PhotoGrid from "../../../components/PhotoGrid";
import { isEqual } from "lodash";

const { width } = Dimensions.get("window");
import PropTypes from "prop-types";
import { createMsgGroup } from "../../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class MemberProfileTab1 extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      isEqual(nextProps.dataUser, this.props.dataUser) &&
      isEqual(nextProps.TEXT_PROFILE, this.props.TEXT_PROFILE) &&
      isEqual(nextState, this.state)
    );
  }
  _createMsgGroup = async () => {
    const { createMsgGroup, UserProfile } = this.props;
    let MsgGroupID = await createMsgGroup({
      MsgGroupID: "",
      IntUserID: UserProfile.Value[0].IntUserID,
      FullName: UserProfile.Value[0].FullName,
      GroupMembers: [
        {
          IntUserID: UserProfile.Value[0].IntUserID,
          FullName: UserProfile.Value[0].FullName,
          Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : ""
        },
        {
          IntUserID: this.props.dataUser.IntUserID,
          FullName: this.props.dataUser.FullName,
          Avatar: this.props.dataUser.Avatar ? this.props.dataUser.Avatar : ""
        }
      ],
      GroupName: this.props.dataUser ? this.props.dataUser.FullName : "",
      Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
      IsEnterprise: 0
    });
    if (MsgGroupID.Error == null) {
      this.props.navigation.navigate("Chat", {
        MsgGroupID: MsgGroupID.ObjectResult.MsgGroupID,
        ProfileMember: this.props.dataUser,
        title: this.props.dataUser.FullName
      });
    } else {
      Alert.alert(
        "Thông báo",
        "Taọ phòng chat không thành công",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  _renderContent = () => {
    let dataImage = [];
    if (
      this.dataUser &&
      this.dataUser.ImageDescription !== null &&
      this.dataUser.ImageDescription !== undefined
    ) {
      dataImage = JSON.parse(this.dataUser.ImageDescription);
      if (!Array.isArray(dataImage)) dataImage = [];
    }
    return (
      <View style={style_common.container}>
        <Text style={styles.textDescription}>
          {this.dataUser.Description || ""}
        </Text>
        <PhotoGrid
          source={dataImage}
          width={width - 20}
          height={width / 1.5}
          ratio={0.5}
          navigation={this.props.navigation}
        />
        <Text style={styles.textDescription}>
          {`${(this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.Address) ||
            ""}: ${this.dataUser.Address || ""}`}
        </Text>
      </View>
    );
  };

  _renderBottom = () => {
    return (
      <View style={styles.wrapper_bottom}>
        <TouchableOpacity
          style={styles.wrap_btn_bottom}
          onPress={() => this._createMsgGroup()}
        >
          <ImageBackground
            source={IMAGE.left_tab}
            style={styles.bg_btn_bottom}
            resizeMode="stretch"
          >
            <Image
              source={IMAGE.icon_sms}
              style={styles.icon_bottom1}
              resizeMode="cover"
            />
            <Text style={styles.text_btn_bottom}>
              {(this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.Message) ||
                ""}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrap_btn_bottom}>
          <ImageBackground
            source={IMAGE.right_tab}
            style={styles.bg_btn_bottom}
            resizeMode="stretch"
          >
            <Image
              source={IMAGE.icon_follow}
              style={styles.icon_bottom2}
              resizeMode="cover"
            />
            <Text style={styles.text_btn_bottom}>
              {(this.props.TEXT_PROFILE &&
                this.props.TEXT_PROFILE.FollowAction) ||
                ""}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    this.dataUser = this.props.dataUser;

    // console.log("render tab1 member");
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
            {this._renderContent()}
            {this._renderBottom()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  return {
    UserProfile: state.loadUserProfile,
    isGuest: state.loginGuest.isGuest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMsgGroup: bindActionCreators(createMsgGroup, dispatch)
  };
};

MemberProfileTab1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberProfileTab1);

export default MemberProfileTab1;

MemberProfileTab1.propTypes = {
  dataUser: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  wrapper_bottom: {
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center"
  },
  wrap_btn_bottom: { width: 120, minHeight: 40 },
  icon_bottom1: {
    width: 20,
    height: 20
  },
  text_btn_bottom: { marginLeft: 5 },
  bg_btn_bottom: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  icon_bottom2: {
    width: 20 * (63 / 43),
    height: 20
  },
  parent: {
    flex: 1,
    padding: 10
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  contain_avatar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  right_avatar: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    marginLeft: 10
  },
  text_name: {
    color: COLOR.COLOR_SKY,
    fontWeight: "bold"
  },
  text_h1: {
    alignSelf: "stretch",
    textAlign: "center",
    color: COLOR.COLOR_ORANGE,
    fontWeight: "bold"
  },
  textDescription: {
    alignSelf: "stretch",
    marginTop: 5,
    marginBottom: 5,
    color: COLOR.COLOR_BLACK
  }
});
