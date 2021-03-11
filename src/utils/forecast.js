const request1 = require('postman-request');


const weatherCode = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a27b8c74438d9a14f92989694aef6060&query=${long},${lat}`

  request1({ url, json:true},(error,{body} = {})=>{
    if(error){
      callback('unable to connect services')
    } else if (body.error) {
      callback(body.error.type)
    } else {
      const currentWeather = body.current;
      const location = body.location.name;
      callback(undefined, {
        temp: currentWeather.temperature,
        desc: currentWeather.weather_descriptions[0],
        location
      })
    }
  })
}

module.exports = weatherCode