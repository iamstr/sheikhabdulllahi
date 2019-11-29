import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

export default function Submit() {
  return (
    <View>
      <Button title="Solid Button" style={styles.solid} />
    </View>
  );
}

const styles = StyleSheet.create({
  solid: {
    backgroundColor: "blue"
  }
});
