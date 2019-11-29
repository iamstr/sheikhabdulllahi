import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { Image, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("test.db");
export default class Logout extends Component {
  static navigationOptions = {
    drawerLabel: "Report Leakage",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./icons8-commercial-90.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
    headerStyle: {
      backgroundColor: "rgba(30,10,209,1)"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  _client = async () => {
    db.transaction(tx => {
      tx.executeSql("select * from items", [], (_, { rows }) => {
        let obj;
        obj = rows._array[0];
        this.setState({ ...obj });
        console.log("object from teh leakage screen", rows);
        return obj;
      });
    });
  };

  _getData = async () => {
    db.transaction(tx => {
      tx.executeSql("select * from items", [], (_, { rows }) => {
        let obj;
        obj = rows._array[0];
        this.setState({ ...obj });

        AsyncStorage.getItem("user").then(value => {
          console.log("this is the value from async storage", String(value));

          this.setState({ userID: String(value) });
        });

        return obj;
      });
    });
  };
  componentDidMount() {
    this._getData();
  }
  _report = async () => {
    this._getData().then(obj => {
      let formBody = [];
      console.log(this.state);
      const dbData = new FormData();
      dbData.append("userName", this.state.userID);

      for (let property in this.state) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(this.state[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch(
        "http://http://sheikhabdullahi.co.ke/mosque/resources/api/new_report.php",
        {
          method: "POST",
          body: dbData
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          //
        })
        .catch(function(error) {
          console.log("There has been a problem  " + error.message);
        });
    });
  };

  render() {
    return (
      <LinearGradient
        colors={["rgba(30,10,209,1) ", " rgba(18,166,226,1)"]}
        style={styles.bg}
      >
        <Text style={styles.text}>Do you want to send Leakage Report?</Text>

        <View style={styles.button}>
          <Button
            title="No"
            style={styles.no}
            color="white"
            onPress={() => this.props.navigation.navigate("Home")}
          />
          <Button
            title="Yes"
            style={styles.yes}
            backgroundColor="white"
            color="#fff"
            onPress={() => {
              this._report();
            }}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  text: { fontSize: 25, color: "#fff", paddingHorizontal: 10 },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    display: "flex",
    width: "100%",
    marginTop: 10
  },
  no: {
    borderColor: "rgba(30,10,209,1)",
    width: "100%",
    paddingLeft: 18,
    paddingRight: 18,
    marginTop: 15
  },
  yes: {
    backgroundColor: "white",
    width: "100%",
    paddingLeft: 18,
    paddingRight: 18,
    marginTop: 15
  },
  icon: {
    width: 24,
    height: 24
  }
});
