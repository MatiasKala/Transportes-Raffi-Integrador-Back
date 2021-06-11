const axios = require('axios')
require('dotenv').config()

class Llamada {    
    constructor(ciudad) {
        this.ciudad= ciudad ? ciudad : 'Ciudad Autonoma de Buenos Aires'
        this.uri='http://api.openweathermap.org/data/2.5/weather?'+
            'q='+this.ciudad+',ar&APPID='+process.env.OPEN_WEATHER_API_KEY+'&lang=es'
    }
}

// Documentacion API
// https://openweathermap.org/current
// Que devuelve? Leer: Weather fields in API response


async function getClimaBuenosAires(ciudadRecibida){
    try {

        var llamada = new Llamada(ciudadRecibida)

        console.log(llamada);

        // if(ciudadRecibida != ''){
        //      = ciudadRecibida
        // }
        
        const response = await axios.get(llamada.uri)
        
        return obtenerDatosNecesarios(response)

    } catch (error) {
        throw Error(error)
    }
}

function obtenerDatosNecesarios(respuesta) {
    
    let data = {}

    data.weather = respuesta.data.weather
    data.main = respuesta.data.main
    data.clouds = respuesta.data.clouds
    data.rain = respuesta.data.rain
    data.name = respuesta.data.name

    return data
}

module.exports={getClimaBuenosAires}