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
import {getEvent} from "../actions/getEventActions";
import {COLOR} from "../constant/Color";


class Event extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: "Sự kiện",
            headerStyle: {backgroundColor: COLOR.BACKGROUND_HEADER},
            headerTitleStyle: {color: COLOR.TITLE_HEADER},
            headerTintColor: 'white',

        }
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            ArrEvent: [],
        };


    }

    async componentDidMount() {
        this._getEvent()

    }

    _getEvent = async () => {
        this.setState({
            isLoading: true,
        });
        const {getEvent} = this.props;

        let Event = await getEvent({
            PageSize: 100,
            PageIndex: 1,
            Keyword: "",
            FromDate: "",
            ToDate: "",
            Status: 1,
            EnterpriseID: 0,
            Type: 0	,
            LangID: 129,
        });

        if (Event && Event.ErrorCode === "00") {
            this.setState(
                {
                    isLoading: false,
                    ArrEvent: Event.Value,
                },
                () => console.log("ArrEvent", this.state.ArrEvent)
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
                            data={this.state.ArrEvent}
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
        getEvent: bindActionCreators(getEvent, dispatch),

    };
};

Event = connect(
    mapStateToProps,
    mapDispatchToProps
)(Event);
export default Event;
