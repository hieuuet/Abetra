import React, {Component} from "react";
import {
    View,
    Platform,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Text,
} from "react-native";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import style_common from "../style-common/index";
import EventItem from "../components/EventItem";
import {searchPost} from "../actions";
import {ViewLoading} from "../components/CommonView";


class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            ArrPost: [],
        };


    }

    async componentDidMount() {
        this._searchPost()

    }

    _searchPost = async () => {
        this.setState({
            isLoading: true,
        });
        const {searchPost} = this.props;

        let listPost = await searchPost({
            Page_size: 20,
            Page_index: 1,
            Keyword: "",
            IsAdvs: 255,
            From_date: "",
            To_date: "",
            User_id: "",
            Profile_id: "",
            User_type: 255,
            Pin: 255,
            Option: 0,
            LangID: 129,
        });

        if (listPost && listPost.ErrorCode === "00") {
            this.setState(
                {
                    isLoading: false,
                    ArrPost: listPost.Value,
                },
                () => console.log("ArrPost", this.state.ArrPost)
            );
        } else {
            this.setState({
                isLoading: false,
            });
        }
    };

    _renderLoading = () => {
        return this.state.isLoading ? <ViewLoading/> : null;
    };

    render() {
        const {navigation} = this.props;

        return (
            <KeyboardAvoidingView
                style={style_common.container}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={64}
            >
                <ScrollView style={{flex: 1}}>
                    <FlatList
                            // refreshing={this.state.refresh}
                            // onRefresh={() => {
                            //     this.GetPost()
                            // }}
                            data={this.state.ArrPost}
                            renderItem={(item) => {
                                return (
                                    <EventItem
                                        dataItem={item}
                                        userID={this.userID}
                                        // onReloadBack ={this.onReloadBack}
                                        navigation={navigation}
                                    />
                                );
                            }}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                </ScrollView>
                {this._renderLoading()}
            </KeyboardAvoidingView>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        UserProfile: state.loadUserProfile,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        searchPost: bindActionCreators(searchPost, dispatch),

    };
};

Event = connect(
    mapStateToProps,
    mapDispatchToProps
)(Event);
export default Event;
