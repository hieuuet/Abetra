import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  NativeModules,
  Keyboard,
  Platform,
  BackHandler
} from "react-native";
import { COLOR } from "../../../constant/Color";
import { bindActionCreators, compose } from "redux";
import injectShowAlert from "../../../constant/injectShowAlert";
import { connect } from "react-redux";
import {
  loadUserProfile,
  updateAddressDesscription,
  uploadMultipleImage
} from "../../../actions";
import { URL_BASE } from "../../../constant/api";

import { CustomizeHeader } from "../../../components/CommonView";
import { isEqual } from "lodash";
import { TEXT_CREATE_POST } from "../../../language";
import { typeAccount } from "../../../constant/UtilsFunction";
import style_common from "../../../style-common";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import FastImage from "react-native-fast-image";
import { IMAGE } from "../../../constant/assets";
import { ViewLoading } from "../../../components/CommonView";
import PhotoGrid from "../../../components/PhotoGrid";
const { width } = Dimensions.get("window");

let ImagePicker = NativeModules.ImageCropPicker;

class CreateDescription extends Component {
  constructor(props) {
    super(props);

    this.TEXT_CREATE_POST = TEXT_CREATE_POST();

    this.initDataUser();
    this.state = {
      showEmoticons: false,
      isLoading: false,
      textSubmit: this.textSubmit,
      dataImage: this.oldImage
    };

    this.arrBase64 = [];
    this.arrPath = [];
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      const isAlertShow = this.props.closeAlert();
      if (isAlertShow) {
        return true;
      }
      if (this.state.showEmoticons) {
        this.setState({ showEmoticons: false });
        return true;
      }
      // this.props.navigation.goBack();
      // return true;
    });

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        if (this.state.showEmoticons) {
          this.setState({ showEmoticons: false });
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_CREATE_POST = TEXT_CREATE_POST();
    }

    if (!isEqual(this.props.dataUser, nextProps.dataUser)) {
      this.initDataUser();
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
    this.keyboardDidShowListener.remove();
  }

  initDataUser = () => {
    console.log("dataUser", this.props.dataUser);
    this.oldImage =
      this.props.dataUser && this.props.dataUser.ImageDescription
        ? JSON.parse(this.props.dataUser.ImageDescription)
        : [];

    this.textSubmit =
      (this.props.dataUser && this.props.dataUser.Description) || "";
  };

  reLoadProfile = async () => {
    const { loadUserProfile } = this.props;
    if (!this.props.dataUser || !this.props.dataUser.UserID) {
      return null;
    }
    loadUserProfile({
      user_id: this.props.dataUser.UserID,
      option: 100
    });
  };
  /**
   * Upload image first before upload data of address and description
   */
  updateProfileAddressDes = async () => {
    this.dismissAllModalShow();
    this.setState({ isLoading: true });

    //If have image on description, upload image before
    if (this.arrBase64.length > 0) {
      const resultUpload = await uploadMultipleImage({
        user_id: this.props.dataUser.UserID,
        base64Datas: this.arrBase64
      });
      //upload success
      if (resultUpload) {
        const arrLink = JSON.parse(resultUpload).Value;
        if (arrLink !== null && arrLink !== undefined) {
          const arrFullLink = arrLink.map(imgLink => {
            return URL_BASE + imgLink;
          });

          //combine old image and new image just upload
          const allImage = [...this.oldImage, ...arrFullLink];
          console.log("all image", allImage);
          return this.callApiUploadAddress(allImage);
        }
      }

      //upload image error
      this.setState({ isLoading: false });
      return this.props.showAlert({
        content: this.TEXT_COMMON.UploadImageFail
      });
    } else {
      //Not select image to upload
      this.callApiUploadAddress(this.oldImage);
    }
  };

  /**
   * Call api upload address and description
   */
  callApiUploadAddress = async allImage => {
    //check if data not change
    if (
      this.state.textSubmit === this.props.dataUser.Description &&
      allImage === this.oldImage
    )
      return this.setState({ isLoading: false });

    //start call api
    this.setState({ isLoading: true });
    const resultUpdate = await updateAddressDesscription({
      profile_id: this.props.dataUser.ProfileID,
      user_id: this.props.dataUser.UserID,
      Address: this.props.dataUser.Address,
      Description: this.state.textSubmit,
      ImageDescription: JSON.stringify(allImage)
    });

    if (resultUpdate && resultUpdate.ErrorCode === "00") {
      this.setState({ dataImage: allImage });
      this.reLoadProfile();
      this.setState({ isLoading: false });
      return this.props.navigation.goBack();
    } else {
      this.setState({ isLoading: false });
      return this.props.showAlert({ content: resultUpdate.Message });
    }
  };

  pickMultipleImageToUpload = () => {
    this.dismissAllModalShow();
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeBase64: true,
      includeExif: true,
      forceJpg: true
    })
      .then(async images => {
        console.log("images", images);
        if (images) {
          images.forEach(image => {
            this.arrBase64.push(image.data);
            this.arrPath.push(image.path);
          });

          this.setState({
            dataImage: [...this.state.dataImage, ...this.arrPath]
          });
        }
      })
      .catch(e => {
        this.setState({ isLoading: false });
      });
  };

  onEmojiSelected = emoji => {
    let textSubmit = this.state.textSubmit;
    textSubmit += emoji;
    this.setState({ textSubmit });
  };

  dismissAllModalShow = () => {
    if (this.state.showEmoticons) {
      this.setState({ showEmoticons: false });
    }
    Keyboard.dismiss();
  };

  renderAvatarName = () => {
    const { dataUser } = this.props;
    const source =
      dataUser && dataUser.Avatar
        ? { uri: URL_BASE + dataUser.Avatar }
        : IMAGE.logo;
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center"
        }}
      >
        <FastImage
          style={styles.image_circle_avt}
          source={source}
          resizeMode={FastImage.resizeMode.cover}
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
              {(dataUser && dataUser.FullName) || "Undefined"}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {typeAccount(dataUser && dataUser.Type)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderTextInput = () => {
    return (
      <View>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 5,
            height: 150,
            borderColor: "gray",
            borderRadius: 2,
            borderWidth: 1
          }}
        >
          <TextInput
            placeholder={this.TEXT_CREATE_POST.ContentPost}
            placeholderTextColor={"#A8A8A7"}
            underlineColorAndroid="transparent"
            autoCapitalize={"none"}
            value={this.state.textSubmit}
            onChangeText={text => {
              this.setState({ textSubmit: text });
            }}
            placeholderTextSize="20"
            multiline={true}
          />
        </View>
      </View>
    );
  };

  renderListImage = () => {
    console.log("dataimage", this.state.dataImage);
    return (
      <PhotoGrid
        source={this.state.dataImage}
        width={width - 20}
        height={width / 1.5}
        ratio={0.5}
        showDelete={true}
        dataUser={this.props.dataUser}
        navigation={this.props.navigation}
      />
    );
  };

  renderBottom = () => {
    return (
      <View style={styles.view_border}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            this.setState({ showEmoticons: true });
          }}
        >
          <Image
            source={require("../../../../assets/btn_emo.png")}
            style={styles.button_image}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pickMultipleImageToUpload}>
          <Image
            source={require("../../../../assets/btn_img.png")}
            style={styles.button_image}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={this.updateProfileAddressDes}>
          <View style={styles.view_post}>
            <Text style={{ color: "white" }}>{this.TEXT_CREATE_POST.Post}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderEmoji = () => {
    console.log("showEmoticons", this.state.showEmoticons);
    if (this.state.showEmoticons)
      return (
        <View style={styles.wrapper_emoji}>
          {/* <TouchableOpacity
            style={style_common.container}
            onPress={() => {
              this.setState({ showEmoticons: false });
            }}
          /> */}
          <EmojiSelector
            onEmojiSelected={this.onEmojiSelected}
            category={Categories.people}
            showSearchBar={false}
            showTabs={false}
            showHistory={true}
            columns={10}
            style={styles.emoji}
          />
        </View>
      );

    return null;
  };

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomizeHeader
          label={this.TEXT_CREATE_POST.CreatePost}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <KeyboardAvoidingView
          style={style_common.container}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={64}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={style_common.container}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {this.renderAvatarName()}
            <View style={styles.view_container}>
              {this.renderTextInput()}
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {this.renderListImage()}
              </View>
            </View>
          </ScrollView>
          <View style={styles.view_bottom}>{this.renderBottom()}</View>
          {this._renderLoading()}
        </KeyboardAvoidingView>
        {this.renderEmoji()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const UserProfile = state.loadUserProfile;
  return {
    dataUser: UserProfile && UserProfile.Value && UserProfile.Value[0]
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
  wrapper_emoji: {
    // position: "absolute",
    // top: 0,
    // right: 0,
    // left: 0,
    // bottom: 0
    // flex: 1,
    height: 200,
    flexDirection: "column"
  },
  emoji: {
    backgroundColor: "gray",
    height: 200
  },
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
