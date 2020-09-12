import * as SQLite from "expo-sqlite";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
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
    try {
      let formBody = [];

      const dbData = new FormData();
      dbData.append("client", this.props.userID);

      for (let property in this.state) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(this.state[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
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
    } catch (error) {}
  };
  componentDidMount() {
    this._getData().then(() => {});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.userID !== prevProps.userID) {
      this._getData();
    }
  }
  render() {
    const list = [
      {
        name: "Current Reading",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        subtitle: this.props.current
      },
      {
        name: "Previous Reading",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: this.props.previous
      },
      {
        name: "Consumption",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: this.state.bill
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
            subtitle={l.subtitle}
            bottomDivider
          />
        ))}
        <View>
          <View style={styles.linear}>
            <Text style={styles.text}> Current Charges</Text>
          </View>

          <ListItem title="Water Charges" subtitle="1000" bottomDivider />
        </View>
      </View>
    );
  }
}
