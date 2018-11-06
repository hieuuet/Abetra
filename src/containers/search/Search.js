import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Keyboard
  // findNodeHandle
} from "react-native";
import style_common from "../../style-common";
import { IMAGE } from "../../constant/assets";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { COLOR } from "../../constant/Color";
import { ViewLoading, TabView2 } from "../../components/CommonView";
import { FlatListCommon, TYPE } from "../../components/FlatListCommon";
import { searchAll } from "../../actions";
// import TextInputReset from "react-native-text-input-reset";
import {TEXT_SEARCH} from '../../language';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      tabIndex: 0,
      arrPost: [],
      arrBussiness: [],
      arrMessage: [],
      arrAccount: []
    };

    this.textSearch = "";
    this.lastTextSearch = "";
    this.PageIndex = 1;
    this.PageSize = 5;
    this.TEXT_SEARCH = TEXT_SEARCH();
  }

  doSearch = async () => {
    Keyboard.dismiss();
    if (this.textSearch.trim() === "") return;

    this.setState({ isLoading: true });
    const dataSearch = await searchAll({
      IntUserID: 1,
      KeyWord: this.textSearch.trim(),
      PageIndex: this.PageIndex,
      PageSize: this.PageSize
    });
    this.lastTextSearch = this.textSearch;
    //reset text input
    // if (Platform.OS === "android")
    //   TextInputReset.resetKeyboardInput(findNodeHandle(this.textInput));
    // this.refs.textInput.clear();

    if (dataSearch && dataSearch.ErrorCode === "00") {
      return this.setState({
        arrPost: dataSearch.Value.Post,
        arrBussiness: dataSearch.Value.Enterprise,
        arrMessage: dataSearch.Value.Message,
        arrAccount: dataSearch.Value.Profile,
        isLoading: false
      });
    }

    return this.setState({
      arrPost: [],
      arrBussiness: [],
      arrMessage: [],
      arrAccount: [],
      isLoading: false
    });
  };

  loadMore = async () => {
    if (this.lastTextSearch.trim() === "") return;
    this.PageIndex++;
    this.setState({ isLoading: true });
    const dataSearch = await searchAll({
      IntUserID: 1,
      KeyWord: this.lastTextSearch.trim(),
      PageIndex: this.PageIndex,
      PageSize: this.PageSize
    });

    if (dataSearch && dataSearch.ErrorCode === "00") {
      //get data load more
      const newPost = (dataSearch.Value && dataSearch.Value.Post) || [];
      const newEnterprise =
        (dataSearch.Value && dataSearch.Value.Enterprise) || [];
      const newMessage = (dataSearch.Value && dataSearch.Value.Message) || [];
      const newAccount = (dataSearch.Value && dataSearch.Value.Profile) || [];
      //check if current tab data is empty
      if (
        (this.state.tabIndex === 0 && newPost.length === 0) ||
        (this.state.tabIndex === 1 && newEnterprise.length === 0) ||
        (this.state.tabIndex === 2 && newMessage.length === 0) ||
        (this.state.tabIndex === 3 && newAccount.length === 0)
      ) {
        this.PageIndex--;
        return this.setState({
          isLoading: false
        });
      }
      //if not empty setstate
      return this.setState({
        arrPost: [...this.state.arrPost, ...newPost],
        arrBussiness: [...this.state.arrBussiness, ...newEnterprise],
        arrMessage: [...this.state.arrMessage, ...newMessage],
        arrAccount: [...this.state.arrAccount, ...newAccount],
        isLoading: false
      });
    }
    return this.setState({
      isLoading: false
    });
  };

  onEndReached = () => {
    console.log("loadmore");
    this.loadMore();
  };
  _renderHeader = () => {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.header_wrapper}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Image
          style={styles.backgound_header}
          source={require("../../../assets/wrappertab/bg_topbar.png")}
          resizeMode="cover"
        />
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={styles.btn_back}
            onPress={() => goBack()}
          >
            <Image
              style={styles.img_back}
              resizeMode="cover"
              source={IMAGE.icon_back}
            />
          </TouchableOpacity>
          <View style={styles.search_border}>
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              returnKeyType="done"
              numberOfLines={1}
              placeholder={this.TEXT_SEARCH.Search}
              placeholderTextColor={COLOR.COLOR_WHITE}
              onChangeText={text => {
                this.textSearch = text;
              }}
              style={styles.text_input}
              onSubmitEditing={event => {
                this.doSearch();
              }}
              ref={input => {
                this.textInput = input;
              }}
            />
            <TouchableOpacity style={styles.btn_search} onPress={this.doSearch}>
              <Icon5
                name="search"
                size={20}
                color={COLOR.COLOR_BACKGROUND}
                style={{ marginLeft: 10, marginRight: 10 }}
              />
              {/* <Image
                source={IMAGE.search_icon}
                style={styles.search_icon}
                resizeMode="cover"
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  _renderTabButton = () => {
    return (
      <View style={styles.tab}>
        <TabView2
          label={this.TEXT_SEARCH.Post}
          onPress={() => {
            this.setState({ tabIndex: 0 });
          }}
          isActive={this.state.tabIndex === 0}
          style={styles.btn_margin_right}
        />
        <TabView2
          label={this.TEXT_SEARCH.Business}
          onPress={() => {
            this.setState({ tabIndex: 1 });
          }}
          isActive={this.state.tabIndex === 1}
          style={styles.btn_margin_lr}
        />
        <TabView2
          label={this.TEXT_SEARCH.Message}
          onPress={() => {
            this.setState({ tabIndex: 2 });
          }}
          isActive={this.state.tabIndex === 2}
          style={styles.btn_margin_lr}
        />
        <TabView2
          label={this.TEXT_SEARCH.Account}
          onPress={() => {
            this.setState({ tabIndex: 3 });
          }}
          isActive={this.state.tabIndex === 3}
          style={styles.btn_margin_left}
        />
      </View>
    );
  };
  _renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.content,
            { zIndex: this.state.tabIndex === 0 ? 1 : 0 }
          ]}
        >
          <FlatListCommon
            data={this.state.arrPost}
            type={TYPE.POST}
            {...this.props}
            onEndReached={this.onEndReached}
          />
        </View>
        <View
          style={[
            styles.content,
            { zIndex: this.state.tabIndex === 1 ? 1 : 0 }
          ]}
        >
          <FlatListCommon
            data={this.state.arrBussiness}
            type={TYPE.BUSINESS}
            {...this.props}
            onEndReached={this.onEndReached}
          />
        </View>
        <View
          style={[
            styles.content,
            { zIndex: this.state.tabIndex === 2 ? 1 : 0 }
          ]}
        >
          <FlatListCommon
            data={this.state.arrMessage}
            type={TYPE.MESSAGE}
            {...this.props}
            onEndReached={this.onEndReached}
          />
        </View>
        <View
          style={[
            styles.content,
            { zIndex: this.state.tabIndex === 3 ? 1 : 0 }
          ]}
        >
          <FlatListCommon
            data={this.state.arrAccount}
            type={TYPE.ACCOUNT}
            {...this.props}
            onEndReached={this.onEndReached}
          />
        </View>
      </View>
    );
  };

  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
  };
  render() {
    return (
      <View style={style_common.container_white}>
        {this._renderHeader()}
        {this._renderTabButton()}
        {this._renderContent()}
        {this._renderLoading()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    minHeight: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLOR.COLOR_GRAY,
    borderRadius: 0
  },
  search_border: {
    backgroundColor: "#2A9490",
    flex: 1,
    height: 35,
    borderRadius: 35 / 2,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  search_icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    alignSelf: "center"
  },
  btn_search: {
    justifyContent: "center",
    alignItems: "center"
  },
  text_input: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    color: COLOR.COLOR_WHITE
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
  },
  btn_margin_lr: {
    marginLeft: 5,
    marginRight: 5,
    flex: 1
  },

  img_back: {
    width: 30,
    height: 30 * (53 / 82)
  },
  header_wrapper: {
    height: 65,
    // backgroundColor: COLOR.COLOR_HEADER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  txt_header: {
    color: COLOR.COLOR_BACKGROUND,
    fontSize: 16,
    flex: 1,
    marginRight: 35 + 10,
    textAlign: "center"
  },
  backgound_header: {
    flex: 1,
    height: 65,
    position: "absolute"
  },

  btn_back: {
    alignSelf: "flex-start",
    padding: 10
  },
  back: {
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10
  }
});
