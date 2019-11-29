import {} from "react-native";

export const Auth = (phone, user) => {
  fetch("http://192.168.1.170/mosque/resources/api/get_client.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user,
      password
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      AsyncStorage.setItem(responseJson.phone, responseJson.phone);
      AsyncStorage.setItem(responseJson.user, responseJson.user);
    })
    .then(function(responseJson) {
      Alert.alert(responseJson);
    });
};
