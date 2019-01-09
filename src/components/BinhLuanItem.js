import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import moment from "moment";
import {URL_BASE} from "../constant/api";
import {COLOR} from "../constant/Color";

class BinhLuanItem extends Component {
    render() {
        const {item} = this.props.dataItem;
        return (
            <View style={{flex: 1}}>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 5,
                    }}
                >

                    <Image
                        style={styles.image_circle}
                        source={
                            // uri: URL_BASE + item.Avartar
                            item.Avartar ? {uri: URL_BASE + item.Avartar} : require('../../assets/avatar.png')
                        }
                        resizeMode="cover"
                    />
                    <View>


                        <View
                            style={{
                                marginRight: 15,
                                justifyContent: "center",
                                backgroundColor: "#F5F5F3",
                                borderRadius: 15,
                                marginLeft: 5,
                                borderWidth: 1,
                                flex: 1,
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingRight: 10,
                                paddingLeft: 10,
                                borderColor: '#F5F5F3',
                            }}
                        >
                            <Text style={{
                                color: COLOR.COLOR_NAME_STATUS,
                                fontWeight: "bold"
                            }}>
                                {item.FullName}
                            </Text>

                            <Text>{item.Content}</Text>
                        </View>
                    </View>


                </View>
                {/* <Text style={{textAlign: "right", marginRight: 15, color: "#42A5F5"}}>Trả lời</Text> */}
            </View>
        );
    }
}

export default BinhLuanItem;
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 20,
        // marginTop: 10
    },
    textCmt: {
        fontSize: 15,
        marginRight: 20,
        color: "black",
    },
    textName: {
        color: "black",
        fontWeight: "bold",
        fontSize: 13,
        marginLeft: 5,
    },
    viewCmt: {
        marginLeft: DEVICE_WIDTH / 12 + 15,
    },
});
