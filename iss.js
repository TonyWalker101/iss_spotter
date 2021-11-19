// Makes an API request to retrieve the user's IP address

const request = require("request");

const fetchMyIP = callback => {

  request("https://api.ipify.org?format=json", (error, response, body) => {
    
    if (error) {
      let err = `Error with site ${error.hostname}`;
      return callback(err, null);
    }
    if (response.statusCode !== 200) {
      let msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    let ip = JSON.parse(body).ip;
    return callback(null, ip);
  });

};

module.exports = { fetchMyIP };