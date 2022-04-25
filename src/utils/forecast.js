const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
const url =
  "http://api.weatherstack.com/current?access_key=9331f4862b2faeab4393560781eb8673&query=" + latitude + "," + longitude + "&units=f";

  request({ url, json: true }, (error, { body }) => {
        const temp = body.current.temperature;
        const feels = body.current.feelslike;
        if(error) {
            callback('Unable to connect weatherstack', undefined)
        } else if (body.error) {
            callback('Unable to find location.');
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". current temparature is " + temp + ". it feels like to reach at " + feels)
        }
  })

}

module.exports = forecast;