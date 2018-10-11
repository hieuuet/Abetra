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
  Alert
} from "react-native";

import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import PhotoGrid from "../../../components/PhotoGrid";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { isEqual } from "lodash";
import { formatDate, getGender } from "../../../constant/UtilsFunction";
import { URL_BASE } from "../../../constant/api";

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
    console.log("MsgGroupID", MsgGroupID);
    console.log("IntUserID", UserProfile.Value[0].IntUserID);
    // console.log('IntUserID', UserProfile.Value[0].IntUserID)
    console.log("IntUserID1", this.props.dataUser.IntUserID);
    if (MsgGroupID.Error == null) {
      this.props.navigation.navigate("Chat", {
        MsgGroupID: MsgGroupID.ObjectResult.MsgGroupID,
        ProfileMember: this.props.dataUser
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

  _renderHeader = () => {
    return (
      <View style={styles.contain_avatar}>
        <View>
          <Image
            source={
              this.props.dataUser && this.props.dataUser.Avatar
                ? { uri: URL_BASE + this.dataUser.Avatar }
                : IMAGE.logo
            }
            resizeMode="cover"
            style={styles.avatar}
          />
          <Text style={styles.text_h1}>{this.props._getRank()}</Text>
        </View>
        <View style={styles.right_avatar}>
          <Text style={styles.text_name}>
            {this.props.dataUser && this.props.dataUser.FullName
              ? this.props.dataUser.FullName
              : ""}
          </Text>
          <Text style={style_common.text_color_base}>
            {getGender(this.props.dataUser.Gender)}
          </Text>
          <Text style={style_common.text_color_base}>
            Sinh nhật: 
            {this.props.dataUser && this.props.dataUser.BirdDate
              ? formatDate(this.props.dataUser.BirdDate)
              : ""}
          </Text>
          <Text style={style_common.text_color_base}>
            Mobile: 
            {this.props.dataUser && this.props.dataUser.UserName
              ? this.props.dataUser.UserName
              : ""}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10
          }}
          onPress={() => this._createMsgGroup()}
        >
          <Icon name="message-processing" size={32} color={COLOR.COLOR_SKY} />
          <Text style={style_common.text_color_base}>Chat</Text>
        </TouchableOpacity>

        <View style={style_common.line} />
      </View>
    );
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
          Địa chỉ: {this.dataUser.Address || ""}
        </Text>
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
            {this._renderHeader()}
            <View style={style_common.line} />
            {this._renderContent()}
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
  navigation: PropTypes.object.isRequired,
  _getRank: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
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
