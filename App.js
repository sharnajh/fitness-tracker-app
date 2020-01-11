import React, { Component } from "react";
import { View, SafeAreaView, Platform, StatusBar } from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { white, purple } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Live from "./components/Live";
import { setLocalNotification } from "./utils/helpers";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <SafeAreaView
      style={{ backgroundColor, height: Constants.statusBarHeight }}
    >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  );
}

const Tabs = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: "History",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      )
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: "Add Entry",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: "Live",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-speedometer" size={30} color={tintColor} />
      )
    }
  }
};

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const TabNav = createAppContainer(
  Platform.OS === "ios"
    ? createBottomTabNavigator(Tabs, navigationOptions)
    : createMaterialTopTabNavigator(Tabs, navigationOptions)
);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <TabNav />
        </View>
      </Provider>
    );
  }
}
