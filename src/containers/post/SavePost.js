import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Platform,
  BackHandler,
  KeyboardAvoidingView
} from "react-native";

import StatusItems from "../../components/StatusItems";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { loadSavePost } from "../../actions/loadSavePostActions";
import { COLOR } from "../../constant/Color";
import style_common from "../../style-common";
import { CustomizeHeader, ViewLoading } from "../../components/CommonView";
import AppContext from "../../AppContext";

class SavePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ArrPost: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this._loadSavePost();
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.context.isShowAlert) {
        this.context.hideAlert();
        return true;
      }
      this.props.navigation.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  _loadSavePost = async () => {
    this.setState({
      isLoading: true
    });
    const { loadSavePost, UserProfile } = this.props;
    let savePost = await loadSavePost({
      IntUserID: UserProfile.Value[0].IntUserID
    });
    console.log("savePost", savePost);
    if (savePost.Error == null) {
      this.setState({
        isLoading: false,
        ArrPost: savePost.ObjectResult
      });
    }
  };
  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  _renderEmpty = () => {
    return (
      <View style={style_common.content_center}>
        <Text>Không có dữ liệu</Text>
      </View>
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
    console.log("render home");
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <CustomizeHeader
          label={"Bài viết đã lưu của bạn"}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{ flex: 1 }}>
          {this.state.ArrPost.length === 0 && !this.state.isLoading ? (
            this._renderEmpty()
          ) : (
            <FlatList
              // refreshing={this.state.refresh}
              // onRefresh={() => {
              //     this.GetPost()
              // }}
              data={this.state.ArrPost}
              renderItem={item => {
                return (
                  <StatusItems
                    isTab={false}
                    // screenProps={this.props.screenProps}
                    dataItem={item}
                    navigation={navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </ScrollView>
        {this._renderLoading()}
        {this._bindeGlobalContext()}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    LoginData: state.login,
    UserProfile: state.loadUserProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSavePost: bindActionCreators(loadSavePost, dispatch)
  };
};

SavePost = connect(
  mapStateToProps,
  mapDispatchToProps
)(SavePost);
export default SavePost;
