import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import style_common from '../../style-common';
import { ViewLoading } from '../../components/CommonView';
import { COLOR } from '../../constant/Color';
import MyProfile from './MyProfile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUserProfile } from '../../actions/loadUserProfileActions';
import Member from './Member';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isTabAccount: true,
    };

    //get userProfile from Redux
    this.userProfile =
      this.props.userProfile &&
      this.props.userProfile.Value &&
      this.props.userProfile.Value.length > 0
        ? this.props.userProfile.Value[0]
        : {};
  }

  componentDidMount() {
    this.reLoadProfile();
  }

  reLoadProfile = async () => {
    const { loadUserProfile, userProfile } = this.props;
    if (!userProfile || !userProfile.UserID) {
      return null;
    }
    await loadUserProfile({
      user_id: userProfile.UserID,
      option: 100,
      lang_name: 'vi_VN',
    });
  };

  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
  };

  render() {
    console.log('render profile count');

    return (
      <View style={style_common.container}>
        <View style={styles.tab}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              this.setState({ isTabAccount: true });
            }}
            style={[
              this.state.isTabAccount
                ? styles.btn_tab_active
                : styles.btn_tab_inActive,
              { marginRight: 5 },
            ]}
          >
            <Text style={styles.text_tab}>tab1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              !this.state.isTabAccount
                ? styles.btn_tab_active
                : styles.btn_tab_inActive,
              { marginLeft: 5 },
            ]}
            onPress={() => {
              Keyboard.dismiss();
              this.setState({ isTabAccount: false });
            }}
          >
            <Text style={styles.text_tab}>tab2</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.content,
              { zIndex: this.state.isTabAccount ? 1 : 0 },
            ]}
          >
            <MyProfile userProfile={this.userProfile} />
          </View>
          <View
            style={[
              styles.content,
              { zIndex: this.state.isTabAccount ? 0 : 1 },
            ]}
          >
            <Member />
          </View>
        </View>
        {this._renderLoading()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.loadUserProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserProfile: bindActionCreators(loadUserProfile, dispatch),
  };
};
Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
export default Profile;

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    backgroundColor: COLOR.COLOR_WHITE,
  },
  btn_tab_active: {
    flex: 1,
    margin: 10,
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.COLOR_SKY,
    borderColor: COLOR.COLOR_SKY,
  },
  btn_tab_inActive: {
    flex: 1,
    margin: 10,
    minHeight: 40,
    borderRadius: 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR.COLOR_GRAY,
    backgroundColor: COLOR.COLOR_GRAY,
  },
  text_tab: {
    color: COLOR.COLOR_BLACK,
    fontWeight: 'bold',
  },
  content: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLOR.COLOR_WHITE,
  },
});
