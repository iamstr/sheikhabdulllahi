import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("test.db");
const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    color: "#cfd0d1",
    fontSize: 20,
    paddingLeft: 15
  },
  linear: {
    paddingVertical: 15,
    backgroundColor: "#02046b"
  }
});

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _getData = async () => {
    db.transaction(tx => {
      tx.executeSql("select * from items", [], (_, { rows }) => {
        let obj;
        obj = rows._array[0];
        this.setState({ ...obj });

        return obj;
      });
    });
  };
  componentDidMount() {
    this._getData().then(obj => {
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

              JSON.stringify(rows)
            );
            return obj;
          }
        );
      });
    });
  }
  render() {
    const list = [
      {
        name: "Current Reading",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        subtitle: this.state.current
      },
      {
        name: "Previous Reading",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: this.state.previous
      },
      {
        name: "Consumption",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: this.state.consumption
      },
      {
        name: "Balance Brought Forward",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: this.state.balance
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            subtitle={this.props.info.subtitle}
            bottomDivider
          />
        ))}
        <View>
          <View style={styles.linear}>
            <Text style={styles.text}> Current Charges</Text>
          </View>

          <ListItem
            title="Water Charges"
            subtitle={this.state.water_charges}
            bottomDivider
          />
        </View>
      </View>
    );
  }
}
