import React, { Component } from 'react';
import { FlatList } from 'react-native';
import TinNhanItem from '../TinNhanItem';
import _ from 'lodash';
import PropTypes from 'prop-types';

class ListMessage extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(nextProps.dataChannel, this.props.dataChannel)) return false;
    return true;
  }
  render() {
    const { navigation } = this.props;
    return (
      <FlatList
        data={this.props.dataChannel}
        renderItem={(item) => {
          return <TinNhanItem dataItem={item} navigation={navigation} />;
        }}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
export default ListMessage;
ListMessage.propTypes = {
  dataChannel: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};
