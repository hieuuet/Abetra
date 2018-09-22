import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import style_common from "../../../style-common";
import { ViewLoading, TabView } from "../../../components/CommonView";
import { COLOR } from "../../../constant/Color";
import MemberProfileTab1 from "./MemberProfileTab1";
import MemberProfileTab2 from "./MemberProfileTab2";
import { loadUserProfile } from "../../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {API} from "../../../constant/api";
import axios from "axios"


class MemberProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: params.title,
      headerTitleStyle: { color: COLOR.COLOR_BLACK },
      headerTintColor: COLOR.COLOR_BLACK,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      tabIndex: 0,
      profileMember: [],
    };

    this.userProfile = {};
    //set title for title bar
    this.props.navigation.setParams({
      title: "MemberProfile",
    });
  }

  componentDidMount() {
    this.reLoadProfile();
    this._loadUserProfile();
  }

  _loadUserProfile = () => {
    const { navigation } = this.props;
    const itemStatus = navigation.getParam("item");
    console.log('Itemstatus', itemStatus)
    console.log('UserID', itemStatus.UserID)
      // axios.post("http://123.16.53.210:9000/api/Users/LoadUserProfile", {
      //     headers: {'Content-Type': 'application/json'},
      //     {
      //         user_id: "2C6E403D-D01B-4B3B-920C-BC04E21F502C",
      //         option: 100
      //     }
      // })
      //     .then(function (response) {
      //         console.log("response", response.data);
      //     })
      //     .catch(function (error) {
      //         console.log(error);
      //     });
      fetch(API.LOAD_USER_PROFILE, {
          method: 'POST',

          headers: {'Content-Type': 'application/json'},

          body: JSON.stringify({
                  user_id: itemStatus.UserID,
                  option: 100
          })

      })
          .then((response) => response.json())
          .then((dataRes)=> {
              if (dataRes.ErrorCode == "00") {
                  this.setState({
                      profileMember: dataRes.Value,
                  });
              }

              console.log("dataRes",dataRes)

          })
          .catch(function (error) {
              console.log(error);
          });
  };
  reLoadProfile = async () => {};

  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
  };

  render() {
    console.log("render member");
    return (
      <View style={style_common.container}>
        <View style={styles.tab}>
          <TabView
            label="Tài khoản"
            onPress={() => {
              this.setState({ tabIndex: 0 });
            }}
            isActive={this.state.tabIndex === 0}
            style={styles.btn_margin_right}
          />
          <TabView
            label="Hội viên"
            onPress={() => {
              this.setState({ tabIndex: 1 });
            }}
            isActive={this.state.tabIndex === 1}
            style={styles.btn_margin_left}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.content,
              { zIndex: this.state.tabIndex === 0 ? 1 : 0 },
            ]}
          >
            <MemberProfileTab1
              dataUser={this.state.profileMember}
              navigation={this.props.navigation}
            />
          </View>
          <View
            style={[
              styles.content,
              { zIndex: this.state.tabIndex === 1 ? 1 : 0 },
            ]}
          >
            <MemberProfileTab2 navigation={this.props.navigation} />
          </View>
        </View>
        {this._renderLoading()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UserProfile: state.loadUserProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch),
  };
};

MemberProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberProfile);
export default MemberProfile;

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    backgroundColor: COLOR.COLOR_WHITE,
  },

  content: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLOR.COLOR_WHITE,
  },
  btn_margin_left: {
    marginLeft: 5,
  },
  btn_margin_right: {
    marginRight: 5,
  },
});
