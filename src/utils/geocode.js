const request1 = require('postman-request');


const geoCode = (adrress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adrress)}.json?access_token=pk.eyJ1IjoiZXJlejIyIiwiYSI6ImNrbTBzZmY5aTNwbjMydm53YndqNWl6Z2kifQ.hAm4Z0dZmhBRmW9ckeR9Fg&limit=1`

  request1({ url, json:true},(error,response= {} )=>{
    if(error){
      callback('unable to connect services')
    } else if (response.body.message) {
      callback('location not find')
    } else {
      const location = response.body.features[0]
      const locationCord = location.center;
      
      callback(undefined, {
        lat: locationCord[0],
        lon: locationCord[1],
        location:location.place_name
      })
    }
  })
}

module.exports = geoCode