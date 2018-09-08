import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import TinNhanItem from "../components/TinNhanItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadMsgGroup} from "../actions/loadMsgGroupActions";


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
    componentDidMount(){
        // this._loadMsgGroup()

    }
    // _loadMsgGroup = async () =>  {
    //     const { loadMsgGroup } = this.props
    //     let ArrMsg = await loadMsgGroup({
    //
    //     })
    // }
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
const mapStateToProps = (state) => {
    return {
        UserProfile: state.loadUserProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMsgGroup: bindActionCreators(loadMsgGroup, dispatch)
    }
}


TinNhan = connect(mapStateToProps, mapDispatchToProps)(TinNhan)
export default TinNhan