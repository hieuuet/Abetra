import React, { Component } from 'react';
import { WebView } from 'react-native';

class WebAdvertise extends Component {
    render() {
        return (
            <WebView
                source={{uri: 'https://google.com.vn'}}
                style={{marginTop: 5, flex:1}}
            />
        );
    }
}
export default WebAdvertise