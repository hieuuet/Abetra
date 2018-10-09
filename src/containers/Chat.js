import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import ChatItem from "../components/ChatItem";
import TextInputChat from "../components/TextInputChat";
import {SOCKET, URL_SOCKET} from "../constant/api";
import SocketIOClient from "socket.io-client";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadDetailMsg} from "../actions/detailMsgActions";
import {COLOR} from "../constant/Color";


class Chat extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: `${navigation.getParam('title')}`,
            headerStyle: {backgroundColor: COLOR.BACKGROUND_HEADER},
            headerTitleStyle: {color: COLOR.TITLE_HEADER},
            headerTintColor: 'white',

        }
    }
    constructor(props) {
        super(props)
        this.state = {
            ArrMess: []
        }
        const {navigation} = this.props;
        const MsgGroupID = navigation.getParam('MsgGroupID');
        // console.log('MsgGroupID', MsgGroupID)
        const {UserProfile} = this.props
        if (UserProfile.length <= 0) {
            return null

        }

        // console.log("UserProfile", UserProfile)
        this.socket = SocketIOClient(URL_SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        console.log('socket', this.socket)
        this.socket.emit('LOGINMSG', {
            IntUserID: UserProfile.Value[0].IntUserID,
            MsgGroupID: MsgGroupID
        })
        this.socket.on('RECEIVERMSG', (dataRes) => {
            console.log('receiveMSG', dataRes)
            // dataMess = dataReceive.Content;
            //set newMsg = messga receive
            let newMsg = this.state.ArrMess;
            //add message to array
            newMsg.push(dataRes);
            this.setState({ArrMess: newMsg});
        })

    }

    componentDidMount() {
        this._loadMsgDetail()

    }
    componentWillUnmount() {
        const {navigation} = this.props;
        const MsgGroupID = navigation.getParam('MsgGroupID');
        // console.log('MsgGroupID', MsgGroupID)
        const {UserProfile} = this.props
        if (UserProfile.length <= 0) {
            return null

        }
        this.socket = SocketIOClient(URL_SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });


        this.socket.emit("LOGOUTMSG", {
            IntUserID: UserProfile.Value[0].IntUserID,
            MsgGroupID: MsgGroupID

        })
    }

    _loadMsgDetail = async () => {
        const {navigation, UserProfile, loadDetailMsg} = this.props;
        const MsgGroupID = navigation.getParam('MsgGroupID');
        console.log("MsgGroupID", MsgGroupID)
        if (UserProfile.length <= 0) {
            return null
        }
        let msgDetail = await loadDetailMsg({
            MsgGroupID: MsgGroupID,
            IntUserID: UserProfile.Value[0].IntUserID,
            Index: 1,
            Today: 1
        })
        console.log("msgDetail", msgDetail)
        if (msgDetail.Error === null) {
            this.setState({
                ArrMess: msgDetail.ObjectResult
            })
        }
    }
    onReceiveTextInputClick = (text) => {
        console.log('-------onReceiveTextInputClick--------')
        const {navigation, UserProfile} = this.props;
        const MsgGroupID = navigation.getParam('MsgGroupID');
        const ProfileMember = navigation.getParam('ProfileMember')
        console.log("ProfileMember", ProfileMember)
        if (UserProfile.length <= 0) {
            return null;
        }
        // console.log('UserProfile', UserProfile)

        if (text === "")
            return;

        //object need send to server
        let dataSend = {
            MsgGroupID: MsgGroupID,
            IntUserID: UserProfile.Value[0].IntUserID,
            FullName: UserProfile.Value[0].FullName,
            Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
            RefIntUserID: ProfileMember && ProfileMember.IntUserID ?  ProfileMember.IntUserID : 0,
            RefName: ProfileMember && ProfileMember.FullName ? ProfileMember.FullName : "",
            RefAvatar: ProfileMember && ProfileMember.Avatar ? ProfileMember.Avatar : "",
            Content: text,
            IsEnterprise: 0
        }
        // console.log('dataSend', dataSend)
        this.socket.emit("SENDMSG", dataSend);
        // console.log('send ok')
        let newMsg = this.state.ArrMess;
        newMsg.push(dataSend);
        this.setState({ArrMess: newMsg}, () => {
            console.log('ArrMess', this.state.ArrMess)
        });
    };

    render() {
        // const {navigation} = this.props
        const {UserProfile} = this.props;
        if (UserProfile.length <= 0) {
            return null
        }
        return (

            <KeyboardAvoidingView style={{flex: 1}}

                                  behavior={Platform.OS === 'ios' ? "padding" : null}
                                  keyboardVerticalOffset={64}
            >
                <FlatList

                    data={this.state.ArrMess}
                    renderItem={(item) => {
                        return (
                            <ChatItem
                                dataItem={item}
                                myIntUserID={UserProfile.Value[0].IntUserID}
                                // navigation={navigation}
                            />
                        )
                    }}
                    onEndReachedThreshold={100}
                    showsVerticalScrollIndicator={false}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => {
                        console.log("on size change");
                        this.flatList.scrollToEnd({ animated: true })
                    }}
                    onLayout={() => {
                        console.log("got to onlayout");
                        this.flatList.scrollToEnd({ animated: true })
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                />
                <TextInputChat
                    style={{marginTop: 5}}
                    onReceiveTextInputClick={this.onReceiveTextInputClick}
                />
            </KeyboardAvoidingView>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        UserProfile: state.loadUserProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadDetailMsg: bindActionCreators(loadDetailMsg, dispatch)
    }
}


Chat = connect(mapStateToProps, mapDispatchToProps)(Chat)
export default Chat
