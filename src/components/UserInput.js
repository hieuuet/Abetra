import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class UserInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            text: '',
        }
    }

    render() {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    marginTop: 5,
                    marginHorizontal: 70,
                    flex: 1
                }}>
                    <TextInput
                        style={{marginLeft: 10, padding: 0}}
                        placeholder={this.props.placeholder}
                        secureTextEntry={this.props.secureTextEntry}
                        autoCorrect={this.props.autoCorrect}
                        autoCapitalize={this.props.autoCapitalize}
                        returnKeyType={this.props.returnKeyType}
                        // placeholderTextColor='white'
                        underlineColorAndroid='transparent'
                        onChangeText={(text)=>{
                            this.props.onChangeText && this.props.onChangeText(text);
                        }}/>
                </View>
                {/*<Text>(*)</Text>*/}
            </View>
        );
    }
}


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({

});
