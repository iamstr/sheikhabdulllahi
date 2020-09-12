import { LinearGradient } from "expo-linear-gradient";
import * as SQLite from "expo-sqlite";
import React, { Component } from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
const db = SQLite.openDatabase("test.db");
export default class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  _getData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql("select * from items", [], (_, { rows }) => {
          let obj;
          obj = rows._array[0];
          this.setState({ ...obj });

          console.log("this is the user object from the report", obj);
          return obj;
        });
      });
      this._fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };
  _fetchData = async () => {
    try {
      let formBody = [];

      const dbData = new FormData();
      dbData.append("client", this.props.userID);

      fetch(
        "http://sheikhabdullahi.co.ke/mosque/resources/api/get_payment_table_client.php",

        {
          method: "POST",
          body: dbData
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ ...responseJson });
        })
        .catch(() => {});
    } catch (error) {}
  };
  componentDidMount() {
    this._getData().then(() => {
      db.transaction(tx => {
        tx.executeSql(
          "select * from readings where clients_id=?",
          [this.state.userID],
          (_, { rows }) => {
            let obj,
              length = rows.length - 1;
            obj = rows._array[+length];
            this.setState({ ...obj });
            console.log(
              "this is the object from the report ",

              this.state
            );
            return obj;
          },
          (t, error) => {
            console.log(error);
          }
        );
      });
    });
    AsyncStorage.getItem("userID").then(value => {
      let formBody = [];

      const dbData = new FormData();
      dbData.append("client", value);

      fetch(
        "http://sheikhabdullahi.co.ke/mosque/resources/api/get_payment_table_client.php",

        {
          method: "POST",
          body: dbData
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ ...responseJson });
        })
        .catch(error => {});
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.amount !== prevState.amount) {
      this._fetchData(this.props.userID);
    }
  }

  render() {
    const items = [
      {
        name: "Name",
        style: "style.header",
        value: this.state.username
      },

      {
        name: "house",
        style: "style.header",
        value: this.state.house
      },

      {
        name: "amount_due",
        style: "style.header",
        value: this.state.amount
      }
    ];
    return (
      <LinearGradient
        colors={["rgba(30,10,209,1) ", " rgba(18,166,226,1)"]}
        style={styles.container}
      >
        <View style={styles.box}>
          {items.map((l, i) => (
            <View key={i}>
              <Text style={styles.header}>{l.name}</Text>
              <Text style={styles.info}>{l.value}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    );
  }
}

<Icon name="person" type="ionicon" color="#fffff" />;
const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 7,
    borderBottomEndRadius: 10,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header: {
    paddingTop: 15,
    fontWeight: "bold",
    color: "#cfd0d1",
    fontSize: 25
  },
  box: {
    flex: 1,
    flexDirection: "column"
  },
  info: {
    paddingBottom: 10,
    fontWeight: "300",
    fontSize: 18,
    color: "white"
  },
  icon: {
    width: 128,
    height: 128,
    paddingTop: 15,
    paddingBottom: 15
  }
});
