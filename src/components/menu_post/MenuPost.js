import React, {Component} from "react";
import {
    View,
    Text,
    Modal,
    Alert,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/Feather";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {savePost, unsavePost} from "../../actions/loadSavePostActions";

class MenuPost extends Component {
    constructor(props) {
        super(props);
        this.isSave = this.props.item.LikeSave
        this.state = {
            isSave: this.isSave
        }
    }

    _savePost = async (PostID) => {
        const { UserProfile, savePost } = this.props
        let save = await savePost({
            IntUserID: UserProfile.Value[0].IntUserID,
            PostID: PostID

        })
        if(save.Error == null){
            this.setState({
                isSave : !this.state.isSave
            })
            Alert.alert(
                "Thông báo",
                "Lưu bài viết thành công",
                [{ text: "OK", onPress: () => {} }],
                { cancelable: false }
            );
        }
        else {
            Alert.alert(
                "Thông báo",
                "Lưu bài viết không thành công",
                [{ text: "OK", onPress: () => {} }],
                { cancelable: false }
            );

        }
        console.log('save', save)
    }

    _unsavePost = async (PostID) => {
        const { UserProfile, unsavePost } = this.props
        let save = await unsavePost({
            IntUserID: UserProfile.Value[0].IntUserID,
            PostID: PostID

        })
        if(save.Error == null){
            this.setState({
                isSave : !this.state.isSave
            })
            Alert.alert(
                "Thông báo",
                "Bỏ lưu bài viết thành công",
                [{ text: "OK", onPress: () => {} }],
                { cancelable: false }
            );
        }
        else {
            Alert.alert(
                "Thông báo",
                "Bỏ lưu bài viết không thành công",
                [{ text: "OK", onPress: () => {} }],
                { cancelable: false }
            );

        }
        console.log('save', save)
    }


    render() {
        console.log('this.item', this.props.item)
        const {changeModalVisible, onChangeModalVisible} = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={changeModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        // alignItems: 'center',
                        justifyContent: "flex-end",
                    }}
                >
                    <TouchableOpacity
                        style={{flex: 5}}
                        onPress={() => onChangeModalVisible(false)}
                    />
                    <View
                        style={{backgroundColor: "white", flex: 1, justifyContent: "center"}}
                    >

                        {
                            this.state.isSave ? <TouchableOpacity onPress={() => {
                                this._unsavePost(this.props.item.PostID)
                                onChangeModalVisible(false)
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                    <Icon1 name="bookmark" size={25} color="#E0E0E0"/>

                                    <Text style={{marginLeft: 10}}>Bỏ lưu bài viết</Text>
                                </View>
                            </TouchableOpacity> : <TouchableOpacity onPress={() => {
                                this._savePost(this.props.item.PostID)
                                onChangeModalVisible(false)
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                    <Icon1 name="bookmark" size={25} color="#E0E0E0"/>

                                    <Text style={{marginLeft: 10}}>Lưu bài viết</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={() => onChangeModalVisible(false)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10}}>
                                <Icon name="report-problem" size={25} color="#E0E0E0"/>
                                <Text style={{marginLeft: 10}}>Báo cáo sai phạm</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        UserProfile: state.loadUserProfile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        savePost: bindActionCreators(savePost, dispatch),
        unsavePost: bindActionCreators(unsavePost, dispatch),
    };
};

MenuPost = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuPost);
export default MenuPost;
const DEVICE_WIDTH = Dimensions.get("window").width;
