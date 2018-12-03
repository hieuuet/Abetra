import React, { Component } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/Feather";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import { savePost, unsavePost } from "../../actions/loadSavePostActions";
import { TEXT_MENU_POST } from "../../language";

class MenuPost extends Component {
  static propTypes = {
    context: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.isSave = this.props.item.LikeSave;
    this.state = {
      isSave: this.isSave
    };

    this.TEXT_MENU_POST = TEXT_MENU_POST();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_MENU_POST = TEXT_MENU_POST();
    }
  }

  _savePost = async PostID => {
    const { UserProfile, savePost } = this.props;
    let save = await savePost({
      IntUserID: UserProfile.Value[0].IntUserID,
      PostID
    });
    if (save.Error == null) {
      this.setState({
        isSave: !this.state.isSave
      });
      return this.props.context.showAlert({
        content: this.TEXT_MENU_POST.SavePostSuccess
      });
    } else {
      return this.props.context.showAlert({
        content: this.TEXT_MENU_POST.SavePostFail
      });
    }
  };

  _unsavePost = async PostID => {
    const { UserProfile, unsavePost } = this.props;
    let save = await unsavePost({
      IntUserID: UserProfile.Value[0].IntUserID,
      PostID
    });
    if (save.Error == null) {
      this.setState({
        isSave: !this.state.isSave
      });
      return this.props.context.showAlert({
        content: this.TEXT_MENU_POST.UnsavePostSuccess
      });
    } else {
      return this.props.context.showAlert({
        content: this.TEXT_MENU_POST.UnsavePostFail
      });
    }
  };

  render() {
    // console.log('this.item', this.props.item)
    const { changeModalVisible, onChangeModalVisible } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={changeModalVisible}
        onRequestClose={() => {}}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            // alignItems: 'center',
            justifyContent: "flex-end"
          }}
        >
          <TouchableOpacity
            style={{ flex: 5 }}
            onPress={() => onChangeModalVisible(false)}
          />
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              justifyContent: "center"
            }}
          >
            {this.state.isSave ? (
              <TouchableOpacity
                onPress={() => {
                  this._unsavePost(this.props.item.PostID);
                  onChangeModalVisible(false);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 10
                  }}
                >
                  <Icon1 name="bookmark" size={25} color="#E0E0E0" />

                  <Text style={{ marginLeft: 10 }}>
                    {this.TEXT_MENU_POST.SavePost}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this._savePost(this.props.item.PostID);
                  onChangeModalVisible(false);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 10
                  }}
                >
                  <Icon1 name="bookmark" size={25} color="#E0E0E0" />

                  <Text style={{ marginLeft: 10 }}>
                    {this.TEXT_MENU_POST.UnsavePost}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => onChangeModalVisible(false)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                  marginTop: 10
                }}
              >
                <Icon name="report-problem" size={25} color="#E0E0E0" />
                <Text style={{ marginLeft: 10 }}>
                  {this.TEXT_MENU_POST.Report}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    savePost: bindActionCreators(savePost, dispatch),
    unsavePost: bindActionCreators(unsavePost, dispatch)
  };
};

MenuPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuPost);
export default MenuPost;
