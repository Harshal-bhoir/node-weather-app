const request = require('request');

const geocode = (address, cb) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=254121173b9e99efae98c08fbc33f06c&query='+encodeURIComponent(address);

    request({url, json: true}, (error, { body }) => {
        if(error){
            cb('unable to connect to location services');
        } else if(body.error){
            cb('Invalid params or location entered');
        }
        else{
            cb(undefined, {
                lat: body.data[0].latitude,
                long: body.data[0].longitude,
                name: body.data[0].name
            })
        }
    })
}

module.exports = geocode;