import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import style_common from '../style-common';
import { IMAGE } from '../constant/assets';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { COLOR } from '../constant/Color';
import { ViewLoading, TabView } from '../components/CommonView';
import {
  ListAccount,
  ListBusiness,
  ListMessage,
  ListPost,
} from '../components/flatlist';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      tabIndex: 0,
      arrPost: [
        {
          MsgGroupID: 'C925550C-FF2A-4C4D-BBA0-785AF34BDF05',
          FullNameOrGroupName: 'Lo Van Kien',
          Time: '',
          Content: 'helo Hieu',
        },
      ],
      arrBussiness: [
        {
          MsgGroupID: 'C925550C-FF2A-4C4D-BBA0-785AF34BDF05',
          FullNameOrGroupName: 'Nguyen Viet Thinh',
          Time: '',
          Content: 'hi',
        },
      ],
      arrMessage: [
        {
          MsgGroupID: 'C925550C-FF2A-4C4D-BBA0-785AF34BDF05',
          FullNameOrGroupName: 'Nguyen Viet Bao',
          Time: '',
          Content: 'chao',
        },
      ],
      arrAccount: [
        {
          MsgGroupID: 'C925550C-FF2A-4C4D-BBA0-785AF34BDF05',
          FullNameOrGroupName: 'Nguyen Van Hieu',
          Time: '',
          Content: '',
        },
      ],
    };
  }

  _renderHeader = () => {
    const { goBack } = this.props.navigation;
    return (
      <View style={[style_common.card_view, styles.header]}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Icon
            style={styles.back}
            name={
              Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'
            }
            color="#000000"
            size={30}
          />
        </TouchableOpacity>
        <View style={styles.search_border}>
          <TouchableOpacity
            style={styles.btn_search}
            onPress={() => {
              alert('start search');
            }}
          >
            <Image
              source={IMAGE.search_icon}
              style={styles.search_icon}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TextInput
            // underlineColorAndroid="transparent"
            autoCapitalize="none"
            returnKeyType="done"
            numberOfLines={1}
            placeholder={'Tim kiem'}
            onChangeText={(text) => {}}
            style={styles.text_input}
            onSubmitEditing={(event) => {}}
          />
        </View>
      </View>
    );
  };

  _renderTabButton = () => {
    return (
      <View style={styles.tab}>
        <TabView
          label="Bài viết"
          onPress={() => {
            this.setState({ tabIndex: 0 });
          }}
          isActive={this.state.tabIndex === 0}
          style={styles.btn_margin_right}
        />
        <TabView
          label="Doanh nghiệp"
          onPress={() => {
            this.setState({ tabIndex: 1 });
          }}
          isActive={this.state.tabIndex === 1}
          style={styles.btn_margin_lr}
        />
        <TabView
          label="Tin nhắn"
          onPress={() => {
            this.setState({ tabIndex: 2 });
          }}
          isActive={this.state.tabIndex === 2}
          style={styles.btn_margin_lr}
        />
        <TabView
          label="Tài khoản"
          onPress={() => {
            this.setState({ tabIndex: 3 });
          }}
          isActive={this.state.tabIndex === 3}
          style={styles.btn_margin_left}
        />
      </View>
    );
  };
  _renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.content,
            { zIndex: this.state.tabIndex === 0 ? 1 : 0 },
          ]}
        >
          <ListPost dataPost={this.state.arrPost} {...this.props} />
        </View>
        <View
          style={[
            styles.content,
            { zIndex: this.state.tabIndex === 1 ? 1 : 0 },
          ]}
        >
          <ListBusiness
            dataBusiness={this.state.arrBussiness}
            {...this.props}
          />
        </View>
        <View
          style={[
            styles.content,
            { zIndex: this.state.tabIndex === 2 ? 1 : 0 },
          ]}
        >
          <ListMessage dataMessage={this.state.arrMessage} {...this.props} />
        </View>
        <View
          style={[
            styles.content,
            { zIndex: this.state.tabIndex === 3 ? 1 : 0 },
          ]}
        >
          <ListAccount dataAccount={this.state.arrAccount} {...this.props} />
        </View>
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
      <View style={style_common.container_white}>
        {this._renderHeader()}
        {this._renderTabButton()}
        {this._renderContent()}
        {this._renderLoading()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR.COLOR_GRAY,
    borderRadius: 0,
  },
  search_border: {
    borderRadius: 2,
    flexDirection: 'row',
    flex: 1,
  },
  search_icon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  back: {
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  btn_search: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_input: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  tab: {
    flexDirection: 'row',
    backgroundColor: COLOR.COLOR_WHITE,
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
  btn_margin_left: {
    marginLeft: 5,
  },
  btn_margin_right: {
    marginRight: 5,
  },
  btn_margin_lr: {
    marginLeft: 5,
    marginRight: 5,
  },
});
