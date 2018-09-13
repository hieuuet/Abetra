import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadMsgGroup } from "../actions/loadMsgGroupActions";
import { COLOR } from "../constant/Color";
import style_common from "../style-common";
import { FlatListCommon, TYPE } from "../components/FlatListCommon";
import { ViewLoading, SearchView, TabView } from "../components/CommonView";
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ArrTinNhan: [],
      ArrChannel: [
        {
          MsgGroupID: "C925550C-FF2A-4C4D-BBA0-785AF34BDF05",
          FullNameOrGroupName: "Nguyen Viet Thinh",
          Time: "",
          Content: "hi",
        },
      ],
      isLoading: false,
      tabIndex: 0,
    };
    this._loadMsgGroup();
  }
  componentDidMount() {}

  _loadMsgGroup = async () => {
    console.log("load msg gr");
    const { loadMsgGroup, UserProfile } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    let ArrMsg = await loadMsgGroup({
      IntUserID: UserProfile.Value[0].IntUserID,
    });
    if (ArrMsg.Error === null) {
      this.setState({
        ArrTinNhan: ArrMsg.ObjectResult,
      });
    }
  };

  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
  };

  render() {
    console.log("render message");
    return (
      <View style={style_common.container_white}>
        <SearchView
          onPress={() => {
            this.props.navigation.navigate("Search");
          }}
        />
        <View style={styles.tab}>
          <TabView
            label="Tin nhắn"
            onPress={() => {
              this.setState({ tabIndex: 0 });
            }}
            isActive={this.state.tabIndex === 0}
            style={styles.btn_margin_right}
          />
          <TabView
            label="Kênh thảo luận"
            onPress={() => {
              this.setState({ tabIndex: 1 });
            }}
            isActive={this.state.tabIndex === 1}
            style={styles.btn_margin_left}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.content,
              { zIndex: this.state.tabIndex === 0 ? 1 : 0 },
            ]}
          >
            <FlatListCommon
              data={this.state.ArrTinNhan}
              type={TYPE.MESSAGE}
              navigation={this.props.navigation}
            />
          </View>
          <View
            style={[
              styles.content,
              { zIndex: this.state.tabIndex === 1 ? 1 : 0 },
            ]}
          >
            <FlatListCommon
              data={this.state.ArrChannel}
              type={TYPE.CHANNEL}
              navigation={this.props.navigation}
            />
          </View>
        </View>
        {this._renderLoading()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UserProfile: state.loadUserProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMsgGroup: bindActionCreators(loadMsgGroup, dispatch),
  };
};

Message = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
export default Message;
const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    backgroundColor: COLOR.COLOR_WHITE,
  },

  text_tab: {
    color: COLOR.COLOR_BLACK,
    fontWeight: "bold",
  },
  content: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLOR.COLOR_WHITE,
  },
  btn_margin_left: {
    marginLeft: 5,
  },
  btn_margin_right: {
    marginRight: 5,
  },
});
