import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  KeyboardAvoidingView,
  FlatList
} from "react-native";
import { isEqual } from "lodash";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import { ButtonBorder, ButtonBackGround } from "../../../components/CommonView";
import HashTagEdit from "../../../components/hashtag/HashTagEdit";
import PropTypes from "prop-types";
import { TYPE_ACCOUNT, STATUS_ACCOUNT } from "../../../constant/KeyConstant";
import { MyCoolScrollViewComponent } from "../../../components/CommonView";
import { searchPost2 } from "../../../actions";
import { TYPE_POST, TYPE_POST_PIN } from "../../../constant/KeyConstant";
import StatusItems from "../../../components/StatusItems";
import { IMAGE } from "../../../constant/assets";
import FastImage from "react-native-fast-image";
import { URL_BASE } from "../../../constant/api";

class MyProfileTab2 extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalShow: false, userPost: [] };

    this.tagSelected = this.props.tagSelected.filter(
      tag => tag.select === true
    );
    this.Page_size = 10;
    this.Page_index = 1;

    this.loadUserPost(this.props.dataUser);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.tagSelected, nextProps.tagSelected)) {
      this.tagSelected = nextProps.tagSelected.filter(
        tag => tag.select === true
      );
      //call api update tag here
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.dataUser, this.props.dataUser)) {
      this.Page_index = 1;
      if (this.state.userPost.length > 0) {
        this.setState({ userPost: [] });
      }
      this.loadUserPost(nextProps.dataUser);
    }
    return !(
      isEqual(nextProps.tagSelected, this.props.tagSelected) &&
      isEqual(nextProps.TEXT_PROFILE, this.props.TEXT_PROFILE) &&
      isEqual(nextState, this.state)
    );
  }

  loadUserPost = async dataUser => {
    console.log("dataUser", dataUser);
    if (!dataUser || !dataUser.ProfileID) return;
    this.props.onLoading(true);
    console.log("searchPost2", dataUser);
    const result = await searchPost2({
      Page_size: this.Page_size,
      Page_index: this.Page_index,
      Keyword: "",
      IsAdvs: 255,
      From_date: "",
      To_date: "",
      Profile_id: dataUser.ProfileID,
      User_id: dataUser.UserID,
      User_type: TYPE_POST.ALL,
      Pin: TYPE_POST_PIN.ALL,
      Option: 0,
      IntUserID: dataUser.IntUserID
    });

    const resultPost = result && result.ErrorCode === "00" ? result.Value : [];
    if (result && result.Value && result.Value.length === 0) {
      this.Page_index--;
    }

    this.setState({ userPost: [...this.state.userPost, ...resultPost] });
    this.props.onLoading(false);
  };
  onEndReached = () => {
    // call loadmore api
    console.log("scroll to end");

    this.Page_index++;
    this.loadUserPost(this.props.dataUser);
  };

  _renderRegisterMember = () => {
    return (
      <View style={styles.container_register}>
        <ButtonBackGround
          label={this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.RegisterNow}
          source={IMAGE.header}
          onPress={() => this.props.navigation.navigate("RegisterMember")}
        />
      </View>
    );
  };

  _renderMember = () => {
    console.log("render tab2");
    const source_avatar =
      this.props.dataUser && this.props.dataUser.Avatar
        ? { uri: URL_BASE + this.props.dataUser.Avatar }
        : IMAGE.logo;

    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <MyCoolScrollViewComponent onEndReached={this.onEndReached}>
          <View style={styles.parent}>
            {/* <View style={style_common.line} /> */}
            <View style={styles.container_title}>
              <Text style={styles.text_title}>
                {this.props.TEXT_PROFILE &&
                  this.props.TEXT_PROFILE.TypeBusiness &&
                  this.props.TEXT_PROFILE.TypeBusiness.toUpperCase()}
              </Text>
              <TouchableOpacity onPress={this.props.onClickShowModal}>
                <Image
                  source={IMAGE.btn_edit}
                  resizeMode="cover"
                  style={styles.iconedit}
                />
              </TouchableOpacity>
            </View>
            <HashTagEdit
              data={this.tagSelected}
              selectable={false}
              numColumns={2}
              ref="hashTag"
            />
            {/* <Text style={styles.marginText}>
              {this.props.TEXT_PROFILE &&
                this.props.TEXT_PROFILE.CreateNewPost &&
                this.props.TEXT_PROFILE.CreateNewPost.toUpperCase()}
            </Text> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <FastImage
                style={styles.avatar}
                source={source_avatar}
                resizeMode={FastImage.resizeMode.cover}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("CreatePost")}
                style={styles.btn_create_post}
              >
                <Text style={style_common.text_color_base}>
                  {this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.InputPost}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={style_common.text_color_base}>
              {this.props.TEXT_PROFILE &&
                this.props.TEXT_PROFILE.PostCreated &&
                this.props.TEXT_PROFILE.PostCreated.toUpperCase()}
            </Text>

            {/* Tạo flatlist bài viết ở đây */}
            <FlatList
              // refreshing={this.state.refresh}
              // onRefresh={() => {
              //     this.GetPost()
              // }}
              data={this.state.userPost}
              renderItem={item => {
                return (
                  <StatusItems
                    dataItem={item}
                    userID={this.userID}
                    navigation={this.props.navigation}
                  />
                );
              }}
              extraData={this.state}
              // onEndReached={this.onEndReached}
              // onEndReachedThreshold={0.5}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </MyCoolScrollViewComponent>
      </KeyboardAvoidingView>
    );
  };

  _waitingActive = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text_center}>
          {this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.WaitingAccept}
        </Text>
      </View>
    );
  };

  render() {
    if (this.props.dataUser.Type === TYPE_ACCOUNT.TEMP)
      return this._renderRegisterMember();
    if (this.props.dataUser.Status === STATUS_ACCOUNT.INACTIVE)
      return this._waitingActive();
    return this._renderMember();
  }
}

export default MyProfileTab2;
MyProfileTab2.propTypes = {
  dataUser: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  onClickShowModal: PropTypes.func.isRequired,
  tagSelected: PropTypes.array.isRequired,
  onLoading: PropTypes.func.isRequired,
  allRank: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: COLOR.COLOR_GRAY
  },
  iconedit: {
    width: 20,
    height: 20,
    marginTop: 5
  },
  parent: {
    flex: 1,
    padding: 10
  },
  text_link: {
    color: COLOR.COLOR_SKY
  },
  text_btn: {
    color: COLOR.COLOR_BLACK
  },
  btn_create_post: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderColor: COLOR.COLOR_GRAY,
    backgroundColor: COLOR.COLOR_WHITE,
    borderRadius: 25,
    minHeight: 35,
    flex: 1
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
  },
  container_title: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10
  },
  btn_save: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    minWidth: 80,
    minHeight: 40,
    backgroundColor: COLOR.COLOR_GRAY,
    borderColor: COLOR.COLOR_GRAY
  },
  text_title: {
    flex: 1,
    marginRight: 5,
    color: COLOR.COLOR_BLACK
  },
  text_center: {
    alignSelf: "center",
    color: COLOR.COLOR_BLACK
  },
  marginText: {
    marginTop: 5,
    marginBottom: 5,
    color: COLOR.COLOR_BLACK
  },
  container_register: { flex: 1, alignItems: "center" }
});
