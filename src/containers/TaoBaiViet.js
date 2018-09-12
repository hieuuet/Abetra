import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Button, StyleSheet,
    Keyboard,
    FlatList,
    Dimensions

} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';


class TaoBaiViet extends Component {


    constructor(props) {
        super(props)
        this.state = {
            isCheckToolBar: 1, //interface toolbar
            isCheckContent: 1, // interface content
            type: 0,
            ArrKieuBaiViet: [
                {
                    key: 1,
                    Value: "Bài viết"
                },
                {
                    key: 2,
                    Value: "Thăm dò ý kiến"
                },
                {
                    key: 3,
                    Value: "Sự kiện"
                }
            ]
            ,
            ArrOptions: [
                {
                    option: "Lựa chọn 1",
                    id: 1,
                },
                {
                    option: "Lựa chọn 2",
                    id: 2
                }
            ],

            ArrButton: [
                {
                    key: 1,
                    value: 1,
                    option: "Nhà riêng"
                },
                {
                    key: 2,
                    value: 2,
                    option: "Chung"
                },
            ],
            itemSelected: 1, //button radio
        }


    }

    //show toolbar
    handleTextInput = () => {
        this.setState({
            isCheckToolBar: 4
        })

    }

    //show tham do y kien
    ThamDoYKien = () => {
        this.setState({
            isCheckContent: 2,
            isCheckToolBar: 2,
            type: 1,
            ArrOptions: [
                {
                    OptionContent: "Lựa chọn 1",
                    id: 1,
                },
                {
                    OptionContent: "Lựa chọn 2",
                    id: 2
                }
            ],
        })
    }
    //them 1 lua chon
    Push = (index) => {
        // console.log('push')
        // console.log('ArrOptions', this.state.ArrOptions)
        var ArrMoi = this.state.ArrOptions
        ArrMoi.push({"OptionContent": `Lựa chọn ${index + 2}`})
        this.setState({
            ArrOptions: ArrMoi
        })
    }


    render() {

        return (
            <View style={styles.view_container}>
                <View>
                    <View style={{marginHorizontal: 10, marginTop: 10}}>
                        <TextInput placeholder='Nhập nội dung?'
                                   underlineColorAndroid="transparent"
                                   onChangeText={(Status) => this.setState({Status})}
                                   placeholderTextSize="20"
                                   returnKeyType={"search"}
                            // onFocus={() => {
                            //     this.handleTextInput()
                            // }}
                        />
                    </View>

                </View>
                <View style={styles.view_bottom}>
                    <Text style = {{marginLeft: 10, color:'black'}}>Thêm vào bài viết</Text>
                    <View style={styles.view_border}>
                        <TouchableOpacity>

                            <View style={styles.view_vote}>
                                <Text style={{marginLeft: 5, color: "black"}}>#Thămdòýkiến</Text>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.view_event}>
                                <Text style={{marginLeft: 5, color: 'black'}}>#Sựkiện</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image source={require("../../assets/emoji.png")} style={styles.button_image}
                                   resizeMode="cover"/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require("../../assets/image_icon.png")} style={styles.button_image}
                                   resizeMode="cover"/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require("../../assets/hashtag.png")} style={styles.button_image}
                                   resizeMode="cover"/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.view_post}>
                                <Text>Đăng</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                </View>
            </View>
        );
    }
}

export default TaoBaiViet
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    view_container: {
        justifyContent: 'space-between', flex: 1
    },
    button_image: {
        height: 20,
        width: 20

    },
    view_event: {
        borderWidth: 1,
        height: 25,
        borderColor: "#E0E0E0",
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        flexDirection: 'row'

    },
    view_vote: {
        borderWidth: 1,
        marginLeft: 10,
        height: 25,
        borderColor: "#E0E0E0",
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        flexDirection: 'row'

    },
    view_post: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#B3E5FC',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#81D4FA',
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 65
    },
    view_bottom: {
        flexDirection: 'column'

    },
    view_border: {
        flexDirection: 'row',
        marginTop: 10,
        minHeight: 30,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})