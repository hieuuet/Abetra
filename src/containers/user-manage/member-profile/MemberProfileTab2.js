import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  FlatList
} from "react-native";
import { isEqual } from "lodash";
import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import HashTagEdit from "../../../components/hashtag/HashTagEdit";
import PropTypes from "prop-types";
import StatusItems from "../../../components/StatusItems";
import { searchPost2 } from "../../../actions";
import { TYPE_POST, TYPE_POST_PIN } from "../../../constant/KeyConstant";
import { MyCoolScrollViewComponent } from "../../../components/CommonView";

class MemberProfileTab2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userPost: []
    };
    this.Page_size = 10;
    this.Page_index = 1;

    //get tag has been selected when register and bind with select of all tab
    this.loadData(this.props.dataUser);
    this.loadUserPost();
  }

  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.dataUser, this.props.dataUser)) {
      console.log("load data when user has data");
      this.loadData(nextProps.dataUser);
      this.Page_index = 1;
      if (this.state.userPost.length > 0) {
        this.setState({ userPost: [] });
      }
      this.loadUserPost(nextProps.dataUser);
    }
    return !(
      isEqual(nextProps.dataUser, this.props.dataUser) &&
      isEqual(nextProps.TEXT_PROFILE, this.props.TEXT_PROFILE) &&
      isEqual(nextState, this.state)
    );
  }

  loadUserPost = async dataUser => {
    if (!dataUser || !dataUser.ProfileID) return;
    this.props.onLoading(true);
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

  //load data first time
  loadData = dataUser => {
    let tagSelected = dataUser.HashTag;

    if (tagSelected) {
      tagSelected = JSON.parse(tagSelected);

      if (!Array.isArray(tagSelected)) tagSelected = [];
    } else {
      tagSelected = [];
    }
    this.allTags = this.props.allHashTag
      .map(tag => ({ ...tag, hashtag: tag.Name }))
      .filter(tag => tagSelected.includes(tag.CatID));
  };

  onEndReached = () => {
    // call loadmore api
    // console.log("scroll to end");

    this.Page_index++;
    this.loadUserPost(this.props.dataUser);
  };
  render() {
    console.log("render tab2 member");

    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <MyCoolScrollViewComponent onEndReached={this.onEndReached}>
          <View style={styles.container}>
            <Text style={styles.text_title}>
              {this.props.TEXT_PROFILE &&
                this.props.TEXT_PROFILE.TypeBusiness &&
                this.props.TEXT_PROFILE.TypeBusiness.toUpperCase()}
            </Text>
            <HashTagEdit
              data={this.allTags}
              editable={false}
              selectable={false}
              numColumns={2}
              ref="hashTag"
            />
            <Text style={styles.text_title}>
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
  }
}
MemberProfileTab2.propTypes = {
  dataUser: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  allHashTag: PropTypes.array.isRequired,
  _getRank: PropTypes.func.isRequired
};
export default MemberProfileTab2;
const styles = StyleSheet.create({
  text_title: {
    marginTop: 5,
    marginBottom: 5,
    color: COLOR.COLOR_BLACK
  },
  container: {
    flex: 1,
    margin: 10
  },

  text_link: {
    color: COLOR.COLOR_SKY
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
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
  }
});
