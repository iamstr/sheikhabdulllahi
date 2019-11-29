import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MyDrawerNavigator from "./screens/Home";
import Login from "./screens/Login";

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
    Login
  },
  {
    initialRouteName: "Login"
  }
);

const MyApp = createAppContainer(RootStack);
export default class App extends Component {
  render() {
    return <MyApp style={styles.container} />;
  }
}
