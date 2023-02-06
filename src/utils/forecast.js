const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0f07d29b9e371eef71212e18ef6d382f&query=' + latitude + ',' + longitude + '&units=m'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect with weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temp = response.body.current.temperature
            const apTemp = response.body.current.feelslike
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + temp  + ' degrees out. It feels like ' + apTemp  + ' degrees out.')
           
        }
    })

}

module.exports = forecast