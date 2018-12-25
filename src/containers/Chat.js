import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    Platform,
    KeyboardAvoidingView,
    BackHandler, Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import ChatItem from "../components/ChatItem";
import TextInputChat from "../components/TextInputChat";
import {API, SOCKET, URL_BASE, URL_SOCKET} from "../constant/api";
import SocketIOClient from "socket.io-client";
import {bindActionCreators, compose} from "redux";
import injectShowAlert from "../constant/injectShowAlert";
import {connect} from "react-redux";
import {loadDetailMsg} from "../actions/detailMsgActions";
import {CustomizeHeader} from "../components/CommonView";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ArrMess: [],
            ArrAdvertise: [],
            linkImg: ""
        };
        const {navigation} = this.props;
        const MsgGroupID = navigation.getParam("MsgGroupID");
        // console.log('MsgGroupID', MsgGroupID)
        const {UserProfile} = this.props;
        if (UserProfile.length <= 0) {
            return null;
        }

        // console.log("UserProfile", UserProfile)
        this.socket = SocketIOClient(URL_SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ["websocket"]
        });
        console.log("socket", this.socket);
        this.socket.emit("LOGINMSG", {
            IntUserID: UserProfile.Value[0].IntUserID,
            MsgGroupID: MsgGroupID
        });
        this.socket.on("RECEIVERMSG", dataRes => {
            // console.log("receiveMSG", dataRes.ChatTo);
            // dataMess = dataReceive.Content;
            //set newMsg = messga receive
            let newMsg = this.state.ArrMess;
            //add message to array
            newMsg.push(dataRes);
            this.setState({ArrMess: newMsg});
        });
        this.socket.on("READVS", dataRes => {
            if (dataRes) {
                this.socket.emit("SHOW", {
                    AdvertID: dataRes.AdvertID,
                    MsgGroupID: MsgGroupID,
                    IntUserID: UserProfile.Value[0].IntUserID
                });
            }
            console.log("receiveMSG", dataRes);
            let newMsg = this.state.ArrMess;
            newMsg.push(dataRes);
            this.setState({ArrMess: newMsg});

        });
    }


    componentDidMount() {
        const {params} = this.props.navigation.state
        console.log('params', params)
        this._loadMsgDetail();
        this._loadAdvertise();
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            const isAlertShow = this.props.closeAlert();
            if (isAlertShow) {
                return true;
            }
            this.props.navigation.goBack();
            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
        const {navigation} = this.props;
        const MsgGroupID = navigation.getParam("MsgGroupID");
        // console.log('MsgGroupID', MsgGroupID)
        const {UserProfile} = this.props;
        if (UserProfile.length <= 0) {
            return null;
        }
        this.socket = SocketIOClient(URL_SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ["websocket"]
        });

        this.socket.emit("LOGOUTMSG", {
            IntUserID: UserProfile.Value[0].IntUserID,
            MsgGroupID: MsgGroupID
        });
    }
    _loadAdvertise = () => {
        const {navigation} = this.props;
        const {params} = this.props.navigation.state
        // console.log('params', params)
        const {UserProfile} = this.props;
        if (UserProfile.length <= 0) {
            return null;
        }
        const MsgGroupID = navigation.getParam("MsgGroupID");
        fetch( API.LOAD_ADVERTISE,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'x-access-token': value,

            },
            body: JSON.stringify({
                IntUserID: UserProfile.Value[0].IntUserID,
                MsgGroupID: MsgGroupID,
                IsSystem: params.itemMessage.IsSystem
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {

                console.log("dataRes",dataRes)
                this.setState({
                    ArrAdvertise : dataRes.ObjectResult
                })
            }).catch((erro)=> {
            console.log('erro', erro);
        })

    }
    _loadMsgDetail = async () => {
        const {navigation, UserProfile, loadDetailMsg} = this.props;
        const MsgGroupID = navigation.getParam("MsgGroupID");
        console.log("MsgGroupID", MsgGroupID);
        if (UserProfile.length <= 0) {
            return null;
        }
        let msgDetail = await loadDetailMsg({
            MsgGroupID,
            IntUserID: UserProfile.Value[0].IntUserID,
            Index: 1,
            Today: 1
        });
        console.log("msgDetail", msgDetail);
        if (msgDetail.Error === null) {
            this.setState({
                ArrMess: msgDetail.ObjectResult
            });
        }
    };
    onReceiveTextInputClick = text => {
        // console.log("-------onReceiveTextInputClick--------");
        const {navigation, UserProfile} = this.props;
        const MsgGroupID = navigation.getParam("MsgGroupID");
        const ProfileMember = navigation.getParam("ProfileMember");
        // console.log("ProfileMember", ProfileMember);
        if (UserProfile.length <= 0) {
            return null;
        }
        // console.log('UserProfile', UserProfile)

        if (text === "") return;

        //object need send to server
        let dataSend = {
            MsgGroupID,
            IntUserID: UserProfile.Value[0].IntUserID,
            FullName: UserProfile.Value[0].FullName,
            Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
            RefIntUserID:
                ProfileMember && ProfileMember.IntUserID ? ProfileMember.IntUserID : 0,
            RefName:
                ProfileMember && ProfileMember.FullName ? ProfileMember.FullName : "",
            RefAvatar:
                ProfileMember && ProfileMember.Avatar ? ProfileMember.Avatar : "",
            Content: text,
            IsEnterprise: 0,
            ChatTo: JSON.stringify(ProfileMember)
        };
        // console.log('dataSend', dataSend)
        this.socket.emit("SENDMSG", dataSend);
        // console.log('send ok')
        let newMsg = this.state.ArrMess;
        newMsg.push(dataSend);
        this.setState({ArrMess: newMsg}, () => {
            console.log("ArrMess", this.state.ArrMess);
        });
    };
    _rr = () => {
        console.log("rr")
        return (
            <View>
                <TouchableOpacity>
                    <Image style={{height: DEVICE_WIDTH * 2 /3, width: DEVICE_WIDTH}}

                           source={{
                               uri: this.state.linkImg
                           }}

                           resizeMode="cover"
                    />
                </TouchableOpacity>

            </View>
        )
    }
    // _renderAdvertise = () => {
    //     console.log("this.state.ArrAdvertise", this.state.ArrAdvertise)
    //     for(let i = 0; i< this.state.ArrAdvertise.length; i++){
    //         // console.log("this.state.ArrAdvertise[i].File", this.state.ArrAdvertise[i].File)
    //         setTimeout(() => {
    //                 this.setState({
    //                     linkImg: this.state.ArrAdvertise[i].File
    //                 }, () =>  console.log("linkImg", this.state.linkImg))
    //             },10000
    //         )
    //
    //     }
    //
    // }

    render() {
        // const {navigation} = this.props
        const {UserProfile} = this.props;
        if (UserProfile.length <= 0) {
            return null;
        }
        const {navigation} = this.props;
        const Title = navigation.getParam("title");

        return (
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={64}
            >
                <CustomizeHeader
                    label={Title}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('WebAdvertise')}>
                        <Image style={{height: DEVICE_WIDTH * 2 / 3, width: DEVICE_WIDTH}}

                               source={{
                                   uri: "http://sohanews.sohacdn.com/thumb_w/660/2017/tha1494565313-3484-1504932748314-190-0-562-600-crop-1504932752573.jpg"
                               }}

                               resizeMode="cover"
                        />
                    </TouchableOpacity>

                </View>
                <FlatList
                    data={this.state.ArrMess}
                    style={{marginBottom: 30}}
                    renderItem={item => {
                        return (
                            <ChatItem
                                dataItem={item}
                                myIntUserID={UserProfile.Value[0].IntUserID}
                                // navigation={navigation}
                            />
                        );
                    }}
                    onEndReachedThreshold={100}
                    showsVerticalScrollIndicator={false}
                    ref={ref => (this.flatList = ref)}
                    onContentSizeChange={() => {
                        // console.log("on size change");
                        this.flatList.scrollToEnd({animated: true});
                    }}
                    onLayout={() => {
                        // console.log("got to onlayout");
                        this.flatList.scrollToEnd({animated: true});
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                />
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
        loadDetailMsg: bindActionCreators(loadDetailMsg, dispatch)
    };
};

Chat = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
export default compose(injectShowAlert)(Chat);
const DEVICE_WIDTH = Dimensions.get('window').width;
