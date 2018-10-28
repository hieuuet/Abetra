import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  FlatList
} from "react-native";
import { isEqual } from "lodash";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import { ButtonBorder } from "../../../components/CommonView";
import HashTagEdit from "../../../components/hashtag/HashTagEdit";
import PropTypes from "prop-types";
import { TYPE_ACCOUNT, STATUS_ACCOUNT } from "../../../constant/KeyConstant";
import { MyCoolScrollViewComponent } from "../../../components/CommonView";
import { searchPost2 } from "../../../actions";
import { TYPE_POST, TYPE_POST_PIN } from "../../../constant/KeyConstant";
import StatusItems from "../../../components/StatusItems";

class MyProfileTab2 extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalShow: false, userPost: [] };

    this.tagSelected = this.props.tagSelected.filter(
      tag => tag.select === true
    );
    this.Page_size = 10;
    this.Page_index = 1;

    this.loadUserPost(this.props.dataUser);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.tagSelected, nextProps.tagSelected)) {
      this.tagSelected = nextProps.tagSelected.filter(
        tag => tag.select === true
      );
      //call api update tag here
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.dataUser, this.props.dataUser)) {
      this.Page_index = 1;
      if (this.state.userPost.length > 0) {
        this.setState({ userPost: [] });
      }
      this.loadUserPost(nextProps.dataUser);
    }
    return !(
      isEqual(nextProps.tagSelected, this.props.tagSelected) &&
      isEqual(nextProps.TEXT_PROFILE, this.props.TEXT_PROFILE) &&
      isEqual(nextState, this.state)
    );
  }

  loadUserPost = async dataUser => {
    console.log("dataUser", dataUser);
    if (!dataUser || !dataUser.ProfileID) return;
    this.props.onLoading(true);
    console.log("searchPost2", dataUser);
    const result = await searchPost2({
      Page_size: this.Page_size,
      Page_index: this.Page_index,
      Keyword: "",
      IsAdvs: 255,
      From_date: "",
      To_date: "",
      Profile_id: dataUser.ProfileID,
      User_id: dataUser.UserID,
      User_type: TYPE_POST.ALL,
      Pin: TYPE_POST_PIN.ALL,
      Option: 0,
      IntUserID: dataUser.IntUserID
    });

    const resultPost = result && result.ErrorCode === "00" ? result.Value : [];
    if (result && result.Value.length === 0) {
      this.Page_index--;
    }

    this.setState({ userPost: [...this.state.userPost, ...resultPost] });
    this.props.onLoading(false);
  };
  onEndReached = () => {
    // call loadmore api
    console.log("scroll to end");

    this.Page_index++;
    this.loadUserPost(this.props.dataUser);
  };

  _renderRegisterMember = () => {
    return (
      <View style={styles.container}>
        <Text style={style_common.text_color_base}>
          {this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.NotRegisterMember}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Benifet");
          }}
        >
          <Text style={styles.text_link}>
            {this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.ReferBenifet}
          </Text>
        </TouchableOpacity>
        <ButtonBorder
          my_style={[style_common.input_border, styles.btn_register]}
          text_style={styles.text_btn}
          label={this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.RegisterNow}
          onPress={() => this.props.navigation.navigate("RegisterMember")}
        />
      </View>
    );
  };

  _renderMember = () => {
    console.log("render tab2");
    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <MyCoolScrollViewComponent onEndReached={this.onEndReached}>
          <View style={styles.container}>
            {/* <View style={style_common.line} /> */}
            <View style={styles.container_title}>
              <Text style={styles.text_title}>
                {this.props.TEXT_PROFILE &&
                  this.props.TEXT_PROFILE.TypeBusiness &&
                  this.props.TEXT_PROFILE.TypeBusiness.toUpperCase()}
              </Text>
              <ButtonBorder
                my_style={[style_common.input_border, styles.btn_save]}
                text_style={styles.text_btn}
                label={this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.Edit}
                onPress={this.props.onClickShowModal}
              />
            </View>
            <HashTagEdit
              data={this.tagSelected}
              selectable={false}
              numColumns={2}
              ref="hashTag"
            />
            <Text style={styles.marginText}>
              {this.props.TEXT_PROFILE &&
                this.props.TEXT_PROFILE.CreateNewPost &&
                this.props.TEXT_PROFILE.CreateNewPost.toUpperCase()}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("CreatePost")}
              style={styles.btn_create_post}
            >
              <Text style={style_common.text_color_base}>
                {this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.InputPost}
              </Text>
            </TouchableOpacity>
            <Text style={style_common.text_color_base}>
              {this.props.TEXT_PROFILE &&
                this.props.TEXT_PROFILE.PostCreated &&
                this.props.TEXT_PROFILE.PostCreated.toUpperCase()}
            </Text>

            {/* Tạo flatlist bài viết ở đây */}
            <FlatList
              // refreshing={this.state.refresh}
              // onRefresh={() => {
              //     this.GetPost()
              // }}
              data={this.state.userPost}
              renderItem={item => {
                return (
                  <StatusItems
                    dataItem={item}
                    userID={this.userID}
                    navigation={this.props.navigation}
                  />
                );
              }}
              extraData={this.state}
              // onEndReached={this.onEndReached}
              // onEndReachedThreshold={0.5}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </MyCoolScrollViewComponent>
      </KeyboardAvoidingView>
    );
  };

  _waitingActive = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text_center}>
          {this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.WaitingAccept}
        </Text>
      </View>
    );
  };

  render() {
    if (this.props.dataUser.Type === TYPE_ACCOUNT.TEMP)
      return this._renderRegisterMember();
    if (
      this.props.dataUser.Status &
      (this.props.dataUser.Status === STATUS_ACCOUNT.INACTIVE)
    )
      return this._waitingActive();
    return this._renderMember();
  }
}

export default MyProfileTab2;
MyProfileTab2.propTypes = {
  dataUser: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  onClickShowModal: PropTypes.func.isRequired,
  tagSelected: PropTypes.array.isRequired,
  onLoading: PropTypes.func.isRequired,
  allRank: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  btn_register: {
    alignContent: "center",
    alignSelf: "center",
    padding: 5,
    minHeight: 40,
    backgroundColor: COLOR.COLOR_SKY,
    borderColor: COLOR.COLOR_SKY
  },

  text_link: {
    color: COLOR.COLOR_SKY
  },
  text_btn: {
    color: COLOR.COLOR_BLACK
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  btn_create_post: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    borderColor: COLOR.COLOR_GRAY,
    backgroundColor: COLOR.COLOR_WHITE,
    borderRadius: 25,
    minHeight: 40
  },
  text_h1: {
    alignSelf: "stretch",
    textAlign: "center",
    color: COLOR.COLOR_ORANGE,
    fontWeight: "bold"
  },
  scroll_view: { flexGrow: 1 },
  wrap_header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  container_title: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10
  },
  btn_save: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    minWidth: 80,
    minHeight: 40,
    backgroundColor: COLOR.COLOR_GRAY,
    borderColor: COLOR.COLOR_GRAY
  },
  text_title: {
    flex: 1,
    marginRight: 5,
    color: COLOR.COLOR_BLACK
  },
  text_center: {
    alignSelf: "center",
    color: COLOR.COLOR_BLACK
  },
  marginText: {
    marginTop: 5,
    marginBottom: 5,
    color: COLOR.COLOR_BLACK
  }
});
