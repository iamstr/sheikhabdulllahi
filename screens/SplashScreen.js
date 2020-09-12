import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
export default class SplashScreen extends React.Component {
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={styles.titleText}> Client Side </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.second}
            onPress={() => {
              this.props.navigation.navigate("adminNavigator");
            }}
          >
            <Text style={styles.titleText}> Admin Side </Text>
            <Ionicons
              style={styles.arrow}
              name="ios-arrow-forward"
              size={24}
              color="rgba(18,166,226,1)"
            />
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
    width: 300,
    marginBottom: 10,
    marginTop: 200,
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
