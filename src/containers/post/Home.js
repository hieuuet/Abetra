import React, { Component } from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Text,
} from "react-native";
import SocketIOClient from "socket.io-client";

import StatusItems from "../../components/StatusItems";
import Icon1 from "react-native-vector-icons/dist/Entypo";
import { URL_SOCKET } from "../../constant/api";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  loadUserProfile,
  requestRegister,
  searchPost,
  updateUserProfile,
  getAllRank,
  getAllHashTag,
} from "../../actions";
import { SearchView, ViewLoading } from "../../components/CommonView";
import style_common from "../../style-common/index";
import { USER_ID } from "../../constant/KeyConstant";
import { default as FCM, FCMEvent } from "react-native-fcm";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      ArrPost: [],
    };

    this.socket = SocketIOClient(URL_SOCKET, {
      pingTimeout: 30000,
      pingInterval: 30000,
      transports: ["websocket"],
    });
    console.log("socket", this.socket);
  }
  pushDeviceToken = async (profile_id, user_id, token_device) => {
    let pushToken = await updateUserProfile({
      profile_id,
      user_id,
      field: "TokenKey",
      value: token_device,
    });
    console.log("pushToken", pushToken);
  };

  async componentDidMount() {
    this.userID = await AsyncStorage.getItem(USER_ID);
    const IntUserID = await AsyncStorage.getItem("IntUserID");
    const ProfileID = await AsyncStorage.getItem("ProfileID");
    // console.log('IntUserID', IntUserID)
    // console.log('ProfileID', ProfileID)
    this.socket.emit("LOGINPOST", {
      IntUserID,
    });
    this.socket.on("RECEIVERPOST", (dataRes) => {
      console.log("receivePOST", dataRes);
      let newPost = this.state.ArrPost;
      //add post to array
      newPost.unshift(dataRes);
      this.setState({ ArrPost: newPost }, () =>
        console.log("this.state.ArrPost", this.state.ArrPost)
      );
    });
    this._searchPost();
    if (!this.props.isGuest) {
      this._loadUserProfile();
      this.props.getAllRank();
      this.props.getAllHashTag();
    }

    //firebase
    // iOS: show permission prompt for the first call. later just check permission in user settings
    // Android: check permission in user settings
    FCM.requestPermissions()
      .then(() => console.log("granted"))
      .catch(() => console.log("notification permission rejected"));

    FCM.getFCMToken().then((token) => {
      console.log("token", token);
      // AsyncStorage.setItem('token', token);
      this.pushDeviceToken(ProfileID, this.userID, token);
      // store fcm token in your server
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      // console.log("receive noti listent", notif);
      // optional, do some component related stuff
      if (notif && notif.opened_from_tray && notif.opened_from_tray == 1) {
        return;
      }
      if (notif.fcm) {
        console.log(("abcd", notif.fcm));
        FCM.presentLocalNotification({
          vibrate: 500,
          title: notif.fcm.title,
          body: notif.fcm.body,
          priority: "high",
          sound: "default",
          icon: "ic_launcher",
          wake_screen: true,
          show_in_foreground: true,
          // click_action: notif.fcm.action,
        });
      }
    });

    // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
    // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
    // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
    FCM.getInitialNotification().then((notif) => {
      // console.log("click noti:", notif)
    });
  }

  _searchPost = async () => {
    this.setState({
      isLoading: true,
    });
    const { searchPost } = this.props;

    let listPost = await searchPost({
      Page_size: 20,
      Page_index: 1,
      Keyword: "",
      IsAdvs: 255,
      From_date: "",
      To_date: "",
      User_id: "",
      Profile_id: "",
      User_type: 255,
      Pin: 255,
      Option: 0,
      LangID: 129,
    });

    if (listPost && listPost.ErrorCode === "00") {
      this.setState(
        {
          isLoading: false,
          ArrPost: listPost.Value,
        },
        () => console.log("ArrPost", this.state.ArrPost)
      );
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };
  _loadUserProfile = async () => {
    const { loadUserProfile } = this.props;
    loadUserProfile({
      user_id: this.userID,
      option: 100,
    });
  };
  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  _renderEmpty = () => {
    return (
      <View style={style_common.content_center}>
        <Text>Không có dữ liệu</Text>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "stretch",
            }}
          >
            <SearchView
              onPress={() => {
                this.props.navigation.navigate("Search");
              }}
              style={style_common.container}
            />
            <TouchableOpacity
              style={{
                width: 30,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
              onPress={() => {
                if (this.props.isGuest) return requestRegister(navigation);
                this.props.navigation.navigate("CreatePost");
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  backgroundColor: "#0277BD",
                  height: 30,
                  width: 30,
                  borderRadius: 30 / 2,
                  borderColor: "#BDBDBD",
                }}
              >
                <Icon1 name="plus" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          {this.state.ArrPost.length === 0 ? (
            this._renderEmpty()
          ) : (
            <FlatList
              // refreshing={this.state.refresh}
              // onRefresh={() => {
              //     this.GetPost()
              // }}
              data={this.state.ArrPost}
              renderItem={(item) => {
                return (
                  <StatusItems
                    dataItem={item}
                    userID={this.userID}
                    // onReloadBack ={this.onReloadBack}
                    navigation={navigation}
                  />
                );
              }}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </ScrollView>
        {this._renderLoading()}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    LoginData: state.login,
    UserProfile: state.loadUserProfile,
    isGuest: state.loginGuest.isGuest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch),
    searchPost: bindActionCreators(searchPost, dispatch),
    getAllRank: bindActionCreators(getAllRank, dispatch),
    getAllHashTag: bindActionCreators(getAllHashTag, dispatch),
  };
};

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
export default Home;
