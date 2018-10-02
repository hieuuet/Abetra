import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class MenuItem extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
            >

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems:'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={styles.img}
                               source={this.props.source}

                        />
                        <Text style={{marginLeft: 20, fontSize: 13, color: 'black'}}>{this.props.title}</Text>
                    </View>
                    <Icon name="navigate-next" size={25} style={{marginRight: 10}} color="#E0E0E0"/>
                </View>
                <View style={{height: 1, backgroundColor: '#E0E0E0', marginLeft: 55, marginTop: 5}}/>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 25,
        width: 25,
        marginLeft: 10
    }
})
