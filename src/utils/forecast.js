const request = require('request')

forecast = (lat, long, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=332fad504ac4041659a169cc409d5c15&query=${lat},${long}`;
    request({url, json: true}, (error, { body }) => {
        if(error){
            cb('cant connect to location services');
        }
        else if(body.error){
            cb('unable to fetch cordinates');
        }
        else{
            cb(undefined, {
                temp: body.current.temperature,
                desc: body.current.weather_descriptions[0],
                loc: body.location.name
            })
        }
    })
}

module.exports = forecast