import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

class BinhLuanItem extends Component {
  render() {
    const { item } = this.props.dataItem;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" , alignItems:"center"}}>
          <Image
            style={styles.image_circle}
            source={{
              uri:
                "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
            }}
            resizeMode="cover"
          />
          <Text style={styles.textName}>{item.FullName}</Text>
        </View>
        <View style={styles.viewCmt}>
          <View style = {{marginRight: 10, flex: 1,
              backgroundColor: '#BDBDBD', borderRadius: 14,
              padding: 10, justifyContent: 'center', flexWrap: 'wrap'}}>
          <Text style={styles.textCmt}>{item.Content}</Text>
          </View>
          <View style={{ flexDirection: "row" , justifyContent:'flex-end'}}>
            <Text style={{  color: "#03A9F4", marginRight:15}}>Trả lời</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default BinhLuanItem;
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  image_circle: {
    height: DEVICE_WIDTH / 12,
    width: DEVICE_WIDTH / 12,
    borderRadius: DEVICE_WIDTH / 24,
    marginLeft: 10,
    marginTop: 10,
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
    marginLeft: DEVICE_WIDTH / 12+15,
  },
});
