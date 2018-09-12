import React, { Component } from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';

class Member extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(nextProps, this.props)) return false;
    return true;
  }
  render() {
    console.log('su kien');
    return (
      <View>
        <Text>Dang ky hoi vien</Text>
      </View>
    );
  }
}
export default Member;
