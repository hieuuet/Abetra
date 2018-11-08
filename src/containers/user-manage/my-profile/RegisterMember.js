import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { isEqual } from "lodash";
import style_common from "../../../style-common";
import { COLOR } from "../../../constant/Color";
import RadioForm from "../../../components/SimpleRadioButton";
import HashTagEdit from "../../../components/hashtag/HashTagEdit";
import { connect } from "react-redux";
import { TYPE_ACCOUNT } from "../../../constant/KeyConstant";
import {
  showAlert,
  ViewLoading,
  CustomizeHeader
} from "../../../components/CommonView";
import {
  getGuide,
  loadUserProfile,
  getAllRank,
  getAllHashTag,
  getAllCategory
} from "../../../actions";
import ListImage from "../../../components/ListImage";
import { bindActionCreators } from "redux";
import { TEXT_REGISTER_MEMBER } from "../../../language";
import {
  registerBusinessMember,
  registerPersonalMember
} from "../../../actions";
import RankSelect from "./RankSelect";
import { ButtonBackGround } from "../../../components/CommonView";
import { IMAGE } from "../../../constant/assets";
import { web } from "../../../components/Communications";

class RegisterMember extends Component {
  constructor(props) {
    super(props);

    this.TEXT_REGISTER_MEMBER = TEXT_REGISTER_MEMBER(
      (this.props.commonSetting && this.props.commonSetting.HotLine) || ""
    );

    this.state = {
      isLoading: false
    };
    this.imageArr = [];
    this.radioTypeData = [
      {
        label: this.TEXT_REGISTER_MEMBER.Personal,
        value: TYPE_ACCOUNT.PERSONAL
      },
      {
        label: this.TEXT_REGISTER_MEMBER.Business,
        value: TYPE_ACCOUNT.BUSINESS
      }
    ];
    this.typeMember = TYPE_ACCOUNT.PERSONAL;
    this.tagSelected = [];
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    getGuide()
      .then(data => {
        this.imageArr = data.Value || [];
        this.setState({ isLoading: false });
      })
      .catch(err => this.setState({ isLoading: false }));
    if (this.props.allRank.length === 0 || this.props.allHashTag.length === 0) {
      this.props.getAllRank();
      this.props.getCategoryType3({ Type: 3 });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_REGISTER_MEMBER = TEXT_REGISTER_MEMBER(
        (this.props.commonSetting && this.props.commonSetting.HotLine) || ""
      );
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state));
  }

  initData() {
    this.allTags = this.props.allHashTag.map(tag => {
      return {
        ...tag,
        hashtag: tag.Name
      };
    });

    this.phone = this.props.userProfile ? this.props.userProfile.Phone : "";
    this.name = this.props.userProfile ? this.props.userProfile.FullName : "";
  }

  onDataSelected = hashtagSelected => {
    if (hashtagSelected !== undefined) this.tagSelected = hashtagSelected;
  };

  registerMember = async () => {
    if (!this.props.userProfile) {
      return showAlert({ message: this.TEXT_REGISTER_MEMBER.ProfileNotFound });
    }

    const realTagSelect = this.tagSelected
      .filter(tag => tag.select === true)
      .map(tag => tag.CatID);

    if (realTagSelect.length === 0) {
      return showAlert({
        message: this.TEXT_REGISTER_MEMBER.BusinessTypeRequired
      });
    }
    if (!this.rank) {
      return showAlert({ message: this.TEXT_REGISTER_MEMBER.RankRequired });
    }

    if (this.name.trim().length === 0 || this.phone.trim().length === 0) {
      return showAlert({ message: this.TEXT_REGISTER_MEMBER.ContactRequired });
    }
    let dataRegister = {
      UserID: this.props.userProfile.UserID,
      Email: this.props.userProfile.Email || "",
      Phone: this.phone,
      Avatar: this.props.userProfile.Avatar,
      Description: this.props.userProfile.Description || "",
      Address: this.props.userProfile.Address || "",
      HashTag: JSON.stringify(realTagSelect),
      RankID: this.rank
    };
    this.setState({ isLoading: true });
    let result = undefined;
    if (this.typeMember == TYPE_ACCOUNT.PERSONAL) {
      result = await registerPersonalMember(dataRegister);
    } else {
      dataRegister = {
        ...dataRegister,
        Image: "",
        LinkWeb: "",
        Author: this.props.userProfile.FullName || "",
        NameEnterprise: this.props.userProfile.FullName || "",
        Hotline: this.phone,
        EmailEnterprise: this.props.userProfile.Email || ""
        // CategoryID: "sample string 10",
        // HashTag: JSON.stringify(realTagSelect)
      };
      result = await registerBusinessMember(dataRegister);
    }
    this.setState({ isLoading: false });
    if (result && result.ErrorCode === "00") {
      return showAlert({
        message: result && result.Message,
        positive: {
          action_positive: () => {
            this.props.loadUserProfile({
              user_id: this.props.userProfile.UserID,
              option: 100
            });
            this.props.navigation.goBack();
          }
        }
      });
    } else {
      return showAlert({
        message:
          (result && result.Message) || this.TEXT_REGISTER_MEMBER.RegisterFail
      });
    }
  };

  onRankSelect = rankItem => {
    console.log(rankItem);
    this.rank = rankItem && rankItem.ID;
  };
  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };

  render() {
    this.initData();
    // return <View />;
    return (
      <KeyboardAvoidingView
        style={style_common.container_white}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={64}
      >
        <CustomizeHeader
          label={this.TEXT_REGISTER_MEMBER.RegisterMember}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={style_common.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.container}>
            <Text style={style_common.text_h1}>
              {this.TEXT_REGISTER_MEMBER.RankMember.toUpperCase()}
            </Text>
            <RankSelect
              allRank={this.props.allRank || []}
              onRankSelect={this.onRankSelect}
            />

            <Text style={style_common.text_h1}>
              {this.TEXT_REGISTER_MEMBER.TypeBusiness.toUpperCase()}
            </Text>
            <HashTagEdit
              data={this.allTags}
              editable={false}
              selectable
              onPressItemTag={this.onPressItemTag}
              onDataSelected={this.onDataSelected}
              numColumns={2}
              ref="hashTag"
            />
            <Text style={style_common.text_h1}>
              {this.TEXT_REGISTER_MEMBER.ModelBusiness.toUpperCase()}
            </Text>
            <RadioForm
              radio_props={this.radioTypeData}
              initial={0}
              formHorizontal={true}
              buttonColor={"gray"}
              selectedButtonColor={"#53A1CB"}
              buttonSize={5}
              animation={true}
              style={styles.radio_form}
              onPress={value => {
                this.typeMember = value;
              }}
            />
            <View style={style_common.line} />
            <Text style={style_common.text_h1}>
              {this.TEXT_REGISTER_MEMBER.ConfirmContact.toUpperCase()}
            </Text>
            <View style={styles.wrap_text}>
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                returnKeyType="done"
                defaultValue={this.name}
                placeholder={this.TEXT_REGISTER_MEMBER.Name}
                onChangeText={text => {
                  this.name = text;
                }}
                style={styles.text_input}
              />
            </View>

            <View style={styles.wrap_text}>
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="numeric"
                returnKeyType="done"
                defaultValue={this.phone}
                placeholder={this.TEXT_REGISTER_MEMBER.Phone}
                onChangeText={text => {
                  this.phone = text;
                }}
                style={styles.text_input}
              />
            </View>
            <Text style={style_common.text_h1}>
              {this.TEXT_REGISTER_MEMBER.GuideRegister.toUpperCase()}
            </Text>
            <ListImage
              imageArr={this.imageArr}
              navigation={this.props.navigation}
            />

            <View style={styles.container_register}>
              <ButtonBackGround
                label={this.TEXT_REGISTER_MEMBER.Register}
                source={IMAGE.header}
                onPress={this.registerMember}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Text style={styles.text_fanpage}>
                {this.TEXT_REGISTER_MEMBER.ContactInfo}
              </Text>
              <TouchableOpacity
                onPress={() => web("fb://page/331230823580420")}
              >
                <Image
                  style={styles.icon_fb}
                  source={IMAGE.icon_fanpage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {this._renderLoading()}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile:
      state.loadUserProfile.Value &&
      state.loadUserProfile.Value.length > 0 &&
      state.loadUserProfile.Value[0],
    allRank: state.allRank,
    allHashTag: state.categoryType3,
    commonSetting: state.commonSetting,
    currentLanguage: state.currentLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch),
    getAllRank: bindActionCreators(getAllRank, dispatch),
    getAllHashTag: bindActionCreators(getAllHashTag, dispatch),
    getCategoryType3: bindActionCreators(getAllCategory, dispatch)
  };
};
RegisterMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterMember);
export default RegisterMember;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: COLOR.COLOR_WHITE
  },
  radio_form: { justifyContent: "space-around", flex: 1 },
  text_input: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BORDER_INPUT,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    alignSelf: "stretch"
  },

  wrap_text: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10
  },
  btn_register: {
    alignContent: "center",
    alignSelf: "center",
    padding: 5,
    minHeight: 35,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: COLOR.COLOR_GRAY,
    borderColor: COLOR.COLOR_BLACK
  },
  container_register: { flex: 1, alignItems: "center", margin: 10 },
  icon_fb: {
    width: 30,
    height: 30
  },
  text_fanpage: {
    color: COLOR.COLOR_BLACK,
    textAlign: "left",
    flex: 1
  }
});
