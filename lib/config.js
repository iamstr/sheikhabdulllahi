<<<<<<< HEAD
import SQLite from "react-native-sqlite-2";

const url = {
  loginUrl1: " 192.168.0.96",
  loginUrl2: " 192.168.0.96/mosque/resources/api/get_client.php",
  homeUrl1: " 192.168.0.96/mosque/resources/api/get_info.php?user="
};
export const db = SQLite.openDatabase("test.db", "1.0", "", 1);
=======
//import SQLite from "react-native-sqlite-2";

const url = {
  loginUrl1: " 192.168.1.204",
  loginUrl2: " 192.168.1.204/mosque/resources/api/get_client.php",
  homeUrl1: " 192.168.1.204/mosque/resources/api/get_info.php?user="
};
//export const db = SQLite.openDatabase("test.db", "1.0", "", 1);
>>>>>>> master-sqlite
export default config = {
  hashingSecret: "thisIsAlsoASecret",
  url: `http://${url.loginUrl2}/`,
  home: `http://${url.homeUrl1}/`
};
