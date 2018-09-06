import React, { Component } from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import Home from "../containers/Home";
import TinNhan from "../containers/TinNhan";
import DoanhNghiep from "../containers/DoanhNghiep";
import SuKien from "../containers/SuKien";
import Menu from "../containers/Menu";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Login from "../containers/Login";
import Chat from "../containers/Chat";
import Intro from "../containers/app-intro/AppIntroSlider";
import Register from "../containers/app-auth/Register";
import BinhLuan from "../containers/BinhLuan";

const TabHome = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        // headerBackTitle: 'Back',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={23} style={{ color: tintColor }} />
        )
      }
    },
    TinNhan: {
      screen: TinNhan,
      navigationOptions: {
        // headerBackTitle: 'Back',
        tabBarIcon: ({ tintColor }) => (
          <Icon1
            name="facebook-messenger"
            size={23}
            style={{ color: tintColor }}
          />
        )
      }
    },
    DoanhNghiep: {
      screen: DoanhNghiep,
      navigationOptions: {
        // headerBackTitle: 'Back',
        tabBarIcon: ({ tintColor }) => (
          <Icon2 name="location" size={23} style={{ color: tintColor }} />
        )
      }
    },
    SuKien: {
      screen: SuKien,
      navigationOptions: {
        // headerBackTitle: 'Back',
        tabBarIcon: ({ tintColor }) => (
          <Icon3 name="event-note" size={23} style={{ color: tintColor }} />
        )
      }
    },
    Menu: {
      screen: Menu,
      navigationOptions: {
        // headerBackTitle: 'Back',
        tabBarIcon: ({ tintColor }) => (
          <Icon2 name="menu" size={23} style={{ color: tintColor }} />
        )
      }
    }
  },
  {
    tabBarPosition: "top",

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
        backgroundColor: "transparent"
      },
      labelStyle: {
        fontSize: 11,
        alignSelf: "center"
      }
      // style: {
      //     backgroundColor: '#fc9b03',
      //
      // },
      // tabStyle: {
      //     backgroundColor:'white'
      // }
    }
  }
);
const RootStack = createStackNavigator({
  Intro: {
    screen: Intro,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },
  TabHome: {
    screen: TabHome,
    navigationOptions: {
      header: null
    }
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      header: null
    }
  },
  BinhLuan: {
    screen: BinhLuan,
    navigationOptions: {
      header: null
    }
  }
});

export default RootStack;
