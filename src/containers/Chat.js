import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import ChatItem from "../components/ChatItem";
import TextInputChat from "../components/TextInputChat";
import {SOCKET} from "../constant/api";
import SocketIOClient from "socket.io-client";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadDetailMsg} from "../actions/detailMsgActions";


class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            ArrMess: []
        }
        const { navigation } = this.props;
        const MsgGroupID = navigation.getParam('MsgGroupID');
        // console.log('MsgGroupID', MsgGroupID)
        const { UserProfile } = this.props
        if(UserProfile.length <=0 ){
            return null

        }

        // console.log("UserProfile", UserProfile)
        this.socket = SocketIOClient("http://123.16.53.210:9006/", {
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
    _loadMsgDetail = async () => {
        const { navigation, UserProfile, loadDetailMsg } = this.props;
        const MsgGroupID = navigation.getParam('MsgGroupID');
        if(UserProfile.length <=0 ){
            return null
        }
        let msgDetail = await loadDetailMsg({
            MsgGroupID : MsgGroupID,
            IntUserID: UserProfile.Value[0].IntUserID,
            Index: 1,
            Today: 1
        })
        console.log("msgDetail", msgDetail)
        if(msgDetail.Error === null){
            this.setState({
                ArrMess: msgDetail.ObjectResult
            })
        }
    }
    onReceiveTextInputClick = (text) => {
        console.log('-------onReceiveTextInputClick--------')
        // const {params} = this.props.navigation.state
        // console.log('params', params)
        const {UserProfile} = this.props;
        if (UserProfile.length <= 0) {
            return null;
        }
        console.log('UserProfile', UserProfile)

        if (text === "")
            return;

        //object need send to server
        // console.log('userid gui di', InfoUser[0].UserID)
        let dataSend = {
            MsgGroupID: "C925550C-FF2A-4C4D-BBA0-785AF34BDF05",
            IntUserID: UserProfile.Value[0].IntUserID,
            FullName: UserProfile.Value[0].FullName,
            Avatar: "",
            RefIntUserID: 736,
            RefName: "Nguyen Van Hieu",
            RefAvatar: "" ,
            Content: text,
        }
        console.log('dataSend', dataSend)
        this.socket.emit("SENDMSG", dataSend);
        // console.log('send ok')
        let newMsg = this.state.ArrMess;
        newMsg.push(dataSend);
        this.setState({ArrMess: newMsg}, () => {
            console.log('ArrMess', this.state.ArrMess)
        });
    };

    render () {
        const {navigation} = this.props
        return (

            <KeyboardAvoidingView style={{ flex: 1 }}

                                  behavior={Platform.OS === 'ios' ? "padding" : null}
                                  keyboardVerticalOffset={64}
            >
                <FlatList

                    data={this.state.ArrMess}
                    renderItem={(item) => {
                        return (
                            <ChatItem
                                dataItem={item}
                                // navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                />
                <TextInputChat
                    style={{marginTop:5}}
                    onReceiveTextInputClick ={this.onReceiveTextInputClick}
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
