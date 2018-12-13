import React, {Component} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    FlatList
} from "react-native";

import moment from "moment";
import ReadMore from "react-native-read-more-text";
import PhotoGrid from "./PhotoGrid";
import MenuPost from "./menu_post/MenuPost";
import Share from "react-native-share";
import {bindActionCreators, compose} from "redux";
import injectShowAlert from "../constant/injectShowAlert";
import {connect} from "react-redux";
import PollVote from "./PollVote";
import {likePost} from "../actions/likePostActions";
import {URL_BASE} from "../constant/api";
import {joinEvent} from "../actions/joinEventActions";
import {COLOR} from "../constant/Color";
import {requestRegister} from "../actions";
import {IMAGE} from "../constant/assets";

import {TEXT_EVENT, TEXT_POST} from "../language";
import {isEqual} from "lodash";
import PropTypes from "prop-types";
import {typeAccount} from "../constant/UtilsFunction";

class StatusItems extends Component {
    constructor(props) {
        super(props);
        this.countliked = this.props.dataItem.item.TotalLike;
        this.state = {
            modalVisible: false,
            Type: "",
            ArrPoll: [],
            countLike: this.countliked,
            liked: false,
            PostContent: ""
        };

        this.TEXT_EVENT = TEXT_EVENT();
        this.TEXT_POST = TEXT_POST();
    }

