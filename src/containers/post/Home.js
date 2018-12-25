import React, {Component} from "react";
import {
    View,
    Platform,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Text,
    RefreshControl,
    Alert,
    Dimensions
} from "react-native";
import SocketIOClient from "socket.io-client";
import {
    registerKilledListener,
    registerAppListener
} from "../../components/Listeners";

import StatusItems from "../../components/StatusItems";
import Icon1 from "react-native-vector-icons/dist/Entypo";
import {URL_SOCKET} from "../../constant/api";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    loadUserProfile,
    requestRegister,
    searchPost,
    updateUserProfile,
    getAllRank,
    getAllHashTag,
    getcommonSetting,
    getAllCategory,
    getAllEmoji
} from "../../actions";
import {SearchView, ViewLoading} from "../../components/CommonView";
import style_common from "../../style-common/index";
import {USER_ID, TYPE_ACCOUNT} from "../../constant/KeyConstant";
import {default as FCM, FCMEvent} from "react-native-fcm";
import {COLOR} from "../../constant/Color";

registerKilledListener();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isLoading: false,
            ArrPost: [],
            page_index_post: 1
        };
        this.onEndReachedCalledDuringMomentum = true;

        this.socket = SocketIOClient(URL_SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ["websocket"]
        });
        console.log("socket", this.socket);
    }

    pushDeviceToken = async (profile_id, user_id, token_device) => {
        let pushToken = await updateUserProfile({
            profile_id,
            user_id,
            field: "TokenKey",
            value: token_device
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
            IntUserID
        });
        this.socket.on("RECEIVERPOST", dataRes => {
            console.log("receivePOST", dataRes);
            let newPost = this.state.ArrPost;
            //add post to array
            newPost.unshift(dataRes);
            this.setState({ArrPost: newPost}, () =>
                console.log("this.state.ArrPost", this.state.ArrPost)
            );
        });
        this._searchPost();
        if (!this.props.isGuest) {
            this._loadUserProfile();
            this.props.getAllRank();
            this.props.getAllHashTag();
            this.props.getcommonSetting({Option: 20}, true);
            this.props.getAllCategory({Type: 3});
            this.props.getAllEmoji();
        }

        // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.createNotificationChannel({
            id: "default",
            name: "Default",
            description: "used for example",
            priority: "high"
        });
        registerAppListener(this.props.navigation);
        // FCM.getInitialNotification().then(notif => {
        //     console.log('notif', notif)
        //     this.setState({
        //         initNotif: notif
        //     });
        //     // if (notif && notif.targetScreen === "detail") {
        //     //     setTimeout(() => {
        //     //         this.props.navigation.navigate("Detail");
        //     //     }, 500);
        //     // }
        // });
        this.notificationListener = FCM.on(FCMEvent.Notification, async notif => {
            console.log("receive noti listent", notif);
            // optional, do some component related stuff
            if (notif && notif.opened_from_tray && notif.opened_from_tray === 1) {
                return;
            }
            if (
                Platform.OS === "ios" &&
                notif._notificationType === "remote_notification"
            ) {
                let data = notif.aps.alert;
                console.log("ios-noti", data);
                FCM.presentLocalNotification({
                    vibrate: 500,
                    title: data.title,
                    body: data.body,
                    priority: "high",
                    sound: "default",
                    icon: "logo.png",
                    wake_screen: true,
                    show_in_foreground: true
                    // click_action: notif.fcm.action,
                });
            } else if (Platform.OS === "android") {
                FCM.presentLocalNotification({
                    vibrate: 500,
                    title: notif.fcm.title,
                    body: notif.fcm.body,
                    priority: "high",
                    // sound: "phiasaumotcogai.mp3",
                    icon: "ic_launcher",
                    wake_screen: true,
                    show_in_foreground: true
                    // click_action: notif.fcm.action,
                });
            }
        });

        try {
            let result = await FCM.requestPermissions({
                badge: false,
                sound: true,
                alert: true
            });
        } catch (e) {
            console.error(e);
        }

        FCM.getFCMToken().then(token => {
            console.log("TOKEN (getFCMToken)", token);
            this.pushDeviceToken(ProfileID, this.userID, token);
        });

        if (Platform.OS === "ios") {
            FCM.getAPNSToken().then(token => {
                console.log("APNS TOKEN (getFCMToken)", token);
            });
        }
    }

    _searchPost = async () => {
        const IntUserID = await AsyncStorage.getItem("IntUserID");
        this.setState({
            refreshing: true,
            isLoading: true
        });
        const {searchPost} = this.props;

        let listPost = await searchPost({
            Page_size: 20,
            Page_index: this.state.page_index_post,
            Keyword: "",
            IsAdvs: 255,
            From_date: "",
            To_date: "",
            User_id: "",
            Profile_id: "",
            User_type: 255,
            Pin: 255,
            IntUserID: IntUserID,
            Option: 0
        });
        if (listPost && listPost.ErrorCode === "00") {
            this.setState(
                {
                    isLoading: false,
                    refreshing: false,
                    // ArrPost: listPost.Value
                    ArrPost: this.state.page_index_post === 1 ? [...listPost.Value] : [...this.state.ArrPost, ...listPost.Value],
                },
                () => console.log("ArrPost", this.state.ArrPost)
            );
        } else {
            this.setState({
                isLoading: false
            });
        }
    };
    _loadUserProfile = async () => {
        const {loadUserProfile} = this.props;
        loadUserProfile({
            user_id: this.userID,
            option: 100
        });
    };
    _renderEmpty = () => {
        return (
            <View style={style_common.content_center}>
                <Text>Không có dữ liệu</Text>
            </View>
        );
    };
    handleLoadMorePost = () => {
        this.setState(
            {
                page_index_post: this.state.page_index_post + 1
            },
            () => {
                console.log('index', this.state.page_index_post)
                this._searchPost()
            }
        );
    }
    _renderLoading = () => {
        return this.state.isLoading ? <ViewLoading /> : null;
    };
    render() {
        const {navigation} = this.props;

        return (
            <View style = {{flex:1}}>
                {/*<ScrollView*/}
                    {/*style={{flex: 1, backgroundColor: COLOR.COLOR_BACKGROUND}}*/}
                    {/*refreshControl={*/}
                        {/*<RefreshControl*/}
                            {/*refreshing={this.state.refreshing}*/}
                            {/*onRefresh={this._searchPost}*/}
                        {/*/>*/}
                    {/*}*/}
                {/*>*/}
                    {this.state.ArrPost.length === 0 && !this.state.isLoading ? (
                        this._renderEmpty()
                    ) : (
                        <FlatList
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this._searchPost()
                            }}
                            bounces={false}
                            onEndReached={this.handleLoadMorePost}
                            // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            onEndReachedThreshold={0.1}
                            data={this.state.ArrPost}
                            renderItem={item => {

                                return (
                                    <StatusItems
                                        isTab={true}
                                        dataItem={item}
                                        userID={this.userID}
                                        screenProps={this.props.screenProps}
                                        // onReloadBack ={this.onReloadBack}
                                        navigation={navigation}
                                    />
                                );
                            }}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}

                {/*{this._renderLoading()}*/}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        LoginData: state.login,
        UserProfile: state.loadUserProfile,
        isGuest: state.loginGuest.isGuest
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadUserProfile: bindActionCreators(loadUserProfile, dispatch),
        searchPost: bindActionCreators(searchPost, dispatch),
        getAllRank: bindActionCreators(getAllRank, dispatch),
        getAllHashTag: bindActionCreators(getAllHashTag, dispatch),
        getAllCategory: bindActionCreators(getAllCategory, dispatch),
        getcommonSetting: bindActionCreators(getcommonSetting, dispatch),
        getAllEmoji: bindActionCreators(getAllEmoji, dispatch)
    };
};

Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
export default Home;
