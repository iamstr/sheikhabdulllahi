import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { AsyncStorage, StatusBar, StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { createSwitchNavigator } from "react-navigation";
import Confirm from "./Confirm";

class Admin extends React.Component {
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

      fetch("http://sheikhabdullahi.co.ke/mosque/resources/api/get_admin.php", {
        method: "POST",
        body: dbData
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.hasOwnProperty("userID")) {
            this.setState({ ...responseJson });
            console.log(this.state);

            return this.props.navigation.navigate("Confirm");
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
              label="Password"
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

export default adminNavigator = createSwitchNavigator({ Admin, Confirm });

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
