import React from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import Home from "../containers/post/Home";
import Message from "../containers/Message";
import DoanhNghiep from "../containers/Enterprise";
import Event from "../containers/event/Event";
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
import Search from "../containers/search/Search";
import Benifet from "../containers/Benifet";
import TermServices from "../containers/TermServices";
import ImageDetail from "../containers/ImageDetail";
import SplashScreen from "../containers/SplashScreen";
import ChangePassword from "../containers/user-manage/my-profile/ChangePassword";
import ChangePhone from "../containers/user-manage/my-profile/ChangePhone";
import CertificateMember from "../containers/CertificateMember";
import Language from "../containers/menu/Language";
import Guide from "../containers/menu/Guide";
import About from "../containers/menu/About";
import {
  MemberProfile,
  Profile,
  RegisterMember,
  CreateDescription
} from "../containers/user-manage";
import SavePost from "../containers/post/SavePost";
import AccountKitSample from "../containers/AccountKitSample";
import EventJoin from "../containers/event/EventJoin";
import WrapperTab from "../containers/WrapperTab";
import TabHome from "./TabHome";
import App1 from "../../App1";
import InputPhone from "../containers/app-auth/InputPhone";

const RootStack = createStackNavigator({
  // AccountKitSample: {
  //   screen: AccountKitSample,
  //   navigationOptions: {
  //     header: null
  //   }
  // },

  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },

  CreateDescription: {
    screen: CreateDescription,
    navigationOptions: {
      header: null
    }
  },
  VerifyAccount: {
    screen: VerifyAccount,
    navigationOptions: {
      header: null
    }
  },
  InputPhone: {
    screen: InputPhone,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null
    }
  },
  RegisterMember: {
    screen: RegisterMember,
    navigationOptions: {
      header: null
    }
  },

  Intro: {
    screen: Intro,
    navigationOptions: {
      header: null
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      header: null
    }
  },

  ChangePhone: {
    screen: ChangePhone,
    navigationOptions: {
      header: null
    }
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      header: null
    }
  },

  Home: {
    screen: Home
  },

  Menu: {
    screen: Menu
  },
  Guide: {
    screen: Guide,
    navigationOptions: {
      header: null
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      header: null
    }
  },
  Language: {
    screen: Language,
    navigationOptions: {
      header: null
    }
  },

  CertificateMember: {
    screen: CertificateMember,
    navigationOptions: {
      header: null
    }
  },

  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  MemberProfile: {
    screen: MemberProfile,
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

  Register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },
  Benifet: {
    screen: Benifet,
    navigationOptions: {
      header: null
    }
  },
  TermServices: {
    screen: TermServices,
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
  },
  CreatePost: {
    screen: CreatePost,
    navigationOptions: {
      header: null
    }
  },
  ImageDetail: {
    screen: ImageDetail,
    navigationOptions: {
      header: null
    }
  },
  SavePost: {
    screen: SavePost,
    navigationOptions: {
      header: null
    }
  },
  Event: {
    screen: Event,
    navigationOptions: {
      header: null
    }
  },
  EventJoin: {
    screen: EventJoin,
    navigationOptions: {
      header: null
    }
  },
  WrapperTab: {
    screen: WrapperTab,
    navigationOptions: {
      header: null
    }
  },
  Message: {
    screen: Message,
    navigationOptions: {
      header: null
    }
  }
});
export const WrapperRoot = createStackNavigator({
  App1: {
    screen: App1,
    navigationOptions: {
      header: null
    }
  }
});

export default RootStack;
