import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class MenuItem extends Component {
    render(){
        return(
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{flexDirection: 'row',marginTop:20}}>
                <View style = {{marginLeft: 5, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name={this.props.nameIcon} size={25} color="#616161"/>
                </View>
                <Text style={{flex:5, fontSize:17, color:'#616161'}}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}