    componentDidMount() {
        const {item} = this.props.dataItem;
        const {UserProfile} = this.props;

        //ArrUser Liked
        let dataLike = item.LikePost ? item.LikePost : "[]";
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

    _renderTruncatedFooter = handlePress => {
        return (
            <Text style={{color: "#C3E3D7", fontSize: 12}} onPress={handlePress}>
                {this.TEXT_EVENT.More}
            </Text>
        );
    };

    _renderRevealedFooter = handlePress => {
        return (
            <Text style={{color: "#C3E3D7", fontSize: 12}} onPress={handlePress}>
                {this.TEXT_EVENT.Less}
            </Text>
        );
    };
    _handleTextReady = () => {
        // console.log('ready!');
    };
    _onClickAvatar = () => {
        const {item} = this.props.dataItem;
        if (!item) return;
        if (this.props.userID && item.UserID === this.props.userID) {
            return this.props.screenProps.navigate("Profile");
        }
        this.props.screenProps.navigate("MemberProfile", {item});
    };
    setModalVisible = visible => {
        // console.log('setModalVisible')
        this.setState({modalVisible: visible});
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

    render() {
        const {UserProfile} = this.props;
        // console.log('isSavePost', this.props.isSavePost)
        const {item} = this.props.dataItem;
        // console.log('isTab',  this.props.isTab)
        // console.log('item.cmt', item.Comments)
        // let PollVote = item.Poll ? item.Poll : null
        // PollVote =  JSON.parse(PollVote)
        // console.log('PollVote', PollVote)
        let ArrImg = item.Images ? item.Images : "[]";
        try {
            ArrImg = JSON.parse(ArrImg);
        } catch (e) {
            console.log("e");
        }

        return (
            <View style={{backgroundColor: COLOR.COLOR_BACKGROUND}}>
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
                                source={{
                                    uri: URL_BASE + item.Avatar
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
                                        {item.FullName}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{fontSize: 12}}>
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
                                <Text style={{fontSize: 12}}>
                                    {moment(item.CreatedDate).format("DD-MM-YY LT")}
                                    {/*{moment().startOf('hour').fromNow()}*/}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(true);
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
                    {item.Type == 2 ? (
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
                    {item.Type == 2 ? (
                        <View style={{marginHorizontal: 15, flexDirection: "row"}}>
                            <Text style={{color: "#F0A75B", fontSize: 12}}>
                                {/*{moment(this.state.PostContent.StartDate).format("DD-MM-YY LT")} */}
                                {this.state.PostContent.StartDate} -{" "}
                                {this.state.PostContent.Address}
                            </Text>
                            {/*<Text style={{color: '#FFA726'}}>{moment(this.state.PostContent.FinishDate).format("DD/MM/YY HH:mm")}</Text>*/}
                        </View>
                    ) : null}
                    <View style={{marginHorizontal: 15, marginTop: 8}}>
                        <View>
                            <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}
                            >
                                <Text style={{}}>
                                    {item.Type != 2
                                        ? item.PostContent
                                        : this.state.PostContent.Description}
                                </Text>
                            </ReadMore>
                        </View>
                    </View>
                    <FlatList
                        style={{marginTop: 5, paddingBottom: 0, backgroundColor: "white"}}
                        data={this.state.ArrPoll}
                        renderItem={item => {
                            return <PollVote dataItem={item}/>;
                        }}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {/*<View*/}
                    {/*style={{*/}
                    {/*marginHorizontal: 15,*/}
                    {/*marginTop: 5,*/}
                    {/*backgroundColor: "white"*/}
                    {/*}}*/}
                    {/*>*/}
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
                        <View>
                            {this.state.liked ?
                                <TouchableOpacity
                                    style={{flex: 1}}
                                    onPress={() => this.unlikePost(item.PostID)}
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
                                    onPress={() => this.likePost(item.PostID)}
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
                        <TouchableOpacity
                            onPress={() => {
                                //prevent action with GUEST
                                if (this.props.isGuest)
                                    return requestRegister(
                                        this.props.isTab
                                            ? this.props.screenProps
                                            : this.props.navigation
                                    );
                                this.props.isTab == true
                                    ? this.props.screenProps.navigate("BinhLuan", {item})
                                    : this.props.navigation.navigate("BinhLuan", {item});
                            }}
                        >
                            <View style={styles.view_border}>
                                <View style={{width: 15, height: 15}}>
                                    <Image
                                        style={{width: null, height: null, flex: 1}}
                                        source={require("../../assets/icon_comment.png")}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.text_action}>{this.TEXT_POST.Cmt}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onShare(item.Type != 2
                            ? item.PostContent
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

                        {item.Type == 2 ? (
                            <TouchableOpacity
                                onPress={() => this._joinEvent(item.PostID)}
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

                    {item.Comments && item.Comments.length > 0 ? (
                        <View
                            style={{height: 1, marginTop: 5, backgroundColor: "#cccccc"}}
                        />
                    ) : null}
                    {item.Comments && item.Comments.length > 0 ? (
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 10
                                }}
                            >
                                <Image
                                    style={styles.image_circle}
                                    source={{
                                        uri: URL_BASE + item.Comments[0].Avartar
                                    }}
                                    resizeMode="cover"
                                />
                                <View
                                    style={{
                                        marginRight: 15,
                                        justifyContent: "center",
                                        backgroundColor: "#F5F5F3",
                                        borderRadius: 15,
                                        marginLeft: 5,
                                        borderWidth: 1,
                                        flex: 1,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                        borderColor: "#F5F5F3"
                                    }}
                                >
                                    <Text>{item.Comments[0].Content}</Text>
                                </View>
                            </View>
                            {/* <Text
                style={{
                  textAlign: "right",
                  marginRight: 15,
                  color: "#42A5F5"
                }}
              >
                Trả lời
              </Text> */}
                        </View>
                    ) : null}
                </View>
                {/*<TouchableOpacity*/}
                {/*onPress={() => {*/}
                {/*//prevent action with GUEST*/}
                {/*if (this.props.isGuest)*/}
                {/*return requestRegister(*/}
                {/*this.props.isTab*/}
                {/*? this.props.screenProps*/}
                {/*: this.props.navigation*/}
                {/*);*/}
                {/*this.props.isTab == true*/}
                {/*? this.props.screenProps.navigate("BinhLuan", { item })*/}
                {/*: this.props.navigation.navigate("BinhLuan", { item });*/}
                {/*}}*/}
                {/*>*/}
                {/*<View*/}
                {/*style={{*/}
                {/*flexDirection: "row",*/}
                {/*marginTop: 5,*/}
                {/*alignItems: "center"*/}
                {/*}}*/}
                {/*>*/}
                {/*<Image*/}
                {/*style={styles.image_circle}*/}
                {/*source={*/}
                {/*UserProfile && UserProfile.Value && UserProfile.Value[0]*/}
                {/*? { uri: URL_BASE + UserProfile.Value[0].Avatar }*/}
                {/*: IMAGE.avatar_default*/}
                {/*}*/}
                {/*resizeMode="cover"*/}
                {/*/>*/}
                {/*<View*/}
                {/*style={{*/}
                {/*marginRight: 15,*/}
                {/*justifyContent: "space-between",*/}
                {/*flexDirection: "row",*/}
                {/*alignItems: "center",*/}
                {/*backgroundColor: "#F5F5F3",*/}
                {/*height: 30,*/}
                {/*borderRadius: 15,*/}
                {/*marginLeft: 5,*/}
                {/*borderWidth: 1,*/}
                {/*flex: 1,*/}
                {/*paddingRight: 10,*/}
                {/*paddingLeft: 10,*/}
                {/*borderColor: "#F5F5F3"*/}
                {/*}}*/}
                {/*>*/}
                {/*<TouchableOpacity*/}
                {/*style={{ marginLeft: 5, height: 15, width: 15 }}*/}
                {/*>*/}
                {/*<Image*/}
                {/*style={{ width: null, height: null, flex: 1 }}*/}
                {/*source={require("../../assets/img.png")}*/}
                {/*resizeMode="contain"*/}
                {/*/>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity*/}
                {/*style={{ marginRight: 5, height: 15, width: 15 }}*/}
                {/*>*/}
                {/*<Image*/}
                {/*style={{ width: null, height: null, flex: 1 }}*/}
                {/*source={require("../../assets/emo.png")}*/}
                {/*resizeMode="contain"*/}
                {/*/>*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}

                <View
                    style={{height: 5, backgroundColor: "#cccccc", marginTop: 10}}
                />
                <MenuPost
                    isSavePost = {this.props.isSavePost}
                    item={item}
                    changeModalVisible={this.state.modalVisible}
                    onChangeModalVisible={this.setModalVisible}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        UserProfile: state.loadUserProfile,
        isGuest: state.loginGuest.isGuest,
        currentLanguage: state.currentLanguage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        likePost: bindActionCreators(likePost, dispatch),
        joinEvent: bindActionCreators(joinEvent, dispatch)
    };
};

StatusItems = connect(
    mapStateToProps,
    mapDispatchToProps
)(StatusItems);

export default compose(injectShowAlert)(StatusItems);
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 20
        // marginTop: 10
    },
    imagePost: {
        width: DEVICE_WIDTH,
        height: 250,
        marginTop: 10
    },
    btn: {
        flexDirection: "row",
        marginLeft: 10,
        alignItems: "center",
        backgroundColor: "#C7C7C7",
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#C7C7C7",
        justifyContent: "space-between"
    },
    view_border: {
        flexDirection: "row",
        alignItems: "center"
    },
    text_action: {
        marginLeft: 3,
        color: "#777777"
    }
});
