import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  NativeModules,
  Alert,
  BackHandler
} from "react-native";

import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import EditView from "./EditView";
import { COLOR } from "../../../constant/Color";
import { strings } from "../../../language/i18n";
import RadioForm from "../../../components/SimpleRadioButton";
import PhotoGrid from "../../../components/PhotoGrid";
import Icon from "react-native-vector-icons/dist/FontAwesome5";
import MenuItem from "../../../components/MenuItem";
import MyDatePicker from "../../../components/DatePicker";
import {
  updateUserProfile,
  uploadMultipleImage,
  updateAddressDesscription
} from "../../../actions";
import { isEqual } from "lodash";
const { width } = Dimensions.get("window");
import { URL_BASE } from "../../../constant/api";
import { GENDER_STATE } from "../../../constant/KeyConstant";
import { formatDate } from "../../../constant/UtilsFunction";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
const ImagePicker = NativeModules.ImageCropPicker;

import Ionicon from "react-native-vector-icons/dist/Ionicons";
import PropTypes from "prop-types";
class MyProfileTab1 extends Component {
  constructor(props) {
    super(props);

    //get all image has been on the profile
    this.oldImage =
      this.props.dataUser && this.props.dataUser.ImageDescription
        ? JSON.parse(this.props.dataUser.ImageDescription)
        : [];

    this.textAddress =
      (this.props.dataUser && this.props.dataUser.Address) || "";
    this.textDescription =
      (this.props.dataUser && this.props.dataUser.Description) || "";

    this.state = {
      localAvatar: undefined,
      dataImage: this.oldImage,
      showEmoticons: false,
      textDescription: this.textDescription
    };

    this.radioData = [
      {
        label: strings("profile.man"),
        value: GENDER_STATE.MAN
      },
      { label: strings("profile.women"), value: GENDER_STATE.WOMEN },
      { label: strings("profile.undefined"), value: GENDER_STATE.OTHER }
    ];

    this.arrBase64 = [];
    this.arrPath = [];
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.state.showEmoticons) {
        this.setState({ showEmoticons: false });
        return true;
      }
    });
  }
  componentWillReceiveProps(props) {}
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      isEqual(nextProps.dataUser, this.props.dataUser) &&
      isEqual(nextState, this.state)
    );
  }

  callApiUpdateProfile = async ({ field, value }) => {
    return updateUserProfile({
      profile_id: this.dataUser.ProfileID,
      user_id: this.dataUser.UserID,
      field,
      value
    });
  };

  /**
   * Upload image first before upload data of address and description
   */
  updateProfileAddressDes = async () => {
    this.props.onLoading(true);

    //If have image on description, upload image before
    if (this.arrBase64.length > 0) {
      const resultUpload = await uploadMultipleImage({
        user_id: this.dataUser.UserID,
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
      this.props.onLoading(false);
      return Alert.alert(
        "Thông báo",
        "Upload ảnh không thành công",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
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
      this.textAddress === this.dataUser.Address &&
      this.textDescription === this.dataUser.Description &&
      allImage === this.oldImage
    )
      return this.props.onLoading(false);
    const resultUpdate = await updateAddressDesscription({
      profile_id: this.dataUser.ProfileID,
      user_id: this.dataUser.UserID,
      Address: this.textAddress,
      Description: this.textDescription,
      ImageDescription: JSON.stringify(allImage)
    });

    if (resultUpdate && resultUpdate.ErrorCode === "00") {
      this.setState({ dataImage: allImage });
      this.props.reLoadProfile();
      return this.props.onLoading(false);
    } else {
      Alert.alert(
        "Thông báo",
        resultUpdate.Message,
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    }
    return this.props.onLoading(false);
  };

  pickMultipleImageToUpload = () => {
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
        this.props.onLoading(false);
      });
  };

  getGenderState = () => {
    if (
      typeof this.dataUser.Gender !== "number" ||
      (this.dataUser && !!this.dataUser.Gender === null)
    ) {
      return 2;
    }
    if (this.dataUser.Gender === GENDER_STATE.MAN) return 0;
    else return 1;
  };

  _renderHeader = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[style_common.text_color_base, styles.label_radio_group]}
          >
            Ngày sinh
          </Text>
          <MyDatePicker
            initDate={
              this.dataUser && this.dataUser.BirdDate
                ? formatDate(this.dataUser.BirdDate)
                : ""
            }
            onDateChange={date => {
              if (!this.dataUser || this.dataUser.BirdDate === date.trim())
                return;
              this.dataUser.BirdDate = date.trim();
              this.callApiUpdateProfile({
                field: "BirdDate",
                value: date.trim()
              });
            }}
          />
        </View>
        <View style={styles.change_pass}>
          <Text
            style={[style_common.text_color_base, styles.label_radio_group]}
          >
            {strings("profile.gender")}
          </Text>
          <RadioForm
            radio_props={this.radioData}
            initial={this.getGenderState()}
            formHorizontal={true}
            buttonColor={"gray"}
            selectedButtonColor={"gray"}
            buttonSize={5}
            animation={true}
            style={styles.radio_form}
            onPress={value => {
              this.callApiUpdateProfile({
                field: "Gender",
                value
              });
            }}
          />
        </View>

        <EditView
          label={strings("profile.email")}
          keyboardType="email-address"
          text_edit={
            this.dataUser && this.dataUser.Email ? this.dataUser.Email : ""
          }
          isEditAble={true}
          onSubmit={text => {
            if (!this.dataUser || text.trim() === this.dataUser.Email) return;

            this.dataUser.Email = text.trim();
            this.callApiUpdateProfile({
              field: "Email",
              value: text.trim()
            });
          }}
        />
        <EditView
          label={strings("profile.mobile")}
          keyboardType="numeric"
          text_edit={
            this.dataUser && this.dataUser.Phone ? this.dataUser.Phone : ""
          }
          onPress={() => this.props.navigation.navigate("ChangePhone")}
          isEditAble={true}
        />
      </View>
    );
  };
  _renderContent = () => {
    return (
      <View style={style_common.wrapper}>
        <Text style={[style_common.text_color_base, styles.txt_title]}>
          Địa chỉ
        </Text>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          placeholder={"Địa chỉ"}
          defaultValue={this.textAddress}
          onChangeText={text => (this.textAddress = text.trim())}
          style={[style_common.input_border, styles.text_address]}
        />
        <Text style={[style_common.text_color_base, styles.txt_title]}>
          Giới thiệu
        </Text>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          numberOfLines={5}
          multiline={true}
          defaultValue={this.state.textDescription}
          placeholder={`Giới thiệu về ${
            this.dataUser && this.dataUser.FullName
              ? this.dataUser.FullName
              : ""
          }`}
          onChangeText={text => {
            this.textDescription = text.trim();
          }}
          style={[style_common.input_border, styles.text_area]}
          onSubmitEditing={event => {
            if (this.textDescription) {
              this.setState({ textDescription: this.textDescription });
            }
          }}
        />

        <View style={styles.action}>
          <TouchableOpacity
            style={styles.btn_action}
            onPress={() => this.setState({ showEmoticons: true })}
          >
            <Icon name="smile-beam" size={30} color={COLOR.COLOR_YELLOW} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_action}
            onPress={this.pickMultipleImageToUpload}
          >
            <Image
              style={styles.icon_img}
              source={IMAGE.imag_icon}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_save}
            onPress={this.updateProfileAddressDes}
          >
            <Text>Lưu</Text>
          </TouchableOpacity>
        </View>
        <PhotoGrid
          source={this.state.dataImage}
          width={width - 20}
          height={width / 1.5}
          ratio={0.5}
          showDelete={true}
          dataUser={this.dataUser}
          navigation={this.props.navigation}
        />
      </View>
    );
  };

  _renderFooter = () => {
    return (
      <View style={styles.content_footer}>
        <MenuItem
          title="Bài viết đã lưu"
          nameIcon="bookmark"
          icon_color={COLOR.COLOR_SKY}
          title_color={COLOR.COLOR_SKY}
          onPress={() => {
            this.props.navigation.navigate("SavePost");
          }}
          style={styles.menu_bottom}
        />
        <MenuItem
          title="Cac hoi vien dang theo doi"
          nameIcon="user-plus"
          icon_color={COLOR.COLOR_SKY}
          title_color={COLOR.COLOR_SKY}
          onPress={() => {}}
          style={styles.menu_bottom}
        />
        <MenuItem
          title="Su kien da tham gia"
          nameIcon="calendar-check"
          icon_color={COLOR.COLOR_SKY}
          title_color={COLOR.COLOR_SKY}
          onPress={() => {
            this.props.navigation.navigate("EventJoin");
          }}
          style={styles.menu_bottom}
        />
      </View>
    );
  };
  onEmojiSelected = emoji => {
    if (!this.textDescription) this.textDescription = "";
    this.textDescription += emoji;
    this.setState({ textDescription: this.textDescription });
  };
  render() {
    console.log("render tab 1");
    //get dataUser
    this.dataUser = this.props.dataUser || undefined;

    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <ScrollView
          style={style_common.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.parent}>
            {this._renderHeader()}
            {this._renderContent()}
            {this._renderFooter()}
          </View>
        </ScrollView>

        {this.state.showEmoticons ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                this.setState({ showEmoticons: false });
              }}
            />
            <EmojiSelector
              onEmojiSelected={this.onEmojiSelected}
              category={Categories.people}
              showSearchBar={false}
              showTabs={false}
              showHistory={true}
              columns={10}
              style={{
                backgroundColor: "gray",
                height: 200
              }}
            />
          </View>
        ) : null}
      </KeyboardAvoidingView>
    );
  }
}

export default MyProfileTab1;

MyProfileTab1.propTypes = {
  dataUser: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  onLoading: PropTypes.func.isRequired,
  reLoadProfile: PropTypes.func
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 10
  },
  txt_title: { alignSelf: "flex-start", marginTop: 10 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  contain_avatar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  right_avatar: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1
  },
  text_name: {
    color: COLOR.COLOR_SKY,
    fontWeight: "bold"
  },

  content_footer: {
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
    flex: 1
  },

  change_pass: { flexDirection: "row", alignItems: "center" },
  icon_pass: {
    marginLeft: 10
  },
  label_radio_group: {
    width: 100
  },
  radio_form: { justifyContent: "space-around", flex: 1 },
  menu_bottom: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  icon_img: {
    width: 40,
    height: 30
  },
  text_area: {
    flex: 1,
    textAlignVertical: "top",
    height: 100,
    marginTop: 0,
    color: "#000000"
  },
  text_address: { marginTop: 0 },
  action: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center"
  },
  btn_action: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  btn_save: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.COLOR_SKY,
    backgroundColor: COLOR.COLOR_SKY,
    borderRadius: 5,
    minWidth: 50,
    padding: 5,
    borderWidth: 1
  }
});
