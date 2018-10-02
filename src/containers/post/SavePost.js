import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from "react-native";


import StatusItems from "../../components/StatusItems";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {loadSavePost} from "../../actions/loadSavePostActions";
import {COLOR} from "../../constant/Color";

class SavePost extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: "Bài viết đã lưu",
            headerStyle: {backgroundColor: COLOR.BACKGROUND_HEADER},
            headerTitleStyle: {color: COLOR.TITLE_HEADER},
            headerTintColor: 'white',

        }
    }
  constructor(props) {
    super(props);
    this.state = {
      ArrPost: [],
    };
  }

  componentDidMount() {
    this._loadSavePost()
  }

  _loadSavePost = async () => {
    const {loadSavePost,UserProfile } = this.props
      let savePost = await loadSavePost ({
          IntUserID: UserProfile.Value[0].IntUserID
      })
      console.log('savePost', savePost)
      if(savePost.Error == null){
      this.setState({
          ArrPost: savePost.ObjectResult
      })
      }

  }

  render() {
    console.log("render home");
    const { navigation } = this.props;
    return (
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          // refreshing={this.state.refresh}
          // onRefresh={() => {
          //     this.GetPost()
          // }}
          data={this.state.ArrPost}
          renderItem={(item) => {
            return (
              <StatusItems
                dataItem={item}
                navigation={navigation}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    LoginData: state.login,
    UserProfile: state.loadUserProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

      loadSavePost: bindActionCreators(loadSavePost, dispatch),
  };
};

SavePost = connect(
  mapStateToProps,
  mapDispatchToProps
)(SavePost);
export default SavePost;
