import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimention, Dimensions
} from 'react-native';
import {URL_BASE} from "../constant/api";

export default class ChatItem extends Component {
    constructor(props) {
        super(props);
    }




    render() {
    const {item} = this.props.dataItem;
        return (
            <View style={{ flex: 1 }}>
                {
                    item.IntUserID == this.props.myIntUserID ?
                        <View style={{
                            flex: 1,
                            marginLeft: DEVICE_WIDTH / 3,
                            // minHeight: 50,
                            justifyContent: 'flex-end',
                            marginTop: 10,


                        }}>
                            <View style={{
                                borderRadius: 15,
                                marginRight: 10,
                                borderWidth: 1,
                                backgroundColor: '#B7DAB6',
                                borderColor: '#B7DAB6',
                                alignSelf: 'flex-end',
                                padding: 10

                            }}>
                                <Text style={{
                                    alignSelf: 'flex-end',
                                    borderColor: '#FAFAFA',
                                    justifyContent: 'flex-end',


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
                                       uri: URL_BASE + item.Avatar
                                   }}

                                   resizeMode="cover"
                            >
                            </Image>
                            <View>
                                <View style={{ marginRight: DEVICE_WIDTH / 3 }}>
                                    <View style={{
                                        borderRadius: 15,
                                        marginRight: 10,
                                        borderWidth: 1,
                                        backgroundColor: '#D7D7D7',
                                        borderColor: '#D7D7D7',
                                        alignSelf: 'flex-start',
                                        padding: 10

                                    }}>
                                        <Text style={{

                                            justifyContent: 'flex-start',
                                            alignSelf: 'flex-start'

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
            height: DEVICE_WIDTH / 12,
            width: DEVICE_WIDTH / 12,
            borderRadius: DEVICE_WIDTH / 24,
            marginLeft: 10,
            marginRight: 10,

        }
    })
