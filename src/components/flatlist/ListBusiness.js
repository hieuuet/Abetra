import React, { Component } from 'react';
import { FlatList } from 'react-native';
import TinNhanItem from '../TinNhanItem';
import _ from 'lodash';
import PropTypes from 'prop-types';

class ListBusiness extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(nextProps.dataBusiness, this.props.dataBusiness)) return false;
    return true;
  }
  render() {
    const { navigation } = this.props;
    return (
      <FlatList
        data={this.props.dataBusiness}
        renderItem={(item) => {
          return <TinNhanItem dataItem={item} navigation={navigation} />;
        }}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
export default ListBusiness;
ListBusiness.propTypes = {
  dataBusiness: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};
