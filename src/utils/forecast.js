const request = require("request");
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/d45ba786571a346f69a6bfb4cf7604ef/${longitude},${latitude}`;
    request({url, json: true}, (err, {body})=> {
        if (err) {
            callback("Unable to connect to weather services!", undefined);
        } else if (body.error) {
            callback("Unable to find location.", undefined);
        } else {
            const {currently} = body;
            // const currently = response.body.currently;
            const msg = `${body.daily.data[0].summary} It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability * 100}% chance of rain.`;
            callback(undefined, msg);
            // 
        }
    });
}

module.exports = forecast;