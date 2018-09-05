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


class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            ArrMess: [
                {
                    FullName: 'Nguyễn Văn Hiệu',
                    Time: '09/05/2018',
                    Mess: 'Đang làm gì đấy?',
                    User: 'me'
                },
                {
                    FullName: 'Nguyễn Văn Hiệu',
                    Time: '09/05/2018',
                    Mess: 'Đéo làm gì?',
                    User: 'notme'
                },
                {
                    FullName: 'Nguyễn Văn Hiệu',
                    Time: '09/05/2018',
                    Mess: 'Đmm?',
                    User: 'me'
                },
                {
                    FullName: 'Nguyễn Văn Hiệu',
                    Time: '09/05/2018',
                    Mess: 'Card?',
                    User: 'notme'
                }
            ]
        }
    }
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
                />
                <TextInputChat
                    style={{marginTop:5}}
                    // onReceiveTextInputClick={this.onReceiveTextInputClick}
                />
            </KeyboardAvoidingView>

        )
    }
}
export default Chat