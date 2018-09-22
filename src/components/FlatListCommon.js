import React, { Component } from "react";
import { FlatList } from "react-native";
import TinNhanItem from "./TinNhanItem";
import{isEqual} from "lodash";
import PropTypes from "prop-types";

export const TYPE = {
  MESSAGE: "message",
  BUSINESS: "business",
  CHANNEL: "channel",
  POST: "post",
  ACCOUNT: "account",
};

export class FlatListCommon extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (isEqual(nextProps.data, this.props.data)) return false;
    return true;
  }

  _renderItem = (item) => {
    const { navigation, type } = this.props;
    if (type === TYPE.MESSAGE)
      return <TinNhanItem dataItem={item} navigation={navigation} />;

    if (type === TYPE.BUSINESS)
      return <TinNhanItem dataItem={item} navigation={navigation} />;

    if (type === TYPE.POST)
      return <TinNhanItem dataItem={item} navigation={navigation} />;

    if (type === TYPE.ACCOUNT)
      return <TinNhanItem dataItem={item} navigation={navigation} />;

    return <TinNhanItem dataItem={item} navigation={navigation} />;
  };
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this._renderItem}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
FlatListCommon.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.oneOf([
    TYPE.MESSAGE,
    TYPE.CHANNEL,
    TYPE.BUSINESS,
    TYPE.POST,
    TYPE.ACCOUNT,
  ]).isRequired,
  navigation: PropTypes.object.isRequired,
};
