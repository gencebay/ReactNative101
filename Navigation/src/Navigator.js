import React, { Component } from "react";
import { Platform } from "react-native";

import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator
} from "react-navigation";

import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Colors from "./components/Colors";
import CustomDrawerScreen from "./screens/CustomDrawerScreen";

export const MainScreenNavigator = TabNavigator(
  {
    Home: { screen: HomeScreen },
    Search: { screen: SearchScreen }
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "#aaa",
      style: {
        height: 50,
        alignContent: "flex-start",
        backgroundColor: Colors.tabNavBackground,
        borderTopWidth: 0.6,
        borderTopColor: "#181818"
      }
    }
  }
);

export const DrawerNav = DrawerNavigator(
  {
    Home: {
      path: "/",
      screen: MainScreenNavigator
    }
  },
  {
    contentComponent: CustomDrawerScreen,
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

export const SignedOut = StackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen
    },
    LogIn: {
      screen: LoginScreen
    },
    CreateAccount: {
      screen: RegisterScreen
    }
  },
  { headerMode: "screen" }
);

export const AppNavigator = StackNavigator(
  {
    SignedOut: {
      screen: SignedOut,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    DrawerNav: {
      screen: DrawerNav,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: "none",
    mode: Platform.OS === "ios" ? "modal" : "card",
    initialRouteName: "SignedOut"
  }
);

class AppWithNavigationState extends Component {
  render() {
    return <AppNavigator />;
  }
}

export default AppWithNavigationState;
