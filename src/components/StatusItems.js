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

class StatusItems extends Component {

    constructor(props) {
        super(props)


        this.state = {


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
                    {/*{*/}
                        {/*item.images ?*/}
                            {/*<TouchableOpacity*/}
                            {/*style={styles.imagePost}*/}
                                {/*onPress={() => this.props.navigation.navigate("ShowImage", { url: item.imageUrl.split(",")[0] })}*/}
                            {/*>*/}
                                {/*<Image source={{*/}
                                    {/*uri: item.imageUrl.split(",")[0]*/}
                                {/*}}*/}
                                    {/*style={{flex:1}}*/}
                                    {/*resizeMode="cover">*/}
                                {/*</Image>*/}
                            {/*</TouchableOpacity>*/}
                            {/*: null*/}
                    {/*}*/}
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
                                backgroundColor: '#F5F5F5', borderRadius: 50,
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