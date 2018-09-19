import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image, AsyncStorage,
    KeyboardAvoidingView,
    Platform,
    BackHandler,
    Alert, StyleSheet, Dimensions
} from 'react-native';

import moment from "moment";
import Icon1 from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconMore from "react-native-vector-icons/Ionicons";
import BinhLuanItem from "../components/BinhLuanItem";
import TextInputChat from "../components/TextInputChat";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {searchCmt} from "../actions/searchCmtActions";
import {createCmt} from "../actions/createCmtActions";


class BinhLuan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ArrCmt: [
                {
                    FullName: "Nguyễn Văn Hiệu",
                    Content: "Không có gì quý hơn độc lập tự do",
                    Avt: "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
                    Time: '05/09/2018',
                    Img: "https://kenh14cdn.com/thumb_w/600/3qsvZHBxXH8xPdzaJmLFPEqgKxHka/Image/2015/03/10919541_326321127564559_1570986608_n-02055.jpg"
                }

            ]

        }


    }
    componentDidMount(){
        const { navigation } = this.props;
        const itemStatus = navigation.getParam('item');
        console.log('itemStatus', itemStatus)
        this._searchCmt()
    }
    _searchCmt = async () => {
        const { navigation, searchCmt } = this.props;
        const itemStatus = navigation.getParam('item');
        let ArrCmt = await searchCmt({
            Page_size: 100,
            Page_index: 1,
            Keyword: "",
            Post_id: itemStatus.PostID,
            From_date: "",
            To_date: "",
            User_id: "",
            ProfileID: "",
            User_type: 255,
            Option: 0,
            lang_name: "vi_VN"
        })
        console.log('ArrCmt', ArrCmt)



    }
    _createCmt = async(cmt_content) => {
        const { navigation, createCmt, UserProfile } = this.props;
        const itemStatus = navigation.getParam('item');
        let Cmt = await createCmt({
            Post_id: itemStatus.PostID,
            User_id: UserProfile.Value[0].UserID,
            ProfileID: UserProfile.Value[0].ProfileID,
            User_type: UserProfile.Value[0].Type,
            Full_name: UserProfile.Value[0].FullName,
            Avatar: UserProfile.Value[0].Avatar ? UserProfile.Value[0].Avatar : "",
            Images: "",
            Videos: "",
            Content: cmt_content,
            LangID: 129,
            lang_name: "vi_VN"
        })
        console.log('cmt',Cmt)

    }




    onReceiveTextInputClick = (text) => {
        if (text === "")
            return;
        this._createCmt(text)

    }



    render() {
        const { navigation } = this.props;
        const itemStatus = navigation.getParam('item');
        return (

            <KeyboardAvoidingView style={{ flex: 1 }}
                                  behavior={Platform.OS === 'ios' ? "padding" : null}
                                  keyboardVerticalOffset={64}
            >
                <View style={{flexDirection: "row", marginTop: 10, alignItems: 'center'}}>
                    <Image
                        style={styles.image_circle}
                        source={{
                            uri:
                                "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
                        }}
                        resizeMode="cover"
                    />

                    <View style={{marginLeft: 10, flex: 1}}>
                        <View style={{justifyContent: 'space-between', alignItems: "center", flexDirection: 'row'}}>
                            <Text style={{color: "#2196F3", fontWeight: "bold"}}>
                                {itemStatus.FullName}
                            </Text>
                            <TouchableOpacity>
                                <IconMore name="ios-more" size={25} color="black" style={{marginRight: 10}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent: 'space-between', alignItems: "center", flexDirection: 'row'}}>
                            <Text style={{color: "black"}}>Quản trị viên</Text>
                            <Text style={{
                                marginRight: 10,
                                color: 'black'
                            }}>{moment(itemStatus.CreatedDate).format("DD/MM/YY HH:mm")}</Text>

                        </View>
                    </View>
                </View>
                <View style={{marginHorizontal: 10, marginTop: 10}}>
                    <View>

                            <Text>{itemStatus.PostContent}</Text>
                    </View>
                </View>
                {/*{item.Images ? (*/}
                {/*<PhotoGrid*/}
                    {/*source={this.state.images}*/}
                    {/*navigation={this.props.navigation}*/}
                {/*/>*/}
                {/*) : null}*/}

                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 5,
                        justifyContent: "space-between",
                        alignItems: 'center'
                    }}
                >
                    <View style={{flexDirection: "row", marginLeft: 10, alignItems: 'center'}}>
                        <Icon1 name="like" size={25} color="#42A5F5"/>
                        <Text style={{color: "#42A5F5"}}> 99</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <Icon1 name="comment" size={25} color="#42A5F5"/>
                        <Text style={{color: "#42A5F5"}}>99</Text>
                    </View>
                    <View style={{flexDirection: "row", marginRight: 10, alignItems: 'center'}}>
                        <Icon name="share-outline" size={25} color="#42A5F5"/>
                        <Text style={{color: "#42A5F5"}}>99</Text>
                    </View>
                </View>
                <View
                    style={{height: 1, backgroundColor: "#cccccc"}}
                />
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 10,
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <View style={{flexDirection: "row", marginLeft: 20, alignItems: "center"}}>
                        <Icon1 name="like" size={25} color="#424242"/>
                        <TouchableOpacity>
                            <Text>Thích</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress = {()=> this.props.navigation.navigate('BinhLuan', {item: item})}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Icon1 name="comment" size={25} color="#424242"/>

                            <Text style={{color: "#424242"}}>Bình luận</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: "row", marginRight: 20, alignItems: "center"}}>
                        <Icon name="share-outline" size={25} color="#424242"/>

                        <Text style={{color: "#424242"}}>Share</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.ArrCmt}
                    renderItem={(item) => {
                        return (
                            <BinhLuanItem
                                dataItem={item}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={100}
                    showsVerticalScrollIndicator={false}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => {
                        // console.log("on size change");
                        this.flatList.scrollToEnd({ animated: true })
                    }}
                    onLayout={() => {
                        // console.log("got to onlayout");
                        this.flatList.scrollToEnd({ animated: true })
                    }
                    }
                />
                <TextInputChat
                    style={{marginTop:5}}
                    onReceiveTextInputClick={this.onReceiveTextInputClick}
                />
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
        searchCmt: bindActionCreators(searchCmt, dispatch),
        createCmt: bindActionCreators(createCmt, dispatch),

    };
};

BinhLuan = connect(
    mapStateToProps,
    mapDispatchToProps
)(BinhLuan);
export default BinhLuan;
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 11,
        width: DEVICE_WIDTH / 11,
        borderRadius: DEVICE_WIDTH / 22,
        marginLeft: 10,
        // marginTop: 10
    },
    imagePost: {
        width: DEVICE_WIDTH,
        height: 250,
        marginTop: 10,
    },
});