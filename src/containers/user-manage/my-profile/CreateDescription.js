import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Button,
  StyleSheet,
  Keyboard,
  FlatList,
  Dimensions,
  NativeModules,
  ScrollView
} from "react-native";
import { COLOR } from "../../../constant/Color";
import { bindActionCreators, compose } from "redux";
import injectShowAlert from "../../../constant/injectShowAlert";
import { connect } from "react-redux";
import { loadUserProfile } from "../../../actions";
import { URL_BASE } from "../../../constant/api";

import { CustomizeHeader } from "../../../components/CommonView";
import { isEqual } from "lodash";
import { TEXT_CREATE_POST } from "../../../language";
import { typeAccount } from "../../../constant/UtilsFunction";

let ImagePicker = NativeModules.ImageCropPicker;

class CreateDescription extends Component {
  constructor(props) {
    super(props);

    this.TEXT_CREATE_POST = TEXT_CREATE_POST();

    this.state = {
      modalVisible: false,
      isVote: false,
      isEvent: false,
      ArrImg: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_CREATE_POST = TEXT_CREATE_POST();
    }
  }

  //upload Image
  _uploadImage = async (arrImage = []) => {
    // console.log("arrImage", arrImage);
    const { UserProfile, uploadImage } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    console.log("arrImage", arrImage);
    let linkImage = await uploadImage({
      user_id: UserProfile.Value[0].UserID,
      base64Datas: arrImage
    });
    // console.log("linkImage", linkImage);
    // let Imgs = [];
    let Imgs = JSON.parse(linkImage);
    Imgs = Imgs.Value;
    let ImgsLink = Imgs.map(img => {
      return URL_BASE + img;
    });
    ImgsLink = JSON.stringify(ImgsLink);
    console.log("img", ImgsLink);
    this.setState({
      ArrImg: ImgsLink
    });
  };

  pickMultiple() {
    let ArrImage = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeBase64: true,
      includeExif: true,
      forceJpg: true
    })
      .then(images => {
        // console.log('images', images)

        this.setState(
          {
            image: null,
            images: images.map(i => {
              ArrImage.push(i.data);
              // console.log('i.data', i.data)
              // console.log("ArrImage", ArrImage);

              return { uri: i.path, base64: i.data };
            })
          },
          () => this._uploadImage(ArrImage)
        );
      })
      .catch(e => console.log("e", e));
  }

  render() {
    const { UserProfile } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CustomizeHeader
          label={this.TEXT_CREATE_POST.CreatePost}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center"
          }}
        >
          <Image
            style={styles.image_circle_avt}
            source={{
              uri: URL_BASE + UserProfile.Value[0].Avatar
            }}
            resizeMode="cover"
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: 5,
                paddingTop: 3,
                paddingBottom: 3
              }}
            >
              <Text
                style={{ color: COLOR.COLOR_NAME_STATUS, fontWeight: "bold" }}
              >
                {UserProfile.Value[0].FullName}
              </Text>
              <Text style={{ fontSize: 12 }}>
                {typeAccount(UserProfile.Value[0].Type)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.view_container}>
          <View>
            <View style={{ marginHorizontal: 10, marginTop: 5 }}>
              <TextInput
                placeholder={this.TEXT_CREATE_POST.ContentPost}
                underlineColorAndroid="transparent"
                onChangeText={Status => this.setState({ Status })}
                placeholderTextSize="20"
                returnKeyType={"search"}
                // onFocus={() => {
                //     this.handleTextInput()
                // }}
              />
            </View>
          </View>
          {this.state.images ? (
            <FlatList
              data={this.state.images}
              // horizontal={true}
              // style = {{marginLeft: 0}}
              numColumns={5}
              renderItem={({ item }) => {
                console.log("item_image", item);
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 6
                    }}
                  >
                    <Image
                      style={styles.image_circle}
                      source={item}
                      resizeMode="cover"
                    />
                  </View>
                );
              }}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
          <View style={styles.view_bottom}>
            <View style={styles.view_border}>
              <TouchableOpacity>
                <Image
                  source={require("../../../../assets/btn_emo.png")}
                  style={styles.button_image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.pickMultiple.bind(this)}>
                <Image
                  source={require("../../../../assets/btn_img.png")}
                  style={styles.button_image}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.state.isEvent ? this._addEvent() : this._createPost()
                }
              >
                <View style={styles.view_post}>
                  <Text style={{ color: "white" }}>
                    {this.TEXT_CREATE_POST.Post}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch)
  };
};

CreateDescription = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDescription);
export default compose(injectShowAlert)(CreateDescription);
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  view_container: {
    justifyContent: "space-between",
    flex: 1
  },
  button_image: {
    height: 20,
    width: 20,
    marginLeft: 5
  },
  view_event: {
    borderWidth: 1,

    height: 25,
    borderRadius: 25 / 2,
    borderColor: "#B8B8B8",
    backgroundColor: "#B8B8B8",
    alignItems: "center",
    flexDirection: "row"
  },
  view_vote: {
    borderWidth: 1,
    marginLeft: 10,
    height: 25,
    borderRadius: 25 / 2,
    borderColor: "#B8B8B8",
    backgroundColor: "#B8B8B8",
    alignItems: "center",
    flexDirection: "row"
  },
  view_post: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#74BA90",
    borderWidth: 1,
    borderRadius: 25 / 2,
    borderColor: "#74BA90",
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 75
  },
  view_bottom: {
    flexDirection: "column"
  },
  view_border: {
    paddingBottom: 5,
    flexDirection: "row",
    marginTop: 5,
    minHeight: 40,
    justifyContent: "flex-end",
    borderColor: COLOR.COLOR_GRAY,
    backgroundColor: COLOR.BORDER_INPUT,
    borderTopWidth: 1,
    alignItems: "center"
  },
  image_circle: {
    height: DEVICE_WIDTH / 6 + 20,
    width: DEVICE_WIDTH / 6
    // borderRadius: DEVICE_WIDTH / 12,
  },
  image_circle_avt: {
    height: DEVICE_WIDTH / 10,
    width: DEVICE_WIDTH / 10,
    borderRadius: DEVICE_WIDTH / 20,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: COLOR.COLOR_GRAY
    // marginTop: 10
  },
  modal: {
    height: 200
  }
});
