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
            ]
        }
        this._loadMsgGroup()
    }
    componentDidMount(){


    }

    _loadMsgGroup = async () =>  {
        console.log("load msg gr")
        const { loadMsgGroup, UserProfile } = this.props
        if (UserProfile.length <=0 ) {
            return null
        }
        console.log('userProfile', UserProfile)
        let ArrMsg = await loadMsgGroup({
            IntUserID: UserProfile.Value[0].IntUserID

        })
        console.log('ArrMsg', ArrMsg)
        if(ArrMsg.Error === null){
            this.setState({
                ArrTinNhan: ArrMsg.ObjectResult
            })
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
                    extraData={this.state}
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