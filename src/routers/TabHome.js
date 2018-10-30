import React from "react";
import {
    Image,
    StyleSheet
} from 'react-native'
import {
    createMaterialTopTabNavigator,
    createStackNavigator
} from "react-navigation";
import Home from "../containers/post/Home";
import Message from "../containers/Message";
import DoanhNghiep from "../containers/Enterprise";
import Menu from "../containers/Menu";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Location from "../containers/Location";
import Event from "../containers/event/Event";
import {
    MemberProfile,
    Profile,
    RegisterMember
} from "../containers/user-manage";
const TabHome = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        style={styles.btn}
                        source={
                            require("../../assets/tab/icon_feed.png")

                        }
                        resizeMode="cover"
                    />
                    // <Icon name="home" size={23} style={{color: tintColor}}/>
                )
            }
        },

        Location: {
            screen: Location,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        style={styles.btn}
                        source={
                            require("../../assets/tab/icon_service.png")

                        }
                        resizeMode="cover"
                    />

                )
            }
        },
        Event: {
            screen: Event,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        style={styles.btn}
                        source={
                            require("../../assets/tab/icon_forcus.png")

                        }
                        resizeMode="cover"
                    />

                )
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        style={styles.btn}
                        source={
                            require("../../assets/tab/icon_myfeeds.png")

                        }
                        resizeMode="cover"
                    />
                )
            }
        },

        Menu: {
            screen: Menu,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        style={styles.btn}
                        source={
                            require("../../assets/tab/icon_moretop.png")

                        }
                        resizeMode="cover"
                    />
                )
            }
        }
    },
    {
        tabBarPosition: "top",
        lazy: true,
        animationEnabled: true,
        tabBarOptions: {
            upperCaseLabel: false,

            showIcon: true,
            showLabel: false,
            activeTintColor: "blue",
            inactiveTintColor: "#B5B5B5",
            // activeBackgroundColor:'white',
            // inactiveBackgroundColor:'#eaa33f',
            // pressColor: 'white',
            indicatorStyle: {
                // backgroundColor: 'white'
                backgroundColor: "transparent"
            },
            tabStyle: {
                height: 40,
                // backgroundColor:'white'
            },
            style: {
                backgroundColor: 'white',

            },
        }
    }
);
const styles = StyleSheet.create({
    btn: {
        height: 18,
        marginRight: 10,
        width: 18*(77/73)
    }
})
export default TabHome;