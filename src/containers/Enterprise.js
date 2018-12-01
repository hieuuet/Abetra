import React, { Component } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllEnterprise2 } from "../actions";
import { ViewLoading } from "../components/CommonView";
import style_common from "../style-common/index";
import EnterpriseItem from "../components/EnterpriseItem";
import { MyCoolScrollViewComponent } from "../components/CommonView";
import ModalBox from "../components/ModalBox";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconMessage from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { createMsgGroup } from "../actions";
import { COLOR } from "../constant/Color";
import { USER_ID } from "../constant/KeyConstant";
import { TEXT_INTERPRISE } from "../language";
import { isEqual } from "lodash";
import AppContext from "../AppContext";
class Enterprise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dataEnterprise: []
    };
    this.PageSize = 10;
    this.PageIndex = 1;
    this.itemModalShow = undefined;
    this.myUserID = AsyncStorage.getItem(USER_ID);
    this.TEXT_INTERPRISE = TEXT_INTERPRISE();
  }

  componentDidMount() {
    this.loadData();
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.context.isShowAlert) {
        this.context.hideAlert();
        return true;
      }
      if (this.refs.modal && this.refs.modal.state.isOpen) {
        this.refs.modal.close();
        return true;
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_INTERPRISE = TEXT_INTERPRISE();
    }
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  onClickShowModal = item => {
    if (this.refs.modal) this.refs.modal.open();
    this.itemModalShow = item;
  };
  onClickCloseModal = () => {
    // this.itemModalShow = undefined;
  };

  //click chat on modal
  _createMsgGroup = async () => {
    if (!this.itemModalShow) return;
    //close modal
    if (this.refs.modal && this.refs.modal.state.isOpen)
      this.refs.modal.close();
    //loading
    this.setState({ isLoading: true });

    const { createMsgGroup, UserProfile } = this.props;
    let MsgGroupID = await createMsgGroup({
      MsgGroupID: "",
      IntUserID: UserProfile.Value[0].IntUserID,
      FullName: UserProfile.Value[0].FullName,
      GroupMembers: [
        {
          IntUserID: UserProfile.Value[0].IntUserID,
          FullName: UserProfile.Value[0].FullName,
          Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : ""
        },
        {
          IntUserID: this.itemModalShow.IntUserID,
          FullName: this.itemModalShow.NameEnterprise,
          Avatar: this.itemModalShow.Avatar ? this.itemModalShow.Avatar : ""
        }
      ],
      GroupName: this.itemModalShow ? this.itemModalShow.NameEnterprise : "",
      Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
      IsEnterprise: 0
    });
    console.log("MsgGroupID", MsgGroupID);
    console.log("IntUserID", UserProfile.Value[0].IntUserID);
    // console.log('IntUserID', UserProfile.Value[0].IntUserID)
    console.log("IntUserID1", this.itemModalShow.IntUserID);

    this.setState({ isLoading: false });

    if (MsgGroupID.Error == null) {
      this.props.navigation.navigate("Chat", {
        MsgGroupID: MsgGroupID.ObjectResult.MsgGroupID,
        ProfileMember: this.itemModalShow,
        title:
          (this.itemModalShow && this.itemModalShow.NameEnterprise) ||
          "Tin Nhắn"
      });
    } else {
      return this.context.showAlert({
        content: this.TEXT_INTERPRISE.CreateRoomFail
      });
    }
  };

  //load data first time
  loadData = async () => {
    this.setState({ isLoading: true });
    const result = await getAllEnterprise2({
      PageSize: this.PageSize,
      PageIndex: this.PageIndex,
      Keyword: "",
      FromDate: 0,
      ToDate: 0,
      Status: 1,
      Type: 255
    });

    if (!result)
      return this.setState({
        isLoading: false
      });
    if (result.ErrorCode === "00") {
      return this.setState({
        isLoading: false,
        dataEnterprise: [...this.state.dataEnterprise, ...result.Value]
      });
    } else {
      this.setState({
        isLoading: false
      });
      return this.context.showAlert({
        content: result.Message
      });
    }
  };

  loadMore = async () => {
    this.PageIndex++;
    this.setState({ isLoading: true });
    const result = await getAllEnterprise2({
      PageSize: this.PageSize,
      PageIndex: this.PageIndex,
      Keyword: "",
      FromDate: 0,
      ToDate: 0,
      Status: 1,
      Type: 255
    });

    if (result && result.ErrorCode === "00") {
      if (result.Value.length === 0) {
        this.setState({
          isLoading: false
        });
        return this.PageIndex--;
      }
      return this.setState({
        isLoading: false,
        dataEnterprise: [...this.state.dataEnterprise, ...result.Value]
      });
    }
    this.setState({
      isLoading: false
    });
    return this.PageIndex--;
  };

  onEndReached = () => {
    this.loadMore();
  };

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  _renderEmpty = () => {
    return (
      <View style={style_common.content_center}>
        <Text>{this.TEXT_INTERPRISE.Empty}</Text>
      </View>
    );
  };

  _renderBottomModal = () => {
    return (
      <ModalBox
        position={"bottom"}
        ref={"modal"}
        // swipeArea={20}
        swipeToClose={true}
        onClosed={this.onClickCloseModal}
        style={styles.modal}
      >
        <View>
          <TouchableOpacity
            style={styles.item_modal}
            onPress={() => {
              //close modal
              if (this.refs.modal && this.refs.modal.state.isOpen)
                this.refs.modal.close();
            }}
          >
            <Icon name="user-plus" size={25} color={COLOR.COLOR_SKY} />
            <View style={styles.right_item}>
              <Text style={styles.text_item_title}>
                {this.TEXT_INTERPRISE.Folow}
              </Text>
              <Text ellipsizeMode="tail" numberOfLines={1}>
                {this.TEXT_INTERPRISE.EnableNoti}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.item_modal}
            onPress={this._createMsgGroup}
          >
            <IconMessage
              name="message-processing"
              size={25}
              color={COLOR.COLOR_SKY}
            />
            <View style={styles.right_item}>
              <Text style={styles.text_item_title}>
                {this.TEXT_INTERPRISE.Message}
              </Text>
              <Text ellipsizeMode="tail" numberOfLines={1}>
                {this.TEXT_INTERPRISE.MessageDesc}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ModalBox>
    );
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
    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <MyCoolScrollViewComponent onEndReached={this.onEndReached}>
          {this.state.dataEnterprise.length === 0 && !this.state.isLoading ? (
            this._renderEmpty()
          ) : (
            <FlatList
              data={this.state.dataEnterprise}
              renderItem={item => {
                return (
                  <EnterpriseItem
                    dataItem={item}
                    screenProps={this.props.screenProps}
                    onClickShowModal={this.onClickShowModal}
                    userID={this.myUserID}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </MyCoolScrollViewComponent>
        {this._renderBottomModal()}
        {this._renderLoading()}
        {this._bindeGlobalContext()}
      </KeyboardAvoidingView>
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
  return {
    createMsgGroup: bindActionCreators(createMsgGroup, dispatch)
  };
};

Enterprise = connect(
  mapStateToProps,
  mapDispatchToProps
)(Enterprise);
export default Enterprise;
const styles = StyleSheet.create({
  search: { alignSelf: "stretch" },
  modal: { height: 91 },
  item_modal: {
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  right_item: {
    flex: 1,
    marginLeft: 10
  },
  text_item_title: {
    color: COLOR.COLOR_BLACK,
    fontWeight: "bold"
  },
  line: {
    height: 1,
    backgroundColor: "#cccccc"
  }
});
