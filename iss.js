// Makes an API request to retrieve the user's IP address

const request = require("request");

const fetchMyIP = callback => {

  request("https://api.ipify.org?format=json", (error, response, body) => {
    
    if (error) {
      const err = `Error with site ${error.hostname}`;
      return callback(err, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });

};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.freegeoip.app/json/${ip}?apikey=c54efde0-4971-11ec-9ff4-595af58794aa`, (error, response, body) => {

    if (error) {
      const err = `Something went wrong with ${error.hostname}`;
      return callback(err, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching geolocation. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const data = {};
    data["latitude"] = JSON.parse(body).latitude;
    data["longitude"] = JSON.parse(body).longitude;

    return callback(null, data);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      const err = `Something went wrong with ${error.hostname}`;
      return callback(err, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching ISS fly over times. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const flyTimes = JSON.parse(body).response;

    return callback(null, flyTimes);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};