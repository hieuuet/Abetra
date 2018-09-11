import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimention, Dimensions
} from 'react-native';

export default class ChatItem extends Component {
    constructor(props) {
        super(props);
    }




    render() {
    const {item} = this.props.dataItem;
        return (
            <View style={{ flex: 1 }}>
                {
                    item.IntUserID === "734" ?
                        <View style={{
                            flex: 1,
                            marginLeft: DEVICE_WIDTH / 3,
                            // minHeight: 50,
                            justifyContent: 'flex-end',
                            marginTop: 10,


                        }}>
                            <View style={{
                                borderRadius: 10,
                                marginRight: 10,
                                borderWidth: 1,
                                backgroundColor: '#64B5F6',
                                borderColor: '#64B5F6',
                                alignSelf: 'flex-end',

                            }}>
                                <Text style={{
                                    alignSelf: 'flex-end',
                                    borderColor: '#FAFAFA',
                                    justifyContent: 'flex-end',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10,


                                }}>{item.Content}</Text>
                            </View>
                            {/*<Text style={{*/}
                                {/*justifyContent: 'center',*/}
                                {/*alignSelf: 'flex-end',*/}
                                {/*marginRight: 10,*/}
                                {/*fontSize:10,*/}
                                {/*marginTop:2*/}
                            {/*}}>{createdAt}</Text>*/}

                        </View> :  <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>

                            <Image style={styles.image_avt}

                                   source={{
                                       uri:"https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg"
                                   }}

                                   resizeMode="cover"
                            >
                            </Image>
                            <View>
                                <View style={{ marginRight: DEVICE_WIDTH / 3 }}>
                                    <View style={{
                                        borderRadius: 10,
                                        marginRight: 10,
                                        borderWidth: 1,
                                        backgroundColor: '#FAFAFA',
                                        borderColor: '#FAFAFA',
                                        alignSelf: 'flex-start',

                                    }}>
                                        <Text style={{

                                            justifyContent: 'flex-start',
                                            alignSelf: 'flex-start',
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            paddingTop: 10,
                                            paddingBottom: 10,

                                        }}>{item.Content}</Text>
                                    </View>

                                </View>
                                {/*<Text style={{flex: 1,marginLeft:2, justifyContent: 'flex-start',fontSize:10,marginTop:2}}>{createdAt}</Text>*/}
                            </View>

                        </View>

                }
            </View>
        )

    }


}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
        image_avt: {
            height: DEVICE_WIDTH / 8,
            width: DEVICE_WIDTH / 8,
            borderRadius: DEVICE_WIDTH / 16,
            marginLeft: 10,
            marginRight: 10,

        }
    })
