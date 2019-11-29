import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { StatusBar, StyleSheet, View, AsyncStorage } from "react-native";
<<<<<<< HEAD

import { Button, Input } from "react-native-elements";
import config from "../lib/config";
=======
>>>>>>> master-sqlite

import { Button, Input } from "react-native-elements";
import config from "../lib/config";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("test.db");
export default class Login extends React.Component {
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
<<<<<<< HEAD
      user: "",
      phone: "",
      name: "",
      clients_id: ""
    };
  }
  async _store(state) {
    try {
      return {
        user_id: await AsyncStorage.setItem(
          "clients_id",
          JSON.stringify(state.clients_id)
        ),
        house: await AsyncStorage.setItem("house", JSON.stringify(state.house)),
        name: await AsyncStorage.setItem("name", JSON.stringify(state.name)),
        phone: await AsyncStorage.setItem("phone", JSON.stringify(state.phone))
      };
    } catch (error) {
      console.log(error.message);
    }
  }
  async auth(phone, user) {
    try {
      let phoneAsync = await AsyncStorage.setItem("phone", phone);
      let userAsync = await AsyncStorage.setItem("user", user);
      let formBody = [];

      const dbData = new FormData();
      dbData.append("userName", user);
      dbData.append("phoneNumber", phone);
      for (let property in this.state) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(this.state[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch(`${config.url}client`, {
=======
      username: "",
      phone: "",
      house: "",
      userID: "",
      user: ""
    };
  }
  componentWillUnmount() {
    this.state = {};
  }
  componentDidMount = () => {
    db.transaction(tx => {
      tx.executeSql("DROP TABLE IF EXISTS items", []);

      tx.executeSql("DROP TABLE IF EXISTS readings", []);

      tx.executeSql(
        "create table if not exists items (id integer primary key not null, userID int not null, house VARCHAR(30) NOT NULL,username VARCHAR(50) NOT NULL);"
      );

      tx.executeSql(
        "CREATE TABLE  if not exists readings ( reading_id int(11) NOT NULL AUTO_INCREMENT, current varchar(10) NOT NULL, previous varchar(10) NOT NULL, consumption varchar(10) NOT NULL, balance varchar(10) NOT NULL, water_charges varchar(10) NOT NULL DEFAULT '120', client_house int(11) NOT NULL, clients_id int(11) NOT NULL, date date NOT NULL, month varchar(20) NOT NULL, timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, amount_due varchar(10) NOT NULL, PRIMARY KEY (`reading_id`));",
        (_, { rows }) => {
          console.log(rows._array);
        },
        (t, error) => {
          console.log(error);
        }
      );
    });
  };

  _store = async state => {
    try {
      db.transaction(tx => {
        tx.executeSql("DROP TABLE IF items ");
        tx.executeSql(
          "insert into items (house, userID,username) values (?, ?,?)",
          [state.house, state.userID, state.username]
        );
      });

      return this.props.navigation.navigate("Home", { ...state });
    } catch (error) {
      console.log(error.message);
    }
  };
  async auth(phone, user) {
    try {
      let phoneAsync = await AsyncStorage.setItem("phone", phone);
      let userAsync = await AsyncStorage.setItem("user", user);
      let formBody = [];

      const dbData = new FormData();
      dbData.append("userName", user);
      dbData.append("phoneNumber", phone);
      for (let property in this.state) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(this.state[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

<<<<<<< HEAD
      fetch("http://192.168.1.204/mosque/resources/api/get_client.php", {
>>>>>>> master-sqlite
        method: "POST",
        body: dbData
      })
=======
      fetch(
        "http://http://sheikhabdullahi.co.ke/mosque/resources/api/get_client.php",
        {
          method: "POST",
          body: dbData
        }
      )
>>>>>>> connected to the sheikhabdullahi endpoint
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.hasOwnProperty("userID")) {
<<<<<<< HEAD
            console.log(responseJson);

            this.setState({ ...responseJson });
            this._stored(this.setState({ ...responseJson }))
              .then(function() {})
              .catch(function(error) {
                console.log(
                  "There has been a problem with async storage  " +
                    error.message
                );
              });
            let userID = AsyncStorage.getItem("name");
            return console.log(JSON.stringify({ ...this.state }));

            this.props.navigation.navigate("Home", { ...this.state });
            //
=======
            this.setState({ ...responseJson });
            console.log(this.state);

            //this._store(this.setState({ ...responseJson }));

            this._store({ ...this.state });
>>>>>>> master-sqlite
          }

          //
        })
        .catch(function(error) {
          console.log("There has been a problem  " + error.message);
        });
    } catch (error) {
      console.log(`this was the error ${error}`);
    }
  }

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
            <Input
              label="phone Number"
              onChangeText={phone =>
                this.setState({
                  phone
                })
              }
            />
          </View>
          <View style={styles.input}>
            <Input
              label="House Number"
              onChangeText={user =>
                this.setState({
                  user
                })
              }
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Login"
              onPress={() => this.auth(this.state.phone, this.state.user)}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});
