import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet, AsyncStorage,
    Alert,
    Dimensions

} from 'react-native'

import moment from 'moment';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import PhotoGrid from "./PhotoGrid";

class StatusItems extends Component {

    constructor(props) {
        super(props)


        this.state = {
            images : [
                'https://drscdn.500px.org/photo/216465193/m%3D2048_k%3D1_a%3D1/dda61fd7cea5013f8ebe7661b7abea3a',
                'https://drscdn.500px.org/photo/215467843/m%3D2048_k%3D1_a%3D1/344703e86f31e1fffb2d63effa2cee33',
                'https://drscdn.500px.org/photo/216340727/m%3D2048_k%3D1_a%3D1/20d583e15467fb39d06d48131767edc2',
                'https://drscdn.500px.org/photo/215498077/m%3D2048_k%3D1_a%3D1/f79e906eb96938807f6f9d758fc652fd',
                'https://drscdn.500px.org/photo/216559713/m%3D2048_k%3D1_a%3D1/393ef5251fa94964fe62cad52a416b7e',
                'https://drscdn.500px.org/photo/214943889/m%3D2048_k%3D1_a%3D1/90bd2e3619dfcaae53fed683561aae1b',
                'https://drscdn.500px.org/photo/216158509/m%3D2048_k%3D1_a%3D1/cf70d51aab6ca4c4a3c1ecc225c69990',
                'https://drscdn.500px.org/photo/216111469/m%3D2048_k%3D1_a%3D1/d2d83296c838258095dbf2bffda70602',
                'https://drscdn.500px.org/photo/216051623/m%3D2048_k%3D1_a%3D1/5a3732bb413f240ad71b8279b038a3ff',
                'https://drscdn.500px.org/photo/216047335/m%3D2048_k%3D1_a%3D1/4237ac4606474f0ec7ccc05ca311772e',
                'https://drscdn.500px.org/photo/216000289/m%3D2048_k%3D1_a%3D1/5ac2a21092f9281feef3ab8484d2b19c'
            ]


        }

    }








    render() {
        const { item } = this.props.dataItem;


        return (
            <View>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>


                        <Image style={styles.image_circle}
                               source={{
                                   uri:"https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg"
                               }}

                               resizeMode="cover"
                        >
                        </Image>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.FullName}</Text>

                            <Text>{item.Time}</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <Text style={{ color: '#212121' }}>{item.Content}</Text>
                    </View>
                    <PhotoGrid source={this.state.images} />
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            {/* <Icon1 name="like" size={25} color="#424242" /> */}
                            <Text style={{ color: '#424242' }} > Thích</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 10 }}>
                            {/*<Icon1 name="comment" size={25} color="#424242" />*/}
                            <Text> bình luận</Text>
                        </View>

                    </View>
                    <View style={{ height: 1, backgroundColor: '#cccccc', marginTop: 5 }} />
                    <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                            <Icon1 name="like" size={25} color= "#424242" />
                            <TouchableOpacity
                                // onPress={() => this.state.liked ? this.unlikePost(item.id) : this.likePost(item.id)}
                            >
                                <Text>Thích</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 20 }}>
                            <Icon1 name="comment" size={25} color="#424242" />

                            <Text style={{ color: '#424242' }}>Bình luận</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5, marginRight: 15, alignItems: 'center' }}>
                        <Image style={styles.image_circle}
                               source={{
                                   uri:"https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg"
                               }}

                               resizeMode="cover"
                        >
                        </Image>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('BinhLuan', { itemCmt: item.comments, idRoom: item.id, onReloadBack: this.props.onReloadBack })}

                            style={{
                                marginLeft: 10, flex: 1,
                                backgroundColor: '#F5F5F5', borderRadius: 25,
                                borderWidth: 1,
                                borderColor: '#757575',
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}>
                            <View>
                                <Text>Viết bình luận ...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 5, backgroundColor: '#cccccc', marginTop: 10 }} />
            </View>
        )
    }
}

export default StatusItems
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },
    imagePost: {
        width: DEVICE_WIDTH,
        height: 250,
        marginTop: 10
    }
})