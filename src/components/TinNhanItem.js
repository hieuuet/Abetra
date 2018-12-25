import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
} from 'react-native';
import {URL_BASE} from "../constant/api";
import moment from "moment";

export default class TinNhanItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {item} = this.props.dataItem;
        // console.log('itemchat', item)
        let ProfileMember = item.ChatTo ? item.ChatTo : null
        ProfileMember = JSON.parse(ProfileMember)
        // console.log("ProfileMember", ProfileMember)

        return (
            <TouchableOpacity
                onPress={() =>
                    this.props.navigation.navigate('Chat', {
                        itemMessage: item,
                        MsgGroupID: item.MsgGroupID,
                        ProfileMember: ProfileMember,
                        title: item.FullNameOrGroupName
                    })
                }
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        style={styles.image_avt}
                        source={
                            item.Avatar == "" ? require("../../assets/avtdefault.png") : {
                                uri: URL_BASE + item.Avatar
                            }}
                        resizeMode="cover"
                    />
                    {/*{item.messUnread&&item.messUnread>0 ?*/}
                    {/*<View style={{top:10,left:Dimention.DEVICE_WIDTH / 6-10, width:20,height:20,borderRadius:10,backgroundColor:'red',position:'absolute',zIndex:1,justifyContent:'center',alignItems:'center'}}>*/}
                    {/*<Text style = {{textAlign:'center',color:'white',fontSize:10}}>{item.messUnread>20?"20+":item.messUnread}</Text>*/}
                    {/*</View>:null}*/}
                    <View
                        style={{
                            flex: 4,
                            flexDirection: 'column',
                            marginLeft: 10,
                            marginTop: 5,
                            marginBottom: 5,
                            justifyContent: 'center',
                        }}
                    >
                        <View
                            style={{flexDirection: 'row', justifyContent: 'space-between'}}
                        >
                            <Text
                                style={{fontWeight: '600', color: "#141432"}}
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                            >
                                {item.FullNameOrGroupName}
                            </Text>
                            {/*<Text>{item.CreatedDate}</Text>*/}
                            <Text style={{
                                fontSize: 12,
                                marginRight: 10
                            }}>{moment(item.CreatedDate).format("DD/MM/YYYY")}</Text>
                        </View>
                        <Text style={{fontSize: 12, marginRight: 15}} numberOfLines={1} ellipsizeMode={'tail'}>
                            {item.IsSystem === 1 ? item.Description : item.Content}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        height: 1,
                        marginLeft: DEVICE_WIDTH / 7 + 20,
                        backgroundColor: '#E0E0E0',
                    }}
                />
            </TouchableOpacity>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    image_avt: {
        height: DEVICE_WIDTH / 7,
        width: DEVICE_WIDTH / 7,
        borderRadius: DEVICE_WIDTH / 14,
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 1,
    },

});
