import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
} from 'react-native';

export default class TinNhanItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props.dataItem;

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Chat', {
            MsgGroupID: item.MsgGroupID,
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
            source={{
              uri:
                'https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg',
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
              marginTop: 10,
              marginBottom: 10,
              justifyContent: 'center',
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{ fontWeight: '600' }}
                numberOfLines={1}
                ellipsizeMode={'tail'}
              >
                {item.FullNameOrGroupName}
              </Text>
              <Text>{item.Time}</Text>
            </View>
            <Text style={{}} numberOfLines={1} ellipsizeMode={'tail'}>
              {item.Content}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginLeft: DEVICE_WIDTH / 8,
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
    height: DEVICE_WIDTH / 8,
    width: DEVICE_WIDTH / 8,
    borderRadius: DEVICE_WIDTH / 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
});
