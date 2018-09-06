import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet, AsyncStorage,
    Alert,
    Dimensions

} from 'react-native'
import {COLOR} from "../constant/Color";



class TaoBaiViet extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Tạo bài viết',
            headerLeft: <TouchableOpacity style = {{marginLeft: 10,justifyContent: 'center', alignItems: 'center', height: 25, width: 35, backgroundColor: 'white', borderRadius: 3, marginRight: 7, }}
                                // onPress = {()=> this.props.navigation.goBack()}
            >
                <Text style = {{fontWeight: 'bold', fontSize: 12, color: '#0c8e72'}}>Huỷ</Text>
            </TouchableOpacity>,
            headerStyle: {backgroundColor: COLOR.BACKGROUND_HEADER},
            headerTitleStyle: {
                // color: TITLE_HEADER
            },


            // headerTintColor: TITLE_HEADER,

        }
    }

    constructor(props) {
        super(props)


        this.state = {

        }

    }


    render() {
        // const { item } = this.props.dataItem;


        return (
            <View>

                <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                    <TouchableOpacity>
                        <View style={{ alignItems:'center', alignItems: 'center', }}>

                        </View>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}

export default TaoBaiViet
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },
    imagePost: {
        width: DEVICE_WIDTH,
        height: 250,
        marginTop: 10
    }
})