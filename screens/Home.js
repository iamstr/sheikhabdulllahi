import * as SQLite from "expo-sqlite";
import React from "react";
import { AsyncStorage, Image, ScrollView, StyleSheet } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import List from "./components/List";
import Report from "./components/Report";
import logo from "./icons8-user-90.png";
import Leakage from "./Leakage";
import Logout from "./Logout";
import Payment from "./Payments";

const db = SQLite.openDatabase("test.db");

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      house: "",
      name: "",
      phone: "",
      amount_due: "",
      current: "",
      previous: "",
      consumption: "",
      balance: "",
      water_charges: "",
      userID: ""
    };
  }

  async setStorage(reading) {
    try {
      await AsyncStorage.setItem("current", String(reading.current));

      await AsyncStorage.setItem("previous", String(reading.previous));
    } catch {}
  }
  async _getData() {
    try {
      AsyncStorage.getItem("userID").then(value => {
        this.setState({ userID: String(value) });

        fetch(
          "http://sheikhabdullahi.co.ke/mosque/resources/api/reading.php?client=" +
            String(value),
          {
            method: "GET"
          }
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({ ...responseJson });
            setStorage(responseJson);
          })
          .catch(error => {});
      });

      // });
      // });
    } catch (error) {
      console.log(error.message);
    }
  }
  componentDidMount() {
    this._getData();
    //
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.current !== this.state.current) {
      this._getData();
    }

    //return this.state;
  }

  static navigationOptions = ({ navigation }) => ({
    drawerLabel: "Home",
    drawerIcon: ({ tintColor }) => (
      <Image source={logo} style={[styles.icon, { tintColor: tintColor }]} />
    ),
    // headerRight: () => MenuIcon(this.props.navigation),
    headerStyle: {
      backgroundColor: "rgba(30,10,209,1)"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });

  render() {
    return (
      <ScrollView>
        <Report
          image={require("./icons8-user-90.png")}
          style={styles.report}
          info={this.state}
          userID={this.state.userID}
        />
        <List
          current={this.state.current}
          previous={this.state.previous}
          userID={this.state.userID}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  report: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 20
  }
});

export default MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home
  },
  Payment: {
    screen: Payment
  },
  Report: {
    screen: Leakage
  },
  Logout: {
    screen: Logout
  }
});

//const MyApp = createAppContainer(MyDrawerNavigator);
