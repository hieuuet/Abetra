import React, { Component } from 'react';
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
} from 'react-native';

import { IMAGE } from '../../constant/assets';
import style_common from '../../style-common';
import { ButtonBorder, ViewLoading } from '../../components/CommonView';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  _renderHeader = () => {};
  _renderContent = () => {
    return <View style={style_common.wrapper} />;
  };

  _renderFooter = () => {
    return <View style={styles.content_footer} />;
  };
  _renderLoading = () => {
    return this.state.isLoading ? (
      <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
    ) : null;
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={style_common.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={64}
      >
        <ScrollView
          style={style_common.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={style_common.content_center}>
            {this._renderHeader()}
            {this._renderContent()}
            {this._renderFooter()}
          </View>
        </ScrollView>
        {this._renderLoading()}
      </KeyboardAvoidingView>
    );
  }
}
export default Profile;

const styles = StyleSheet.create({
  img_logo: {
    width: 100,
    height: 100,
  },
  text_input: {
    marginHorizontal: 60,
    marginTop: 10,
    padding: 5,
  },

  img_fb: {
    width: 50,
    height: 50,
  },
  view_login: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    alignSelf: 'stretch',
  },
  view_fanpage: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content_footer: {
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  text_login: {
    flex: 1,
    marginRight: 10,
  },
  text_info: {
    margin: 10,
  },
});
