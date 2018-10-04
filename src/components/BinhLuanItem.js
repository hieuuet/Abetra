import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import moment from "moment";

class BinhLuanItem extends Component {
  render() {
    const { item } = this.props.dataItem;
    return (
      <View style={{ flex: 1 }}>
          <View style = {{flexDirection: 'row', alignItems:"center"}}>
              <Image
                  style={styles.image_circle}
                  source={{
                      uri:
                          "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
                  }}
                  resizeMode="cover"
              >
              </Image>

              <Text style = {styles.textName}>{item.FullName}</Text>
          </View>

          <View style = {styles.viewCmt}>
              <Text style = {styles.textCmt}>{item.Content}</Text>
              <View style = {{flexDirection:'row'}}>
                  <Text>
                      {moment(item.DatePost).startOf('hour').fromNow()}
                      </Text>
              </View>

          </View>
          <View style = {{height:1, backgroundColor:'#E0E0E0', marginLeft: DEVICE_WIDTH / 10 + 10, marginTop:10}}>
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
