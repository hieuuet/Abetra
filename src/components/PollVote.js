import React, { Component } from 'react';
import {
    View,
    Text, Alert,

} from 'react-native';


import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CheckBox from "./CheckBox ";
import {API, URL_BASE} from "../constant/api";

class PollVote extends Component {
    constructor(props){
        super(props)
        this.countCheck = this.props.dataItem.item.TotalVote;
        // console.log('TotalVote', this.props.dataItem)
        this.state = {
            countCheck: this.countCheck,
            a: 1
        }
    }
    youChecked = (PostID, PollID) => {
        const {UserProfile} = this.props;
        if (UserProfile.length <= 0) {
            return null
        }
        fetch(API.POLL_VOTE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                PostID: PostID,
                PollID: PollID,
                IntUser:UserProfile.Value[0].IntUserID,
                IsLike: 1,
                isLog: 0,
                lang_name: "vi_VN"


            })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log('data', data)
            if (data.ErrorCode === "00") {
                let currentCheck = this.state.countCheck;
                currentCheck++;

                this.setState({countCheck: currentCheck});
            }
            else {
                Alert.alert("Thông báo", "có lỗi sảy ra");
            }
        }).catch(e => {
            console.log("exception", e);
            Alert.alert("Thông báo", "Có lỗi khi like");
        });
    }
    youUnChecked = (PostID, PollID) => {
        const {UserProfile} = this.props;
        if (UserProfile.length <= 0) {
            return null
        }
        fetch(API.POLL_VOTE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                PostID: PostID,
                PollID: PollID,
                IntUser: UserProfile.Value[0].IntUserID,
                IsLike: 0,
                isLog: 0,
                lang_name: "vi_VN"


            })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log('data', data)
            if (data.ErrorCode === "00") {
                let currentCheck = this.state.countCheck;
                currentCheck--;

                this.setState({countCheck: currentCheck});
            }
            else {
                Alert.alert("Thông báo", "có lỗi sảy ra");
            }
        }).catch(e => {
            console.log("exception", e);
            Alert.alert("Thông báo", "Có lỗi khi like");
        });
    }
    // onClick() {
    //     console.log('aaaaaaaaaaaa')
    // }
    onClick = (PostID, PollID) => {
        this.setState({
            isChecked: !this.state.isChecked
        }, () => this.state.isChecked? this.youChecked(PostID, PollID):this.youUnChecked(PostID, PollID));

    }
    render () {

        const {item} = this.props.dataItem;
        // console.log('itempollvote', item)
        return (
            <View style={{
                alignItems: 'center',
                marginTop: 5,
                marginHorizontal: 15,
                flexDirection: 'row'
            }}>
                <CheckBox
                    onClick={() => this.onClick(item.PostID, item.OptionID)}
                    isChecked={this.state.isChecked}
                />
                <View style={{
                    height: 30,
                    flexDirection: 'row',
                    borderColor: '#E0E0E0',
                    borderWidth: 1, width: "80%",
                    backgroundColor: '#EEEEEE',
                    alignItems: 'center',
                    borderRadius: 15
                }}>

                    <Text style={{marginLeft: 10}} numberOfLines={1}>{item.OptionContent}</Text>

                </View>

                <Text style={{marginLeft: 15}}>{this.state.countCheck}</Text>


            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        UserProfile: state.loadUserProfile,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
    }
};

PollVote = connect(mapStateToProps, mapDispatchToProps)(PollVote);
export default PollVote