import React, { Component } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
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
      ArrUser: [],
      ArrSysTem: [],
      isLoading: false,
      tabIndex: 0
    };
  }

  componentDidMount() {
    this._loadMsgGroup();
  }

  _loadMsgGroup = async () => {
    this.setState({
      isLoading: true
    });
    console.log("load msg gr");
    const { loadMsgGroup, UserProfile } = this.props;
    if (UserProfile.length <= 0) {
      return this.setState({ isLoading: false });
    }
    let ArrMsg = await loadMsgGroup({
      IntUserID: UserProfile.Value[0].IntUserID
    });
    if (!ArrSysTem) return this.setState({ isLoading: false });
    console.log("ArrMsg", ArrMsg);
    let ArrSysTem = ArrMsg.ObjectResult.filter(ArrSys => {
      return ArrSys.IsSystem === 1;
    });

    let ArrUser = ArrMsg.ObjectResult.filter(ArrSys => {
      return ArrSys.IsSystem === 0;
    });
    // console.log('ArrSysTem', ArrSysTem)
    // console.log('ArrUser', ArrUser)
    if (ArrMsg.Error === null) {
      this.setState({
        ArrSysTem,
        ArrUser,
        isLoading: false
      });
    }
  };

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };

  render() {
    // console.log("render message");
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
              { zIndex: this.state.tabIndex === 0 ? 1 : 0 }
            ]}
          >
            <FlatListCommon
              data={this.state.ArrUser}
              type={TYPE.MESSAGE}
              navigation={this.props.navigation}
            />
          </View>
          <View
            style={[
              styles.content,
              { zIndex: this.state.tabIndex === 1 ? 1 : 0 }
            ]}
          >
            <FlatListCommon
              data={this.state.ArrSysTem}
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

const mapStateToProps = state => {
  return {
    UserProfile: state.loadUserProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMsgGroup: bindActionCreators(loadMsgGroup, dispatch)
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
    backgroundColor: COLOR.COLOR_WHITE
  },

  text_tab: {
    color: COLOR.COLOR_BLACK,
    fontWeight: "bold"
  },
  content: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLOR.COLOR_WHITE
  },
  btn_margin_left: {
    marginLeft: 5
  },
  btn_margin_right: {
    marginRight: 5
  }
});
