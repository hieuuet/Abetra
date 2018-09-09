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
import EditView from './EditView';
import { COLOR } from '../../constant/Color';
import { strings } from '../../i18n';
import RadioForm from '../../components/SimpleRadioButton';

import Ionicon from 'react-native-vector-icons/dist/Ionicons';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

    this.radioData = [
      {
        label: strings('profile.man'),
        value: 0,
      },
      { label: strings('profile.women'), value: 1 },
      { label: strings('profile.undefined'), value: 2 },
    ];
    this.dataProfile = {};
  }

  _renderHeader = () => {
    return (
      <View>
        <View style={styles.contain_avatar}>
          <Image source={IMAGE.logo} resizeMode="cover" style={styles.avatar} />
          <View style={styles.right_avatar}>
            <EditView
              lable={strings('profile.name_login')}
              text_edit="kien"
              style_edit={styles.text_name}
            />
            <EditView
              lable={strings('profile.name_display')}
              text_edit="kien"
              isEditAble={true}
              style_edit={styles.text_name}
            />
            <View style={styles.change_pass}>
              <Text style={style_common.text_color_base}>
                {strings('profile.change_pass')}
              </Text>
              <TouchableOpacity style={styles.icon_pass}>
                <Ionicon name="ios-lock" size={30} color={COLOR.COLOR_SKY} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <EditView
          lable={strings('profile.birth_day')}
          text_edit="kien"
          isEditAble={true}
        />
        <View style={styles.change_pass}>
          <Text
            style={[style_common.text_color_base, styles.lable_radio_group]}
          >
            {strings('profile.gender')}
          </Text>
          <RadioForm
            radio_props={this.radioData}
            initial={2}
            formHorizontal={true}
            buttonColor={'gray'}
            selectedButtonColor={'gray'}
            buttonSize={5}
            animation={true}
            style={styles.radio_form}
            onPress={(value) => {
              alert(value);
            }}
          />
        </View>

        <EditView
          lable={strings('profile.email')}
          text_edit="kien"
          isEditAble={true}
        />
        <EditView
          lable={strings('profile.mobile')}
          text_edit="kien"
          isEditAble={true}
        />
      </View>
    );
  };
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
          <View style={styles.parent}>
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
  parent: {
    flex: 1,
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  contain_avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right_avatar: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
  },
  text_name: {
    color: COLOR.COLOR_SKY,
    fontWeight: 'bold',
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
  change_pass: { flexDirection: 'row', alignItems: 'center' },
  icon_pass: {
    marginLeft: 10,
  },
  lable_radio_group: {
    width: 100,
  },
  radio_form: { justifyContent: 'space-around', flex: 1 },
});
