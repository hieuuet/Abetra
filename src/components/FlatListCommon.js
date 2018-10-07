import React, { Component } from "react";
import { FlatList, AsyncStorage } from "react-native";
import TinNhanItem from "./TinNhanItem";
import AccountItem from "../containers/search/AccountItem";
import BusinessItem from "../containers/search/BusinessItem";
import StatusItems from "./StatusItems";
import { USER_ID } from "../constant/KeyConstant";

import { isEqual } from "lodash";
import PropTypes from "prop-types";

export const TYPE = {
  MESSAGE: "message",
  BUSINESS: "business",
  CHANNEL: "channel",
  POST: "post",
  ACCOUNT: "account"
};

export class FlatListCommon extends Component {
  constructor(props) {
    super(props);
    this.userID = AsyncStorage.getItem(USER_ID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (isEqual(nextProps.data, this.props.data)) return false;
    return true;
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  _renderItem = item => {
    const { navigation, type } = this.props;
    if (type === TYPE.MESSAGE)
      return <TinNhanItem dataItem={item} navigation={navigation} />;

    if (type === TYPE.BUSINESS)
      return <BusinessItem dataItem={item} navigation={navigation} />;

    if (type === TYPE.POST)
      return (
        <StatusItems
          dataItem={item}
          navigation={navigation}
          userID={this.userID}
        />
      );

    if (type === TYPE.ACCOUNT)
      return <AccountItem dataItem={item} navigation={navigation} />;

    return <TinNhanItem dataItem={item} navigation={navigation} />;
  };
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this._renderItem}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => {
          console.log("onEndtab", this.props.type);
          if(!this.canAction) return;
          this.props.onEndReached();
        }}
        onEndReachedThreshold={0.6}
        onScrollBeginDrag={() => {
          console.log("onScrollBeginDrag");
          this.canAction = true;
        }}
        onScrollEndDrag={() => {
          console.log("onScrollEndDrag");
          this.canAction = false;
        }}
        onMomentumScrollBegin={() => {
          console.log("onMomentumScrollBegin");
          this.canAction = true;
        }}
        onMomentumScrollEnd={() => {
          console.log("onMomentumScrollEnd");
          this.canAction = false;
        }}

        // onScroll={({ nativeEvent }) => {
        //   if (this.isCloseToBottom(nativeEvent)) {
        //     this.props.onEndReached();
        //   }
        // }}
        // scrollEventThrottle={400}
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
    TYPE.ACCOUNT
  ]).isRequired,
  navigation: PropTypes.object.isRequired
};
