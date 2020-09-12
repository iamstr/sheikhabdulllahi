import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

function UselessTextInput(props) {
  const [text, onChangeText] = React.useState("Enter Mpesa code");

  return (
    <TextInput
      style={{
        height: 40,
        borderColor: "#fff",
        marginTop: 20,
        borderWidth: 1,
        color: "#fff",
        paddingVertical: 15,
        borderRadius: 4,
        height: 50
      }}
      onChangeText={text => onChangeText(text)}
      value={props.value}
    />
  );
}
export default class Confirm extends React.Component {
  static navigationOptions = navigation => ({
    title: "Waqaf",
    headerStyle: {
      backgroundColor: "rgba(30,10,209,1)"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      phone: "",
      name: "",
      clients_id: ""
    };
  }

  componentWillUnmount() {
    this.state = {};
  }
  componentDidMount = () => {};

  render() {
    return (
      <LinearGradient
        colors={["rgba(30,10,209,1) ", " rgba(18,166,226,1)"]}
        style={styles.root}
      >
        <StatusBar
          backgroundColor="rgba(30,10,209,1)"
          barStyle="light-content"
        />

        <View>
          <Text
            style={{
              fontWeight: "bold",
              padding: 10,
              fontSize: 20,
              color: "#fff"
            }}
          >
            Add The Mpesa code you recieved
          </Text>
          <UselessTextInput value="Enter mpesa code" />
          <UselessTextInput value="Enter phone number" />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert("processing your request");
            }}
          >
            <Text style={styles.titleText}> Add Code </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: 350,
    marginBottom: 10,
    marginTop: 50,
    borderRadius: 4
  },
  second: {
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    width: 300,
    borderColor: "#fcfcfc",
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center"
  },
  arrow: { paddingTop: 5, paddingLeft: 10 },
  titleText: {
    fontSize: 15,
    fontWeight: "bold"
  },

  titleText2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  }
});
