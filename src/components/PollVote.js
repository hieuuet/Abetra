import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import CheckBox from "./CheckBox ";
import { API } from "../constant/api";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { TEXT_POLL_VOTE } from "../language";
import { compose } from "redux";
import injectShowAlert from "../constant/injectShowAlert";
import Icon from "react-native-vector-icons/dist/Feather";

class PollVote extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.countCheck = this.props.dataItem.item.TotalVote;
    // console.log('TotalVote', this.props.dataItem)
    this.state = {
      countCheck: this.countCheck,
      a: 1,
        isChecked:false
    };
    this.TEXT_POLL_VOTE = TEXT_POLL_VOTE();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_POLL_VOTE = TEXT_POLL_VOTE();
    }
  }
  youChecked = (PostID, PollID) => {
    console.log('youChecked')
    const { UserProfile } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    fetch(API.POLL_VOTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        PostID,
        PollID,
        IntUser: UserProfile.Value[0].IntUserID,
        IsLike: 1,
        isLog: 0
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("data", data);
        if (data.ErrorCode === "00") {
          let currentCheck = this.state.countCheck;
          currentCheck++;

          this.setState({ countCheck: currentCheck });
        } else {
          return this.props.props.showAlert({
            content: this.TEXT_POLL_VOTE.ErrorOccurred
          });
        }
      })
      .catch(e => {
        console.log("exception", e);
        return this.props.props.showAlert({
          content: this.TEXT_POLL_VOTE.ErrorLike
        });
      });
  };
  youUnChecked = (PostID, PollID) => {
    console.log('youUnChecked')
    const { UserProfile } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    fetch(API.POLL_VOTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        PostID,
        PollID,
        IntUser: UserProfile.Value[0].IntUserID,
        IsLike: 0,
        isLog: 0
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("data", data);
        if (data.ErrorCode === "00") {
          let currentCheck = this.state.countCheck;
          currentCheck--;

          this.setState({ countCheck: currentCheck });
        } else {
          return this.props.props.showAlert({
            content: this.TEXT_POLL_VOTE.ErrorOccurred
          });
        }
      })
      .catch(e => {
        console.log("exception", e);
        return this.props.props.showAlert({
          content: this.TEXT_POLL_VOTE.ErrorLike
        });
      });
  };
  // onClick() {
  //     console.log('aaaaaaaaaaaa')
  // }
  onClick = (PostID, PollID) => {
    this.setState(
      {
        isChecked: !this.state.isChecked
      },
      () =>
        this.state.isChecked
          ? this.youChecked(PostID, PollID)
          : this.youUnChecked(PostID, PollID)
    );
  };
  render() {
    const { item } = this.props.dataItem;
    // console.log('itempollvote', item)
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: 5,
          marginHorizontal: 15,
          flexDirection: "row"
        }}
      >
        {/*<CheckBox*/}
          {/*onClick={() => this.onClick(item.PostID, item.OptionID)}*/}
          {/*isChecked={this.state.isChecked}*/}
        {/*/>*/}
        <TouchableOpacity onPress = {() => {
            this.setState({
                isCheck: !this.state.isCheck
            }, () => {
                this.state.isCheck
                    ? this.youChecked(item.PostID, item.OptionID)
                    : this.youUnChecked(item.PostID, item.OptionID)
            })
        }}>
          <View style={{
              height: 17,
              width: 17,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: "#E0E0E0",
              borderWidth: 1,
              marginRight: 10,
              backgroundColor: this.state.isCheck ? '#0b84e5' : null
          }}>
              {
                  this.state.isCheck ? <Icon name="check" size={12} color="white"/> : null
              }


          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 30,
            flexDirection: "row",
            borderColor: "#E0E0E0",
            borderWidth: 1,
            width: "80%",
            backgroundColor: "#EEEEEE",
            alignItems: "center",
            borderRadius: 15
          }}
        >
          <Text style={{ marginLeft: 10 }} numberOfLines={1}>
            {item.OptionContent}
          </Text>
        </View>

        <Text style={{ marginLeft: 15 }}>{this.state.countCheck}</Text>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    UserProfile: state.loadUserProfile,
    currentLanguage: state.currentLanguage
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

PollVote = connect(
  mapStateToProps,
  mapDispatchToProps
)(PollVote);
export default compose(injectShowAlert)(PollVote);
