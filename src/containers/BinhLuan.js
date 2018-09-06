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
    BackHandler,
    Alert
} from 'react-native';

import BinhLuanItem from "../components/BinhLuanItem";
import TextInputChat from "../components/TextInputChat";


class BinhLuan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ArrCmt: [
                {
                    FullName: "Nguyễn Văn Hiệu",
                    Content: "Không có gì quý hơn độc lập tự do",
                    Avt: "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
                    Time: '05/09/2018',
                    Img: "https://kenh14cdn.com/thumb_w/600/3qsvZHBxXH8xPdzaJmLFPEqgKxHka/Image/2015/03/10919541_326321127564559_1570986608_n-02055.jpg"
                }

            ]

        }


    }



    // sendCmt = (postId) => {
    //
    //     this.props.SocketRef.socket.emit("new_comment", postId);
    //
    // }


    // onReceiveTextInputClick = (text) => {
    //     // if (text === "")
    //     //     return;
    //     // const { params } = this.props.navigation.state
    //     // let SendCMT = text;
    //     // const { callApiCreateCmt } = this.props;
    //     // callApiCreateCmt(params.idRoom, SendCMT).then(dataRes => {
    //     //     console.log('cmt', dataRes)
    //     //     this.sendCmt(params.idRoom)
    //     // })
    // }



    render() {
        return (

            <KeyboardAvoidingView style={{ flex: 1 }}
                                  behavior={Platform.OS === 'ios' ? "padding" : null}
                                  keyboardVerticalOffset={64}
            >
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
                <TextInputChat
                    style={{marginTop:5}}
                    // onReceiveTextInputClick={this.onReceiveTextInputClick}
                />
            </KeyboardAvoidingView>
        );
    }
}

export default BinhLuan