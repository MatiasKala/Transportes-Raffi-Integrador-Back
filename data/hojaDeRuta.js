require('dotenv').config()
import axios from "axios";

const openWeatherEndpoint = 
'http://api.openweathermap.org/data/2.5/weather'+
'q=Buenos Aires,ar&APPID='+process.env.OPEN_WEATHER_API_KEY+
'{{APID}}&lang=es'

// Documentacion API
// https://openweathermap.org/
// Que devuelve? Leer: Weather fields in API response


async function getClimaBuenosAires(){
    const response = await axios(openWeatherEndpoint)
    return response
}

module.exports={getClimaBuenosAires}