import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import {
  Alert,
  AsyncStorage,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, Input } from "react-native-elements";

export default class Payment extends React.Component {
  static navigationOptions = {
    title: "Waqaf",
    headerStyle: {
      backgroundColor: "rgba(30,10,209,1)"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },

    drawerLabel: "Make Payment",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./icons8-money-90.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      userID: "",
      amount: ""
    };
  }
  _send = async () => {
    try {
      AsyncStorage.getItem("user").then(value => {
        console.log("this is the value from async storage", String(value));

        this.setState({ userID: String(value) });
      });
      console.log("this is the state", this.state);
      let formBody = [];

      const dbData = new FormData();
      dbData.append("client", this.state.userID);
      dbData.append("mpesa", this.state.code);
      dbData.append("amount", this.state.amount);
      for (let property in this.state) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(this.state[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      AsyncStorage.getItem("user").then(value => {
        console.log("this is the FINAL STATE from async storage", this.state);

        this.setState({ userID: String(value) });
      });

      fetch("http://sheikhabdullahi.co.ke/mosque/resources/api/payment.php", {
        method: "POST",
        body: dbData
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (
            responseJson.hasOwnProperty("status") &&
            responseJson.status === "warning"
          ) {
            return Alert.alert("you used this code before please check again");
            //this._store(this.setState({ ...responseJson }));
          } else {
            return Alert.alert("success");
          }

          //
        })
        .catch(function (error) {
          console.log("There has been a problem  " + error.message);
        });
    } catch (error) {
      console.log(`this was the error ${error}`);
    }
  };
  render() {
    return (
      <LinearGradient
        colors={["rgba(30,10,209,1) ", " rgba(18,166,226,1)"]}
        style={styles.bg}
      >
        <StatusBar
          backgroundColor="rgba(30,10,209,1)"
          barStyle="light-content"
        />

        <View style={styles.container}>
          <View style={styles.input}>
            <Text style={styles.info}>Pay Your Water Bills</Text>
          </View>
          <View style={styles.input}>
            <Text>Lipa na M-Pesa</Text>
            <Text style={styles.info}>006321</Text>
          </View>
          <View>
            <Input
              label="M-pesa Code"
              onChangeText={code =>
                this.setState({
                  code
                })
              }
            />
          </View>
          <View>
            <Input
              label="Amount"
              onChangeText={amount =>
                this.setState({
                  amount
                })
              }
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Send"
              onPress={() => {
                this._send();
              }}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  input: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "blue",
    color: "#fff",
    marginBottom: 15
  },
  button: {
    color: "#88FDE7",
    paddingLeft: 18,
    paddingRight: 18,
    marginTop: 15
  },
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    width: "70%"
    // backgroundColor: "#F5FCFF"
  },
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  info: { color: "white" }
});
