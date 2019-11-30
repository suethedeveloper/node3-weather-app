const request = require("request");

const geocode = (address, callback) => {
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoid2h0Zmxvd2VyIiwiYSI6ImNrM2plZTMzaDBpOWszY212OWZtemMzbmcifQ.Vab3zAAH-0gz-COvp79u6g&limit=1`;
    request({url, json: true}, (err, {body})=> {
        if (err) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;