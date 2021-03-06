import React, {Component} from "react";
import {View, Text, Modal, TouchableOpacity, Image} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/Feather";
import {bindActionCreators, compose} from "redux";
import injectShowAlert from "../../constant/injectShowAlert";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {isEqual} from "lodash";
import {savePost, unsavePost} from "../../actions/loadSavePostActions";
import {TEXT_MENU_POST, TEXT_COMMON} from "../../language";
import {IMAGE} from "../../constant/assets";

// import {compose } from "redux";

class MenuPost extends Component {
    constructor(props) {
        super(props);
        this.isSave = this.props.item.LikeSave;
        this.state = {
            isSave: this.isSave
        };

        this.TEXT_MENU_POST = TEXT_MENU_POST();
        this.TEXT_COMMON = TEXT_COMMON();
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
            this.TEXT_MENU_POST = TEXT_MENU_POST();
            this.TEXT_COMMON = TEXT_COMMON();
        }
    }
    componentDidMount() {
        // console.log('isSavePost_menupost', this.props.isSavePost)
    }

    _savePost = async PostID => {
        const {UserProfile, savePost} = this.props;
        if (
            !UserProfile ||
            !UserProfile.Value ||
            !UserProfile.Value[0] ||
            !UserProfile.Value[0].IntUserID
        ) {
            return this.props.showAlert({content: this.TEXT_COMMON.NotFoundUserId});
        }
        let save = await savePost({
            IntUserID: UserProfile.Value[0].IntUserID,
            PostID
        });
        if (save.Error == null) {
            this.setState({
                isSave: !this.state.isSave
            });
            return this.props.showAlert({
                content: this.TEXT_MENU_POST.SavePostSuccess
            });
        } else {
            return this.props.showAlert({
                content: this.TEXT_MENU_POST.SavePostFail
            });
        }
    };

    _unsavePost = async PostID => {


        const {UserProfile, unsavePost} = this.props;
        console.log('PostID', PostID)
        console.log(' UserProfile.Value[0].IntUserID',  UserProfile.Value[0].IntUserID)
        if (
            !UserProfile ||
            !UserProfile.Value ||
            !UserProfile.Value[0] ||
            !UserProfile.Value[0].IntUserID
        ) {
            return this.props.showAlert({content: this.TEXT_COMMON.NotFoundUserId});
        }
        let save = await unsavePost({
            IntUserID: UserProfile.Value[0].IntUserID,
            PostID
        });
        console.log('savepost_', save)
        if (save.Error == null) {
            this.setState({
                isSave: !this.state.isSave
            });
            return this.props.showAlert({
                content: this.TEXT_MENU_POST.UnsavePostSuccess
            });
        } else {
            return this.props.showAlert({
                content: this.TEXT_MENU_POST.UnsavePostFail
            });
        }
    };

    render() {
        // console.log('this.item', this.props.item)
        const {changeModalVisible, onChangeModalVisible} = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={changeModalVisible}
                onRequestClose={() => {
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        // alignItems: 'center',
                        justifyContent: "flex-end"
                    }}
                >
                    <TouchableOpacity
                        style={{flex: 6}}
                        onPress={() => onChangeModalVisible(false)}
                    />
                    <View
                        style={{
                            backgroundColor: "white",
                            flex: 1,
                            justifyContent: "center"
                        }}
                    >
                        {this.state.isSave || this.props.isSavePost == true ? (
                            <TouchableOpacity
                                onPress={() => {
                                    this._unsavePost(parseInt(this.props.item.PostID));
                                    onChangeModalVisible(false);
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginLeft: 10
                                    }}
                                >

                                    <Image source={IMAGE.menu_saved} style={{width: 24, height: 24}}/>
                                    <Text style={{marginLeft: 10}}>
                                        {this.TEXT_MENU_POST.UnsavePost}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    this._savePost(this.props.item.PostID);
                                    onChangeModalVisible(false);
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginLeft: 10
                                    }}
                                >
                                    <Image source={IMAGE.menu_save} style={{width: 24, height: 24}}/>


                                    <Text style={{marginLeft: 10}}>
                                        {this.TEXT_MENU_POST.SavePost}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        {/*<TouchableOpacity onPress={() => onChangeModalVisible(false)}>*/}
                        {/*<View*/}
                        {/*style={{*/}
                        {/*flexDirection: "row",*/}
                        {/*alignItems: "center",*/}
                        {/*marginLeft: 10,*/}
                        {/*marginTop: 10*/}
                        {/*}}*/}
                        {/*>*/}
                        {/*<Icon name="report-problem" size={25} color="#E0E0E0" />*/}
                        {/*<Text style={{ marginLeft: 10 }}>*/}
                        {/*{this.TEXT_MENU_POST.Report}*/}
                        {/*</Text>*/}
                        {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        UserProfile: state.loadUserProfile,
        currentLanguage: state.currentLanguage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        savePost: bindActionCreators(savePost, dispatch),
        unsavePost: bindActionCreators(unsavePost, dispatch)
    };
};

MenuPost = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuPost);
export default compose(injectShowAlert)(MenuPost);
