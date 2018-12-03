import React, { Component } from "react";
import { View, StyleSheet, BackHandler, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadMsgGroup } from "../actions/loadMsgGroupActions";
import { COLOR } from "../constant/Color";
import style_common from "../style-common";
import { FlatListCommon, TYPE } from "../components/FlatListCommon";
import {
  ViewLoading,
  TabView2,
  CustomizeHeader
} from "../components/CommonView";
import AppContext from "../AppContext";
import { TEXT_MESSAGE, TEXT_COMMON } from "../language";
import { isEqual } from "lodash";
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ArrUser: [],
      ArrSysTem: [],
      isLoading: false,
      tabIndex: 0
    };
    this.TEXT_MESSAGE = TEXT_MESSAGE();
    this.TEXT_COMMON = TEXT_COMMON();
  }

  componentDidMount() {
    this._loadMsgGroup();
    // this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
    //   if (this.context.isShowAlert) {
    //     this.context.hideAlert();
    //     return true;
    //   }
    //   this.props.navigation.goBack();
    //   return true;
    // });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_MESSAGE = TEXT_MESSAGE();
      this.TEXT_COMMON = TEXT_COMMON();
    }
  }

  componentWillUnmount() {
    // this.backHandler.remove();
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
    // console.log("ArrMsg", ArrMsg);
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

  _bindeGlobalContext = () => {
    return (
      <AppContext.Consumer>
        {context => {
          this.context = context;
        }}
      </AppContext.Consumer>
    );
  };

  render() {
    // console.log("render message");
    if (this.props.isGuest)
      return (
        <View style={styles.content_guest}>
          <Text>{this.TEXT_COMMON.FeatureRequestLogin}</Text>
        </View>
      );
    return (
      <View style={style_common.container_white}>
        <View style={styles.tab}>
          <TabView2
            label={this.TEXT_MESSAGE.MessageTitle}
            onPress={() => {
              this.setState({ tabIndex: 0 });
            }}
            isActive={this.state.tabIndex === 0}
            style={styles.btn_margin_right}
          />
          <TabView2
            label={this.TEXT_MESSAGE.Chanel}
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
              navigation={this.props.screenProps}
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
              navigation={this.props.screenProps}
            />
          </View>
        </View>
        {this._renderLoading()}
        {this._bindeGlobalContext()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserProfile: state.loadUserProfile,
    isGuest: state.loginGuest.isGuest
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
  content_guest: {
    marginTop: 20,
    alignItems: "center"
  },
  tab: {
    flexDirection: "row",
    alignSelf: "stretch"
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
    marginLeft: 5,
    flex: 1
  },
  btn_margin_right: {
    marginRight: 5,
    flex: 1
  }
});
