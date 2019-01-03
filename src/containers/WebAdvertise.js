import React, {Component} from 'react';
import {KeyboardAvoidingView, WebView, View} from 'react-native';
import {CustomizeHeader} from "../components/CommonView";

class WebAdvertise extends Component {

    render() {
        const {params} = this.props.navigation.state
        console.log('params', params)
        return (
            <View style={{flex: 1}}>
                <CustomizeHeader
                    label={"Quảng cáo"}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <WebView
                    source={{uri: params.Advertise.link}}
                    style={{flex: 1}}
                />
            </View>
        );
    }
}

export default WebAdvertise