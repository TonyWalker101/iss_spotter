// Makes an API request to retrieve the user's IP address

const request = require("request");

const fetchMyIP = callback => {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    
    if (error) {
      console.log("Error with site", error.hostname);
    };
    if (response.statusCode !== 200) {
      console.log("Abnormal status code received: ", response.statusCode);
    }
    console.log(body);
  })
}

module.exports = { fetchMyIP };