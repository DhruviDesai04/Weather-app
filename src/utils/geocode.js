const request = require("postman-request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGhydXZpZGVzYWkwNCIsImEiOiJjbDAzZTJrdXowMnlnM2pvZ2I0MWt5em96In0.KHkn8Yaz9U6FhMlYHWC6aQ&limit=1';
  
    request({ url, json: true }, (error, { body }) => {
      if(error) {
        callback("Unable to connect to location service!", undefined);
      } else if (body.message) {
        callback("Unable to find location.", undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
      })
      // console.log(body.features[0]);
      }
    })
  }

  module.exports = geocode;




// const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGhydXZpZGVzYWkwNCIsImEiOiJjbDAzZTJrdXowMnlnM2pvZ2I0MWt5em96In0.KHkn8Yaz9U6FhMlYHWC6aQ&limit=1";

// request({url: geocodeURL, json: true}, (error, response) => {
//   if(error) {
//     console.log("Unable to connect to location service!");
//   } else if (response.body.message) {
//     console.log("Unable to find location.");
//   } else {
//     const lat = response.body.features[0].center[1];
//     const long = response.body.features[0].center[0];
//     console.log(lat,long);
//   }
// })