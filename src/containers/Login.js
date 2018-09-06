import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {postRegister} from "../actions/registerActions";

class Login extends Component {
    _register = async () => {
        const { postRegister } = this.props
        let register = await postRegister({
            Username: "0983145317",
            FullName: "Nguyễn Thị Hiền",
            Email: "sdfsdf@gmail.com",
            Password: "123456",
            lang_name: "vi_VN"

        })
        console.log('register', register)
    }
    render () {
        return (
            <View style = {{flex:1, justifyContent: 'center', alignItems:'center'}}>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('TabHome')}>
                    <Text>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=> this._register()}>
                    <Text>
                        register
                    </Text>
                </TouchableOpacity>
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
        postRegister: bindActionCreators(postRegister, dispatch)
    }
}


Login = connect(mapStateToProps, mapDispatchToProps)(Login)
export default Login