// Makes an API request to retrieve the user's IP address

const request = require("request");

const fetchMyIP = callback => {

  request("https://api.ipify.org?format=json", (error, response, body) => {
    
    if (error) {
      let err = `Error with site ${error.hostname}`;
      return callback(err, null);
    }
    // if (response.statusCode !== 200) {
    //   console.log("Abnormal status code received: ", response.statusCode);
    // }
    let ip = JSON.parse(body);
    return callback(null, ip);
  });

};

module.exports = { fetchMyIP };