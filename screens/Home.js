import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import * as SQLite from "expo-sqlite";

import config from "../lib/config";
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
  async _getData() {
    try {
      db.transaction(tx => {
        tx.executeSql("select * from items", [], (_, { rows }) => {
          let obj;
          obj = rows._array[0];
          this.setState({ ...obj });
          AsyncStorage.setItem(
            "user",
            String(JSON.stringify(this.state.userID))
          );
          return obj;
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  componentDidMount() {
    this._getData()
      .then(function(obj) {
        db.transaction(tx => {});
      })
      .catch(error => {
        console.log(
          " we could not understand what you were impplying" + error.message
        );
      });

    //
  }

  fetch = async id => {};
  componentDidUpdate() {
    fetch(
      "http://sheikhabdullahi.co.ke/mosque/resources/api/get_info.php?user=" +
        this.state.userID,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        db.transaction(tx => {
          let obj = { ...responseJson };

          tx.executeSql("delete from readings");
          tx.executeSql(
            "insert into readings( current, previous, consumption, balance, water_charges, client_house, clients_id, date, month, amount_due) values (?, ?,?,?,?,?,?,?,?,?)",
            [
              obj.current,
              obj.previous,
              obj.consumption,
              obj.balance,
              obj.water_charges,
              this.state.house,
              this.state.userID,
              obj.date,
              obj.month,
              obj.amount_due
            ],
            (_, { rows }) => {},
            (t, error) => {
              console.log(error);
            }
          );
        });
      })
      .catch(function(error) {
        console.log(error.message);
      });

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
        />
        <List info={this.state} />
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
