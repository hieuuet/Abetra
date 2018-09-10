import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import MenuItem from '../components/MenuItem';

class Menu extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={{ flexDirection: 'column', backgroundColor: 'white' }}>
        <MenuItem
          title="Đăng ký hội viên"
          nameIcon="home"
          style={styles.style_menu}
          // onPress={() => {
          //     this.state.value ? this.props.navigation.navigate('TaiKhoanCuaBanCuDan') : this.refs.modal.open()
          // }}
        />
        <MenuItem
          title="Bài viết đã lưu"
          nameIcon="bookmark"
          style={styles.style_menu}
          // onPress={() => {
          //     this.state.Profile ? this.props.navigation.navigate('HangXom') : this.refs.modal.open()
          // }}
        />
        <MenuItem
          title="Đăng xuất"
          nameIcon="sign-out-alt"
          style={styles.style_menu}
          // onPress={() => this.props.navigation.navigate('ThongTinKDTCuDan')}
        />
        <MenuItem
          title="Sự kiện"
          nameIcon="calendar-alt"
          style={styles.style_menu}
          // onPress={() => {
          //     // this.chatToAdmin()
          //     this.state.Profile ? this.chatToAdmin() : this.refs.modal.open()
          // }}
        />

        <MenuItem
          title="Dịch vụ quanh đây"
          nameIcon="map-marked-alt"
          style={styles.style_menu}
          // onPress={() => {
          //     // this.props.navigation.navigate('BaoSuCoKDT')
          //     this.state.Profile ? this.props.navigation.navigate('BaoSuCoKDT') : this.refs.modal.open()
          // }}
        />
        <MenuItem
          title="Chương trình khuyến mãi"
          nameIcon="glide"
          style={styles.style_menu}
          // onPress={() => this.props.navigation.navigate('ChoFaceHome')}
        />
        <MenuItem
          title="Giới thiệu"
          nameIcon="glide"
          style={styles.style_menu}
          // onPress={() => {
          //     // this.props.navigation.navigate('BepAnGiaDinh')
          //     this.state.Profile ? this.props.navigation.navigate('BepAnGiaDinh') : this.refs.modal.open()
          // }}
        />

        <MenuItem
          title="Hướng dẫn"
          nameIcon="glide"
          style={styles.style_menu}
          // onPress={() => this.props.navigation.navigate('HuongDan')}
        />
        <MenuItem
          title="Điều khoản dịch vụ"
          nameIcon="glide"
          style={styles.style_menu}
          // onPress={() => this.props.navigation.navigate('GioiThieuCuDan')}
        />

        <MenuItem title="Ngôn ngữ" nameIcon="glide" style={styles.style_menu} />
        <MenuItem title="Hỗ trợ" nameIcon="glide" style={styles.style_menu} />
      </ScrollView>
    );
  }
}

export default Menu;

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  style_menu: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  image_circle: {
    height: DEVICE_WIDTH / 3,
    width: DEVICE_WIDTH / 3,
    borderRadius: DEVICE_WIDTH / 6,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  canhbao: {
    width: DEVICE_WIDTH / 2,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#EF6C00',
    backgroundColor: '#F57C00',
  },
  modalContent: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 22,
    // justifyContent: "center",
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    height: DEVICE_HEIGHT / 4,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});
