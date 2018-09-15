import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

export default class HashTagModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ArrHashTag: [
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
        {
          hashtag: '#FoodMessage',
        },
      ],
    };
  }

  render() {
    const { changeModalVisible, onChangeModalVisible } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={changeModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            // alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{ flex: 2 }}
            onPress={() => onChangeModalVisible(false)}
          />
          <View
            style={{ backgroundColor: 'white', flex: 1, alignItems: 'center' }}
          >
            <FlatList
              data={this.state.ArrHashTag}
              extraData={this.state}
              numColumns={3}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: '#A7FFEB',
                        backgroundColor: '#A7FFEB',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 30,
                        width: DEVICE_WIDTH / 3 - 10,
                        marginLeft: 5,
                        marginTop: 10,
                      }}
                    >
                      <Text>{item.hashtag}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
