import React, {Component} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    Dimensions, Button,
    FlatList
} from "react-native";

import moment from "moment";
import Icon1 from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconMore from "react-native-vector-icons/Ionicons";
import ReadMore from "react-native-read-more-text";
import PhotoGrid from "./PhotoGrid";
import MenuPost from "./menu_post/MenuPost";
import Share from "react-native-share";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PollVote from "./PollVote";
import {likePost} from "../actions/likePostActions";
import {URL_BASE} from "../constant/api";
import IconAdd from "react-native-vector-icons/Entypo";
import {joinEvent} from "../actions/joinEventActions";


class StatusItems extends Component {
    constructor(props) {
        super(props);
        this.countliked = this.props.dataItem.item.TotalLike;
        this.state = {
            modalVisible: false,
            Type: "",
            ArrPoll: [
            ],
            countLike: this.countliked,
            liked: false,
            PostContent: ""
        };
    }
    componentDidMount (){
        const {item} = this.props.dataItem;
        const { UserProfile}  = this.props
        if (UserProfile.length<= 0){
            return null
        }
        //ArrUser Liked
        let dataLike = (item.LikePost) ? item.LikePost : null
        let ArrUserLiked = dataLike ? JSON.parse(dataLike) : [];
        //Get Arr IntUserID
        var ArrIntUserID = ArrUserLiked.map(function (o) {
            return o.IntUserID;
        });
        // console.log('ArrIntUserID', ArrIntUserID)
        // console.log('ArrIntUserID', ArrIntUserID)

        if (ArrIntUserID.indexOf(UserProfile.Value[0].IntUserID) > -1) {
            this.setState({liked: true})
        }
        // console.log('userLiked', ArrUserLiked)


        let dataPoll = (item.Poll) ? item.Poll : null
        let Poll = dataPoll ? JSON.parse(dataPoll) : [];
        this.setState({
            ArrPoll: Poll,
            // countCheck:  Poll.TotalVote

        })
        let PostContent = item.PostContent
        if (item.Type == 2){
            PostContent = JSON.parse(PostContent)
            this.setState({
                PostContent: PostContent,
            },
                // () => console.log('PostContent', this.state.PostContent)
            )
        }


    }
    _joinEvent = async (EventID) => {
        const {joinEvent, UserProfile} = this.props
        if (UserProfile.length <= 0) {
            return null
        }
        let eventJoin = await joinEvent({
            EventID: EventID,
            ProfileID: UserProfile.Value[0].IntUserID,//api yeu cau interuserid
            Type: 0,
            UserName: UserProfile.Value[0].FullName,
            Phone: UserProfile.Value[0].Phone,
            Email: UserProfile.Value[0].Email ? UserProfile.Value[0].Email : "",
            LangID: 129

        })
        console.log('eventJoin', eventJoin)


        if (eventJoin.ErrorCode == "00") {
            this.setState({
                isJoin: true

            })
        }
        else if (eventJoin.ErrorCode == "04") {
            Alert.alert(
                "Thông báo",
                "Bạn đã tham gia trước đó",
                [{
                    text: "OK", onPress: () => {
                    }
                }],
                {cancelable: false}
            );

        }
        else {
            Alert.alert(
                "Thông báo",
                "Tham gia sự kiện không thành công",
                [{
                    text: "OK", onPress: () => {
                    }
                }],
                {cancelable: false}
            );
        }


    }


    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{color: "red", marginTop: 5}} onPress={handlePress}>
                Xem thêm
            </Text>
        );
    };

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{color: "red", marginTop: 5}} onPress={handlePress}>
                Thu gọn
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
            return this.props.navigation.navigate("Profile");
        }
        this.props.navigation.navigate("MemberProfile", {item});
    };
    setModalVisible = (visible) => {
        // console.log('setModalVisible')
        this.setState({modalVisible: visible});
    };

    onShare() {
        const shareOptions = {
            title: 'Share Status',
            url: "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2264_ZING.jpg",
        };
        return Share.open(shareOptions);
    }

    likePost = async (postId) => {
        const {likePost, UserProfile}  = this.props
        if (UserProfile.length <=0){
            return null

        }
        let like = await likePost({
            IntUserID: UserProfile.Value[0].IntUserID,
            PostID: postId,
            FullName: UserProfile.Value[0].FullName,
            Islike: 1,
            TableLog: 0
        })
        console.log('like', like)
        if(like.Error === null){
            let currentLike = this.state.countLike;
            currentLike++;
            this.setState({liked: true, countLike: currentLike});
        }



    }
    unlikePost = async (postId) => {
        const {likePost, UserProfile}  = this.props
        if (UserProfile.length <=0){
            return null

        }
        let like = await likePost({
            IntUserID: UserProfile.Value[0].IntUserID,
            PostID: postId,
            FullName: UserProfile.Value[0].FullName,
            Islike: 0,
            TableLog: 0
        })
        console.log('like', like)
        if(like.Error === null){
            let currentLike = this.state.countLike;
            currentLike--;
            this.setState({liked: false, countLike: currentLike});
        }



    }


    render() {
        const {item} = this.props.dataItem;
        // let PollVote = item.Poll ? item.Poll : null
        // PollVote =  JSON.parse(PollVote)
        // console.log('PollVote', PollVote)
        const {setModalVisible} = this.props
        let ArrImg = item.Images ? item.Images : null;
        ArrImg = JSON.parse(ArrImg);


        return (
            <View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 10,
                            alignItems: "center",
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

                        <View style={{marginLeft: 10, flex: 1}}>
                            <View
                                style={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableOpacity onPress={this._onClickAvatar}>
                                <Text style={{color: "#2196F3", fontWeight: "bold"}}>
                                    {item.FullName}
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(true);
                                    }}
                                >
                                    <IconMore
                                        name="ios-more"
                                        size={25}
                                        color="black"
                                        style={{marginRight: 10}}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Text style={{color: "black"}}>{item.UserType == 2 ? "Hội viên cá nhân" : item.UserType == 3 ? "Hội viên doanh nghiệp" : item.UserType == 4 ? "Hội viên vãng lai" : null}</Text>
                                <Text
                                    style={{
                                        marginRight: 10,
                                        color: "black",
                                    }}
                                >
                                    {/*{moment().format("DD/MM/YY HH:mm")}*/}
                                    {moment(item.CreatedDate).startOf('hour').fromNow()}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {
                        item.Type ==2 ?
                            <View style={{marginHorizontal: 10, flexDirection: 'row', marginTop: 10}}>
                                <Text style={{color: "#42A5F5"}}>SỰ KIỆN: </Text>
                                <Text style={{color: 'black'}}>{this.state.PostContent.Name}</Text>
                            </View> : null
                    }
                    {
                        item.Type ==2 ?
                            <View style={{marginHorizontal: 10, flexDirection: 'row'}}>
                        <Text style={{color: "#FFA726"}}>{moment(this.state.PostContent.StartDate).format("HH:mm DD/MM/YYYY")} </Text>
                        {/*<Text style={{color: '#FFA726'}}>{moment(this.state.PostContent.FinishDate).format("DD/MM/YY HH:mm")}</Text>*/}
                        </View>
                     : null
                    }
                    <View style={{marginHorizontal: 10, marginTop: 10}}>
                        <View>
                            <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}
                            >
                                <Text>{item.Type != 2 ? item.PostContent : this.state.PostContent.Description}</Text>
                            </ReadMore>
                        </View>
                    </View>
                    <FlatList
                        style={{marginTop: 5}}
                        data= {this.state.ArrPoll}
                        renderItem={(item) => {
                            return (
                                <PollVote
                                    dataItem={item}
                                />

                            )
                        }}

                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}

                    />
                    {ArrImg ? (
                        <PhotoGrid source={ArrImg} navigation={this.props.navigation}/>
                    ) : null}

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 5,
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                marginLeft: 10,
                                alignItems: "center",
                            }}
                        >
                            <Icon1 name="like" size={25} color="#42A5F5"/>
                            <Text style={{color: "#42A5F5"}}> {this.state.countLike}</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Icon1 name="comment" size={25} color="#42A5F5"/>
                            <Text style={{color: "#42A5F5"}}>{item.TotalComment}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                marginRight: 10,
                                alignItems: "center",
                            }}
                        >
                            <Icon name="share-outline" size={25} color="#42A5F5"/>
                            <Text style={{color: "#42A5F5"}}>{item.TotalShare}</Text>
                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor: "#cccccc"}}/>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                marginLeft: 20,
                                alignItems: "center",
                            }}
                        >
                            <Icon1 name="like" size={25}  color={this.state.liked ? "blue" : "#424242"}/>
                            <TouchableOpacity onPress={() => this.state.liked ? this.unlikePost(item.PostID) : this.likePost(item.PostID)}>
                                <Text style={{color: this.state.liked ? 'blue' : null}}>Thích</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate("BinhLuan", {item})
                            }
                        >
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon1 name="comment" size={25} color="#424242"/>

                                <Text style={{color: "#424242"}}>Bình luận</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => this.onShare()}>
                            <View
                                style={
                                    item.Type == 2 ?
                                        {
                                            flexDirection: "row",
                                            marginRight: 20,
                                            alignItems: "center",
                                        }:{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }  }
                            >
                                <Icon name="share-outline" size={25} color="#424242"/>

                                <Text style={{color: "#424242"}}>Share</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            item.Type == 2 ? <TouchableOpacity onPress={() => this._joinEvent(item.PostID)}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginRight: 20,
                                        alignItems: "center",
                                    }}
                                >
                                    <IconAdd name="add-user" size={20} color="#424242"/>
                                    {
                                        this.state.isJoin ? <Text style={{color: "#424242"}}> Đã tham gia</Text> :
                                            <Text style={{color: "#424242"}}>Tham gia</Text>
                                    }
                                </View>
                            </TouchableOpacity> : null
                        }
                    </View>


                </View>

                <View
                    style={{height: 5, backgroundColor: "#cccccc", marginTop: 10}}
                />
                <MenuPost
                    item={item}
                    changeModalVisible={this.state.modalVisible}
                    onChangeModalVisible={this.setModalVisible}

                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        UserProfile: state.loadUserProfile,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        likePost: bindActionCreators(likePost, dispatch),
        joinEvent: bindActionCreators(joinEvent, dispatch)

    };
};

StatusItems = connect(
    mapStateToProps,
    mapDispatchToProps
)(StatusItems);


export default StatusItems;
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 11,
        width: DEVICE_WIDTH / 11,
        borderRadius: DEVICE_WIDTH / 22,
        marginLeft: 10,
        // marginTop: 10
    },
    imagePost: {
        width: DEVICE_WIDTH,
        height: 250,
        marginTop: 10,
    },
});
