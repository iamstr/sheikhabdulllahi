const config = require("./config");
// const crypto = require("crypto");

const helpers = {};

// Create a SHA256 hash
// helpers.hash = function(str) {
//   if (typeof str == "string" && str.length > 0) {
//     let hash = crypto
//       .createHmac("sha256", config.hashingSecret)
//       .update(str)
//       .digest("hex");
//     return hash;
//   } else {
//     return false;
//   }
// };

export default helpers;
