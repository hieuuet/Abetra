import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Dimensions
} from "react-native";

import moment from "moment";
import BinhLuanItem from "../components/BinhLuanItem";
import TextInputChat from "../components/TextInputChat";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {searchCmt} from "../actions/searchCmtActions";
import {createCmt} from "../actions/createCmtActions";
import {URL_BASE, URL_SOCKET} from "../constant/api";
import SocketIOClient from "socket.io-client";
import PhotoGrid from "../components/PhotoGrid";
import {CustomizeHeader} from "../components/CommonView";
import {COLOR} from "../constant/Color";
import ReadMore from "react-native-read-more-text";
import PollVote from "../components/PollVote";
import Share from "react-native-share";
import PropTypes from "prop-types";
import {typeAccount} from "../constant/UtilsFunction";
import {TEXT_POST, TEXT_EVENT} from "../language";
import {requestRegister} from "../actions";
import {likePost} from "../actions/likePostActions";
import {joinEvent} from "../actions/joinEventActions";
import injectShowAlert from "../constant/injectShowAlert";

class BinhLuan extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const itemStatus = navigation.getParam("item");
        this.countliked = itemStatus.TotalLike;
        this.state = {
            ArrCmt: [],
            PostContent: [],
            liked: false,
            countLike: this.countliked,
            ArrPoll: []
        };

        this.TEXT_POST = TEXT_POST();
        this.TEXT_EVENT = TEXT_EVENT();
        const {UserProfile} = this.props;
        if (UserProfile.length <= 0) {
            return null;
        }


        this.socket = SocketIOClient(URL_SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ["websocket"]
        });
        console.log("socket", this.socket);
        this.socket.emit("LOGINCOMMENT", {
            IntUserID: UserProfile.Value[0].IntUserID,
            PostID: itemStatus.PostID
        });
        this.socket.on("RECEIVERCOMMENT", dataRes => {
            // console.log('receiveCMT', dataRes)
            let newCmt = this.state.ArrCmt;
            //add message to array
            newCmt.push(dataRes);
            this.setState({ArrCmt: newCmt});
        });
    }

    componentDidMount() {
        const {UserProfile} = this.props;
        const {navigation} = this.props;
        const itemStatus = navigation.getParam("item");
        console.log("itemStatus", itemStatus);
        this._searchCmt();
        let dataLike = itemStatus.LikePost ? itemStatus.LikePost : "[]";
        let ArrUserLiked = dataLike ? JSON.parse(dataLike) : [];
        //Get Arr IntUserID
        let ArrIntUserID = ArrUserLiked.map(function (o) {
            return o.IntUserID;
        });
        // console.log('ArrIntUserID', ArrIntUserID)
        // console.log('ArrIntUserID', ArrIntUserID)

        if (
            UserProfile &&
            UserProfile.Value &&
            UserProfile.Value[0] &&
            ArrIntUserID.indexOf(UserProfile.Value[0].IntUserID) > -1
        ) {
            this.setState({liked: true});
        }
        let PostContent = itemStatus.PostContent;


        if (itemStatus.Type == 2) {
            PostContent = JSON.parse(PostContent);
            this.setState(
                {
                    PostContent
                }
                // () => console.log('PostContent', this.state.PostContent)
            );
        }
        let dataPoll = itemStatus.Poll ? itemStatus.Poll : "[]";
        let Poll = dataPoll ? JSON.parse(dataPoll) : [];
        this.setState({
            ArrPoll: Poll
            // countCheck:  Poll.TotalVote
        });
    }

    _searchCmt = async () => {
        const {navigation, searchCmt} = this.props;
        const itemStatus = navigation.getParam("item");
        let ArrCmt = await searchCmt({
            Page_size: 100,
            Page_index: 1,
            Keyword: "",
            Post_id: itemStatus.PostID,
            From_date: "",
            To_date: "",
            User_id: "",
            ProfileID: "",
            User_type: 255,
            Option: 0
        });
        console.log("ArrCmt", ArrCmt);
        this.setState({
            ArrCmt: ArrCmt.Value
        });
    };
    _createCmt = async cmt_content => {
        const {navigation, createCmt, UserProfile} = this.props;
        const itemStatus = navigation.getParam("item");
        let Cmt = await createCmt({
            Post_id: itemStatus.PostID,
            User_id: UserProfile.Value[0].UserID,
            ProfileID: UserProfile.Value[0].ProfileID,
            User_type: UserProfile.Value[0].Type,
            Full_name: UserProfile.Value[0].FullName,
            Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
            Images: "",
            Videos: "",
            Content: cmt_content
        });
        console.log("cmt", Cmt);
        if (Cmt.ErrorCode == "00") {
            this._sendCmt(Cmt.Value.CreatedTime, cmt_content);
        }
    };
    _sendCmt = (DatePost, Content) => {
        const {navigation, UserProfile} = this.props;
        const itemStatus = navigation.getParam("item");
        let dataSend = {
            IntUserID: UserProfile.Value[0].IntUserID,
            PostID: itemStatus.PostID,
            FullName: UserProfile.Value[0].FullName,
            DatePost,
            Content,
            Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
            IntUserIDPost: itemStatus.IntUserID
        };
        console.log("dataSend", dataSend);
        this.socket.emit("COMMENT", dataSend);
    };

    onReceiveTextInputClick = text => {
        if (text === "") return;
        this._createCmt(text);
    };

    onShare = (text) => {
        const shareOptions = {
            title: "Share Status",
            url: text
        };
        return Share.open(shareOptions);
    };

    likePost = async postId => {
        //prevent action with GUEST
        if (this.props.isGuest)
            return requestRegister(
                this.props.isTab ? this.props.screenProps : this.props.navigation
            );

        const {likePost, UserProfile} = this.props;
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
            this.setState({liked: true, countLike: currentLike});
        }
    };
    unlikePost = async postId => {
        //prevent action with GUEST
        if (this.props.isGuest)
            return requestRegister(
                this.props.isTab ? this.props.screenProps : this.props.navigation
            );

        const {likePost, UserProfile} = this.props;
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
            this.setState({liked: false, countLike: currentLike});
        }
    };
    _joinEvent = async EventID => {
        console.log('join_event')
        console.log('ID', this.state.PostContent.ID)
        //prevent action with GUEST
        if (this.props.isGuest)
            return requestRegister(
                this.props.isTab ? this.props.screenProps : this.props.navigation
            );

        const {joinEvent, UserProfile} = this.props;
        if (UserProfile.length <= 0) {
            return null;
        }
        let eventJoin = await joinEvent({
            EventID: this.state.PostContent.ID,
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
            return this.props.showAlert({
                content: this.TEXT_EVENT.JoinSuccess
            });
        } else if (eventJoin.ErrorCode == "04") {
            return this.props.showAlert({content: this.TEXT_EVENT.HasJoin});
        } else {
            return this.props.showAlert({
                content: this.TEXT_EVENT.JoinFail
            });
        }
    };

    render() {
        const {navigation} = this.props;
        const itemStatus = navigation.getParam("item");
        let ArrImg = itemStatus.Images ? itemStatus.Images : null;

        try {
            ArrImg = JSON.parse(ArrImg);
        } catch (e) {
            console.log("e");
        }
        return (
            <KeyboardAvoidingView
                style={{flex: 1, backgroundColor:'white'}}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={64}
            >
                <ScrollView>
                    <CustomizeHeader
                        label={this.TEXT_POST.DetailPost}
                        onBackPress={() => this.props.navigation.goBack()}
                    />
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
                                source={{
                                    uri: URL_BASE + itemStatus.Avatar
                                }}
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
                                        {itemStatus.FullName}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{fontSize: 12}}>
                                    {typeAccount(itemStatus.UserType)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}
                            >
                                <Text style={{fontSize: 12}}>
                                    {moment(itemStatus.CreatedDate).format("DD-MM-YY LT")}
                                    {/*{moment().startOf('hour').fromNow()}*/}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        // this.setModalVisible(true);

                                    }}
                                    style = {{height: 15, width: 30}}
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
                    {itemStatus.Type == 2 ? (
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
                                {this.state.PostContent.Name}
                            </Text>
                        </View>
                    ) : null}
                    {itemStatus.Type == 2 ? (
                        <View style={{marginHorizontal: 15, flexDirection: "row"}}>
                            <Text style={{color: "#F0A75B", fontSize: 12}}>
                                {this.state.PostContent.StartDate} -{" "}
                                {this.state.PostContent.Address}
                            </Text>
                        </View>
                    ) : null}
                    <View style={{marginHorizontal: 15, marginTop: 8}}>
                        <View>
                            {/*<ReadMore*/}
                                {/*numberOfLines={3}*/}
                                {/*renderTruncatedFooter={this._renderTruncatedFooter}*/}
                                {/*renderRevealedFooter={this._renderRevealedFooter}*/}
                                {/*onReady={this._handleTextReady}*/}
                            {/*>*/}
                                <Text style={{}}>
                                    {itemStatus.Type != 2
                                        ? itemStatus.PostContent
                                        : this.state.PostContent.Description}
                                </Text>
                            {/*</ReadMore>*/}
                        </View>
                    </View>

                    <FlatList
                        style={{marginTop: 5}}
                        data={this.state.ArrPoll}
                        renderItem={item => {
                            return <PollVote dataItem={item}/>;
                        }}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {/*<View style={{ paddingLeft: 15, paddingRight: 15, marginTop: 5 }}>*/}
                    {ArrImg ? (
                        <PhotoGrid source={ArrImg} navigation={this.props.navigation}/>
                    ) : null}
                    {/*</View>*/}

                    <View
                        style={{
                            marginHorizontal: 15,
                            flexDirection: "row",
                            marginTop: 5,
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        {/*<View style={{flexDirection: "row"}}>*/}
                        <View>
                            {this.state.liked ?
                                <TouchableOpacity
                                    style={{flex: 1}}
                                    onPress={() => this.unlikePost(itemStatus.PostID)}
                                >
                                    <View style={styles.view_border}>
                                        <View style={{width: 15, height: 15}}>

                                            <Image
                                                style={{width: null, height: null, flex: 1}}
                                                source={require("../../assets/icon_heart_active.png")}
                                                resizeMode="contain"
                                            />
                                        </View>
                                        <Text style={styles.text_action}>{this.TEXT_POST.Like}</Text>
                                    </View>

                                </TouchableOpacity> : <TouchableOpacity
                                    style={{flex: 1}}
                                    onPress={() => this.likePost(itemStatus.PostID)}
                                >
                                    <View style={styles.view_border}>
                                        <View style={{width: 15, height: 15,}}>

                                            <Image
                                                style={{width: null, height: null, flex: 1}}
                                                source={require("../../assets/icon_heart.png")}
                                                resizeMode="contain"
                                            />

                                        </View>
                                        <Text style={styles.text_action}>{this.TEXT_POST.Like}</Text>
                                    </View>

                                </TouchableOpacity>
                            }
                        </View>

                        <View
                            style={styles.view_border}
                        >
                            <View style={{width: 15, height: 15, marginLeft: 10}}>
                                <Image
                                    style={{width: null, height: null, flex: 1}}
                                    source={require("../../assets/icon_comment.png")}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.text_action}>
                                Bình luận
                            </Text>
                        </View>
                        {/*<TouchableOpacity onPress={() => this.onShare()}>*/}
                            {/*<View*/}
                                {/*style={styles.view_border}*/}
                            {/*>*/}
                                {/*<View style={{width: 15, height: 15, marginLeft: 10}}>*/}
                                    {/*<Image*/}
                                        {/*style={{width: null, height: null, flex: 1}}*/}
                                        {/*source={require("../../assets/icon_share.png")}*/}
                                        {/*resizeMode="contain"*/}
                                    {/*/>*/}
                                {/*</View>*/}
                                {/*<Text style={styles.text_action}>*/}
                                    {/*Chia sẻ*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity onPress={() => this.onShare(itemStatus.Type != 2
                            ? itemStatus.PostContent
                            : this.state.PostContent.Description)}>
                            <View style={styles.view_border}>
                                <View style={{width: 15, height: 15}}>
                                    <Image
                                        style={{width: null, height: null, flex: 1}}
                                        source={require("../../assets/icon_share.png")}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.text_action}>{this.TEXT_POST.Share}</Text>
                            </View>
                        </TouchableOpacity>
                        {itemStatus.Type == 2 ? (
                            <TouchableOpacity
                                onPress={() => this._joinEvent(itemStatus.PostID)}
                            >
                                <View style={styles.view_border}>
                                    <View style={{width: 15, height: 15}}>
                                        <Image
                                            style={{width: null, height: null, flex: 1}}
                                            source={
                                                this.state.isJoin
                                                    ? require("../../assets/icon_forcus_active.png")
                                                    : require("../../assets/icon_forcus.png")
                                            }
                                            resizeMode="contain"
                                        />

                                    </View>
                                    <Text style={styles.text_action}>{this.TEXT_EVENT.Join}</Text>
                                </View>
                            </TouchableOpacity>
                        ) : null}
                    </View>


                    {/*</View>*/}
                    <FlatList
                        data={this.state.ArrCmt}
                        style = {{marginBottom: 30}}
                        renderItem={item => {
                            return <BinhLuanItem dataItem={item}/>;
                        }}
                        onEndReachedThreshold={100}
                        showsVerticalScrollIndicator={false}
                        ref={ref => (this.flatList = ref)}
                        onContentSizeChange={() => {
                            console.log("on size change");
                            this.flatList.scrollToEnd({animated: true});
                        }}
                        onLayout={() => {
                            console.log("got to onlayout");
                            this.flatList.scrollToEnd({animated: true});
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                    />
                </ScrollView>
                <TextInputChat
                    style={{marginTop: 5}}
                    onReceiveTextInputClick={this.onReceiveTextInputClick}
                />
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => {
    return {
        UserProfile: state.loadUserProfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        likePost: bindActionCreators(likePost, dispatch),
        searchCmt: bindActionCreators(searchCmt, dispatch),
        createCmt: bindActionCreators(createCmt, dispatch),
        joinEvent: bindActionCreators(joinEvent, dispatch)
    };
};

BinhLuan = connect(
    mapStateToProps,
    mapDispatchToProps
)(BinhLuan);
export default compose(injectShowAlert)(BinhLuan);


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
    },
    view_border: {
        flexDirection: "row",
        marginLeft: 10,
        alignItems: "center",

    },
    text_action: {
        marginLeft: 3, color: "#777777"
    }
});
