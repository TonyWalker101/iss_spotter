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

const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.freegeoip.app/json/${ip}?apikey=c54efde0-4971-11ec-9ff4-595af58794aa`, (error, response, body) => {

    if (error) {
      let err = `Something went wrong with ${error.hostname}`;
      return callback(err, null);
    }

    if (response.statusCode !== 200) {
      let msg = `Status code ${response.statusCode} when fetching geolocation. Response: ${body}`;
      return callback(Error(msg), null);
    }

    let data = {};
    data["latitude"] = JSON.parse(body).latitude;
    data["longitude"] = JSON.parse(body).longitude;

    return callback(null, data);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {

};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};