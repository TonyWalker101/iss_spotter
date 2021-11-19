// Makes an API request to retrieve the user's IP address
const { fetchMyIP } = require("./iss");

fetchMyIP((err,ip) => {

  if (err) {
    console.log("It didn't work!", err);
    return "Did not work";
  } else {
    console.log("It worked! Returned IP: ", ip);
  }

});