import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import PhotoGrid from 'react-native-thumbnail-grid'


const images = [
    'https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg'
]
export default class Test extends Component {

    render () {
        return (
            <View>
                <PhotoGrid source={images} onPressImage={source => this.showImage(source.uri)} />
            </View>
        )
    }
}