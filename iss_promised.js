const request = require("request-promise-native");

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = body => {
  const parsedIP = JSON.parse(body).ip;

  return request(`https://api.freegeoip.app/json/${parsedIP}?apikey=c54efde0-4971-11ec-9ff4-595af58794aa`);
};

const fetchISSFlyOverTimes = body => {
  const coords = {};

  coords["latitude"] = JSON.parse(body).latitude;
  coords["longitude"] = JSON.parse(body).longitude;

  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    const { response } = JSON.parse(data);
    return response;
  })
};


module.exports = { 
  nextISSTimesForMyLocation,
};