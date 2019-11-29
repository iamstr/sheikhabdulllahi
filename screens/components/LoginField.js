import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

export default class LoginField extends Component {
  render() {
    return <Input placeholder="INPUT WITH CUSTOM ICON" style={styles.solid} />;
  }
}

const styles = StyleSheet.create({
  solid: {
    backgroundColor: "blue",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    flex: 2,
    height: 50
  }
});
