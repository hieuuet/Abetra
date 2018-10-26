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
import {URL_BASE} from "../constant/api";

class BinhLuanItem extends Component {
  render() {
    const { item } = this.props.dataItem;
    return (
      <View style={{ flex: 1 }}>
          {/*<View style = {{flexDirection: 'row', alignItems:"center"}}>*/}
              {/*<Image*/}
                  {/*style={styles.image_circle}*/}
                  {/*source={{*/}
                      {/*uri:*/}
                          {/*"https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",*/}
                  {/*}}*/}
                  {/*resizeMode="cover"*/}
              {/*>*/}
              {/*</Image>*/}

              {/*<Text style = {styles.textName}>{item.FullName}</Text>*/}
          {/*</View>*/}

          {/*<View style = {styles.viewCmt}>*/}
              {/*<Text style = {styles.textCmt}>{item.Content}</Text>*/}
              {/*<View style = {{flexDirection:'row'}}>*/}
                  {/*<Text>*/}
                      {/*{moment(item.DatePost).startOf('hour').fromNow()}*/}
                      {/*</Text>*/}
              {/*</View>*/}

          {/*</View>*/}
          {/*<View style = {{height:1, backgroundColor:'#E0E0E0', marginLeft: DEVICE_WIDTH / 10 + 10, marginTop:10}}>*/}
          {/*</View>*/}
          <View
              style={{
                  flexDirection: "row",
                  marginTop: 5,
                  alignItems: "center",
              }}
          >

              <Image
                  style={styles.image_circle}
                  source={
                      // uri: URL_BASE + item.Avartar
                      item.Avartar ?{ uri: URL_BASE +  item.Avartar} : require('../../assets/avatar.png')
                  }
                  resizeMode="cover"
              />
              <View
                  style={{
                      marginRight: 15,
                      justifyContent: "center",
                      backgroundColor: "#C7C7C7",
                      height: 30,
                      borderRadius: 15,
                      marginLeft: 5,
                      borderWidth: 1,
                      flex: 1,
                      paddingRight: 10,
                      paddingLeft: 10,
                      borderColor: '#C7C7C7',
                  }}
              >


                  <Text >{item.Content}</Text>
              </View>


          </View>
          <Text style={{textAlign: "right", marginRight: 15, color: "#42A5F5"}}>Trả lời</Text>
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
    marginLeft: DEVICE_WIDTH / 12+15,
  },
});
