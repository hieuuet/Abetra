import React, {Component} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    Dimensions, Button,
} from "react-native";

import moment from "moment";
import Icon1 from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconMore from "react-native-vector-icons/Ionicons";
import IconAdd from "react-native-vector-icons/Entypo";
import ReadMore from "react-native-read-more-text";
import PhotoGrid from "./PhotoGrid";
import MenuPost from "./menu_post/MenuPost";
import Share from "react-native-share";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {joinEvent} from "../actions/joinEventActions";


class EventItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            isJoin: false
        };
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

    render() {
        const {item} = this.props.dataItem;
        const {fromEvent, fromEventJoin} = this.props
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
                                    uri:
                                        "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
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
                                <Text style={{color: "#2196F3", fontWeight: "bold"}}>
                                    {item.UserName}
                                </Text>
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
                                <Text style={{color: "black"}}>Quản trị viên</Text>
                                <Text
                                    style={{
                                        marginRight: 10,
                                        color: "black",
                                    }}
                                >
                                    {moment(item.CreateDate).format("DD/MM/YY HH:mm")}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 10, flexDirection: 'row', marginTop: 10}}>
                        <Text style={{color: "#42A5F5"}}>SỰ KIỆN: </Text>
                        <Text style={{color: 'black'}}>{item.Name}</Text>
                    </View>
                    <View style={{marginHorizontal: 10, flexDirection: 'row'}}>
                        <Text style={{color: "#FFA726"}}>{moment(item.StartDate).format("HH:mm DD/MM/YYYY")} - </Text>
                        {/*<Text style={{color: '#FFA726'}}>{moment(item.FinishDate).format("DD/MM/YY HH:mm")}</Text>*/}
                    </View>
                    <View style={{marginHorizontal: 10, marginTop: 10}}>
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
                    {/*{ArrImg ? (*/}
                    {/*<PhotoGrid source={ArrImg} navigation={this.props.navigation}/>*/}
                    {/*) : null}*/}

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
                            <Text style={{color: "#42A5F5"}}> 0</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Icon1 name="comment" size={25} color="#42A5F5"/>
                            <Text style={{color: "#42A5F5"}}>0</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                marginRight: 10,
                                alignItems: "center",
                            }}
                        >
                            <Icon name="share-outline" size={25} color="#42A5F5"/>
                            <Text style={{color: "#42A5F5"}}>0</Text>
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
                            <Icon1 name="like" size={25} color="#424242"/>
                            <TouchableOpacity>
                                <Text>Thích</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            // onPress={() =>
                            //     this.props.navigation.navigate("BinhLuan", {item})
                            // }
                        >
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon1 name="comment" size={25} color="#424242"/>

                                <Text style={{color: "#424242"}}>Bình luận</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onShare()}>
                            <View
                                style={
                                    fromEvent ? {
                                        flexDirection: "row",
                                        alignItems: "center",
                                    } : {
                                        flexDirection: "row",
                                        marginRight: 20,
                                        alignItems: "center",
                                    }}
                            >
                                <Icon name="share-outline" size={25} color="#424242"/>

                                <Text style={{color: "#424242"}}>Share</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            fromEvent ? <TouchableOpacity onPress={() => this._joinEvent(item.ID)}>
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
        marginLeft: 10,
        // marginTop: 10
    },
    imagePost: {
        width: DEVICE_WIDTH,
        height: 250,
        marginTop: 10,
    },
});
