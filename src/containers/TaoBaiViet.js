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
            <View style={{justifyContent: 'space-between', flex: 1}}>
                <View>
                    <FlatList
                        data={this.state.ArrKieuBaiViet}
                        horizontal={true}
                        // style = {{marginLeft: 0}}
                        renderItem={({item}) => {
                            return (
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center', marginLeft: 20}}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({itemSelected: item.key}, () => {
                                            // console.log('itemselected', this.state.itemSelected)
                                        })
                                    }}>
                                        <View style={{
                                            borderWidth: 1,
                                            height: 30,
                                            width: 100,

                                            justifyContent: "center",
                                            alignItems: 'center',
                                            borderColor: "#B2DFDB",
                                            backgroundColor: this.state.itemSelected === item.key ? '#00796B' : '#B2DFDB'
                                        }}>
                                            <Text>{item.Value}</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}

                    />
                    <View>
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
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 50,
                    minHeight: 30,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>

                        <View style={{
                            marginLeft: 10,
                            borderWidth: 1,
                            height: 25,
                            borderColor: "#E0E0E0",
                            backgroundColor: '#EEEEEE',
                            alignItems: 'center',
                            width: DEVICE_WIDTH / 2 - 20,
                            flexDirection: 'row'
                        }}>
                            <Text style={{marginLeft: 5}}>Thêm vào bài viết</Text>
                            {/*<Icon1 name="close" size={25} color="#757575" style = {{marginLeft: 5}}/>*/}
                        </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Icon name="md-images" size={25} color="#900"
                                  style={{flex: 1}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{
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
                            }}>
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
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },
})