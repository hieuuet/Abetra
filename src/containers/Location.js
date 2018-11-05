import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import style_common from '../style-common'

class Location extends Component {
    render () {
        return (
            
        <BackgroundImage
            style={style_common.content_center}
          >
        </BackgroundImage>
                
        )
    }
}
export default Location