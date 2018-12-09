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
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import injectShowAlert from "../../constant/injectShowAlert";

import { loadSavePost } from "../../actions/loadSavePostActions";
import style_common from "../../style-common";
import { CustomizeHeader, ViewLoading } from "../../components/CommonView";

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
      const isAlertShow = this.props.closeAlert();
      if (isAlertShow) {
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
    else {
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
        <Text>Không có dữ liệu</Text>
      </View>
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
export default compose(injectShowAlert)(SavePost);
