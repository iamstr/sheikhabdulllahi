import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import adminNavigator from "./screens/Admin";
import MyDrawerNavigator from "./screens/Home";
import Login from "./screens/Login";
import SplashScreen from "./screens/SplashScreen";

const loading = createStackNavigator({ splash: SplashScreen, Login });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#F5FCFF"
    backgroundColor: "black"
  },
  app: {
    backgroundColor: "#F5FCFF"
  }
});

const RootStack = createSwitchNavigator(
  {
    Home: MyDrawerNavigator,
    loading,
    adminNavigator
  },
  {
    initialRouteName: "loading"
  }
);

const MyApp = createAppContainer(RootStack);
export default class App extends Component {
  render() {
    return <MyApp style={styles.container} />;
  }
}
