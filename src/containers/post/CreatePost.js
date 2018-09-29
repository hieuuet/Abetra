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
  NativeModules
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import HashTagModal from "../../components/hashtag/HashTagModal";
import { COLOR } from "../../constant/Color";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { uploadImage } from "../../actions/UploadImageActions";
import { createPost } from "../../actions/createPostActions";
import { URL_BASE, URL_SOCKET } from "../../constant/api";
import SocketIOClient from "socket.io-client";
import { addEvent } from "../../actions/addEventActions";

var ImagePicker = NativeModules.ImageCropPicker;

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isVote: false,
      isEvent: false,
      ArrImg: [],
      ArrOptions: [
        {
          OptionContent: "Lựa chọn 1",
          id: 1
        },
        {
          OptionContent: "Lựa chọn 2",
          id: 2
        }
      ]
    };
    const { UserProfile } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    this.socket = SocketIOClient(URL_SOCKET, {
      pingTimeout: 30000,
      pingInterval: 30000,
      transports: ["websocket"]
    });
    console.log("socket", this.socket);
    this.socket.emit("LOGINPOST", {
      IntUserID: UserProfile.Value[0].IntUserID
    });
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
      base64Datas: arrImage,
      LangID: 129
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

  //create post
  _createPost = async () => {
    const { Status } = this.state;
    const { UserProfile, createPost } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    console.log("IntUserID", UserProfile.Value[0].IntUserID);
    let post = await createPost({
      ProfileID: UserProfile.Value[0].ProfileID,
      IntUserID: UserProfile.Value[0].IntUserID,
      UserID: UserProfile.Value[0].UserID,
      UserType: UserProfile.Value[0].Type,
      FullName: UserProfile.Value[0].FullName,
      Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
      Images: this.state.ArrImg.length ? this.state.ArrImg : "",
      Videos: "",
      Post_content: Status,
      Pin: 0,
      Type: 0,
      ltPoll: [],
      Target: "#FOOD",
      DisplayTime: "2018-09-18T16:07:37.9781331+07:00",
      IsAdvs: "",
      LangID: 129
    });
    if (post.ErrorCode == "00") {
      this._sendPost(post.Value.CreatedTime, Status);
      this.props.navigation.goBack();
    } else {
      Alert.alert(
        "Thông báo",
        "Tao bài viết không thành công",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
    console.log("post", post);
  };
  //add event
  _addEvent = async () => {
    const {
      Status,
      Title,
      TimeStart,
      TimeFinish,
      Address,
      Targets
    } = this.state;
    const { UserProfile, addEvent } = this.props;
    if (UserProfile.length <= 0) {
      return null;
    }
    let Event = await addEvent({
      ID: 0,
      Name: Title,
      Summary: "",
      Description: Status,
      StartDate: TimeStart,
      FinishDate: TimeFinish,
      CreateBy: 734,
      Type: 0,
      ChiTieu: Targets,
      Code: "",
      Address: Address
    });
    console.log("Event", Event);
    if (Event.ErrorCode == "00") {
      this.props.navigation.goBack();
    } else {
      Alert.alert(
        "Thông báo",
        "Tao sự kiện không thành công",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  //socket Post
  _sendPost = (DatePost, Content) => {
    const { UserProfile } = this.props;
    let dataSend = {
      ProfileID: UserProfile.Value[0].ProfileID,
      IntUserID: UserProfile.Value[0].IntUserID,
      UserID: UserProfile.Value[0].UserID,
      UserType: UserProfile.Value[0].Type,
      FullName: UserProfile.Value[0].FullName,
      Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
      Images: this.state.ArrImg.length ? this.state.ArrImg : "",
      Videos: "",
      PostContent: Content,
      Pin: 0,
      TotalComment: 0,
      TotalLike: 0,
      TotalShare: 0,
      Type: 0,
      ltPoll: [],
      Target: "#FOOD",
      DisplayTime: DatePost,
      IsAdvs: "",
      LangID: 129
    };
    console.log("dataSend", dataSend);
    this.socket.emit("POST", dataSend);
    // console.log('send ok')
  };

  // show modal
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  //show tham do y kien
  _createVote = () => {
    this.setState({
      isVote: true,
      isEvent: false
    });
  };
  //showEvent
  _createEvent = () => {
    this.setState({
      isVote: false,
      isEvent: true
    });
  };

  //them 1 lua chon
  Push = index => {
    // console.log('push')
    // console.log('ArrOptions', this.state.ArrOptions)
    var ArrMoi = this.state.ArrOptions;
    ArrMoi.push({ OptionContent: `Lựa chọn ${index + 2}` });
    this.setState({
      ArrOptions: ArrMoi
    });
  };

  render() {
    return (
      <View style={styles.view_container}>
        <View>
          <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            <TextInput
              placeholder="Nhập nội dung?"
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
          {this.state.isVote ? (
            <FlatList
              data={this.state.ArrOptions}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10
                    }}
                  >
                    <View
                      style={{
                        marginLeft: 10,
                        borderRadius: 15,
                        flexDirection: "row",
                        borderColor: "#E0E0E0",
                        borderWidth: 1,
                        width: "85%"
                      }}
                    >
                      <TextInput
                        placeholder={item.OptionContent}
                        style={{ padding: 0, marginLeft: 10, flex: 1 }}
                        underlineColorAndroid="transparent"
                        placeholderTextSize="20"
                        onChangeText={text => {
                          const ArrOptions = this.state.ArrOptions.map(toa => {
                            if (toa == item) {
                              toa.OptionContent = text;
                            }
                            return toa;
                          });
                          this.setState({
                            ArrOptions
                          });
                        }}
                      />
                    </View>
                    {index === this.state.ArrOptions.length - 1 ? (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "15%"
                        }}
                      >
                        <TouchableOpacity onPress={() => this.Push(index)}>
                          <Image
                            source={require("../../images/insert.png")}
                            style={{
                              height: 25,
                              width: 25
                            }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                );
              }}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
          {this.state.isEvent ? (
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                returnKeyType="next"
                placeholder="Tiêu đề sự kiện"
                onChangeText={Title => this.setState({ Title })}
                style={{
                  marginTop: 10,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: COLOR.BORDER_INPUT,
                  borderRadius: 5,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  marginHorizontal: 10
                }}
              />
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                returnKeyType="next"
                placeholder="Thời gian bắt đầu"
                onChangeText={TimeStart => this.setState({ TimeStart })}
                style={{
                  marginTop: 10,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: COLOR.BORDER_INPUT,
                  borderRadius: 5,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  marginHorizontal: 10
                }}
              />
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                returnKeyType="next"
                placeholder="Thời gian kết thúc"
                onChangeText={TimeFinish => this.setState({ TimeFinish })}
                style={{
                  marginTop: 10,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: COLOR.BORDER_INPUT,
                  borderRadius: 5,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  marginHorizontal: 10
                }}
              />
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                returnKeyType="next"
                placeholder="Chỉ tiêu"
                onChangeText={Targets => this.setState({ Targets })}
                style={{
                  marginTop: 10,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: COLOR.BORDER_INPUT,
                  borderRadius: 5,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  marginHorizontal: 10
                }}
              />
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                returnKeyType="next"
                placeholder="Địa điểm"
                onChangeText={Address => this.setState({ Address })}
                style={{
                  marginTop: 10,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: COLOR.BORDER_INPUT,
                  borderRadius: 5,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  marginHorizontal: 10
                }}
              />
            </View>
          ) : null}

          <Text style={{ marginLeft: 10, color: "black", marginTop: 10 }}>
            Thêm vào bài viết
          </Text>

          <View style={styles.view_border}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => this._createVote()}>
                <View style={styles.view_vote}>
                  <Text style={{ marginLeft: 5, color: "black" }}>
                    #Thămdòýkiến
                  </Text>
                </View>
              </TouchableOpacity>
              {this.state.isVote ? (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isVote: false
                    })
                  }
                >
                  <Icon name="close" size={20} color="#E0E0E0" />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => this._createEvent()}>
                <View style={styles.view_event}>
                  <Text style={{ marginLeft: 5, color: "black" }}>#Sựkiện</Text>
                </View>
              </TouchableOpacity>
              {this.state.isEvent ? (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isEvent: false
                    })
                  }
                >
                  <Icon name="close" size={20} color="#E0E0E0" />
                </TouchableOpacity>
              ) : null}
            </View>

            <TouchableOpacity>
              <Image
                source={require("../../../assets/emoji.png")}
                style={styles.button_image}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.pickMultiple.bind(this)}>
              <Image
                source={require("../../../assets/image_icon.png")}
                style={styles.button_image}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Image
                source={require("../../../assets/hashtag.png")}
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
                <Text>Đăng</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <HashTagModal
          changeModalVisible={this.state.modalVisible}
          onChangeModalVisible={this.setModalVisible}
        />
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
    uploadImage: bindActionCreators(uploadImage, dispatch),
    createPost: bindActionCreators(createPost, dispatch),
    addEvent: bindActionCreators(addEvent, dispatch)
  };
};

CreatePost = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);
export default CreatePost;
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  view_container: {
    justifyContent: "space-between",
    flex: 1
  },
  button_image: {
    height: 20,
    width: 20
  },
  view_event: {
    borderWidth: 1,
    height: 25,
    borderColor: "#E0E0E0",
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    flexDirection: "row"
  },
  view_vote: {
    borderWidth: 1,
    marginLeft: 10,
    height: 25,
    borderColor: "#E0E0E0",
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    flexDirection: "row"
  },
  view_post: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#B3E5FC",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#81D4FA",
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 65
  },
  view_bottom: {
    flexDirection: "column"
  },
  view_border: {
    flexDirection: "row",
    marginTop: 10,
    minHeight: 30,
    justifyContent: "space-between",
    alignItems: "center"
  },
  image_circle: {
    height: DEVICE_WIDTH / 6 + 20,
    width: DEVICE_WIDTH / 6
    // borderRadius: DEVICE_WIDTH / 12,
  }
});
