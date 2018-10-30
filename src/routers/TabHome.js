import React from "react";
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
import RootStack from "./Navigation";

const TabHome = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="home" size={23} style={{color: tintColor}}/>
                )
            }
        },
        Message: {
            screen: Message,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Icon1
                        name="facebook-messenger"
                        size={23}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        Location: {
            screen: Location,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Icon2 name="location" size={23} style={{color: tintColor}}/>
                )
            }
        },
        DoanhNghiep: {
            screen: DoanhNghiep,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Icon3 name="event-note" size={23} style={{color: tintColor}}/>
                )
            }
        },

        Menu: {
            screen: Menu,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Icon2 name="menu" size={23} style={{color: tintColor}}/>
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
                height: 30,
                // backgroundColor:'white'
            },
            style: {
                backgroundColor: 'white',

            },
        }
    }
);
export default TabHome;