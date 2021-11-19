// Makes an API request to retrieve the user's IP address
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((err,ip) => {

  if (err) {
    console.log("It didn't work!", err);
    return;
  }
  console.log("It worked! Returned IP: ", ip);
  
  fetchCoordsByIP(ip, (err, data) => {
  
    if (err) {
      console.log("It didn't work!", err);
      return;
    }
    console.log("It worked! Returned Geolocation: ", data);
    
    fetchISSFlyOverTimes(data, (err, flyTimes) => {
      if (err) {
        console.log("It didn't work!", err);
        return;
      }
      console.log("It worked! Returned Fly Times:\n", flyTimes);
    });

  });

});
