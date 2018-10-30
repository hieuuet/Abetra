import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    findNodeHandle,
    Platform,
    NativeModules,
} from 'react-native';
var ImagePicker = NativeModules.ImageCropPicker;

import Icon from 'react-native-vector-icons/Ionicons'
import TextInputReset from 'react-native-text-input-reset';
import {URL_BASE} from "../constant/api";
import {COLOR} from "../constant/Color";

export default class TextInputChat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textSubmit:'',
        }
        this.arrBase64 = [];
        this.arrPath = [];

    }
    pickSingle(cropit, circular=false) {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.5,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
                images: null
            });
        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }



    onClickSend = ()=>{

        // console.log("data",this.state.textSubmit)
        this.props.onReceiveTextInputClick(this.state.textSubmit);
        // this.refs.textInput.clear();
        if(Platform.OS === 'android')
            TextInputReset.resetKeyboardInput(findNodeHandle(this.textInput))
        this.setState({textSubmit:""});

    }


    render() {

        // console.log("render---",this.state.textSubmit)
        return (
            <View style={{
                height:30,
                // flexWrap: 'wrap',
                flexDirection: 'row',
                // alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5,
                // borderTopColor:'gray',
                // borderTopWidth:1,marginLeft: 15


                // backgroundColor:'gray'
            }}>
                {/*<TouchableOpacity onPress={() => this.pickSingle(false)}>*/}
                    {/*<Image*/}
                        {/*source={require("../../assets/image_icon.png")}*/}
                        {/*style={{*/}

                                {/*height: 20,*/}
                                {/*width: 40*/}
                        {/*}}*/}
                        {/*resizeMode="cover"*/}
                    {/*/>*/}
                {/*</TouchableOpacity>*/}

                <View style = {{ flex: 1,  minHeight: 10, flexDirection: 'row', alignItems: 'center',
                    borderColor:'#A8A8A7',
                    borderWidth:1,marginLeft: 15,
                    borderRadius: 15,
                    marginRight: 10}}>
                <TextInput
                    style={{
                        flex:1,
                        paddingLeft: 10,
                        minHeight: 30,
                    }}
                    placeholder={"Nhập vào đây..."}
                    placeholderTextColor={"#A8A8A7"}
                    underlineColorAndroid="transparent"
                    autoCapitalize={'none'}
                    value={this.state.textSubmit}
                    returnKeyType={"done"}
                    onChangeText={
                        (text) =>
                        {
                            this.setState({textSubmit:text});

                            this.input_msg = text
                        }
                    }
                    ref={input => {
                        this.textInput = input
                    }}


                />
                    <TouchableOpacity>
                    <Image
                        style={styles.btn}
                        source={
                             require("../../assets/btn_emo.png")

                            }
                        resizeMode="cover"
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.pickSingle(false)}>
                    <Image
                        style={styles.btn}
                        source={
                            require("../../assets/btn_img.png")

                            }
                        resizeMode="cover"
                    />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={this.onClickSend}
                    style={{justifyContent: 'center', alignItems: 'center',width: 60,height:30, backgroundColor:'#7EC08A', marginRight: 10, borderRadius: 30/2}}
                >

                    <Text style = {{color: COLOR.COLOR_BACKGROUND}}>GỬI</Text>

                </TouchableOpacity>
            </View>
        )
    }
};
const styles = StyleSheet.create({
    btn: {
        height: 22,
        marginRight: 10,
        width: 22
    }

})
