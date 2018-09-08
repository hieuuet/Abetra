import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image, Alert,
    AsyncStorage
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserInput from "../components/UserInput";
import CheckBox from "../components/CheckBox ";
import {IMAGE} from "../constant/assets";
import {ButtonBorder} from "../components/ViewBorder";
import {postLogin} from "../actions/loginActions";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: false
        };
    }

    _login = async () => {

        const {userName, password} = this.state

        const {postLogin} = this.props;
        let login = await postLogin({
        so_dien_thoai: userName,
            mat_khau: password,
            lang_name: "vi_VN"
        });
        console.log("register", login);
        console.log("userId", login.Value[0].UserID);
        // let userid = login.Value ? login.Value[0].UserID : null
        if (login.ErrorCode === "00") {
            AsyncStorage.setItem('UserID', login.Value[0].UserID)
            this.props.navigation.navigate('TabHome')




        }
        else {

            Alert.alert(
                'Thông báo',
                login.Message,
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
    };


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                <Image style={{marginTop: 40, width: 100, height: 100}}
                       source={require('../../assets/logo.png')}/>
                <View style={{justifyContent: "space-between", flex: 1}}>


                    <View style={{marginTop: 30}}>

                        <UserInput
                            keyboardType={'numeric'}
                            placeholder={'Nhập số điện thoại'}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            style={{marginTop: 20}}
                            onChangeText={(userName) => this.setState({userName})}
                        />
                        <UserInput
                            secureTextEntry={true}
                            placeholder='Nhập mật khẩu'
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            style={{marginTop: 20}}
                            onChangeText={(password) => {
                                this.setState({password})
                            }}
                        />


                        <TouchableOpacity onPress={() => this._login()}>
                            <View style={{
                                marginTop: 20,
                                borderWidth: 1,
                                borderRadius: 5,
                                marginHorizontal: 70,
                                backgroundColor: '#90CAF9',
                                borderColor: '#64B5F6',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40,
                            }}>
                                <Text style={{color: "black"}}>Đăng Nhập</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.view_login}>
                            <Text>Đăng nhập bằng Facebook</Text>
                            <TouchableOpacity>
                                <Image
                                    style={styles.img_fb}
                                    resizeMode="cover"
                                    source={IMAGE.logo_fb}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view_login}>
                            <Text style={styles.text_login}>Chưa có tài khoản</Text>
                            <ButtonBorder
                                lable="Đăng ký"
                                onPress={() => {
                                    this.props.navigation.navigate("Register");
                                }}
                            />
                        </View>
                        <View style={styles.view_login}>
                            <Text style={styles.text_login}>Dùng tài khoản khách</Text>
                            <ButtonBorder
                                lable="Guest"
                                onPress={() => {
                                    alert(1);
                                }}
                            />
                        </View>

                    </View>

                    <View style={{flexDirection: 'row', marginHorizontal: 70, alignItems: 'center', marginBottom: 20}}>
                        <CheckBox
                            onClick={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked
                                });
                            }}
                            isChecked={this.state.isChecked}
                        />
                        <Text style={{marginLeft: 10, textDecorationLine: 'underline'}}>Điều khoản và dịch vụ</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // login: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postLogin: bindActionCreators(postLogin, dispatch)
    }
}


Login = connect(mapStateToProps, mapDispatchToProps)(Login)
export default Login
const styles = StyleSheet.create({
    img_logo: {
        width: 100,
        height: 100
    },
    text_input: {
        marginHorizontal: 60,
        marginTop: 10,
        padding: 0
    },
    btn_register: {
        margin: 10
    },
    btn_login: {
        justifyContent: "center",
        alignItems: "center",
        padding: 7,
        alignSelf: "flex-end",
        minWidth: 100
    },
    img_fb: {
        width: 50,
        height: 50
    },
    view_login: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10,
        alignSelf: "stretch"
    },
    parent_checkbox: {
        justifyContent: "flex-start",
        alignSelf: "stretch",
        flexDirection: "row",
        marginTop: 10,
        marginRight: 10,
        marginLeft: 30
    },
    text_login: {
        flex: 1,
        marginRight: 10
    },
    txt_underline: {
        textDecorationLine: "underline",
        paddingLeft: 5
    }

})