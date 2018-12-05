import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";

import moment from "moment";
import ReadMore from "react-native-read-more-text";
import PhotoGrid from "./PhotoGrid";
import MenuPost from "./menu_post/MenuPost";
import Share from "react-native-share";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { joinEvent } from "../actions/joinEventActions";
import { URL_BASE } from "../constant/api";
import { COLOR } from "../constant/Color";
import { likePost } from "../actions/likePostActions";
import { TEXT_EVENT } from "../language";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { typeAccount } from "../constant/UtilsFunction";

class EventItem extends Component {
  static propTypes = {
    context: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.countliked = this.props.dataItem.item.TotalLike;
    this.state = {
      Type: "",
      modalVisible: false,
      isJoin: false,
      countLike: this.countliked,
      like: false
    };

    this.TEXT_EVENT = TEXT_EVENT();
  }
  componentDidMount() {
    const { item } = this.props.dataItem;
    const { UserProfile } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    //ArrUser Liked
    let dataLike = item.LikePost ? item.LikePost : "[]";
    let ArrUserLiked = dataLike ? JSON.parse(dataLike) : [];
    //Get Arr IntUserID
    let ArrIntUserID = ArrUserLiked.map(function(o) {
      return o.IntUserID;
    });
    // console.log('ArrIntUserID', ArrIntUserID)
    // console.log('ArrIntUserID', ArrIntUserID)

    if (ArrIntUserID.indexOf(UserProfile.Value[0].IntUserID) > -1) {
      this.setState({ liked: true });
    }
    // console.log('userLiked', ArrUserLiked)

    let dataPoll = item.Poll ? item.Poll : "[]";
    let Poll = dataPoll ? JSON.parse(dataPoll) : [];
    this.setState({
      ArrPoll: Poll
      // countCheck:  Poll.TotalVote
    });
    let PostContent = item.PostContent;
    if (item.Type == 2) {
      PostContent = JSON.parse(PostContent);
      this.setState(
        {
          PostContent
        }
        // () => console.log('PostContent', this.state.PostContent)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_EVENT = TEXT_EVENT();
    }
  }

  _renderTruncatedFooter = handlePress => {
    return (
      <Text style={{ color: "#C3E3D7", fontSize: 12 }} onPress={handlePress}>
        {this.TEXT_EVENT.More}
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <Text style={{ color: "#C3E3D7", fontSize: 12 }} onPress={handlePress}>
        {this.TEXT_EVENT.Less}
      </Text>
    );
  };
  _handleTextReady = () => {
    // console.log('ready!');
  };
  _onClickAvatar = () => {
    const { item } = this.props.dataItem;
    if (!item) return;
    if (this.props.userID && item.UserID === this.props.userID) {
      return this.props.navigation.navigate("Profile");
    }
    this.props.navigation.navigate("MemberProfile", { item });
  };
  setModalVisible = visible => {
    // console.log('setModalVisible')
    this.setState({ modalVisible: visible });
  };

  onShare() {
    const shareOptions = {
      title: "Share Status",
      url:
        "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2264_ZING.jpg"
    };
    return Share.open(shareOptions);
  }

  _joinEvent = async EventID => {
    const { joinEvent, UserProfile } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    let eventJoin = await joinEvent({
      EventID,
      ProfileID: UserProfile.Value[0].IntUserID, //api yeu cau interuserid
      Type: 0,
      UserName: UserProfile.Value[0].FullName,
      Phone: UserProfile.Value[0].Phone,
      Email: UserProfile.Value[0].Email ? UserProfile.Value[0].Email : ""
    });
    console.log("eventJoin", eventJoin);

    if (eventJoin.ErrorCode == "00") {
      this.setState({
        isJoin: true
      });
      return this.props.context.showAlert({
        content: this.TEXT_EVENT.JoinSuccess
      });
    } else if (eventJoin.ErrorCode == "04") {
      return this.props.context.showAlert({ content: this.TEXT_EVENT.HasJoin });
    } else {
      return this.props.context.showAlert({
        content: this.TEXT_EVENT.JoinFail
      });
    }
  };
  likePost = async postId => {
    const { likePost, UserProfile } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    let like = await likePost({
      IntUserID: UserProfile.Value[0].IntUserID,
      PostID: postId,
      FullName: UserProfile.Value[0].FullName,
      Islike: 1,
      TableLog: 0
    });
    console.log("like", like);
    if (like.Error === null) {
      let currentLike = this.state.countLike;
      currentLike++;
      this.setState({ liked: true, countLike: currentLike });
    }
  };
  unlikePost = async postId => {
    const { likePost, UserProfile } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    let like = await likePost({
      IntUserID: UserProfile.Value[0].IntUserID,
      PostID: postId,
      FullName: UserProfile.Value[0].FullName,
      Islike: 0,
      TableLog: 0
    });
    console.log("like", like);
    if (like.Error === null) {
      let currentLike = this.state.countLike;
      currentLike--;
      this.setState({ liked: false, countLike: currentLike });
    }
  };

  render() {
    const { item } = this.props.dataItem;
    const { fromEvent, fromEventJoin } = this.props;
    const { setModalVisible } = this.props;
    let ArrImg = item.Image ? item.Image : null;
    ArrImg = JSON.parse(ArrImg);

    return (
      <View>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={this._onClickAvatar}>
              <Image
                style={styles.image_circle}
                source={
                  // uri: URL_BASE + item.Avatar
                  item.Avatar
                    ? { uri: URL_BASE + item.Avatar }
                    : require("../../assets/avatar.png")
                }
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "column",
                  marginLeft: 5,
                  paddingTop: 3,
                  paddingBottom: 3
                }}
              >
                <TouchableOpacity onPress={this._onClickAvatar}>
                  <Text
                    style={{
                      color: COLOR.COLOR_NAME_STATUS,
                      fontWeight: "bold"
                    }}
                  >
                    {item.UserName}
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 12 }}>
                  {typeAccount(item.UserType)}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  {moment(item.CreatedDate).format("DD-MM-YY LT")}
                  {/*{moment().startOf('hour').fromNow()}*/}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(true);
                  }}
                >
                  <Image
                    style={{
                      marginLeft: 3,
                      width: 15,
                      height: 15,
                      marginRight: 20
                    }}
                    source={require("../../assets/icon_more.png")}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 15,
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <Text
              style={{
                color: "#666666",
                fontWeight: "bold"
              }}
            >
              {item.Name}
            </Text>
          </View>
          <View style={{ marginHorizontal: 15, flexDirection: "row" }}>
            <Text style={{ color: "#F0A75B", fontSize: 12 }}>
              {/*{moment(this.state.PostContent.StartDate).format("DD-MM-YY LT")} */}
              {moment(item.StartDate).format("DD-MM-YY LT")} - {item.Address}
            </Text>
            {/*<Text style={{color: '#FFA726'}}>{moment(this.state.PostContent.FinishDate).format("DD/MM/YY HH:mm")}</Text>*/}
          </View>
          <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            <View>
              <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={this._renderTruncatedFooter}
                renderRevealedFooter={this._renderRevealedFooter}
                onReady={this._handleTextReady}
              >
                <Text>{item.Description}</Text>
              </ReadMore>
            </View>
          </View>
          {ArrImg ? (
            <PhotoGrid source={ArrImg} navigation={this.props.navigation} />
          ) : null}

          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  alignItems: "center",
                  backgroundColor: "#C7C7C7",
                  height: 30,
                  width: 65,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: "#C7C7C7",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ width: 15, height: 15, marginLeft: 10 }}>
                  {this.state.liked ? (
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => this.unlikePost(item.PostID)}
                    >
                      <Image
                        style={{ width: null, height: null, flex: 1 }}
                        source={require("../../assets/icon_heart_active.png")}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => this.likePost(item.PostID)}
                    >
                      <Image
                        style={{ width: null, height: null, flex: 1 }}
                        source={require("../../assets/icon_heart.png")}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={{ marginRight: 15, color: "#777777" }}>
                  {" "}
                  {this.state.countLike}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("BinhLuan", { item })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    alignItems: "center",
                    backgroundColor: "#C7C7C7",
                    height: 30,
                    width: 65,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: "#C7C7C7",
                    justifyContent: "space-between"
                  }}
                >
                  <View style={{ width: 15, height: 15, marginLeft: 10 }}>
                    <Image
                      style={{ width: null, height: null, flex: 1 }}
                      source={require("../../assets/icon_comment.png")}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={{ marginRight: 15, color: "#777777" }}>
                    {" "}
                    {item.TotalComment}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onShare()}>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    alignItems: "center",
                    backgroundColor: "#C7C7C7",
                    height: 30,
                    width: 65,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: "#C7C7C7",
                    justifyContent: "space-between"
                  }}
                >
                  <View style={{ width: 15, height: 15, marginLeft: 10 }}>
                    <Image
                      style={{ width: null, height: null, flex: 1 }}
                      source={require("../../assets/icon_share.png")}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={{ marginRight: 15, color: "#777777" }}>
                    {" "}
                    {item.TotalShare}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {item.Type == 2 ? (
              <View
                style={{
                  flexDirection: "row",
                  marginRight: 10,
                  alignItems: "center",
                  backgroundColor: "#C7C7C7",
                  height: 30,
                  width: 100,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: "#C7C7C7",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ width: 15, height: 15, marginLeft: 10 }}>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => this._joinEvent(item.PostID)}
                  >
                    <Image
                      style={{ width: null, height: null, flex: 1 }}
                      source={
                        this.state.isJoin
                          ? require("../../assets/icon_forcus_active.png")
                          : require("../../assets/icon_forcus.png")
                      }
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{ marginRight: 10, color: "#777777" }}>
                  {this.TEXT_EVENT.Join}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View
          style={{ height: 5, backgroundColor: "#cccccc", marginTop: 10 }}
        />
        <MenuPost
          item={item}
          changeModalVisible={this.state.modalVisible}
          context={this.props.context}
          onChangeModalVisible={this.setModalVisible}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserProfile: state.loadUserProfile,
    currentLanguage: state.currentLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePost: bindActionCreators(likePost, dispatch),
    joinEvent: bindActionCreators(joinEvent, dispatch)
  };
};

EventItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventItem);

export default EventItem;
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  image_circle: {
    height: DEVICE_WIDTH / 11,
    width: DEVICE_WIDTH / 11,
    borderRadius: DEVICE_WIDTH / 22,
    marginLeft: 10
    // marginTop: 10
  },
  imagePost: {
    width: DEVICE_WIDTH,
    height: 250,
    marginTop: 10
  }
});
