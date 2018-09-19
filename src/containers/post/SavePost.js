import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from "react-native";
import SocketIOClient from "socket.io-client";

import StatusItems from "../../components/StatusItems";
import Icon from "react-native-vector-icons/dist/EvilIcons";
import Icon1 from "react-native-vector-icons/dist/Entypo";
import { URL_SOCKET } from "../../constant/api";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadUserProfile, searchPost } from "../../actions";
import { SearchView } from "../../components/CommonView";
import style_common from "../../style-common/index";

class SavePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ArrPost: [
        {
          FullName: "Nguyễn Văn Hiệu",
          Content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do " +
            "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut\n" +
            "enim ad minim veniam, quis nostrud exercitation ullamco laboris\n" +
            "nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor\n" +
            "in reprehenderit in voluptate velit esse cillum dolore eu fugiat\n" +
            "nulla pariatur. Excepteur sint occaecat cupidatat non proident,\n" +
            "sunt in culpa qui officia deserunt mollit anim id est laborum",
          Avt:
            "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
          Time: "05/09/2018",
        },
        {
          FullName: "Nguyễn Văn Hiệu",
          Content: "Không có gì quý hơn độc lập tự do",
          Avt:
            "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
          Time: "05/09/2018",
          images: [
            "https://drscdn.500px.org/photo/216465193/m%3D2048_k%3D1_a%3D1/dda61fd7cea5013f8ebe7661b7abea3a",
            "https://drscdn.500px.org/photo/215467843/m%3D2048_k%3D1_a%3D1/344703e86f31e1fffb2d63effa2cee33",
            "https://drscdn.500px.org/photo/216340727/m%3D2048_k%3D1_a%3D1/20d583e15467fb39d06d48131767edc2",
            "https://drscdn.500px.org/photo/215498077/m%3D2048_k%3D1_a%3D1/f79e906eb96938807f6f9d758fc652fd",
            "https://drscdn.500px.org/photo/216559713/m%3D2048_k%3D1_a%3D1/393ef5251fa94964fe62cad52a416b7e",
            // 'https://drscdn.500px.org/photo/214943889/m%3D2048_k%3D1_a%3D1/90bd2e3619dfcaae53fed683561aae1b',
            // 'https://drscdn.500px.org/photo/216158509/m%3D2048_k%3D1_a%3D1/cf70d51aab6ca4c4a3c1ecc225c69990',
            // 'https://drscdn.500px.org/photo/216111469/m%3D2048_k%3D1_a%3D1/d2d83296c838258095dbf2bffda70602',
            // 'https://drscdn.500px.org/photo/216051623/m%3D2048_k%3D1_a%3D1/5a3732bb413f240ad71b8279b038a3ff',
            // 'https://drscdn.500px.org/photo/216047335/m%3D2048_k%3D1_a%3D1/4237ac4606474f0ec7ccc05ca311772e',
            // 'https://drscdn.500px.org/photo/216000289/m%3D2048_k%3D1_a%3D1/5ac2a21092f9281feef3ab8484d2b19c'
          ],
        },
        {
          FullName: "Nguyễn Văn Hiệu",
          Content: "Không có gì quý hơn độc lập tự do",
          Avt:
            "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
          Time: "05/09/2018",
          Img:
            "https://kenh14cdn.com/thumb_w/600/3qsvZHBxXH8xPdzaJmLFPEqgKxHka/Image/2015/03/10919541_326321127564559_1570986608_n-02055.jpg",
        },
        {
          FullName: "Nguyễn Văn Hiệu",
          Content: "Không có gì quý hơn độc lập tự do",
          Avt:
            "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
          Time: "05/09/2018",
          Img:
            "https://kenh14cdn.com/thumb_w/600/3qsvZHBxXH8xPdzaJmLFPEqgKxHka/Image/2015/03/10919541_326321127564559_1570986608_n-02055.jpg",
        },
      ],
    };
  }

  componentDidMount() {}

  // _loadUserProfile = async () => {
  //     const {loadUserProfile, LoginData} = this.props;
  //     if (LoginData.length <= 0) {
  //         return null;
  //     }
  //     // let UserID = await AsyncStorage.getItem('UserID')
  //     // console.log('userId', UserID)
  //     let userProfile = await loadUserProfile({
  //         user_id: "2B3A24E4-719C-4F6E-BA7D-8307D1BA6644",
  //         option: 100,
  //         lang_name: "vi_VN",
  //     });
  //     console.log("userProfile",userProfile.Value[0].LtProfile)
  //     let LtPro = userProfile.Value[0].LtProfile
  //     let LtPro1 = JSON.parse(LtPro)
  //     console.log('ltpro', LtPro1)
  // };

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
                // onReloadBack ={this.onReloadBack}
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
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch),
    searchPost: bindActionCreators(searchPost, dispatch),
  };
};

SavePost = connect(
  mapStateToProps,
  mapDispatchToProps
)(SavePost);
export default SavePost;
