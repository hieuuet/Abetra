import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet, StatusBar, Image, TouchableOpacity
} from 'react-native';


import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {IMAGE} from "../constant/assets";
import TabHome from "../routers/TabHome";


class WrapperTab extends Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header_wrapper}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="transparent"
                        translucent={true}
                    />
                    <ImageBackground
                        style={styles.backgound_header}
                        source={require("../../assets/wrappertab/bg_topbar.png")}
                        // resizeMode="cover"
                    >
                        <View style={{flex: 1, justifyContent: "flex-end"}}>
                            <View
                                style={{
                                    marginBottom: 5,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginHorizontal: 10,

                                }}
                            >


                                <View  style={{height: 22, backgroundColor: "#2A9490", flex: 1, borderRadius: 22/2}}>


                                </View>

                                <TouchableOpacity

                                >
                                    <Image
                                        style={{marginLeft: 15, height: 10, width: 20}}
                                        source={require("../../assets/wrappertab/icon_mail.png")}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>


                </View>
                <TabHome/>



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
    return {}
}


WrapperTab = connect(mapStateToProps, mapDispatchToProps)(WrapperTab)
export default WrapperTab
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header_wrapper: {
        height: 65,
        // backgroundColor: COLOR.COLOR_HEADER,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    backgound_header: {
        height: 65,
        width: "100%"
    },
    backgound_search: {}
})

