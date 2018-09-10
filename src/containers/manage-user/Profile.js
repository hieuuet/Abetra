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
  Dimensions,
} from 'react-native';

import { IMAGE } from '../../constant/assets';
import style_common from '../../style-common';
import { ButtonBorder, ViewLoading } from '../../components/CommonView';
import EditView from './EditView';
import { COLOR } from '../../constant/Color';
import { strings } from '../../i18n';
import RadioForm from '../../components/SimpleRadioButton';
import PhotoGrid from '../../components/PhotoGrid';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import MenuItem from '../../components/MenuItem';
const { width } = Dimensions.get('window');

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

    this.dataImage = [
      'https://drscdn.500px.org/photo/216465193/m%3D2048_k%3D1_a%3D1/dda61fd7cea5013f8ebe7661b7abea3a',
      'https://drscdn.500px.org/photo/215467843/m%3D2048_k%3D1_a%3D1/344703e86f31e1fffb2d63effa2cee33',
      'https://drscdn.500px.org/photo/216340727/m%3D2048_k%3D1_a%3D1/20d583e15467fb39d06d48131767edc2',
      'https://drscdn.500px.org/photo/215498077/m%3D2048_k%3D1_a%3D1/f79e906eb96938807f6f9d758fc652fd',
      'https://drscdn.500px.org/photo/216559713/m%3D2048_k%3D1_a%3D1/393ef5251fa94964fe62cad52a416b7e',
      // 'https://drscdn.500px.org/photo/214943889/m%3D2048_k%3D1_a%3D1/90bd2e3619dfcaae53fed683561aae1b',
      // 'https://drscdn.500px.org/photo/216158509/m%3D2048_k%3D1_a%3D1/cf70d51aab6ca4c4a3c1ecc225c69990',
      // 'https://drscdn.500px.org/photo/216111469/m%3D2048_k%3D1_a%3D1/d2d83296c838258095dbf2bffda70602',
      // 'https://drscdn.500px.org/photo/216051623/m%3D2048_k%3D1_a%3D1/5a3732bb413f240ad71b8279b038a3ff',
      // 'https://drscdn.500px.org/photo/216047335/m%3D2048_k%3D1_a%3D1/4237ac4606474f0ec7ccc05ca311772e',
      // 'https://drscdn.500px.org/photo/216000289/m%3D2048_k%3D1_a%3D1/5ac2a21092f9281feef3ab8484d2b19c'
    ];
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
    return (
      <View style={style_common.wrapper}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            returnKeyType="done"
            numberOfLines={5}
            multiline={true}
            placeholder={strings('login.placeholder.input_phone')}
            onChangeText={(text) => {}}
            style={[
              style_common.input_boder,
              { flex: 1, textAlignVertical: 'top', height: 100 },
            ]}
            onSubmitEditing={(event) => {}}
          />
          <Icon name="smile-beam" size={30} color={COLOR.COLOR_YELLOW} />
        </View>
        <PhotoGrid
          source={this.dataImage}
          width={width - 20}
          height={width / 1.5}
          ratio={0.5}
        />
      </View>
    );
  };

  _renderMember = () => {
    return (
      <View style={{}}>
        <Text>Hoi vien</Text>
        <View style={{ backgroundColor: 'black', height: 1, flex: 1 }} />
        <Text>Ngay dang ky:01-01-2018</Text>
        <Text>Ngay dang ky: 01-01-2018</Text>
        <TouchableOpacity>
          <Text>Giay chung nhan hoi vien</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Quyen loi hoi vien</Text>
        </TouchableOpacity>
      </View>
    );
  };
  _renderRegisterMember = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ flex: 1 }}>Dang ky hoi vien</Text>

        {/* <ButtonBorder
          my_style={[style_common.input_boder, { marginLeft: 5 }]}
          lable={'Quyen loi-Chinh sach'}
          onPress={this._login}
        /> */}
        <TouchableOpacity style={[style_common.input_boder, { marginLeft: 5 }]}>
          <Text>Quyen loi-Chinh sach</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style_common.input_boder, { marginLeft: 5 }]}>
          <Text>Dang ky ngay</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderFooter = () => {
    return (
      <View style={styles.content_footer}>
        <MenuItem
          title="Bài viết đã lưu"
          nameIcon="bookmark"
          onPress={() => {}}
          style={styles.menu_bottom}
        />
        <MenuItem
          title="Cac hoi vien dang theo doi"
          nameIcon="user-plus"
          onPress={() => {}}
          style={styles.menu_bottom}
        />
        <MenuItem
          title="Su kien da tham gia"
          nameIcon="calendar-check"
          onPress={() => {}}
          style={styles.menu_bottom}
        />
      </View>
    );
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
            {this._renderRegisterMember()}
            {this._renderMember()}
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
  menu_bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
