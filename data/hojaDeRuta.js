const axios = require('axios')
require('dotenv').config()

const openWeatherEndpoint = 
'http://api.openweathermap.org/data/2.5/weather?'+
'q=Buenos Aires,ar&APPID='+process.env.OPEN_WEATHER_API_KEY

// Documentacion API
// https://openweathermap.org/
// Que devuelve? Leer: Weather fields in API response


async function getClimaBuenosAires(){
    try {
        const response = await axios.get(openWeatherEndpoint)
        return response.data
    } catch (error) {
        throw Error(error)
    }
}

module.exports={getClimaBuenosAires}