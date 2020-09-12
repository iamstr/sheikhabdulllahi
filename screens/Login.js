import { LinearGradient } from "expo-linear-gradient";
import * as SQLite from "expo-sqlite";
import * as React from "react";
import { AsyncStorage, StatusBar, StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";

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
      user: "",
      phone: "",
      name: "",
      clients_id: ""
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
      await AsyncStorage.setItem("userID", state.userID);
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

      fetch(
        "http://sheikhabdullahi.co.ke/mosque/resources/api/get_client.php",
        {
          method: "POST",
          body: dbData
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.hasOwnProperty("userID")) {
            this.setState({ ...responseJson });
            console.log("we are at the login...", this.state);

            //this._store(this.setState({ ...responseJson }));

            this._store({ ...this.state });
          }

          //
        })
        .catch(function (error) {
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
