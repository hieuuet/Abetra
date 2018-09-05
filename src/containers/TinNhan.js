import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import TinNhanItem from "../components/TinNhanItem";

class TinNhan extends Component {
    constructor(props){
        super(props)
        this.state = {
            ArrTinNhan: [
                {
                    FullName: 'Nguyễn Văn Hiệu',
                    Time: '09/05/2018',
                    Mess: 'Đang làm gì đấy?'
                },
                {
                    FullName: 'Nguyễn Văn Hiệu',
                    Time: '09/05/2018',
                    Mess: 'Đang làm gì đấy?'
                },
                {
                    FullName: 'Nguyễn Văn Hiệu',
                    Time: '09/05/2018',
                    Mess: 'Đang làm gì đấy?'
                }
            ]
        }
    }
    render () {
        const {navigation} = this.props
        return (

            <View style = {{flex:1}}>
                <FlatList

                    data={this.state.ArrTinNhan}
                    renderItem={(item) => {
                        return (
                            <TinNhanItem
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}
export default TinNhan