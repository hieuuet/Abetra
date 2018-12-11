import React, { Component } from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  Text
} from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import style_common from "../../style-common/index";
import EventItem from "../../components/EventItem";
import { CustomizeHeader, ViewLoading } from "../../components/CommonView";

import { getEventJoin } from "../../actions/getEventActions";
import { TEXT_EVENT, TEXT_COMMON } from "../../language";

class EventJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      ArrEvent: []
    };
    this.TEXT_EVENT = TEXT_EVENT();
    this.TEXT_COMMON = TEXT_COMMON();
  }

  async componentDidMount() {
    this._getEvent();
  }
//anh thái đang xem lại
  _getEvent = async () => {
    this.setState({
      isLoading: true
    });
    const { getEventJoin, UserProfile } = this.props;
    // console.log('UserProfile.Value[0].IntUserID', UserProfile.Value[0].IntUserID)

    let Event = await getEventJoin({
      PageSize: 100,
      PageIndex: 1,
      Keyword: "",
      FromDate: "",
      ToDate: "",
      Status: 1,
      EnterpriseID: UserProfile.Value[0].IntUserID,
      EventID: 0
    });
    console.log("event", Event);

    if (Event && Event.ErrorCode === "00") {
      this.setState(
        {
          isLoading: false,
          ArrEvent: Event.Value
        },
        () => console.log("ArrEvent", this.state.ArrEvent)
      );
    } else {
      this.setState({
        isLoading: false
      });
    }
  };

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  _renderEmpty = () => {
    return (
      <View style={style_common.content_center}>
        <Text>{this.TEXT_COMMON.Empty}</Text>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <CustomizeHeader
          label={this.TEXT_EVENT.JoinEvent}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{ flex: 1 }}>
          {this.state.ArrEvent.length === 0 && !this.state.isLoading ? (
            this._renderEmpty()
          ) : (
            <FlatList
              // refreshing={this.state.refresh}
              // onRefresh={() => {
              //     this.GetPost()
              // }}
              data={this.state.ArrEvent}
              renderItem={item => {
                return (
                  <EventItem
                    dataItem={item}
                    userID={this.userID}
                    // onReloadBack ={this.onReloadBack}
                    navigation={navigation}
                    fromEventJoin={false}
                  />
                );
              }}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </ScrollView>
        {this._renderLoading()}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserProfile: state.loadUserProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEventJoin: bindActionCreators(getEventJoin, dispatch)
  };
};

EventJoin = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventJoin);
export default EventJoin;
