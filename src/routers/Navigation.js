import React from "react";
import {
    createMaterialTopTabNavigator,
    createStackNavigator,
} from "react-navigation";
import Home from "../containers/post/Home";
import Message from "../containers/Message";
import DoanhNghiep from "../containers/DoanhNghiep";
import Event from "../containers/Event";
import Menu from "../containers/Menu";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Login from "../containers/app-auth/Login";
import Chat from "../containers/Chat";
import Intro from "../containers/app-intro/AppIntroSlider";
import Register from "../containers/app-auth/Register";
import BinhLuan from "../containers/BinhLuan";
import VerifyAccount from "../containers/app-auth/VerifyAccount";
import CreatePost from "../containers/post/CreatePost";
import Search from "../containers/Search";
import Benifet from "../containers/Benifet";
import TermServices from "../containers/TermServices";
import ImageDetail from "../containers/ImageDetail";
import SplashScreen from "../containers/SplashScreen";
import ChangePassword from "../containers/user-manage/my-profile/ChangePassword";
import ChangePhone from "../containers/user-manage/my-profile/ChangePhone";
import CertificateMember from "../containers/CertificateMember"

import {
    MemberProfile,
    Profile,
    RegisterMember,
} from "../containers/user-manage";
import SavePost from "../containers/post/SavePost";
import Location from "../containers/Location";

const TabHome = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="home" size={23} style={{color: tintColor}}/>
                ),
            },
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
                ),
            },
        },
        Location: {
            screen: Location,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Icon2 name="location" size={23} style={{color: tintColor}}/>

                ),
            },
        },
        DoanhNghiep: {
            screen: DoanhNghiep,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Icon3 name="event-note" size={23} style={{color: tintColor}}/>

                ),
            },
        },

        Menu: {
            screen: Menu,
            navigationOptions: {
                // headerBackTitle: 'Back',
                tabBarIcon: ({tintColor}) => (
                    <Icon2 name="menu" size={23} style={{color: tintColor}}/>
                ),
            },
        },
    },
    {
        tabBarPosition: "top",
        lazy: true,
        animationEnabled: true,
        tabBarOptions: {
            upperCaseLabel: false,

            showIcon: true,
            showLabel: false,
            activeTintColor: "black",
            inactiveTintColor: "white",
            // activeBackgroundColor:'white',
            // inactiveBackgroundColor:'#eaa33f',
            // pressColor: 'white',
            indicatorStyle: {
                // backgroundColor: 'white'
                backgroundColor: "transparent",
            },
            labelStyle: {
                fontSize: 11,
                alignSelf: "center",
            },
            // style: {
            //     backgroundColor: '#fc9b03',
            //
            // },
            // tabStyle: {
            //     backgroundColor:'white'
            // }
        },
    }
);
const RootStack = createStackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: null,
        },
    },
    ChangePassword: {
        screen: ChangePassword,
    },
    ChangePhone: {
        screen: ChangePhone,
    },

    VerifyAccount: {
        screen: VerifyAccount,
        navigationOptions: {
            header: null,
        },
    },
    CertificateMember: {
        screen: CertificateMember
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        },
    },
    MemberProfile: {
        screen: MemberProfile,
    },
    Profile: {
        screen: Profile,
        navigationOptions: {},
    },

    RegisterMember: {
        screen: RegisterMember,
    },

    Search: {
        screen: Search,
        navigationOptions: {
            header: null,
        },
    },

    Intro: {
        screen: Intro,
        navigationOptions: {
            header: null,
        },
    },
    TabHome: {
        screen: TabHome,
        navigationOptions: {
            header: null,
        },
    },

    Register: {
        screen: Register,
        navigationOptions: {
            header: null,
        },
    },
    Benifet: {
        screen: Benifet,
    },
    TermServices: {
        screen: TermServices,
    },

    Chat: {
        screen: Chat,
        // navigationOptions: {
        //     header: null,
        // },
    },
    BinhLuan: {
        screen: BinhLuan,
        navigationOptions: {
            header: null,
        },
    },
    CreatePost: {
        screen: CreatePost,
        // navigationOptions: {
        //     header: null,
        // },
    },
    ImageDetail: {
        screen: ImageDetail,
        navigationOptions: {
            header: null,
        },
    },
    SavePost: {
        screen: SavePost,
        // navigationOptions: {
        //     header: null,
        // },
    },
    Event: {
        screen: Event,
        // navigationOptions: {
        //     header: null,
        // },
    }
});

export default RootStack;
