import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image, AsyncStorage,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    BackHandler,
    Alert, StyleSheet, Dimensions
} from 'react-native';

import moment from "moment";
import Icon1 from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconMore from "react-native-vector-icons/Ionicons";
import BinhLuanItem from "../components/BinhLuanItem";
import TextInputChat from "../components/TextInputChat";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {searchCmt} from "../actions/searchCmtActions";
import {createCmt} from "../actions/createCmtActions";
import {URL_SOCKET} from "../constant/api";
import SocketIOClient from "socket.io-client";
import PhotoGrid from "../components/PhotoGrid";


class BinhLuan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ArrCmt: [

            ]

        }
        const {UserProfile} = this.props
        if (UserProfile.length <= 0) {
            return null

        }
        const { navigation } = this.props;
        const itemStatus = navigation.getParam('item');
        this.socket = SocketIOClient(URL_SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        console.log('socket', this.socket)
        this.socket.emit('LOGINCOMMENT', {
            IntUserID: UserProfile.Value[0].IntUserID,
            PostID: itemStatus.PostID
        })
        this.socket.on('RECEIVERCOMMENT', (dataRes) => {
            // console.log('receiveCMT', dataRes)
            let newCmt = this.state.ArrCmt;
            //add message to array
            newCmt.push(dataRes);
            this.setState({ArrCmt: newCmt});
        })




    }
    componentDidMount(){
        const { navigation } = this.props;
        const itemStatus = navigation.getParam('item');
        console.log('itemStatus', itemStatus)
        this._searchCmt()
    }
    _searchCmt = async () => {
        const { navigation, searchCmt } = this.props;
        const itemStatus = navigation.getParam('item');
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
            Option: 0,
            lang_name: "vi_VN"
        })
        console.log('ArrCmt', ArrCmt)
        this.setState({
            ArrCmt:ArrCmt.Value
        })



    }
    _createCmt = async(cmt_content) => {
        const { navigation, createCmt, UserProfile } = this.props;
        const itemStatus = navigation.getParam('item');
        let Cmt = await createCmt({
            Post_id: itemStatus.PostID,
            User_id: UserProfile.Value[0].UserID,
            ProfileID: UserProfile.Value[0].ProfileID,
            User_type: UserProfile.Value[0].Type,
            Full_name: UserProfile.Value[0].FullName,
            Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
            Images: "",
            Videos: "",
            Content: cmt_content,
            LangID: 129,
            lang_name: "vi_VN"
        })
        console.log('cmt',Cmt)
        if (Cmt.ErrorCode =="00"){
            this._sendCmt(Cmt.Value.CreatedTime, cmt_content)

        }

    }
    _sendCmt = (DatePost, Content) => {
        const {navigation, UserProfile} = this.props;
        const itemStatus = navigation.getParam('item');
        let dataSend = {
            IntUserID: UserProfile.Value[0].IntUserID,
            PostID: itemStatus.PostID,
            FullName: UserProfile.Value[0].FullName,
            DatePost: DatePost,
            Content: Content,
            Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
            IntUserIDPost: itemStatus.IntUserID,
            LangID: 129
        }
        console.log('dataSend', dataSend)
        this.socket.emit("COMMENT", dataSend);
        // console.log('send ok')
    }




    onReceiveTextInputClick = (text) => {
        if (text === "")
            return;
        this._createCmt(text)

    }



    render() {
        const { navigation } = this.props;
        const itemStatus = navigation.getParam('item');
        let ArrImg = itemStatus.Images ? itemStatus.Images : null
        ArrImg = JSON.parse(ArrImg)

        return (

            <KeyboardAvoidingView style={{ flex: 1 }}
                                  behavior={Platform.OS === 'ios' ? "padding" : null}
                                  keyboardVerticalOffset={64}
            >
                <ScrollView>
                <View style={{flexDirection: "row", marginTop: 10, alignItems: 'center'}}>
                    <Image
                        style={styles.image_circle}
                        source={{
                            uri:
                                "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
                        }}
                        resizeMode="cover"
                    />

                    <View style={{marginLeft: 10, flex: 1}}>
                        <View style={{justifyContent: 'space-between', alignItems: "center", flexDirection: 'row'}}>
                            <Text style={{color: "#2196F3", fontWeight: "bold"}}>
                                {itemStatus.FullName}
                            </Text>
                            <TouchableOpacity>
                                <IconMore name="ios-more" size={25} color="black" style={{marginRight: 10}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent: 'space-between', alignItems: "center", flexDirection: 'row'}}>
                            <Text style={{color: "black"}}>Quản trị viên</Text>
                            <Text style={{
                                marginRight: 10,
                                color: 'black'
                            }}>{moment(itemStatus.CreatedDate).startOf('hour').fromNow()}</Text>

                        </View>
                    </View>
                </View>
                <View style={{marginHorizontal: 10, marginTop: 10}}>
                    <View>

                            <Text>{itemStatus.PostContent}</Text>
                    </View>
                </View>
                {ArrImg ? (
                <PhotoGrid
                    source={ArrImg}
                    navigation={this.props.navigation}
                />
                ) : null}

                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 5,
                        justifyContent: "space-between",
                        alignItems: 'center'
                    }}
                >
                    <View style={{flexDirection: "row", marginLeft: 10, alignItems: 'center'}}>
                        <Icon1 name="like" size={25} color="#42A5F5"/>
                        <Text style={{color: "#42A5F5"}}>{itemStatus.TotalLike} </Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <Icon1 name="comment" size={25} color="#42A5F5"/>
                        <Text style={{color: "#42A5F5"}}>{itemStatus.TotalComment}</Text>
                    </View>
                    <View style={{flexDirection: "row", marginRight: 10, alignItems: 'center'}}>
                        <Icon name="share-outline" size={25} color="#42A5F5"/>
                        <Text style={{color: "#42A5F5"}}>{itemStatus.TotalShare}</Text>
                    </View>
                </View>
                <View
                    style={{height: 1, backgroundColor: "#cccccc"}}
                />
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 10,
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <View style={{flexDirection: "row", marginLeft: 20, alignItems: "center"}}>
                        <Icon1 name="like" size={25} color="#424242"/>
                        <TouchableOpacity>
                            <Text>Thích</Text>
                        </TouchableOpacity>
                    </View>
                    {/*<TouchableOpacity onPress = {()=> this.props.navigation.navigate('BinhLuan', {item: item})}>*/}
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Icon1 name="comment" size={25} color="#424242"/>

                            <Text style={{color: "#424242"}}>Bình luận</Text>
                        </View>
                    {/*</TouchableOpacity>*/}
                    <View style={{flexDirection: "row", marginRight: 20, alignItems: "center"}}>
                        <Icon name="share-outline" size={25} color="#424242"/>

                        <Text style={{color: "#424242"}}>Share</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.ArrCmt}
                    renderItem={(item) => {
                        return (
                            <BinhLuanItem
                                dataItem={item}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={100}
                    showsVerticalScrollIndicator={false}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => {
                        // console.log("on size change");
                        this.flatList.scrollToEnd({ animated: true })
                    }}
                    onLayout={() => {
                        // console.log("got to onlayout");
                        this.flatList.scrollToEnd({ animated: true })
                    }
                    }
                />
                </ScrollView>
                <TextInputChat
                    style={{marginTop:5}}
                    onReceiveTextInputClick={this.onReceiveTextInputClick}
                />

            </KeyboardAvoidingView>
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
        searchCmt: bindActionCreators(searchCmt, dispatch),
        createCmt: bindActionCreators(createCmt, dispatch),

    };
};

BinhLuan = connect(
    mapStateToProps,
    mapDispatchToProps
)(BinhLuan);
export default BinhLuan;
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