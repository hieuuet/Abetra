import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
} from "react-native";
import SocketIOClient from "socket.io-client";

import StatusItems from "../../components/StatusItems";
import Icon from "react-native-vector-icons/dist/EvilIcons";
import Icon1 from "react-native-vector-icons/dist/Entypo";
import {URL_SOCKET} from "../../constant/api";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadUserProfile} from "../../actions/loadUserProfileActions";
import {SearchView, ViewLoading} from "../../components/CommonView";
import style_common from "../../style-common/index";
import {searchPost} from "../../actions/searchPostActions";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            ArrPost: [
            ],
        };
        this.socket = SocketIOClient(URL_SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ["websocket"],
        });
        // console.log('this.socket', this.socket)
    }

    async componentDidMount() {
        // AsyncStorage.getItem('UserID').then(value => {
        //     console.log('userId', value)
        // })
        await this._loadUserProfile()
        await this._searchPost()
    }
    _searchPost = async () => {
        this.setState({
            isLoading: true
        })
        const { UserProfile, searchPost } = this.props
        if (UserProfile.length <=0 ){
            return null
        }
        console.log("userProfile", UserProfile)
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
            lang_name: "vi_VN"

        })
        console.log('listPost', listPost)
        if (listPost.ErrorCode === '00') {

            this.setState({
                isLoading: false,
                ArrPost: listPost.Value
            })

        }

    }
    _loadUserProfile = async () => {
        const {loadUserProfile, LoginData} = this.props;
        if (LoginData.length <= 0) {
            return null;
        }
        // let UserID = await AsyncStorage.getItem('UserID')
        // console.log('userId', UserID)
        let userProfile = await loadUserProfile({
            user_id: "2B3A24E4-719C-4F6E-BA7D-8307D1BA6644",
            option: 100,
            lang_name: "vi_VN",
        });
        // console.log("userProfile",userProfile.Value[0].LtProfile)
        // let LtPro = userProfile.Value[0].LtProfile
        // let LtPro1 = JSON.parse(LtPro)
        // console.log('ltpro', LtPro1)
    };
    _renderLoading = () => {
        return this.state.isLoading ? (
            <ViewLoading isLoadingIndicator={this.state.isLoadingIndicator} />
        ) : null;
    };


    render() {
        const {navigation} = this.props;
        return (
            <ScrollView style={{flex: 1}}>
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "stretch",
                    }}
                >
                    <SearchView
                        onPress={() => {
                            this.props.navigation.navigate("Search");
                        }}
                        style={style_common.container}
                    />
                    <TouchableOpacity
                        style={{
                            width: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 10,
                        }}
                        onPress={() => this.props.navigation.navigate("CreatePost")}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 1,
                                backgroundColor: "#0277BD",
                                height: 30,
                                width: 30,
                                borderRadius: 30 / 2,
                                borderColor: "#BDBDBD",
                            }}
                        >
                            <Icon1 name="plus" size={30} color="white"/>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    // refreshing={this.state.refresh}
                    // onRefresh={() => {
                    //     this.GetPost()
                    // }}
                    data={this.state.ArrPost}
                    renderItem={(item) => {
                        return (
                            <StatusItems
                                dataItem={item}
                                // onReloadBack ={this.onReloadBack}
                                navigation={navigation}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                {this._renderLoading()}

            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        LoginData: state.login,
        UserProfile: state.loadUserProfile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserProfile: bindActionCreators(loadUserProfile, dispatch),
        searchPost: bindActionCreators(searchPost, dispatch),
    };
};

Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
export default Home;
