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
import style_common from "../../style-common/index";
import EventItem from "../../components/EventItem";
import {searchPost} from "../../actions/index";
import {CustomizeHeader, ViewLoading} from "../../components/CommonView";
import {getEvent} from "../../actions/getEventActions";
import {COLOR} from "../../constant/Color";


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
        const {getEvent, UserProfile} = this.props;

        let Event = await getEvent({
            IntUserID: UserProfile.Value[0].IntUserID,
            PageSize: 100,
            PageIndex: 1,
            Keyword: "",
            FromDate: "",
            ToDate: "",
            Status: 1,
            EnterpriseID: 0,
            intUserLog: UserProfile.Value[0].IntUserID,
            Type: 0
        });
        console.log('Event', Event)

        if (Event && Event.ErrorCode === null) {
            this.setState(
                {
                    isLoading: false,
                    ArrEvent: Event.Value,
                }
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
    _renderEmpty = () => {
        return (
            <View style={style_common.content_center}>
                <Text>Không có dữ liệu</Text>
            </View>
        );
    };
    render() {
        const {navigation} = this.props;

        return (
            <KeyboardAvoidingView
                style={style_common.container}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={64}
            >
                <CustomizeHeader
                    label={"Sự kiện"}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <ScrollView style={{flex: 1}}>
                    {this.state.ArrEvent.length === 0 && !this.state.isLoading ? (
                        this._renderEmpty()
                    ) : (

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
                                        fromEvent = {false}
                                    />
                                );
                            }}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />)
                    }
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
